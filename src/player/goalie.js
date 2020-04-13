import { gaussian } from '../util'

const goalieCategories = [
    'Positioning',
    'Agility',
    'Reaction Time',
    'Rebound Control',
    'Puck Handling',
    'Breakaways',
    'Quickness'
]

export default class Goalie {
    constructor() {
        this.position = "G";
        this.name = "Freddie Andersen"
        this.ratings = []
        this.age = gaussian(29, 5);
        this.roundedAge = Math.round(this.age);
        this.createPlayer()
        this.roundedOverall = Math.round(this.overall);
    }

    createPlayer() {
        let playerModifier = gaussian(60, 5);
        this.playerModifier = playerModifier;
        let ratingsSum = 0;
        // set goalie categories
        for (let i = 0; i < goalieCategories.length; i++) {
            let rating = gaussian(playerModifier, 5)
            this.ratings.push(rating)
            ratingsSum += rating
        }

        this.overall = ratingsSum/goalieCategories.length;
    }

    progression() {
        const modifier = gaussian((28-this.age)/2, Math.abs(30-this.age)/10);
        let ratingsSum = 0;
        for(let i=0; i<goalieCategories.length; i++) {
            this.ratings[i] += gaussian(modifier, 5)
            ratingsSum += this.ratings[i];
        }
        this.overall = ratingsSum/goalieCategories.length;
        this.roundedOverall = Math.round(this.overall);
        this.age++;
        this.roundedAge++;   
    }
}