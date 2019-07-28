import Game from '../game_simulation/game_sim';


export default class Season {
    constructor(home, away){
        this.games = [];
        this.gamesLeft = 82;
        this.homeWins = 0;
        this.awayWins = 0;
        this.home = home;
        this.away = away;
    }

    simSeason() {
        while(this.gamesLeft > 0){
            let result = this.simGame(this.home, this.away);
            result ? this.homeWins++ : this.awayWins++;
            this.gamesLeft--;
            console.log("Leafs record: " + this.homeWins + "-" + this.awayWins);
        }
        console.log("season over");
    }

    simGame(){
        let game = new Game(this.home, this.away);
        while(!game.gameDone){
            game.nextEvent();
        }

        console.log(game.gameOver());
        this.games = this.games.concat(game);

        return game.homeScore > game.awayScore;

    }
}