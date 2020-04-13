import {Game} from '../game-simulation';
import {splitDivisionsIntoWC, compareTeams} from '../util';

class Series {
    constructor(homeTeam, awayTeam){
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeWins = 0;
        this.awayWins = 0;
        this.games = [];
        this.over = false;
    }

    simDay() {
        let game = new Game(this.homeTeam, this.awayTeam);
        game.simulateGame();
        this.games.push(game);
        if (game.homeScore > game.awayScore) {
            this.homeWins++;
            if (this.homeWins === 4) {
                this.winner = this.homeTeam;
                this.over = true;
            }
        } else {
            this.awayWins++;
            if (this.awayWins === 4) {
                this.winner = this.awayTeam;
                this.over = true;
            }
        }
    }
}

function getFirstRound(divisions) {
    const [divisionLeaders, wildcard] = splitDivisionsIntoWC(divisions);
    let firstRoundSeries = []
    // assumes a 4 division league
    for (let i=0; i<2; i++) {
        let worseDivision = 1;
        if (compareTeams(divisionLeaders[i*2][0], divisionLeaders[i*2+1][0]) === 1) 
            worseDivision = 0;

        firstRoundSeries.push(new Series(divisionLeaders[i*2][0], wildcard[i][worseDivision]));
        firstRoundSeries.push(new Series(divisionLeaders[i*2][1], divisionLeaders[i*2][2]));
        firstRoundSeries.push(new Series(divisionLeaders[i*2+1][0], wildcard[i][1-worseDivision]));
        firstRoundSeries.push(new Series(divisionLeaders[i*2+1][1], divisionLeaders[i*2+1][2]));
    }
    return firstRoundSeries;
}

function getNextRound(pRound) {
    let nextRound = [];
    for (let i=0; i<pRound.length; i+=2) {
        const team1 = (pRound[i].homeWins > pRound[i].awayWins) ? pRound[i].homeTeam : pRound[i].awayTeam;
        const team2 = (pRound[i+1].homeWins > pRound[i+1].awayWins) ? pRound[i+1].homeTeam : pRound[i+1].awayTeam;
        if (compareTeams(team1, team2) === 1)
            nextRound.push(new Series(team2, team1));
        else
            nextRound.push(new Series(team1, team2));
    }
    return nextRound;
}

export default class Playoffs {
    constructor(divisions) {
        this.series = [[], [], [], []]
        // find playoff teams
        this.series[0] = getFirstRound(divisions);
        this.simDay = this.simDay.bind(this);
        this.round = 0;
        this.done = false;
    }  

    simDay() {
        // simulate one day of the playoffs
        let roundOver = true;
        const r = this.round;
        for (let i=0; i<this.series[r].length; i++) {
            if (!this.series[r][i].over) {
                this.series[r][i].simDay();
                if (!this.series[r][i].over)
                    roundOver = false;
            }
        }
        if (roundOver && r<3) {
            // set up the next round
            this.series[r+1] = getNextRound(this.series[r]);
            this.round++;
        } else if (roundOver) {
            this.done = true;
        }
    }

    simRound() {
        const curRound = this.round;
        while (this.round === curRound && !this.done)  this.simDay();
    }

    simPlayoffs() {
        while (!this.done) this.simDay();
    }
}