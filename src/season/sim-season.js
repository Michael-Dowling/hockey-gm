import Game from '../game_simulation/game';


export default class Season {
    constructor(teams, schedule) {
        this.games = [];
        this.teams = teams;
        this.schedule = schedule;
        this.seasonLength = schedule.length;
    }

    simSeason() {
        let dayOfSeason = 0
        for (let i=0; i<this.seasonLength; i++) {
            this.simDay(i);
        }
        // while(this.daysLeft > 0){
        //     let result = this.simGame(this.home, this.away);
        //     result ? this.homeWins++ : this.awayWins++;
        //     this.daysLeft--;
        //     console.log("Leafs record: " + this.homeWins + "-" + this.awayWins);
        // }
        console.log("season over");
        console.log(this.teams)
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
                }
                else {
                    away.seasonLosses++
                }
            } else {
                away.seasonWins++;
                away.seasonPoints += 2;
                if (game.period > 3){
                    home.seasonOTL++;
                    home.seasonPoints++;
                }
                else {
                    home.seasonLosses++
                }
            }
        }
    }

    simGame(home, away){
        let game = new Game(home, away);
        game.simulateGame()

        this.games.push(game);

        return game

    }
}