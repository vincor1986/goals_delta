const fixZero = (arr) => {
  return arr.map((num) => (num == -0 ? 0 : num));
};

const getHL = (match, team) => {
  const homeGoals = match.home_team_goal_timings;
  const awayGoals = match.away_team_goal_timings;

  let allGoalDetails = [
    ...homeGoals.map((timing) => ({ timing, team: "home" })),
    ...awayGoals.map((timing) => ({ timing, team: "away" })),
  ];

  allGoalDetails.sort((a, b) => a.timing - b.timing);

  let gd = [0];

  allGoalDetails.forEach((goal, index) => {
    if (goal.team === "home") {
      gd.push(gd[index] + 1);
    } else {
      gd.push(gd[index] - 1);
    }
  });

  const min = Math.min(...gd);
  const max = Math.max(...gd);

  return team == match.home_team_name
    ? fixZero([min, max])
    : fixZero([-max, -min]);
};

module.exports = getHL;
