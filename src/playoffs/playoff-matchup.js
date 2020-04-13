import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom';


export default function PlayoffMatchup(props) {
    return (
        <Table bordered size="sm">
            <tbody>
                <tr>
                    <td><b><Link to={{
                        pathname: '/team',
                        state: {
                            teamName: props.series.homeTeam.name
                        }}}>{props.series.homeTeam.name}</Link></b></td>
                    <td>{props.series.homeWins}</td>
                </tr>
                <tr>
                    <td><b><Link to={{
                        pathname: '/team',
                        state: {
                            teamName: props.series.awayTeam.name
                        }}}>{props.series.awayTeam.name}</Link></b></td>
                    <td>{props.series.awayWins}</td>
                </tr>
            </tbody>
        </Table>
    )
}