function Header({ activePage, setActivePage }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="fw-bold">
        {activePage === "dashboard" ? "📊 Dashboard"
        : activePage === "shop"     ? "🛍️ Shop Portal"
        :                             "🛠️ Admin Panel"}
      </h2>

      <div>
        <button
          className={`btn mx-1 ${activePage === "dashboard" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActivePage("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`btn mx-1 ${activePage === "shop" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActivePage("shop")}
        >
          Shop Portal
        </button>
        <button
          className={`btn mx-1 ${activePage === "admin" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActivePage("admin")}
        >
          Admin Panel
        </button>
      </div>
    </div>
  );
}

export default Header;
