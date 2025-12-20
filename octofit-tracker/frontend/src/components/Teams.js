
const Teams = () => {
  const [teams, setTeams] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched teams:', results);
        console.log('API endpoint:', apiUrl);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2 className="display-6 mb-4 text-primary">Teams</h2>
      <div className="card p-3 mb-4">
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team._id || idx}>
                <td>{team.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary mt-2">Add Team</button>
      </div>
    </div>
  );
};

export default Teams;
