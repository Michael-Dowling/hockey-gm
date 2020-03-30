import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table'

function compare(team1, team2) {
    if (team1.seasonPoints < team2.seasonPoints)
        return 1;
    else if (team1.seasonPoints === team2.seasonPoints)
        return 0;
    return -1;
}


export default class Standings extends React.Component{
    render() {
        return(
            <Table bordered size="sm">
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>OTL</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.teams.sort(compare).map((t) => (
                        <tr key={t.abbr}>
                            <td>{t.name}</td>
                            <td>{t.seasonWins}</td>
                            <td>{t.seasonLosses}</td>
                            <td>{t.seasonOTL}</td>
                            <td>{t.seasonPoints}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
                    
        )
    }
}