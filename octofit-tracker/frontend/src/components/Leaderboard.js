
const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setEntries(results);
        console.log('Fetched leaderboard:', results);
        console.log('API endpoint:', apiUrl);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2 className="display-6 mb-4 text-primary">Leaderboard</h2>
      <div className="card p-3 mb-4">
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th>User</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr key={entry._id || idx}>
                <td>{entry.user}</td>
                <td>{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary mt-2">Refresh Leaderboard</button>
      </div>
    </div>
  );
};

export default Leaderboard;
