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

export default class Game {
    constructor(){
        this.homeTeam = "Toronto Maple Leafs";
        this.awayTeam = "Boston Bruins";
        this.homeAbbr = "TOR";
        this.awayAbbr = "BOS";
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
        this.awayGoalieSVP = 0.912;
        this.homeGoalieSVP = 0.917;
        this.homeOffense = 80;
        this.awayOffense = 65;
        this.homeDefense = 55;
        this.awayDefense = 70;
    }

    pickEvent() {  
        let adjustedEventOdds = baseEventTypesFrequency.slice()
        //TODO: adjust event odds somewhat based on situation (PP, EN, etc)
        
        var weightedRand = Math.random() * adjustedEventOdds.reduce((a, b) => a + b, 0)
        var sum = 0
        for (var i=0; i<baseEventTypesFrequency.length; i++){
            sum += baseEventTypesFrequency[i];
            if (weightedRand < sum){
                return baseEventTypes[i];
            }
        }
    }

    /** Calculate the odds of a shot being taken by the home team */
    shotOdds(){
        var shotChance = 0.5 - (this.homeOffense - this.awayDefense) * 0.01 + 
                (this.awayOffense - this.homeDefense) * 0.01;
        
        //TODO: account for game situation (PP, EN, etc.)

        return shotChance;
    }

    /** Calculate the odds of a shot going in, based on teams and game situation */
    shotQuality(team) {
        return (team === "home" ? this.awayGoalieSVP - (this.homeOffense-60)*0.0005 :
                    this.homeGoalieSVP - (this.awayOffense-60)*0.01);
    }

    /** Handle shot events - determine who shot, and if it went in */
    handleShot() {
        if (Math.random() < this.shotOdds()) {
            //home shot
            this.homeShots++;
            if (Math.random() > this.shotQuality("home")){
                //home goal
                this.homeScore++;
                this.homeGperP[Math.min(this.period - 1, 3)]++;
                if (this.period >= 4)
                    this.gameDone = true;
                return (this.homeTeam + " goal! " + this.homeAbbr + " " + 
                        this.homeScore + ", " + this.awayAbbr + " " + this.awayScore);
            }
            return (this.homeAbbr + " shot saved.");
        }
        //away shot
        this.awayShots++;
        if (Math.random() > this.shotQuality("away")){
            //away goal
            this.awayScore++;
            this.awayGperP[Math.min(this.period - 1, 3)]++;
            if (this.period >= 4)
                this.gameDone = true;
            return (this.awayTeam + " goal! " + this.homeAbbr + " " + 
                    this.homeScore + ", " + this.awayAbbr + " " + this.awayScore);
        }
        return (this.awayAbbr + " shot saved.");
    }

    /** return string summarizing the game */
    gameOver() {
        return "Game over, final score: " + this.homeTeam + " " + this.homeScore + " - " +
                this.awayTeam + " " + this.awayScore + ".";
    }

    /** simulate the next game event */
    nextEvent() {
        var event = this.pickEvent();

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
            this.prevPlay = endResultEvents.ICING;
            return event;
        }

        return "This failed."
    }
    
}

