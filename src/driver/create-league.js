import {gaussian, randInt} from '../util';
import {Skater, Goalie} from '../player';

const atlanticDivision = {
    'Toronto Maple Leafs': 'TOR',
    'Boston Bruins': 'BOS',
    'Montreal Canadians': 'MON',
    'Tampa Bay Lightning': 'TBL',
    'Florida Panthers': 'FLA',
    'Ottawa Senators': 'OTT',
    'Detroit Red Wings': 'DET',
    'Buffalo Sabres': 'Buf'
};

const metroDivision = {
    'New York Rangers': 'NYR',
    'New York Islanders': 'NYI',
    'Carolina Hurricanes': 'CAR',
    'Columbus Blue Jackets': 'CBJ',
    'New Jersey Devils': 'NJD',
    'Philadelphia Flyers': 'PHI',
    'Pittsburgh Penguins': 'PIT',
    'Washington Capitals': 'WAS'
};

const centralDivision = {
    'Arizona Coyotes': 'ARZ',
    'Chicago Blackhawks': 'CHI',
    'Colorado Avalanche': 'COL',
    'Dallas Stars': 'DAL',
    'Minnesota Wild': 'MIN',
    'Nashville Predators': 'NAS',
    'St. Louis Blues': 'STL',
    'Winnipeg Jets': 'WIN',
};

const pacificDivison = {
    'Anaheim Ducks': 'ANA',
    'Calgary Flames': 'CAL',
    'Edmonton Oilers': 'EDM',
    'Los Angeles Kings': 'LAK',
    'San Jose Sharks': 'SJS',
    'Seattle Storm': 'SEA',
    'Vancouver Canucks': 'VAN',
    'Vegas Golden Knights': 'VGK'
}

function genTeams() {
    let teams = []
    for (let [name, abbr] of Object.entries(atlanticDivision)) {
        teams.push({
            name: name,
            abbr: abbr,
            players: {
                C : new Skater('C'),
                LW : new Skater('LW'),
                RW : new Skater('RW'),
                D1 : new Skater('D'),
                D2 : new Skater('D'),
                G : new Goalie('G')
            },
            seasonWins: 0,
            seasonLosses: 0,
            seasonOTL: 0,
            seasonPoints: 0,
            seasonGF : 0,
            seasonGA : 0,
            seasonSF : 0,
            seasonSA : 0
        })
    }
    return teams;
}

function daySchedule8Teams(day) {
    return [
        [7, day%7],
        [(day+6)%7, (day+1)%7],
        [(day+5)%7, (day+2)%7],
        [(day+4)%7, (day+3)%7]
    ]
}

export default class createLeagueHelper {
    constructor() {
        this.teams = genTeams();
        this.genSchedule();
        console.log(this.teams);
    }

    getTeams() { return this.teams;}

    genSchedule() {
        console.log("generating schedule");
        this.schedule = [];
        for (let i=0; i<82; i++){
            this.schedule.push(daySchedule8Teams(i));
        }
    }


}