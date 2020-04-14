import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom'

export default function NavBar (props) {
    return (
        <div>
            <Link to="/"><button>Standings</button></Link>
            <Link to={{
                pathname: '/team',
                state: {
                    teamName: props.playerTeam
                }
            }}><button>Roster</button></Link>
            
            { props.playoffs ? (
                <>
                    <Link to="/playoffs"><button>Playoffs</button></Link>
                    <button onClick={props.simDay}>Simulate Day</button>
                    <button onClick={props.simRound}>Simulate Round</button>
                    <button onClick={props.simPlayoffs}>Simulate Playoffs</button>
                </>
            ) : (
                <>
                    <button onClick={props.simDay}>Simulate Day</button>
                    <button onClick={props.simWeek}>Simulate Week</button>
                    <button onClick={props.simMonth}>Simulate Month</button>
                    <button onClick={props.simToPlayoffs}>Simulate Until Playoffs</button>
                </>
            )}
        </div>

    );
}