import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table'

    class Boxscore extends React.Component{
        render() {
            return(
                <Table bordered size="sm">
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>P1</th>
                            <th>P2</th>
                            <th>P3</th>
                            {this.props.game.period > 3 &&
                                <th>OT</th>
                            }
                            <th>Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.game.home.abbr}</td>
                            <td>{this.props.game.homeGperP[0]}</td>
                            <td>{this.props.game.homeGperP[1]}</td>
                            <td>{this.props.game.homeGperP[2]}</td>
                            {this.props.game.period > 3 &&
                                <td>{this.props.game.homeGperP[3]}</td>
                            }
                            <td>{this.props.game.homeScore}</td>
                        </tr>
                        <tr>
                            <td>{this.props.game.away.abbr}</td>
                            <td>{this.props.game.awayGperP[0]}</td>
                            <td>{this.props.game.awayGperP[1]}</td>
                            <td>{this.props.game.awayGperP[2]}</td>
                            {this.props.game.period > 3 &&
                                <td>{this.props.game.awayGperP[3]}</td>
                            }
                            <td>{this.props.game.awayScore}</td>
                        </tr>
                    </tbody>
                </Table>
            );
        }
    }


    export default class Scoreboard extends React.Component{
        constructor(props) {
            super(props);
            this.game = this.props.game;
        }

        render(){
            return (
                <div>
                    <h1>{this.game.home.name} vs. {this.game.away.name}</h1>
                    <Boxscore game={this.game} />
                </div>
            );
        }
    }
