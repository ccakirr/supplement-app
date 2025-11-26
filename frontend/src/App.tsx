import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import StockDashboard from "./pages/stock/StockDashboard";
import SktReport from "./pages/stock/SktReport";
import StockMovements from "./pages/stock/StockMovements";
import CurrentStock from "./pages/stock/CurrentStock";
import StockReports from "./pages/stock/StockReports";
import ByCustomer from "./pages/stock/ByCustomer";
import ByStockCategory from "./pages/stock/ByStockCategory";
import ByStockBrand from "./pages/stock/ByStockBrand";
import TopProducts from "./pages/stock/TopProducts";
import SalesDashboard from "./pages/sales/SalesDashboard";
import ByBrand from "./pages/sales/ByBrand";
import ByChannel from "./pages/sales/ByChannel";
import ByCategory from "./pages/sales/ByCategory";
import BySalesCustomer from "./pages/sales/ByCustomer";
import PurchaseDashboard from "./pages/purchase/PurchaseDashboard";
import BySupplier from "./pages/purchase/BySupplier";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Stock Routes */}
          <Route path="/stock/dashboard" element={<StockDashboard />} />
          <Route path="/stock/skt" element={<SktReport />} />
          <Route path="/stock/movements" element={<StockMovements />} />
          <Route path="/stock/current" element={<CurrentStock />} />
          <Route path="/stock/reports" element={<StockReports />} />
          <Route path="/stock/register" element={<ByCustomer />} />
          <Route path="/stock/category" element={<ByStockCategory />} />
          <Route path="/stock/brand" element={<ByStockBrand />} />
          <Route path="/stock/products" element={<TopProducts />} />

          {/* Sales Routes */}
          <Route path="/sales/dashboard" element={<SalesDashboard />} />
          <Route path="/sales/brand" element={<ByBrand />} />
          <Route path="/sales/channel" element={<ByChannel />} />
          <Route path="/sales/category" element={<ByCategory />} />
          <Route path="/sales/customer" element={<BySalesCustomer />} />

          {/* Purchase Routes */}
          <Route path="/purchase/dashboard" element={<PurchaseDashboard />} />
          <Route path="/purchase/supplier" element={<BySupplier />} />
          <Route path="/purchase/category" element={<PurchaseDashboard />} />
          <Route path="/purchase/brand" element={<PurchaseDashboard />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
