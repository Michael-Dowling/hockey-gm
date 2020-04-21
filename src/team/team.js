import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapTable from 'react-bootstrap-table-next';


function PlayerStats(props) {
    return (
        <BootstrapTable 
            keyField="age"
            data = { props.players }
            columns = {props.columns }
            striped
            condensed
            size="sm"
        />
    )
}


export default function Team(props) {
    
    for (let i=0; i<props.season.teams.length; i++) {
        if (props.season.teams[i].name === props.location.state.teamName)
            var team = props.season.teams[i];
    }

    const skater_columns = [{
        dataField: 'position',
        text: 'Position',
        sort: true
    }, {
        dataField: 'roundedAge',
        text: 'Age',
        sort: true
    }, {
        dataField: 'name',
        text: 'Player'
    }, {
        dataField: 'seasonGoals',
        text: 'G',
        sort: true
    }, {
        dataField: 'seasonAssists',
        text: 'A',
        sort: true
    }, {
        dataField: 'seasonPoints',
        text: 'Pts',
        sort: true
    }, {
        dataField: 'roundedOverall',
        text: 'Overall',
        sort: true
    }]

    const goalie_columns = [{
        dataField: 'position',
        text: 'Position'
    }, {
        dataField: 'roundedAge',
        text: 'Age'
    }, {
        dataField: 'name',
        text: 'Player',
        sort: true
    }, {
        dataField: 'roundedOverall',
        text: 'Overall',
        sort: true
    }]

    let skaters = {...team.players};
    delete skaters.G;

    let goalies = team.players.G;

    return (
        <div>
            <h1>{team.name}</h1>
            <h3>{team.seasonWins}-{team.seasonLosses}-{team.seasonOTL}</h3>
            <PlayerStats players={Object.values(skaters)} columns={skater_columns} />
            <PlayerStats players={[goalies]} columns={goalie_columns} />
        </div>
    )
    
}