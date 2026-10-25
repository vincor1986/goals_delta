const getVol = (match) => {
  return [match.home_team_shots_on_target, match.away_team_shots_on_target]
    .map((num) => (num == -1 ? 0 : num))
    .reduce((a, b) => a + parseInt(b), 0);
};

module.exports = getVol;
