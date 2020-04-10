import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';


export default function PlayoffMatchup(props) {
    return (
        <Table bordered size="sm">
            <tbody>
                <tr>
                    <td><b>{props.series.homeTeam.name}</b></td>
                    <td>{props.series.homeWins}</td>
                </tr>
                <tr>
                    <td><b>{props.series.awayTeam.name}</b></td>
                    <td>{props.series.awayWins}</td>
                </tr>
            </tbody>
        </Table>
    )
}