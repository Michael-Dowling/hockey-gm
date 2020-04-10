import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom'

import {StandingsTable} from './standings-table'
import {compareTeams} from '../util'


export default class Standings extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            view : props.view
        };
    }

    changeView(newView) {
        this.setState( () => ({
            view: newView
          }));
    }

    render() {
        
        if (this.state.view === 'league') {
            let teams = [].concat(...Object.values(this.props.divisions));
            var tables = <StandingsTable teams={teams}/>
        }
        else if (this.state.view ==='division') {
            tables = (
                <div>
                    { Object.keys(this.props.divisions).map( d => (
                        <div key={d}>
                            <h3>{d}</h3>
                            <StandingsTable teams={this.props.divisions[d]} /> 
                        </div>
                    ))}
                </div> );
        }
        else {
            // wild card view
            const divisions = Object.entries(this.props.divisions);
            let eastWCTeams = [];
            let westWCTeams = [];
            tables = [];
            for (let i=0; i<divisions.length; i++) {
                divisions[i][1].sort(compareTeams);
                if (i < divisions.length/2) {
                    eastWCTeams.push(...divisions[i][1].slice(3))
                }
                else {
                    westWCTeams.push(...divisions[i][1].slice(3))
                }
                tables.push(
                    <div key = {divisions[i][0]}>
                        <h3>{divisions[i][0]}</h3>
                        <StandingsTable teams={divisions[i][1].slice(0,3)} />
                    </div>
                )
                if (i === divisions.length/2-1) {
                    console.log(eastWCTeams)
                    tables.push(
                        <div key='EastWC' >
                            <h3>{'Eastern Conference Wild Card'}</h3>
                            <StandingsTable teams={eastWCTeams} />
                        </div>
                    )
                }
            }
            tables.push(
                <div key='WestWC' >
                    <h3>{'Wester Conference Wild Card'}</h3>
                    <StandingsTable teams={westWCTeams} />
                </div>
            )
        }

        return (
            <>
                <h1>League Standings</h1>
                <button onClick={() => this.changeView('league')}>League</button>
                <button onClick={() => this.changeView('division')}>Divisions</button>
                <button onClick={() => this.changeView('wc')}>Wild Card</button>
                <Link to="/playoffs">Playoffs</Link>
                {tables}
            </>
        );
    }
}