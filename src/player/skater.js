import {gaussian} from '../util';

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
    'Stick Checking',
    'Faceoffs',
    'Positioning'
]

const athleticCategories = [
    'Skating',
    'Agility',
    'Strength',
    'Acceleration',
    'Balance'
]

export default class Skater {
    constructor(position) {
        this.position = position;
        this.offensiveRatings = [];
        this.defensiveRatings = [];
        this.athleticRatings = [];
        this.createPlayer(position);
        this.age = Math.max(18,gaussian(28,5));
        this.calculateOveralls();
        this.seasonShots = 0;
        this.seasonGoals = 0;
        this.seasonAssists = 0;

        this.calculateOveralls = this.calculateOveralls.bind(this);
        this.progression = this.progression.bind(this);
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
        for (let i=0; i<athleticCategories.length; i++) {
            this.athleticRatings.push(gaussian(playerModifier, 5))
        }
    }

    calculateOveralls() {
        this.prevOverall = this.overall;
        let oTotal = this.offensiveRatings.reduce((a,b) => a+b,0);
        let dTotal = this.defensiveRatings.reduce((a,b) => a+b,0);
        let aTotal = this.athleticRatings.reduce((a,b) => a+b,0);
        
        this.playDrivingOffense = (oTotal*1.5+aTotal)/(this.offensiveRatings.length*1.5+this.athleticRatings.length);
        this.playDrivingDefense = (dTotal*1.5+aTotal)/(this.defensiveRatings.length*1.5+this.athleticRatings.length);
        this.shotQualityOffense = (oTotal*1.5+aTotal)/(this.offensiveRatings.length*1.5+this.athleticRatings.length);
        this.shotQualityDefense = (dTotal*1.5+aTotal)/(this.defensiveRatings.length*1.5+this.athleticRatings.length);
        this.overall =  (this.playDrivingOffense + this.playDrivingDefense +
                    this.shotQualityOffense + this.shotQualityDefense) / 4;
    }

    /** handle how much the player will improve/regress from one year to the next */
    progression() {
        const modifier = gaussian((28-this.age)/2, 1-(30-this.age)/15);

        // set new offensive categories
        for (var i = 0; i<offensiveCategories.length; i++) {
            this.offensiveRatings[i] = this.offensiveRatings[i]+gaussian(modifier,5)
        }
        // set new defensive categories
        for (i = 0; i<defensiveCategories.length; i++) {
            this.defensiveRatings[i] = this.defensiveRatings[i]+gaussian(modifier,5)
        }
        // set new athletic categories
        for (i=0; i<athleticCategories.length; i++) {
            this.athleticRatings[i] = this.athleticRatings[i]+gaussian(modifier,5)
        }

        this.calculateOveralls();
    }

}