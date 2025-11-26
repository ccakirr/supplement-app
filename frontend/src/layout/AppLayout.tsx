import { Layout, Row, Col, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import SideBar from "../components/SideBar";
import HeaderBar from "../components/HeaderBar";
import Filters from "../components/Filters";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const { Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const showFilters = location.pathname !== "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <Layout>
        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuOpen(true)}
            style={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 1000,
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        )}

        <HeaderBar />

        <Content
          style={{
            padding: isMobile ? "16px 8px" : "16px",
            background: "#f5f5f5",
            minHeight: "calc(100vh - 64px)",
            marginTop: isMobile ? 56 : 0,
          }}
        >
          {showFilters ? (
            <Row gutter={[20, 20]}>
              <Col xs={24} lg={18}>
                {children}
              </Col>
              <Col xs={24} lg={6}>
                <Filters />
              </Col>
            </Row>
          ) : (
            children
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
