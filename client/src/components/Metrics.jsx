function Metrics({ metrics }) {
  return (
    <div className="row text-center mb-4">
      <div className="col-md-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Total Revenue</h5>
            <p className="h3 text-success">₹{metrics?.totalRevenue || 0}</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Items Sold</h5>
            <p className="h3 text-primary">{metrics?.itemsSold || 0}</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Total Shops</h5>
            <p className="h3 text-purple">{metrics?.totalShops || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Metrics;
