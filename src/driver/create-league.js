import {Skater, Goalie} from '../player';

const divisions = [
    {
        name: 'Atlantic',
        teams: {
            'Toronto Maple Leafs': 'TOR',
            'Boston Bruins': 'BOS',
            'Montreal Canadians': 'MON',
            'Tampa Bay Lightning': 'TBL',
            'Florida Panthers': 'FLA',
            'Ottawa Senators': 'OTT',
            'Detroit Red Wings': 'DET',
            'Buffalo Sabres': 'Buf'
        }
    },

    {
        name: 'Metropolitan',
        teams: {
            'New York Rangers': 'NYR',
            'New York Islanders': 'NYI',
            'Carolina Hurricanes': 'CAR',
            'Columbus Blue Jackets': 'CBJ',
            'New Jersey Devils': 'NJD',
            'Philadelphia Flyers': 'PHI',
            'Pittsburgh Penguins': 'PIT',
            'Washington Capitals': 'WAS'
        }
    },

    {
        name: 'Central',
        teams: {
            'Arizona Coyotes': 'ARZ',
            'Chicago Blackhawks': 'CHI',
            'Colorado Avalanche': 'COL',
            'Dallas Stars': 'DAL',
            'Minnesota Wild': 'MIN',
            'Nashville Predators': 'NAS',
            'St. Louis Blues': 'STL',
            'Winnipeg Jets': 'WIN',
        }
    },
    {
        name: 'Pacific',
        teams: {
            'Anaheim Ducks': 'ANA',
            'Calgary Flames': 'CAL',
            'Edmonton Oilers': 'EDM',
            'Los Angeles Kings': 'LAK',
            'San Jose Sharks': 'SJS',
            'Seattle Storm': 'SEA',
            'Vancouver Canucks': 'VAN',
            'Vegas Golden Knights': 'VGK'
        }
    }
]

function genTeams() {
    let teams = {}
    for (let i=0; i<divisions.length; i++) {
        let division = divisions[i]
        teams[division.name] = []
        for (let [name, abbr] of Object.entries(division.teams)) {
            teams[division.name].push({
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
                seasonSA : 0,
                seasonGP : 0,
                seasonRW : 0,
                seasonROW : 0
            })
        }
    }
    return teams;
}


export default class createLeagueHelper {
    constructor() {
        this.teams = genTeams();
    }

    getTeams() { return this.teams;}

}