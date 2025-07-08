import { useState } from "react"
import { api }      from "../../api"

function Billing(){
  const [shopId, setShopId]     = useState(null)
  const [period, setPeriod]     = useState("")  // e.g. "2025-07"
  const [bill, setBill]         = useState(null)

  const generate = async ()=>{
    const res = await api.post("bills/generate/", {shop:shopId,billing_period:period})
    setBill(res.data)
  }

  return (
    <div className="card mb-4">
      <div className="card-header">💳 Monthly Billing</div>
      <div className="card-body d-flex align-items-end g-2">
        <select className="form-select me-2"
          onChange={e=>setShopId(Number(e.target.value))}
        >{/*shops list similar to above*/}</select>
        <input type="month" className="form-control me-2"
          value={period} onChange={e=>setPeriod(e.target.value)}
        />
        <button className="btn btn-warning" onClick={generate}>Generate Bill</button>
      </div>
      {bill && (
        <pre className="mt-3">{JSON.stringify(bill,null,2)}</pre>
      )}
    </div>
  )
}

export default Billing
