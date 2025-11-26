import { Layout, Row, Col } from "antd";
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
        <HeaderBar
          onMenuClick={() => setMobileMenuOpen(true)}
          showMenuButton={isMobile}
        />

        <Content
          style={{
            padding: isMobile ? "16px 8px" : "16px",
            background: "#f5f5f5",
            minHeight: "calc(100vh - 64px)",
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
