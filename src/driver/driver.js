import ReactDOM from 'react-dom';
import React from 'react';
import {Scoreboard} from '../game_simulation';
import {Season, Standings} from '../season';
import createLeagueHelper from './create-league';

export default class Driver {
    static run(){

        var league = new createLeagueHelper();

        var season = new Season(league.teams, league.schedule);

        season.simSeason();
        ReactDOM.render(<Standings teams={season.teams}/>, document.getElementById('root'));

        //ReactDOM.render(<Scoreboard game={season.games[81]}/>, document.getElementById('root'));

        // createLeagueDB(1);
    }
}