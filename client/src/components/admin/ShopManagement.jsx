import { useEffect, useState } from "react"
import { api } from "../../api"

function ShopManagement(){
  const [shops, setShops]     = useState([])
  const [newShop, setNewShop] = useState({name:"",contact_email:""})

  useEffect(()=>{ load() },[])
  const load = ()=> api.get("shops/").then(r=>setShops(r.data))

  const create = async ()=>{
    await api.post("shops/", {...newShop,is_active:true})
    setNewShop({name:"",contact_email:""})
    load()
  }

  const remove = async id=>{
    // soft delete: set is_active=false
    await api.patch(`shops/${id}/`,{is_active:false})
    load()
  }

  return (
    <div className="card mb-4">
      <div className="card-header">🏪 Shop Management</div>
      <div className="card-body">
        <div className="row g-2 mb-3">
          <div className="col"><input 
            className="form-control" placeholder="Name"
            value={newShop.name}
            onChange={e=>setNewShop(n=>({...n,name:e.target.value}))}
          /></div>
          <div className="col"><input 
            className="form-control" placeholder="Email"
            value={newShop.contact_email}
            onChange={e=>setNewShop(n=>({...n,contact_email:e.target.value}))}
          /></div>
          <div className="col-auto">
            <button className="btn btn-success" onClick={create}>➕ Add Shop</button>
          </div>
        </div>
        <table className="table table-sm">
          <thead><tr><th>Name</th><th>Email</th><th>Active</th><th></th></tr></thead>
          <tbody>
            {shops.map(s=>(
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.contact_email}</td>
                <td>{s.is_active? "✅":"❌"}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={()=>remove(s.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ShopManagement
