
import { useEffect, useState } from "react";
import { api } from "../api";

function ShopSelector({ onSelect }) {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    api.get("shops/").then(res => setShops(res.data));
  }, []);

  return (
    <div className="mb-3">
      <label className="form-label fw-bold">Select Shop</label>
      <select className="form-select" onChange={e => {
        const selected = shops.find(s => s.id === Number(e.target.value));
        onSelect(selected);
      }}>
        <option value="">-- choose shop --</option>
        {shops.map(shop => (
          <option key={shop.id} value={shop.id}>
            {shop.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ShopSelector;
