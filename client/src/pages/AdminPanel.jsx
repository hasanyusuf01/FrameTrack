import ShopManagement      from "../components/admin/ShopManagement"
import InventoryManagement from "../components/admin/InventoryManagement"
import SalesMonitoring     from "../components/admin/SalesMonitoring"
import Billing             from "../components/admin/Billing"
import Reporting           from "../components/admin/Reporting"

function AdminPanel(){
  return (
    <>
      <ShopManagement />
      <InventoryManagement />
      {/* <SalesMonitoring /> */}
      <Billing />
      <Reporting />
    </>
  )
}
export default AdminPanel
