import { useEffect, useState } from "react"
import { api } from "../../api"

function InventoryManagement(){
  const [shops, setShops]   = useState([])
  const [frames, setFrames] = useState([])
  const [form, setForm]     = useState({shop:null,frame:null,quantity:0})

  useEffect(()=>{
    api.get("shops/").then(r=>setShops(r.data))
    api.get("frames/").then(r=>setFrames(r.data))
  },[])

  const assign = async ()=>{
    await api.post("inventory/", {...form})
    setForm({shop:null,frame:null,quantity:0})
    alert("Stock assigned")
  }

  return (
    <div className="card mb-4">
      <div className="card-header">📦 Inventory Management</div>
      <div className="card-body row g-3">
        <div className="col-md-3">
          <select className="form-select"
            value={form.shop||""}
            onChange={e=>setForm(f=>({...f,shop:Number(e.target.value)}))}
          >
            <option value="">Choose shop</option>
            {shops.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select"
            value={form.frame||""}
            onChange={e=>setForm(f=>({...f,frame:Number(e.target.value)}))}
          >
            <option value="">Choose frame</option>
            {frames.map(fm=><option key={fm.id} value={fm.id}>{fm.product_id}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control"
            placeholder="Quantity"
            value={form.quantity}
            onChange={e=>setForm(f=>({...f,quantity:Number(e.target.value)}))}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={assign}>Assign Stock</button>
        </div>
      </div>
    </div>
  )
}

export default InventoryManagement
