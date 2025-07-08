function TopFrames({ frames }) {
  return (
    <div className="card">
      <div className="card-header">
        <h5>Top Selling Frames</h5>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Frame</th>
              <th>Sales Count</th>
              <th>Revenue (₹)</th>
            </tr>
          </thead>
          <tbody>
            {frames.map((f, i) => (
              <tr key={i}>
                <td>{f.frame__name}</td>
                <td>{f.sales_count}</td>
                <td>{f.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopFrames;
