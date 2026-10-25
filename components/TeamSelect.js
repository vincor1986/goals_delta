const TeamSelect = ({ teams, team, setTeam, disabled, allowNone = false }) => {
  return (
    <select
      value={team}
      onChange={(e) => setTeam(e.target.value)}
      disabled={disabled}
    >
      <option value="Choose team..." disabled={!allowNone}>
        Choose team...
      </option>
      {teams.map((teamName) => (
        <option key={teamName} value={teamName}>
          {teamName}
        </option>
      ))}
    </select>
  );
};

export default TeamSelect;
