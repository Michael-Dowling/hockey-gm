import {gaussian} from '../util'

const offensiveCategories = [
    'Offensive Intelligence',
    'Passing',
    'Stick Handling',
    'Wrist Shot Power',
    'Wrist Shot Accuracy',
    'Slap Shot Power',
    'Slap Shot Accuracy'
]

const defensiveCategories = [
    'Defensive Intelligence',
    'Poke Checking',
    'Shot Blocking',
    'Body Checking',
    'Penalty Killing',
    'Faceoffs',
    'Positioning'
]

const athleticCategories = [
    'Skating',
    'Agility',
    'Strength',
    'Hand Eye',
    'Balance'
]

export default class Skater {
    constructor(position) {
        this.position = position;
        this.offensiveRatings = []
        this.defensiveRatings = []
        this.athleticRatings = []
        this.createPlayer(position)
        this.overall = this.calculateOverall()
    }

    createPlayer(position) {
        let playerModifier = gaussian(60,5); // used as the mean in calculating the player's ratings
        this.playerModifier = playerModifier;
        if (position === 'D') {
            var defenseModifier = playerModifier + 4;
            var offenseModifier = playerModifier - 4;
            var faceoffModifier = playerModifier - 10;
        } else {
            if (position === 'C') {
                faceoffModifier = playerModifier + 4;
            }
            else {
                faceoffModifier = playerModifier - 2;
            }
            defenseModifier = playerModifier - 4;
            offenseModifier = playerModifier + 4;
        }

        // set offensive categories
        for (let i = 0; i<offensiveCategories.length; i++) {
            this.offensiveRatings.push(gaussian(offenseModifier,5))
        }
        // set defensive categories
        for (let i = 0; i<defensiveCategories.length; i++) {
            if (defensiveCategories[i] === 'Faceoffs') 
                this.defensiveRatings.push(gaussian(faceoffModifier, 5))
            else
                this.defensiveRatings.push(gaussian(defenseModifier, 5))
        }
        // set athletic categories
        for (let i=0; i<offensiveCategories; i++) {
            this.athleticRatings.push(gaussian(playerModifier, 5))
        }
    }

    calculateOverall() {
        if (this.position === 'D') {
            var dCatsWeight = 1.1;
            var oCatsWeight = 0.9;
        } else {
            dCatsWeight = 0.9;
            oCatsWeight = 1.1;
        }
        let weightedTotal = 0;
        let weightsTotal = 0;
        for (let i = 0; i<offensiveCategories.length; i++) {
            weightedTotal += this.offensiveRatings[i] * oCatsWeight;
            weightsTotal += oCatsWeight;
        }
        for (let i=0; i<defensiveCategories.length; i++) {
            weightedTotal += this.defensiveRatings[i] * dCatsWeight;
            weightsTotal += dCatsWeight;
        }
        for (let i = 0; i< athleticCategories.legnth; i++) {
            weightedTotal += this.athleticRatings[i];
            weightsTotal++;
        }
        return weightedTotal/weightsTotal;
    }
}