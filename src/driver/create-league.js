import {gaussian, randInt} from '../util';

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
            GoalieSVP: gaussian(0.910, 0.008),
            offense: gaussian(60, 7.5),
            defense: gaussian(60, 7.5),
            seasonWins: 0,
            seasonLosses: 0,
            seasonOTL: 0,
            seasonPoints: 0
        })
    }
    return teams;
}

/** generate round robin schedule with n teams where 
 * each team plays every other team k times.
 */
// function round_robin(n, k) {
//     var rounds = [];
//     for (let i=0; i<k*n+n%2; i++) {

//         round = []
//         if (k%2 === 0){
//             for (let j=0; j<n; j++) {

//             }
//         } else {
//             for (let j=0; j<n; j++) {
                
//             }
//         }

//         rounds = rounds.push(round);
//     }
// }

/** create default schedule for 32 team, 4 division league */
// function deafultSchedule() {
//     days = [];
     
    
//     for (let i=0; i<8; i++){
//         //each team plays every other team in its division 4 times, twice at home and twice away
//         //re-evaluate - teams play theselves. Not good.
//         for (let k=0; k<2; k++){
//             let day1 = []
//             let day2 = []
//             for (let div = 0; div<4; div++){
//                 day1.push([div*8+7, div*8+i], [div*8+(6-i+7)%7, div*8+(i+1)%7], [div*8+(5-i+7)%7, div*8+((i+2)%7)], 
//                     [div*8+((4-i+7)%7), div*8+((i+3)%7)])
//                 day2.push([div*8+i, div*8+7], [div*8+(i+1)%7, div*8+(6-i+7)%7], [div*8+(i+2)%7, 
//                     div*8+(5-i+7)%7], [div*8+(i+3)%7, div*8+(4-i+7)%7]);
//             }
//             days.push(day1);
//             days.push(day2);
//         }
//     }

//     //each team plays other non-divisional teams in conference three times, except for two teams
//     for (let i=0; i<8; i++){
//         let day1 = []
//         let day2 = []
//         let day3 = []
//         for (let c=0; c<2; c++){
//             day1.push([i+c*16, 8+c*16], [(i+1)%8+c*16, 9+c*16], [(i+2)%8+c*16, 10+c*16], [(i+3)%8+c*16, 11+c*16],
//                 [(i+4)%8+c*16, 12+c*16], [(i+5)%8+c*16, 13+c*16], [(i+6)%8+c*16, 14+c*16], [(i+7)%8+c*16, 15+c*16]);
//             day2.push([8+c*16, i+c*16], [9+c*16, (i+1)%8+c*16], [10+c*16, (i+2)%8+c*16], [11+c*16, (i+3)%8+c*16],
//             [12+c*16, (i+4)%8+c*16], [(i+5)%8+c*16, 13+c*16], [(i+6)%8+c*16, 14+c*16], [(i+7)%8+c*16, 15+c*16]);
//         }
//     }

// }

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
        for (let i=0; i<84; i++){
            this.schedule.push(daySchedule8Teams(i));
        }
    }


}