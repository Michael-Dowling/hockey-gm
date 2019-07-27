import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table'
import Game from './game_sim';



    class Boxscore extends React.Component{
        render(){

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
                            <td>{this.props.game.homeAbbr}</td>
                            <td>{this.props.game.homeGperP[0]}</td>
                            <td>{this.props.game.homeGperP[1]}</td>
                            <td>{this.props.game.homeGperP[2]}</td>
                            {this.props.game.period > 3 &&
                                <td>{this.props.game.homeGperP[3]}</td>
                            }
                            <td>{this.props.game.homeScore}</td>
                        </tr>
                        <tr>
                            <td>{this.props.game.awayAbbr}</td>
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
        
        render(){
            var game = new Game();
            while(!game.gameDone){
                console.log(game.nextEvent());
            }
            console.log(game.gameOver());

            console.log(game.homeShots);
            console.log(game.awayShots);
            return (
                <div>
                    <h1>Leafs vs. Bruins</h1>
                    <Boxscore game={game} />
                </div>
            );
        }
    }
