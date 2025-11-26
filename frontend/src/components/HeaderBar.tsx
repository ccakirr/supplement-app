import { Layout } from "antd";
import { useLocation } from "react-router-dom";

const { Header } = Layout;

export default function HeaderBar() {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "ANASAYFA";
    if (path.includes("/stock")) return "STOK RAPORU";
    if (path.includes("/sales")) return "SATIŞ RAPORU";
    if (path.includes("/purchase")) return "ALIŞ RAPORU";
    return "Dashboard";
  };

  // Görseldeki tarih formatı
  const dateStr = "2 Kasım 2025 Pazar"; // Görseldeki tarih

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
        height: 64,
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 600 }}>{getPageTitle()}</div>

      <div style={{ fontSize: 12, color: "#666" }}>
        {dateStr} | $ - 41,89 TL | € - 48,46 TL
      </div>
    </Header>
  );
}
