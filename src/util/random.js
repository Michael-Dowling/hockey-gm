
/** returns a random integer between [low, high) */
export function randInt(low, high) {
    return Math.floor(Math.random() * (high-low) + low);
}

/** Returns a (pseudo) random number from a normal distribution
 * with mean mean and standard deviation stdev
 */
export function gaussian(mean, stdev) {
    var u = 0, v = 0;
    //prevent slight chance u or v is 0 where this would fail
    while (u === 0) u = Math.random();  
    while (v === 0) v = Math.random();
    return mean + (Math.sqrt(-2.0 * Math.log(Math.random())) * Math.cos(2.0 * Math.PI * Math.random()) * stdev) 
}