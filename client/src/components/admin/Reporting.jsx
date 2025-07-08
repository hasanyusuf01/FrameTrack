import { useEffect, useState } from "react"
import { api } from "../../api"

function Reporting(){
  const [report, setReport] = useState(null)

  useEffect(()=>{
    api.get("metrics/").then(r=>setReport(r.data))
  },[])

  return (
    <div className="card mb-4">
      <div className="card-header">📈 Reporting Summary</div>
      <div className="card-body">
        {report?
          <ul>
            <li>Total Revenue: ₹{report.totalRevenue}</li>
            <li>Items Sold: {report.itemsSold}</li>
            <li>Total Shops: {report.totalShops}</li>
          </ul>
        :<p>Loading...</p>}
      </div>
    </div>
  )
}

export default Reporting
