import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const { Sider } = Layout;

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-collapse on mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useState(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  });

  const menuItems = [
    {
      key: "/",
      label: "ANASAYFA",
      style: { background: "#e8e8e8", fontWeight: "bold", marginBottom: 10 },
    },
    {
      key: "stock-status-header",
      label: "DEPO STOK DURUMU",
      style: { fontWeight: "bold", marginTop: 10, cursor: "default" },
      disabled: true,
    },
    { key: "/stock/movements", label: "STOK HAREKETLERİ" },
    { key: "/stock/current", label: "GÜNCEL STOKLAR" },
    { key: "/stock/skt", label: "SKT DURUMU" },
    { key: "/stock/reports", label: "STOK RAPORLARI" },
    {
      key: "stock-report-header",
      label: "STOK RAPORU",
      style: { fontWeight: "bold", marginTop: 10, cursor: "default" },
      disabled: true,
    },
    { key: "/stock/dashboard", label: "SATIŞ KANAL BAZLI" },
    { key: "/stock/register", label: "MÜŞTERİ BAZLI" },
    { key: "/stock/category", label: "KATEGORİ BAZLI" },
    { key: "/stock/brand", label: "MARKA BAZLI" },
    { key: "/stock/products", label: "EN ÇOK SATANLAR" },
    {
      key: "sales-report-header",
      label: "SATIŞ RAPORU",
      style: { fontWeight: "bold", marginTop: 10, cursor: "default" },
      disabled: true,
    },
    { key: "/sales/channel", label: "SATIŞ KANAL BAZLI" },
    { key: "/sales/customer", label: "MÜŞTERİ BAZLI" },
    { key: "/sales/category", label: "KATEGORİ BAZLI" },
    { key: "/sales/brand", label: "MARKA BAZLI" },
    { key: "/sales/dashboard", label: "EN ÇOK SATANLAR" },
    {
      key: "purchase-report-header",
      label: "ALIŞ RAPORU",
      style: { fontWeight: "bold", marginTop: 10, cursor: "default" },
      disabled: true,
    },
    { key: "/purchase/supplier", label: "TEDARİKÇİ BAZLI" },
    { key: "/purchase/category", label: "KATEGORİ BAZLI" },
    { key: "/purchase/brand", label: "MARKA BAZLI" },
    { key: "/purchase/dashboard", label: "EN ÇOK SATANLAR" },
    {
      key: "comparison-header",
      label: "ALIŞ - SATIŞ RAPORU (KARŞILAŞTIRMA)",
      style: { fontWeight: "bold", marginTop: 10, cursor: "default" },
      disabled: true,
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={230}
      breakpoint="md"
      collapsedWidth={isMobile ? 0 : 80}
      style={{
        background: "#fff",
        borderRight: "1px solid #ddd",
        overflow: "auto",
        height: "100vh",
        position: isMobile ? "fixed" : "relative",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 999,
      }}
    >
      <div
        style={{
          padding: "20px 15px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            background: "#4CAF50",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          F
        </div>
        {!collapsed && (
          <div style={{ fontWeight: "bold", fontSize: 16 }}>FullSupplement</div>
        )}
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ border: "none", fontSize: 12 }}
        onClick={({ key }) => {
          if (key.startsWith("/")) {
            navigate(key);
          }
        }}
        items={menuItems}
      />

      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          fontSize: 11,
          color: "#999",
        }}
      >
        {!collapsed && (
          <>
            <div>? YARDIM</div>
            <div style={{ marginTop: 20 }}>2025 © FULL SUPPLEMENT A.Ş.</div>
          </>
        )}
      </div>
    </Sider>
  );
}
