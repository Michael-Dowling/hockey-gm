import {chooseEventUsingWeights} from '../util'

const baseEventTypes = [
    "SHOT",
    "OFFSIDE",
    "ICING",
    "PENALTY"
];

const baseEventTypesFrequency = [
    0.15,
    0.05,
    0.05,
    0.05
]

const endResultEvents = {
    SAVE : 0,
    GOAL : 1,
    OFFSIDE : 2,
    ICING : 3,
    PENALTY : 4,
    END_OF_PERIOD : 5
}

const shotOddsByPosition = {
    'C': 26,
    'LW': 26,
    'RW': 26,
    'D1': 11,
    'D2': 11
}

/** returns an array containing [the odds of the player contributing to a shot on offense,
 * the odds of the player suppressing opponent shots on defense]. Forwards contribute more
 * to the first, defense more to the second. Essentially returns a measure of how good 
 * the player is at driving play offensively and defensively */
function shotContributionOdds(player, position) {
    if (position === player.position)
        return player.playDrivingOffense;
}

function shotSuppressionOdds(player, position) {
    return player.playDrivingDefense;
}

function goalieSaveOdds(goalie) {
    return (goalie.overall-60)/5 * 0.008 + .910;
}

function shotDangerContribution(player, position) {
    if (position === player.position)
        return player.shotQualityOffense;
}

function dangerShotSuppressionContribution(player, position) {
    if (position === player.position)
        return player.shotQualityDefense;
}

function chooseShooter(players) {
    let shotOdds = []
    const oddsByPosition = Object.values(shotOddsByPosition);
    const positions = Object.keys(shotOddsByPosition);
    for (let i = 0; i<5; i++) {
        shotOdds.push(oddsByPosition[i] * players[positions[i]].shotQualityOffense);
    }
    
    let position = chooseEventUsingWeights(positions, shotOdds);
    return players[position];
}

export default class Game {
    constructor(home, away){
        this.home = home;
        this.away = away;
        this.homeScore = 0;
        this.awayScore = 0;
        this.timeRemaining = 20.0;
        this.period = 1;
        this.prevPlay = null;
        this.gameDone = false;
        this.homeGperP = [0, 0, 0, 0]
        this.awayGperP = [0, 0, 0, 0]
        this.homeShots = 0;
        this.awayShots = 0;
        this.events = []
        this.homePlayersOn = home.players;
        this.awayPlayersOn = away.players;
    }

    pickEvent() {  
        let adjustedEventOdds = baseEventTypesFrequency.slice()
        //TODO: adjust event odds somewhat based on situation (PP, EN, etc)
        
        return chooseEventUsingWeights(baseEventTypes, adjustedEventOdds);
    }

    /** Calculate the odds of a shot being taken by the home team */
    shotOdds(){
        // look at offensive strength of players on ice
        let homeShotOdds = shotContributionOdds(this.homePlayersOn.C, 'C') +
            shotContributionOdds(this.homePlayersOn.LW, 'LW') +
            shotContributionOdds(this.homePlayersOn.RW, 'RW') +
            shotContributionOdds(this.homePlayersOn.D1, 'D') +
            shotContributionOdds(this.homePlayersOn.D2, 'D');
        
        let homeSuppressionOdds = shotSuppressionOdds(this.homePlayersOn.C, 'C') +
            shotSuppressionOdds(this.homePlayersOn.LW, 'LW') +
            shotSuppressionOdds(this.homePlayersOn.RW, 'RW') +
            shotSuppressionOdds(this.homePlayersOn.D1, 'D') +
            shotSuppressionOdds(this.homePlayersOn.D2, 'D');
                
        let awayShotOdds = shotContributionOdds(this.awayPlayersOn.C, 'C') +
            shotContributionOdds(this.awayPlayersOn.LW, 'LW') +
            shotContributionOdds(this.awayPlayersOn.RW, 'RW') +
            shotContributionOdds(this.awayPlayersOn.D1, 'D') +
            shotContributionOdds(this.awayPlayersOn.D2, 'D');
        
        let awaySuppressionOdds = shotSuppressionOdds(this.awayPlayersOn.C, 'C') +
            shotSuppressionOdds(this.awayPlayersOn.LW, 'LW') +
            shotSuppressionOdds(this.awayPlayersOn.RW, 'RW') +
            shotSuppressionOdds(this.awayPlayersOn.D1, 'D') +
            shotSuppressionOdds(this.awayPlayersOn.D2, 'D');
        
        let shotChance = 0.5 + (homeShotOdds - awaySuppressionOdds) * 0.001 - 
                (awayShotOdds - homeSuppressionOdds) * 0.001;
        
        // TODO: account for game situation (PP, EN, etc.)

        return shotChance;
    }

    /** Calculate the odds of a shot going in, based on teams and game situation */
    saveOdds(shootingTeam) {
        if (shootingTeam === "home") {
            var offensePlayersOnIce = this.homePlayersOn;
            var defensePlayersOnIce = this.awayPlayersOn;
        } else {
            offensePlayersOnIce = this.awayPlayersOn;
            defensePlayersOnIce = this.homePlayersOn;
        }

        let shotDanger = shotDangerContribution(offensePlayersOnIce.C, 'C') + 
                        shotDangerContribution(offensePlayersOnIce.LW, 'LW') + 
                        shotDangerContribution(offensePlayersOnIce.RW, 'RW') + 
                        shotDangerContribution(offensePlayersOnIce.D1, 'D') + 
                        shotDangerContribution(offensePlayersOnIce.D2, 'D');
        
        let dangerSuppression = dangerShotSuppressionContribution(defensePlayersOnIce.C, 'C') +
                dangerShotSuppressionContribution(defensePlayersOnIce.LW, 'LW') +
                dangerShotSuppressionContribution(defensePlayersOnIce.RW, 'RW') +
                dangerShotSuppressionContribution(defensePlayersOnIce.D1, 'D') +
                dangerShotSuppressionContribution(defensePlayersOnIce.D2, 'D');


        return goalieSaveOdds(defensePlayersOnIce.G) - (shotDanger-dangerSuppression)*0.0001;
    }

    /** Handle shot events - determine who shot, and if it went in */
    handleShot() {
        if (Math.random() < this.shotOdds()) {
            //home shot
            this.homeShots++;
            var shooter = chooseShooter(this.homePlayersOn);
            shooter.seasonShots++;
            if (Math.random() > this.saveOdds("home", shooter)){
                //home goal
                shooter.seasonGoals++;
                shooter.seasonPoints++;
                this.prevPlay = endResultEvents.GOAL;
                this.homeScore++;
                this.homeGperP[Math.min(this.period - 1, 3)]++;
                if (this.period >= 4)
                    this.gameDone = true;
                return (this.home.name + " goal! " + this.home.abbr + " " + 
                        this.homeScore + ", " + this.away.abbr + " " + this.awayScore);
            }
            this.prevPlay = endResultEvents.SAVE;
            return (this.home.abbr + " shot saved.");
        }
        //away shot
        this.awayShots++;
        shooter = chooseShooter(this.awayPlayersOn);
        shooter.seasonShots++;
        if (Math.random() > this.saveOdds("away", shooter)){
            //away goal
            shooter.seasonGoals++;
            shooter.seasonPoints++;
            this.prevPlay = endResultEvents.GOAL;
            this.awayScore++;
            this.awayGperP[Math.min(this.period - 1, 3)]++;
            if (this.period >= 4)
                this.gameDone = true;
            return (this.away.name + " goal! " + this.home.abbr + " " + 
                    this.homeScore + ", " + this.away.abbr + " " + this.awayScore);
        }
        this.prevPlay = endResultEvents.GOAL;
        return (this.away.abbr + " shot saved.");
    }

    /** return string summarizing the game */
    gameOver() {
        return "Game over, final score: " + this.home.name + " " + this.homeScore + " - " +
                this.away.name + " " + this.awayScore + ".";
    }

    /** simulate the next game event */
    nextEvent() {
        var timeElapsed = Math.random() * 1 + 0.02;

        this.timeRemaining -= timeElapsed;
        if(this.timeRemaining < 0) {
            if ((this.period >= 3 && this.homeScore !== this.awayScore) || this.period > 10){
                this.gameDone = true;
                return "";
            }
            this.period++;
            this.timeRemaining = 20
            this.prevPlay = endResultEvents.END_OF_PERIOD;
            return "End of period " + (this.period-1) + ".";
        }

        var event = this.pickEvent();

        if (event === "SHOT"){
            return this.handleShot()
        }
        if (event === "OFFSIDE"){
            this.prevPlay = endResultEvents.OFFSIDE;
            return event;
        }
        if (event === "ICING"){
            this.prevPlay = endResultEvents.ICING;
            return event;
        }
        if (event === "PENALTY") {
            this.prevPlay = endResultEvents.PENALTY;
            return event;
        }

        return "This failed."
    }

    /** Sim the entire game */
    simulateGame() {
        while (!this.gameDone) {
            let event = this.nextEvent();
            this.events.push(event);
        }
    }
}

