import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PlayoffMatchup from './playoff-matchup'

export default class PlayoffBracket extends React.Component {

    render() {
        return (
            <div>
                <h1>Playoffs</h1>
                { this.props.playoffs.series[0].map( (s, ind) => (
                    <PlayoffMatchup series={s} key={ind}/>
                ))}
                { this.props.playoffs.series[1].map( (s, ind) => (
                    <PlayoffMatchup series={s} key={ind+8}/>
                ))}
                { this.props.playoffs.series[2].map( (s, ind) => (
                    <PlayoffMatchup series={s} key={ind+12}/>
                ))}
                { this.props.playoffs.series[3].map( (s, ind) => (
                    <PlayoffMatchup series={s} key={ind+14}/>
                ))}
                <button onClick={this.props.simDay}>Advance Day</button>
            </div>
        );
    }
}