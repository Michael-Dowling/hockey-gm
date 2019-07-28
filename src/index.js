import ReactDOM from 'react-dom';
import React from 'react';
import {Scoreboard} from './game_simulation';
import {Season} from './season';


var home = {
    name: "Toronto Maple Leafs",
    abbr: "TOR",
    GoalieSVP: 0.917,
    offense: 80,
    defense: 55,
};

var away = {
    name: "Boston Bruins",
    abbr: "BOS",
    GoalieSVP: 0.912,
    offense: 65,
    defense: 70,
};

var season = new Season(home,away);

season.simSeason();

ReactDOM.render(<Scoreboard game={season.games[81]}/>, document.getElementById('root'));
