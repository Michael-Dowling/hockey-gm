import {Game} from '../game-simulation';
import {Playoffs} from '../playoffs'

function daySchedule8Teams(day, offset) {
    if (day % 2 === 0) {
        return [
            [7 + offset        ,  day%7 + offset   ],
            [(day+6)%7 + offset, (day+1)%7 + offset],
            [(day+5)%7 + offset, (day+2)%7 + offset],
            [(day+4)%7 + offset, (day+3)%7 + offset]
        ]
    } 
    return [
        [day%7 + offset    ,  7 + offset       ],
        [(day+6)%7 + offset, (day+1)%7 + offset],
        [(day+5)%7 + offset, (day+2)%7 + offset],
        [(day+4)%7 + offset, (day+3)%7 + offset]
    ]
}


export default class Season {
    constructor(divisions) {
        this.games = [];
        this.divisions = divisions;
        this.teams = [];
        for (const division in divisions) {
            this.teams.push(...divisions[division]);
        }
        this.schedule = this.genSchedule();
        this.seasonLength = this.schedule.length;
        this.dayOfSeason = 0;
        this.playoffsStarted = false;

        this.newSeason = this.newSeason.bind(this);
    }

    simSeason() {
        while (this.dayOfSeason < this.seasonLength) {
            this.simDay();
        }
    }

    startPlayoffs() {
        this.playoffs = new Playoffs(this.divisions);
        this.playoffsStarted = true;
    }

    simDay() {
        let games = this.schedule[this.dayOfSeason]
        for (let i=0; i<games.length; i++) {
            let home = this.teams[games[i][0]];
            let away = this.teams[games[i][1]];
            let game = this.simGame(home, away)
            if (game.homeScore > game.awayScore) {
                home.seasonWins++;
                home.seasonPoints += 2;
                if (game.period > 3){
                    away.seasonOTL++;
                    away.seasonPoints++;
                    home.seasonROW++;
                }
                else {
                    away.seasonLosses++
                    home.seasonRW++;
                    home.seasonROW++;
                }
            } else {
                away.seasonWins++;
                away.seasonPoints += 2;
                if (game.period > 3){
                    home.seasonOTL++;
                    home.seasonPoints++;
                    away.seasonROW++;
                }
                else {
                    home.seasonLosses++
                    away.seasonRW++;
                    away.seasonROW++;
                }
            }
            home.seasonGF += game.homeScore;
            home.seasonGA += game.awayScore;
            home.seasonSF += game.homeShots;
            home.seasonSA += game.awayShots;
            home.seasonGP++;
            away.seasonGF += game.awayScore;
            away.seasonGA += game.homeScore;
            away.seasonSF += game.awayShots;
            away.seasonSA += game.homeShots;
            away.seasonGP++;
        }
        this.dayOfSeason++;
        if (this.dayOfSeason === this.seasonLength) {
            this.startPlayoffs();
        }
    }

    simGame(home, away){
        let game = new Game(home, away);
        game.simulateGame()

        this.games.push(game);

        return game;

    }

    genSchedule() {
        let schedule = [];
        
        for (let i=0; i<82; i++) {
            let offset = 0;
            schedule[i] = [];
            for (let j=0; j<4; j++) { 
                schedule[i].push(...daySchedule8Teams(i, offset));
                offset += 8;
            }  
        }
        return schedule;
    }

    newSeason() {
        // calculate player progressions and reset stats for every team
        for (let i=0; i<this.teams.length; i++) {
            const team = this.teams[i];
            team.seasonWins = 0;
            team.seasonLosses = 0;
            team.seasonOTL = 0;
            team.seasonPoints = 0;
            team.seasonGF = 0;
            team.seasonGA = 0;
            team.seasonSF = 0;
            team.seasonSA = 0;
            team.seasonGP = 0;
            team.seasonRW = 0;
            team.seasonROW = 0;
            for (const position in team.players) {
                // player progression
                team.players[position].progression();
            }
        }
        this.dayOfSeason = 0;
        this.playoffsStarted = false;
    }
}