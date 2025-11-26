import { Layout, Row, Col } from "antd";
import SideBar from "../components/SideBar";
import HeaderBar from "../components/HeaderBar";
import Filters from "../components/Filters";
import { useLocation } from "react-router-dom";

const { Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const showFilters = location.pathname !== "/";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />

      <Layout>
        <HeaderBar />

        <Content
          style={{
            padding: "16px",
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
