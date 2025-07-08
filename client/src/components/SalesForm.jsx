
import { useState } from "react";
import { api } from "../api";

const lensOptions = [
  { id: 1, name: "Regular", price: 0 },
  { id: 2, name: "Premium", price: 500 },
  { id: 3, name: "Pro", price: 1000 }
];

function SalesForm({ shopId, frames, lensTypes, onSaleComplete }) {
  const [frameProductId, setFrameProductId] = useState("");
  const [selectedLens, setSelectedLens] = useState(null);
  const [error, setError] = useState("");

  const frame = frames.find(f => f.product_id === frameProductId);
  const framePrice = frame?.price || 0;
  const lensPrice = selectedLens?.price || 0;
  const totalAmount = framePrice + lensPrice;

  const handleSubmit = async () => {
    setError("");

    if (!frame) return setError("❌ Frame not found. Please check the product ID.");
    if (!selectedLens) return setError("❌ Please select a lens type.");

    try {
      await api.post("sales/", {
        shop: shopId,
        frame: frame.id,
        lens_type: selectedLens.id,
        frame_price: framePrice,
        lens_price: lensPrice,
        total_amount: totalAmount,
        is_billed: false,
        sold_by: null
      });

      setFrameProductId("");
      setSelectedLens(null);
      onSaleComplete();
      alert("✅ Sale recorded successfully.");
    } catch (err) {
      console.error("Sale error:", err);
      setError("❌ Failed to record sale.");
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-header">🛒 Record Sale</div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Frame Product ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g., F001"
            value={frameProductId}
            onChange={e => setFrameProductId(e.target.value)}
          />
          {frame && <small className="text-muted">{frame.name} - ₹{frame.price}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Lens Type</label>
          <div className="d-flex gap-3">
            {lensOptions.map(lens => (
              <div key={lens.id} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="lens"
                  id={`lens-${lens.id}`}
                  checked={selectedLens?.id === lens.id}
                  onChange={() => setSelectedLens(lens)}
                />
                <label className="form-check-label" htmlFor={`lens-${lens.id}`}>
                  {lens.name} (+₹{lens.price})
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3"><strong>Total Price: ₹{totalAmount}</strong></div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-success" onClick={handleSubmit}>💾 Submit Sale</button>
      </div>
    </div>
  );
}

export default SalesForm;
