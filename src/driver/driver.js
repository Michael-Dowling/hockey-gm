import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Scoreboard} from '../game_simulation';
import {Season, Standings} from '../season';
import {PlayoffBracket} from '../playoffs';
import createLeagueHelper from './create-league';


export default class Driver extends React.Component {
    constructor(){
        super();
        var league = new createLeagueHelper();
        var season = new Season(league.teams, league.schedule);

        season.simSeason();
        console.log(season.divisions);
        console.log(season.teams)
        this.simDay = this.simDay.bind(this)

        this.state = {
            league: league,
            season: season
        };
        //ReactDOM.render(<Standings view='league' teams={season.teams}/>, document.getElementById('root'));
        //ReactDOM.render(<Standings view='division' divisions={season.divisions}/>, document.getElementById('root'));
        //ReactDOM.render(<Scoreboard game={season.games[81]}/>, document.getElementById('root'));
        // createLeagueDB(1);
    }

    simDay() {
        let s = this.state.season;
        s.playoffs.simDay();
        this.setState( () => ({
            season: s
        }));
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route 
                            path="/" 
                            exact 
                            render={(props) => <Standings {...props} divisions={this.state.season.divisions} view='division' />}
                        />
                        <Route 
                            path="/playoffs"
                            render={(props) => <PlayoffBracket {...props} playoffs={this.state.season.playoffs} simDay={this.simDay} />}
                        />
                        <Route path="/scoreboard" component={Scoreboard}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}