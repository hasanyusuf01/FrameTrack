
function InventoryList({ inventory }) {
  return (
    <div className="card mb-4">
      <div className="card-header">📦 Inventory</div>
      <table className="table mb-0">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id}>
              <td>{item.frame.product_id}</td>
              <td>{item.frame.name}</td>
              <td>{item.frame.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryList;
