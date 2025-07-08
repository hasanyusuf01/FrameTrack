import { useEffect, useState } from "react"
import { api } from "../../api"

function SalesMonitoring(){
  const [shops, setShops]   = useState([])
  const [sales, setSales]   = useState([])
  const [shopId, setShopId] = useState(null)

  useEffect(()=> api.get("shops/").then(r=>setShops(r.data)), [])

  const loadSales = ()=> {
    if(!shopId) return
    api.get(`sales/?shop=${shopId}`).then(r=>setSales(r.data))
  }

  return (
    <div className="card mb-4">
      <div className="card-header">📝 Sales Monitoring</div>
      <div className="card-body">
        <div className="d-flex mb-3">
          <select className="form-select me-2"
            onChange={e=>setShopId(Number(e.target.value))}
          >
            <option value="">Select shop</option>
            {shops.map(s=> <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <button className="btn btn-secondary" onClick={loadSales}>Load Sales</button>
        </div>
        <table className="table table-sm">
          <thead><tr>
            <th>ID</th><th>Frame</th><th>Lens</th><th>Total</th><th>Date</th>
          </tr></thead>
          <tbody>
            {sales.map(s=>(
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.frame.product_id}</td>
                <td>{s.lens_type.name}</td>
                <td>₹{s.total_amount}</td>
                <td>{new Date(s.sale_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SalesMonitoring
