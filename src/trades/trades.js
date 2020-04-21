import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';

import {evalutateTrade} from './handleTrades';

function TradeSelector(props) {   
    const columns = [{
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
        dataField: 'roundedOverall',
        text: 'Overall',
        sort: true
    }]

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        onSelect: props.handleSelect
    };

    return(
        <BootstrapTable
            keyField = 'age'
            data = {Object.values(props.players)}
            columns={columns}
            selectRow={selectRow}
            striped
            condensed
        />
    )
}


export default class Trades extends React.Component {
    constructor(props) {
        super(props);
        this.tradingPartners = [];
        for (let i=0; i<props.season.teams.length; i++) {
            if (props.season.teams[i].name === props.teamName){
                var team = props.season.teams[i];
            } else {
                this.tradingPartners.push({
                    'value': props.season.teams[i],
                    'label': props.season.teams[i].name
                })
            }
        }

        this.handleProposeTrade = this.handleProposeTrade.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.state = {
            selected1: [],
            selected2: [],
            team1: team,
            validTrade: false,
            showModal: false
        }
    }

    handleTradeAssetSelect1 = (row, isSelect) => {
        this.updateSelectedAssets("selected1", row, isSelect);
    }

    handleTradeAssetSelect2 = (row, isSelect) => {
        this.updateSelectedAssets("selected2", row, isSelect);
    }

    updateSelectedAssets(selected, asset, isSelect) {
        if (isSelect) {
            this.setState(() => ({
                [selected]: [...this.state[selected], asset]
            }));
        } else {
            this.setState(() => ({
                [selected]: this.state[selected].filter( x => x !== asset)
            }));
        }
    }

    validTrade() {
        if (typeof this.state.team2 !== "undefined" && this.state.selected1.length>0 && this.state.selected2.length>0)
            return true;
        return false;
    }

    handleTradingPartnerSelect = selectedTeam => {
        this.setState({
            team2: selectedTeam.value
        });
    }

    handleProposeTrade() {
        if (evalutateTrade(this.state.team1, this.state.selected1, this.state.team2, this.state.selected2)){
            const team1 = this.state.team1;
            const team2 = this.state.team2;
            console.log(team1);

            for (let i=0; i<this.state.selected1.length; i++) {
                team2.players[this.state.selected1[i].position] = this.state.selected1[i]
            }
            for (let i=0; i<this.state.selected2.length; i++) {
                team1.players[this.state.selected2[i].position] = this.state.selected2[i]
            }

            this.setState({
                headerMessage: "Trade Succesful!",
                message: "It was a pleasure trading with you.",
                showModal: true,
                team1: team1,
                team2: team2,
                selected1: [],
                selected2: []
            })

        } else {
            this.setState({
                headerMessage: "Trade Rejected",
                message: "You're going to have to do better than that.",
                showModal: true
            })
        }
    }

    handleCloseModal() {
        this.setState({
            message: "",
            messageHeader: "",
            showModal: false
        })

    }

    render() {
        return(
            <div>
                <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                    <Modal.Header><Modal.Title>{this.state.headerMessage}</Modal.Title></Modal.Header>
                    <Modal.Body>{this.state.message}</Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.handleCloseModal}>Close</button>
                    </Modal.Footer>
                </Modal>
                <h3>Select players from your team to trade</h3>
                <TradeSelector 
                    players={this.state.team1.players}
                    handleSelect={this.handleTradeAssetSelect1}
                    selected={this.state.selected1}
                />
                <p>Select a team to trade with</p>
                <Select 
                    options={this.tradingPartners}
                    onChange={this.handleTradingPartnerSelect}
                />
                {typeof this.state.team2 !== 'undefined' ? 
                    <TradeSelector
                        players={this.state.team2.players}
                        handleSelect={this.handleTradeAssetSelect2}
                        selected={this.state.selected2}
                    /> : null
                }
                {this.validTrade() ? 
                    <button onClick={this.handleProposeTrade}>Propose Trade</button> :
                    <button disabled>Propose Trade</button>
                }
            </div>
        )
    }

}