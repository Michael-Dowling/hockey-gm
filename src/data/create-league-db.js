import { openDB} from 'idb';

async function addTeams(db) {
    const tx  = db.transaction('teams', 'readwrite');
    tx.store.put({
        name: 'Toronto Maple Leafs',
        abbr: 'TOR',
        GoalieSVP: 0.916,
        offense: 80,
        defense: 55,
    });  
    tx.store.put({
        name: "Boston Bruins",
        abbr: "BOS",
        GoalieSVP: 0.912,
        offense: 65,
        defense: 74,
    });
    tx.store.put({
        name: "Montreal Canadians",
        abbr: "MON",
        GoalieSVP: 0.920,
        offense: 60,
        defense: 55,
    });
    await tx.done;
    console.log("added");
}

export async function createLeagueDB(leagueNum) {
    if(!('indexedDB' in window)){
        console.log("Browser not supported");
        return;
    }

    const db  = await openDB('League-'+leagueNum, 1, {
        upgrade(db) {
            const store = db.createObjectStore('teams', {keyPath: 'id', autoIncrement: true});
            store.createIndex('name', 'name', {unique: true});
        }
    });

    if((await db.count('teams')) === 0)
        addTeams(db);

    console.log(await db.getAllFromIndex('teams', 'name'));
}


