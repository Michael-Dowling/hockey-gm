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
        this.ratings = []
        this.overall = this.createPlayer()
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

        return ratingsSum/goalieCategories.length;
    }
}