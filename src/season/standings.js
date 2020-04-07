import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import StandingsTable from './standings-table'


export default class Standings extends React.Component{
    render() {
        if (this.props.view === 'league') {
            return(
                <StandingsTable teams={this.props.teams}/>
            )
        }
        return(
            <>
            <h1>Leauge Standings</h1>
            <div>
                { Object.keys(this.props.divisions).map( d => (
                    <StandingsTable key={d} teams={this.props.divisions[d]} /> 
                ))}
            </div>
            </>
            
        )
    }
}