/** comparse two teams for standings rankings
 *  1 means team 2 is ahead, 0 means they are tied, -1 means team 1 is ahead
 */
export function compareTeams(team1, team2) {
    if (team1.seasonPoints < team2.seasonPoints)
        return 1;
    else if (team1.seasonPoints > team2.seasonPoints)
        return -1;
    // must look at tie breakers

    // first tie breaker is games played
    if (team1.seasonGP > team2.seasonGP)
        return 1;
    else if (team1.seasonGP < team2.seasonGP)
        return -1;
    
    // second tie breaker is regulation wins
    if (team1.seasonRW < team2.seasonRW)
        return 1;
    else if (team1.seasonRW > team2.seasonRW)
        return -1;
    
    // next is ROW
    if (team1.seasonROW < team2.seasonROW)
        return 1;
    else if (team1.seasonROW > team2.seasonROW)
        return -1;
    
    // next is total wins
    if (team1.seasonWins < team2.seasonWins)
        return 1;
    else if (team1.seasonWins > team2.seasonWins)
        return -1;
    
    // TODO: add head to head
    

    // next is goals differential
    if (team1.seasonGF - team1.seasonGA < team2.seasonGF - team2.seasonGA)
        return 1;
    else if (team1.seasonGF - team1.seasonGA > team2.seasonGF - team2.seasonGA)
        return -1;
    
    // last is goals for
    if (team1.seasonGF < team2.seasonGF)
        return 1;
    else if (team1.seasonGF > team2.seasonGF)
        return -1;

    return 0;
}

/** first half of divisions are "East", second half are "West" */
export function splitDivisionsIntoWC(d) {
    const divisions = Object.entries(d);
    let top3PerDivision = [];
    let eastWCTeams = [];
    let westWCTeams = [];
    for (let i=0; i<divisions.length; i++) {
        divisions[i][1].sort(compareTeams);
        top3PerDivision.push(divisions[i][1].slice(0,3))
        if (i < divisions.length/2) {
            eastWCTeams.push(...divisions[i][1].slice(3))
        }
        else {
            westWCTeams.push(...divisions[i][1].slice(3))
        }
    }

    eastWCTeams.sort(compareTeams);
    westWCTeams.sort(compareTeams);

    console.log(top3PerDivision)

    return [top3PerDivision, [eastWCTeams, westWCTeams]];
}