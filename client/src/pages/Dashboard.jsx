import { useEffect, useState } from "react";
import { api } from "../api";
import Metrics from "../components/Metrics";
import TopFrames from "../components/TopFrames";
import ShopPerformance from "../components/ShopPerformance";

function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [topFrames, setTopFrames] = useState([]);
  const [shopStats, setShopStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsRes, framesRes, shopsRes] = await Promise.all([
          api.get("metrics/"),
          api.get("top-frames/"),
          api.get("top-shops/"),
        ]);
        setMetrics(metricsRes.data);
        setTopFrames(framesRes.data);
        setShopStats(shopsRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Metrics metrics={metrics} />
      <TopFrames frames={topFrames} />
      <ShopPerformance data={shopStats} />
    </>
  );
}

export default Dashboard;
