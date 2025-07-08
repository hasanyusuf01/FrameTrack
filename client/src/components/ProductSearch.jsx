
import { useState } from "react";

function ProductSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  const submit = () => {
    onSearch(query.trim());
  };

  return (
    <div className="mb-4 input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search frames by ID or name"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === "Enter" && submit()}
      />
      <button className="btn btn-primary" onClick={submit}>
        🔍 Search
      </button>
    </div>
  );
}

export default ProductSearch;
