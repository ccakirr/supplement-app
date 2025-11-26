import { useEffect, useState } from "react";
import { Card, Row, Col, Space, Button, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import BarChart from "../components/BarChart";
import { getSalesSummary } from "../api/sales";
import { getPurchaseSummary } from "../api/purchases";
import { getStockSummary, getCriticalStock } from "../api/stock";

const { Text } = Typography;

export default function Home() {
  const [salesData, setSalesData] = useState<any>(null);
  const [purchaseData, setPurchaseData] = useState<any>(null);
  const [stockData, setStockData] = useState<any>(null);
  const [criticalStock, setCriticalStock] = useState<any[]>([]);

  useEffect(() => {
    // Satış verileri
    getSalesSummary().then((res) => setSalesData(res.data));

    // Alış verileri
    getPurchaseSummary().then((res) => setPurchaseData(res.data));

    // Stok verileri
    getStockSummary().then((res) => setStockData(res.data));

    // Kritik stok
    getCriticalStock().then((res) => setCriticalStock(res.data));
  }, []);

  const topProducts =
    criticalStock.length > 0
      ? criticalStock
      : [
          { label: "ÜRÜN 1", value: 21000 },
          { label: "ÜRÜN 2", value: 18000 },
          { label: "ÜRÜN 3", value: 16000 },
          { label: "ÜRÜN 4", value: 15000 },
          { label: "ÜRÜN 5", value: 13000 },
          { label: "ÜRÜN 6", value: 12000 },
          { label: "ÜRÜN 7", value: 12000 },
          { label: "ÜRÜN 8", value: 10000 },
          { label: "ÜRÜN 9", value: 9000 },
          { label: "ÜRÜN 10", value: 8000 },
        ];

  if (!salesData || !purchaseData || !stockData) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div style={{ padding: "0 16px" }}>
      <Card
        title={
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Anasayfa
            </Text>
          </div>
        }
        extra={
          <Space wrap size="small">
            <Button size="small">☐ Liste</Button>
            <Button size="small">Excel</Button>
            <Button size="small">PDF</Button>
          </Space>
        }
        style={{ marginBottom: 20 }}
      >
        {/* Satış Kartları */}
        <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{ background: "#f6ffed", border: "1px solid #b7eb8f" }}
            >
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Bugünkü Satış
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#52c41a",
                    margin: "5px 0",
                  }}
                >
                  {salesData.totalSales.toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {salesData.totalQuantity.toLocaleString()} Adet
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowUpOutlined style={{ color: "#52c41a" }} /> %16
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card
              style={{ background: "#f6ffed", border: "1px solid #b7eb8f" }}
            >
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Son 1 Haftalık Satış
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#52c41a",
                    margin: "5px 0",
                  }}
                >
                  {(salesData.totalSales * 5).toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {(salesData.totalQuantity * 5).toLocaleString()} Adet
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowUpOutlined style={{ color: "#52c41a" }} /> %16
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card
              style={{ background: "#f6ffed", border: "1px solid #b7eb8f" }}
            >
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Son 1 Aylık Satış
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#52c41a",
                    margin: "5px 0",
                  }}
                >
                  {(salesData.totalSales * 20).toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {(salesData.totalQuantity * 20).toLocaleString()} Adet
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowUpOutlined style={{ color: "#52c41a" }} /> %16
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card
              style={{ background: "#fff1f0", border: "1px solid #ffccc7" }}
            >
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Bu Ay Satış
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#ff4d4f",
                    margin: "5px 0",
                  }}
                >
                  {(salesData.totalSales * 18).toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {(salesData.totalQuantity * 18).toLocaleString()} Adet
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowDownOutlined style={{ color: "#ff4d4f" }} /> -%16
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Alış Kartları */}
        <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{ background: "#fff1f0", border: "1px solid #ffccc7" }}
            >
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Bugünkü Alış
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#ff4d4f",
                    margin: "5px 0",
                  }}
                >
                  {purchaseData.totalPurchases.toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {purchaseData.totalQuantity.toLocaleString()} Adet
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowDownOutlined style={{ color: "#ff4d4f" }} /> -%16
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card
              style={{ background: "#fff1f0", border: "1px solid #ffccc7" }}
            >
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Son 1 Haftalık Alış
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#ff4d4f",
                    margin: "5px 0",
                  }}
                >
                  {(purchaseData.totalPurchases * 5).toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {(purchaseData.totalQuantity * 5).toLocaleString()} Adet
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowDownOutlined style={{ color: "#ff4d4f" }} /> -%16
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card
              style={{ background: "#f6ffed", border: "1px solid #b7eb8f" }}
            >
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Son 1 Aylık Alış
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#52c41a",
                    margin: "5px 0",
                  }}
                >
                  {(purchaseData.totalPurchases * 20).toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {(purchaseData.totalQuantity * 20).toLocaleString()} Adet
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowUpOutlined style={{ color: "#52c41a" }} /> %16
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card
              style={{ background: "#f6ffed", border: "1px solid #b7eb8f" }}
            >
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Bu Ay Alış
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#52c41a",
                    margin: "5px 0",
                  }}
                >
                  {(purchaseData.totalPurchases * 18).toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {(purchaseData.totalQuantity * 18).toLocaleString()} Adet
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowUpOutlined style={{ color: "#52c41a" }} /> %16
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Stok Kartları */}
        <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{ background: "#e6f7ff", border: "1px solid #91d5ff" }}
            >
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Bugünkü Değer
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#1890ff",
                    margin: "5px 0",
                  }}
                >
                  {stockData.totalStockValue.toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {stockData.totalStock.toLocaleString()} Ürün
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowUpOutlined style={{ color: "#1890ff" }} /> %16
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card
              style={{ background: "#e6f7ff", border: "1px solid #91d5ff" }}
            >
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  1 Hafta Önceki Değer
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#1890ff",
                    margin: "5px 0",
                  }}
                >
                  {(stockData.totalStockValue * 1.05).toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {stockData.totalStock.toLocaleString()} Ürün
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowUpOutlined style={{ color: "#1890ff" }} /> %16
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card
              style={{ background: "#e6f7ff", border: "1px solid #91d5ff" }}
            >
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  1 Ay Önceki Değer
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#1890ff",
                    margin: "5px 0",
                  }}
                >
                  {(stockData.totalStockValue * 1.15).toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {stockData.totalStock.toLocaleString()} Ürün
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowUpOutlined style={{ color: "#1890ff" }} /> %16
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card
              style={{ background: "#e6f7ff", border: "1px solid #91d5ff" }}
            >
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Bu Ay Başındaki Değer
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#1890ff",
                    margin: "5px 0",
                  }}
                >
                  {(stockData.totalStockValue * 1.12).toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {stockData.totalStock.toLocaleString()} Ürün
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowUpOutlined style={{ color: "#1890ff" }} /> %16
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* En Çok Satan Ürünler */}
        <div>
          <Text strong style={{ fontSize: 13 }}>
            EN ÇOK SATAN ÜRÜNLER / TL
          </Text>
          <Row gutter={[16, 24]} style={{ marginTop: 15 }}>
            <Col xs={24} sm={12} md={6}>
              <div style={{ marginBottom: 16 }}>
                <Text
                  style={{ fontSize: 11, display: "block", marginBottom: 8 }}
                >
                  Bugün
                </Text>
                <BarChart
                  data={topProducts.map((p) => ({
                    name: p.label,
                    value: p.value,
                  }))}
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div style={{ marginBottom: 16 }}>
                <Text
                  style={{ fontSize: 11, display: "block", marginBottom: 8 }}
                >
                  Son 1 Hafta
                </Text>
                <BarChart
                  data={topProducts.map((p) => ({
                    name: p.label,
                    value: p.value,
                  }))}
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div style={{ marginBottom: 16 }}>
                <Text
                  style={{ fontSize: 11, display: "block", marginBottom: 8 }}
                >
                  Son 1 Ay
                </Text>
                <BarChart
                  data={topProducts.map((p) => ({
                    name: p.label,
                    value: p.value,
                  }))}
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div style={{ marginBottom: 16 }}>
                <Text
                  style={{ fontSize: 11, display: "block", marginBottom: 8 }}
                >
                  Bu Yıl
                </Text>
                <BarChart
                  data={topProducts.map((p) => ({
                    name: p.label,
                    value: p.value,
                  }))}
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* En Çok Satan Ürünler / Adet */}
        <div style={{ marginTop: 30 }}>
          <Text strong style={{ fontSize: 13 }}>
            EN ÇOK SATAN ÜRÜNLER / Adet
          </Text>
          <Row gutter={[16, 24]} style={{ marginTop: 15 }}>
            <Col xs={24} sm={12} md={6}>
              <div style={{ marginBottom: 16 }}>
                <Text
                  style={{ fontSize: 11, display: "block", marginBottom: 8 }}
                >
                  Bugün
                </Text>
                <BarChart
                  data={topProducts.map((p) => ({
                    name: p.label,
                    value: p.value,
                  }))}
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div style={{ marginBottom: 16 }}>
                <Text
                  style={{ fontSize: 11, display: "block", marginBottom: 8 }}
                >
                  Son 1 Hafta
                </Text>
                <BarChart
                  data={topProducts.map((p) => ({
                    name: p.label,
                    value: p.value,
                  }))}
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div style={{ marginBottom: 16 }}>
                <Text
                  style={{ fontSize: 11, display: "block", marginBottom: 8 }}
                >
                  Son 1 Ay
                </Text>
                <BarChart
                  data={topProducts.map((p) => ({
                    name: p.label,
                    value: p.value,
                  }))}
                />
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div style={{ marginBottom: 16 }}>
                <Text
                  style={{ fontSize: 11, display: "block", marginBottom: 8 }}
                >
                  Bu Yıl
                </Text>
                <BarChart
                  data={topProducts.map((p) => ({
                    name: p.label,
                    value: p.value,
                  }))}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
}
