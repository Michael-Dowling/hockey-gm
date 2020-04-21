import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Scoreboard} from '../game-simulation';
import {Season, Standings} from '../season';
import {PlayoffBracket} from '../playoffs';
import { Team } from '../team';
import { NavBar } from '../navigation';
import { Trades } from '../trades'

import createLeagueHelper from './create-league';


export default class Driver extends React.Component {
    constructor(){
        super();
        var league = new createLeagueHelper();
        var season = new Season(league.teams, league.schedule);
        this.playerTeam = season.teams[0].name;
        
        this.simDay = this.simDay.bind(this);
        this.simWeek = this.simWeek.bind(this);
        this.simRound = this.simRound.bind(this);
        this.simMonth = this.simMonth.bind(this);
        this.simSeason = this.simSeason.bind(this);
        this.simPlayoffs = this.simPlayoffs.bind(this);
        this.newSeason = this.newSeason.bind(this);

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
        if (s.playoffsStarted) {
            s.playoffs.simDay();
            if (s.playoffs.done)
                s.newSeason();
        }
        else {
            s.simDay()
        }
        this.updateSeason(s)
    }

    simWeek() {
        let s = this.state.season;
        let i=0;
        while (i<7 && !s.playoffsStarted) {
            s.simDay();
            i++
        }
        this.updateSeason(s);
    }

    simMonth() {
        let s = this.state.season;
        let i=0;
        while (i<30 && !s.playoffsStarted) {
            s.simDay();
            i++
        }
        this.updateSeason(s);
    }

    simSeason() {
        let s = this.state.season;
        s.simSeason();
        this.updateSeason(s);
    }

    simRound() {
        let s = this.state.season;
        s.playoffs.simRound();
        if (s.playoffs.done)
            s.newSeason();
        this.updateSeason(s);
    }

    simPlayoffs() {
        let s = this.state.season;
        s.playoffs.simPlayoffs();
        s.newSeason();
        this.updateSeason(s);
    }

    newSeason() {
        let s = this.state.season;
        s.newSeason();
        this.updateSeason(s);
    }

    render() {
        return (  
            <BrowserRouter>
            <NavBar 
                playerTeam={this.playerTeam} 
                simDay={this.simDay}
                simWeek={this.simWeek}
                simMonth={this.simMonth}
                simToPlayoffs={this.simSeason}
                playoffs={this.state.season.playoffsStarted}
                simRound={this.simRound}
                simPlayoffs={this.simPlayoffs}
            />
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
                        <Route path="/team"
                            render={(props) => 
                                <Team {...props}
                                    season={this.state.season}
                                />}
                        />
                        <Route path="/trades"
                            render={(props) =>
                                <Trades {...props}
                                    teamName={this.playerTeam}
                                    season={this.state.season}
                                />
                            }
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}