import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import ShopPortal from './pages/ShopPortal';
import AdminPanel from './pages/AdminPanel';   // add this
import Header from './components/header';

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="container py-4">
      <Header activePage={activePage} setActivePage={setActivePage} />

      {activePage === "dashboard" && <Dashboard />}
      {activePage === "shop"      && <ShopPortal />}
      {activePage === "admin"     && <AdminPanel />}
    </div>
  );
}

export default App;
