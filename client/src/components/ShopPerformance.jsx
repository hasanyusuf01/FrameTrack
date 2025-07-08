function ShopPerformance({ data }) {
  return (
    <div className="card mt-4">
      <div className="card-header">
        <h5>🏬 Shop Performance Comparison</h5>
      </div>
      <div className="card-body">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Shop</th>
              <th>Total Sales</th>
              <th>Total Revenue (₹)</th>
              <th>Growth (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((shop, i) => (
              <tr key={i}>
                <td>{shop.shop__name}</td>
                <td>{shop.sales_count}</td>
                <td>{shop.revenue}</td>
                <td className="text-success fw-bold">{shop.growth}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShopPerformance;
