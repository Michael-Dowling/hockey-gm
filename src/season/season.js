import {Game} from '../game_simulation';
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
    constructor(divisions, schedule) {
        this.games = [];
        this.divisions = divisions;
        this.teams = [];
        for (const division in divisions) {
            this.teams.push(...divisions[division]);
        }
        this.schedule = this.genSchedule();
        this.seasonLength = this.schedule.length;
    }

    simSeason() {
        for (let i=0; i<this.seasonLength; i++) {
            this.simDay(i);
            this.dayOfSeason = i;
        }

        console.log("season over");
        console.log(this.teams);
        console.log("generating playoff seeds");
        this.playoffs = new Playoffs(this.divisions);
    }

    simDay(dayOfSeason) {
        let games = this.schedule[dayOfSeason]
        for (let i=0; i<games.length; i++) {
            let home = this.teams[games[i][0]]
            let away = this.teams[games[i][1]]
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
    }

    simGame(home, away){
        let game = new Game(home, away);
        game.simulateGame()

        this.games.push(game);

        return game

    }

    genSchedule() {
        let schedule = [];
        
        for (let i=0; i<82; i++) {
            let offset = 0;
            schedule[i] = []
            for (let j=0; j<4; j++) { 
                schedule[i].push(...daySchedule8Teams(i, offset));
                offset += 8;
            }  
        }
        return schedule;
    }
}