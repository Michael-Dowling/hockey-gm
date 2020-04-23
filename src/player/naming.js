import {chooseEventUsingWeights, randInt} from '../util';

let names = require('./playerNames')

const nationalityOdds = {
    "Canada": 331,
    "United States": 211,
    "Sweden": 93,
    "Slovakia": 7,
    "Czech": 30,
    "Finland": 36,
    "Latvia": 4,
    "Germany": 8,
    "Denmark": 8,
    "Russia": 37,
    "Switzerland": 12,
    "France": 3,
    "Austria": 2,
    "Slovenia": 1,
    "Norway": 1
}

function getNationality() {
    return chooseEventUsingWeights(Object.keys(nationalityOdds), Object.values(nationalityOdds))
}

function getName(nationality) {
    let possibleNames = names[nationality]
    return possibleNames.first[randInt(0,possibleNames.first.length)] + " " + possibleNames.last[randInt(0,possibleNames.last.length)]
}

export {getName, getNationality}