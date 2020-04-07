import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';

function compare(team1, team2) {
    if (team1.seasonPoints < team2.seasonPoints)
        return 1;
    else if (team1.seasonPoints === team2.seasonPoints)
        return 0;
    return -1;
}

class StandingsTable extends React.Component {
    render() {
        return(
            <Table bordered size="sm">
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>SF</th>
                        <th>SA</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>+/-</th>
                        <th>S%</th>
                        <th>SV%</th>
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
                            <td>{t.seasonSF}</td>
                            <td>{t.seasonSA}</td>
                            <td>{t.seasonGF}</td>
                            <td>{t.seasonGA}</td>
                            <td>{t.seasonGF-t.seasonGA}</td>
                            <td>{(t.seasonGF/t.seasonSF*100).toFixed(1)}</td>
                            <td>{((1-t.seasonGA/t.seasonSA)*100).toFixed(1)}</td>
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

export {StandingsTable, compare};