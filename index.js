import HLTV from 'hltv';
import fs from 'node:fs';

const myHLTV = HLTV.default.createInstance();

const teams = [
    {
        name: 'Endpoint',
        id: 7234,
    },
];

const results = await myHLTV.getResults({
    teamIds: teams.map(team => team.id),
});

const lostMatches = [];
const lostMatchesFile = fs.createWriteStream('lost-matches.txt');

for (const result of results) {
    const loser = result.result.team1 > result.result.team2 ? result.team2 : result.team1;
    const winner = result.result.team1 > result.result.team2 ? result.team1 : result.team2;

    if (teams.some(team => team.name === loser.name)) {
        lostMatches.push(result);
        lostMatchesFile.write(`Endpoint lost to ${winner.name} on ${new Date(result.date).toISOString()} with a score of ${result.result.team1} - ${result.result.team2}\n`);
    }
}
