

/** returns true if team2 is willing to make a trade of assets2 for assets1 with team1 */
function evalutateTrade(team1, assets1, team2, assets2) {
    let assets2Copy = assets2.slice(); // shallow copy of assets2
    for (let i=0; i<assets1.length; i++) {
        let foundMatch = false;
        for (let j=0; j<assets2Copy.length; j++) {
            if (assets1[i].position !== 'D' && assets1[i].position === assets2Copy[j].position) {
                foundMatch = true;
                assets2Copy.splice(j,1);
                break;
            }
        }
        if (!foundMatch)    return false;
    }
    return assets2Copy.length === 0;
}


export {evalutateTrade}