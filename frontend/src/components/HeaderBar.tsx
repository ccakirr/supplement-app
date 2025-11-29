import { Layout, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const { Header } = Layout;

interface HeaderBarProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export default function HeaderBar({
  onMenuClick,
  showMenuButton = false,
}: HeaderBarProps) {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "ANASAYFA";
    if (path.includes("/stock")) return "STOK RAPORU";
    if (path.includes("/sales")) return "SATIŞ RAPORU";
    if (path.includes("/purchase")) return "ALIŞ RAPORU";
    return "Dashboard";
  };

  const d = new Date();
  const dateStr = d.getDate().toString(); //tarih

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
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {showMenuButton && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onMenuClick}
            style={{
              fontSize: 18,
              width: 40,
              height: 40,
            }}
          />
        )}
        <div style={{ fontSize: 16, fontWeight: 600 }}>{getPageTitle()}</div>
      </div>

      <div
        style={{
          fontSize: 12,
          color: "#666",
          display: showMenuButton ? "none" : "block",
        }}
      >
        {dateStr} | $ - 41,89 TL | € - 48,46 TL
      </div>

      {showMenuButton && (
        <div style={{ fontSize: 11, color: "#666" }}>
          {dateStr.split(" ")[0]} {dateStr.split(" ")[1]}
        </div>
      )}
    </Header>
  );
}
