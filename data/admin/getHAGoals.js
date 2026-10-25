const DATA = require("../EPL_MATCHES.json");

const START_TIMESTAMP = 1659726000;
const END_TIMESTAMP = 1685287800;

const MATCHES = DATA.filter(
  (match) =>
    match.timestamp >= START_TIMESTAMP && match.timestamp <= END_TIMESTAMP
);

const homeGoals = MATCHES.reduce(
  (a, b) => a + parseInt(b.home_team_goal_count),
  0
);
const awayGoals = MATCHES.reduce(
  (a, b) => a + parseInt(b.away_team_goal_count),
  0
);

const total = homeGoals + awayGoals;

console.log((1 - homeGoals / total) * 2);
console.log((1 - awayGoals / total) * 2);

// home goals worth 0.85 each
// away goals worth 1.15 each
