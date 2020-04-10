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
        this.simRound = this.simRound.bind(this)
        this.simPlayoffs = this.simPlayoffs.bind(this)
        this.newSeason = this.newSeason.bind(this)

        this.state = {
            league: league,
            season: season
        };
    }

    updateSeason(season) {
        this.setState( () => ({
            season: season
        }));
    }

    simDay() {
        let s = this.state.season;
        s.playoffs.simDay();
        this.updateSeason(s)
    }

    simRound() {
        let s = this.state.season;
        s.playoffs.simRound();
        this.updateSeason(s)
    }

    simPlayoffs() {
        let s = this.state.season;
        s.playoffs.simPlayoffs();
        this.updateSeason(s);
    }

    newSeason() {
        let s = this.state.season;
        s.newSeason();
        s.simSeason();
        this.updateSeason(s);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route 
                            path="/" 
                            exact 
                            render={(props) => <Standings {...props} divisions={this.state.season.divisions} view='wild card' />}
                        />
                        <Route 
                            path="/playoffs"
                            render={(props) => 
                                <PlayoffBracket {...props} 
                                    playoffs={this.state.season.playoffs} 
                                    simDay={this.simDay}
                                    simRound={this.simRound}
                                    simPlayoffs={this.simPlayoffs}
                                    newSeason={this.newSeason}
                                />}
                        />
                        <Route path="/scoreboard" component={Scoreboard}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}