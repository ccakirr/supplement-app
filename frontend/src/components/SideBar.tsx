import { Layout, Menu, Drawer } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const { Sider } = Layout;

interface SideBarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function SideBar({
  mobileOpen = false,
  onMobileClose,
}: SideBarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
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
  }, []);

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
    { key: "/purchase/dashboard", label: "DASHBOARD" },
    {
      key: "comparison-header",
      label: "ALIŞ - SATIŞ RAPORU (KARŞILAŞTIRMA)",
      style: { fontWeight: "bold", marginTop: 10, cursor: "default" },
      disabled: true,
    },
  ];

  const handleMenuClick = (key: string) => {
    if (key.startsWith("/")) {
      navigate(key);
      if (isMobile && onMobileClose) {
        onMobileClose();
      }
    }
  };

  const sidebarContent = (
    <>
      <div
        style={{
          padding: "20px 15px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {!collapsed && (
          <div style={{ fontWeight: "bold", fontSize: 16 }}>FullSupplement</div>
        )}
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ border: "none", fontSize: 12 }}
        onClick={({ key }) => handleMenuClick(key)}
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
    </>
  );

  // Mobile: Drawer
  if (isMobile) {
    return (
      <Drawer
        placement="left"
        onClose={onMobileClose}
        open={mobileOpen}
        closable={false}
        width={230}
        styles={{ body: { padding: 0, background: "#fff" } }}
      >
        <div
          style={{ height: "100vh", position: "relative", background: "#fff" }}
        >
          {sidebarContent}
        </div>
      </Drawer>
    );
  }

  // Desktop: Sider
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={230}
      breakpoint="md"
      collapsedWidth={80}
      style={{
        background: "#fff",
        borderRight: "1px solid #ddd",
        overflow: "auto",
        height: "100vh",
        position: "relative",
      }}
    >
      {sidebarContent}
    </Sider>
  );
}
