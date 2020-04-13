import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom'

import {compareTeams} from '../util';

class StandingsTable extends React.Component {
    render() {
        return(
            <Table bordered size="sm" striped>
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
                        <th>GP</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>OTL</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.teams.sort(compareTeams).map((t) => (
                        <tr key={t.abbr}>
                            <td><Link to={{
                                pathname: '/team',
                                state: {
                                    teamName: t.name
                                }
                            }}>{t.name}</Link></td>
                            <td>{t.seasonSF}</td>
                            <td>{t.seasonSA}</td>
                            <td>{t.seasonGF}</td>
                            <td>{t.seasonGA}</td>
                            <td>{t.seasonGF-t.seasonGA}</td>
                            <td>{(t.seasonGF/t.seasonSF*100).toFixed(1)}</td>
                            <td>{((1-t.seasonGA/t.seasonSA)*100).toFixed(1)}</td>
                            <td>{t.seasonGP}</td>
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

export {StandingsTable};