const getGD = (match, team) => {
  if (match.home_team_name === team) {
    return (
      parseInt(match.home_team_goal_count) -
      parseInt(match.away_team_goal_count)
    );
  } else {
    return (
      parseInt(match.away_team_goal_count) -
      parseInt(match.home_team_goal_count)
    );
  }
};

module.exports = getGD;
