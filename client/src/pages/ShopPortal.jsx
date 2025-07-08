
import { useEffect, useState } from "react";
import { api } from "../api";
import ShopSelector from "../components/ShopSelector";
import ProductSearch from "../components/ProductSearch";
import InventoryList from "../components/InventoryList";
import SalesForm from "../components/SalesForm";

function ShopPortal() {
  const [selectedShop, setSelectedShop] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [frames, setFrames] = useState([]);
  const [lensTypes, setLensTypes] = useState([]);

  useEffect(() => {
    api.get("lens-types/").then(res => setLensTypes(res.data));
  }, []);

  useEffect(() => {
    if (!selectedShop) return;
    loadInventory();
  }, [selectedShop]);

 const loadInventory = async () => {
  const [invRes, frameRes] = await Promise.all([
    api.get(`inventory/?shop_id=${selectedShop.id}`),
    api.get(`frames/`)
  ]);

  const framesMap = new Map(frameRes.data.map(f => [f.id, f]));

  const enrichedInventory = invRes.data.map(item => ({
    ...item,
    frame: framesMap.get(item.frame) || {}  // Replace frame ID with full object
  }));

  setInventory(enrichedInventory);
};
  const handleSearch = async (query) => {
    const res = await api.get(`frames/?q=${encodeURIComponent(query)}`);
    setFrames(res.data);
  };

  return (
    <div>
      <ShopSelector onSelect={setSelectedShop} />
      {selectedShop && (
        <>
          <ProductSearch onSearch={handleSearch} />
          {frames.length > 0 && (
            <div className="card mb-4">
              <div className="card-header">🔍 Search Results</div>
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Price (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {frames.map(f => (
                    <tr key={f.id}>
                      <td>{f.product_id}</td>
                      <td>{f.name}</td>
                      <td>{f.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <InventoryList inventory={inventory} />
          <SalesForm
            shopId={selectedShop.id}
            frames={frames}
            lensTypes={lensTypes}
            onSaleComplete={loadInventory}
          />
        </>
      )}
    </div>
  );
}

export default ShopPortal;