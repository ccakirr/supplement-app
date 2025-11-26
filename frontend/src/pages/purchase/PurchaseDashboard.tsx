import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Space, Button, Table } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import {
  getPurchaseSummary,
  getMonthlyPurchases,
  getPurchasesBySupplier,
  getPurchasesByBrand,
  getPurchasesByCategory,
} from "../../api/purchases";

const { Title, Text } = Typography;

export default function PurchaseDashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [monthlyPurchases, setMonthlyPurchases] = useState<any[]>([]);
  const [supplierData, setSupplierData] = useState<any[]>([]);
  const [brandData, setBrandData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);

  useEffect(() => {
    getPurchaseSummary().then((res) => setSummary(res.data));
    getMonthlyPurchases(2025).then((res) => {
      const months = [
        "OCAK",
        "ŞUBAT",
        "MART",
        "NİSAN",
        "MAYIS",
        "HAZİRAN",
        "TEMMUZ",
        "AĞUSTOS",
        "EYLÜL",
        "EKİM",
        "KASIM",
        "ARALIK",
      ];
      const data = res.data.map((item: any) => ({
        month: months[parseInt(item.label) - 1],
        value: item.value,
      }));
      setMonthlyPurchases(data);
    });
    getPurchasesBySupplier().then((res) =>
      setSupplierData(
        res.data.map((item: any) => ({ name: item.label, value: item.value }))
      )
    );
    getPurchasesByBrand().then((res) =>
      setBrandData(
        res.data.map((item: any) => ({ name: item.label, value: item.value }))
      )
    );
    getPurchasesByCategory().then((res) =>
      setCategoryData(
        res.data.map((item: any) => ({ name: item.label, value: item.value }))
      )
    );
  }, []);

  if (!summary) {
    return <div>Yükleniyor...</div>;
  }

  const tableData = [
    {
      key: "1",
      tedarikci: "Tedarikçi 1",
      toplam: "600.000",
      adet: "463.750",
      oran: "79,26%",
      toplamAlis: "83.750",
    },
  ];

  const columns = [
    { title: "TEDARİKÇİ", dataIndex: "tedarikci", key: "tedarikci" },
    { title: "TOPLAM", dataIndex: "toplam", key: "toplam" },
    { title: "ADET", dataIndex: "adet", key: "adet" },
    { title: "ORAN", dataIndex: "oran", key: "oran" },
    { title: "TOPLAM ALIŞ", dataIndex: "toplamAlis", key: "toplamAlis" },
  ];

  return (
    <div>
      <Card
        title={
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Alış Raporu &gt; Dashboard
            </Text>
          </div>
        }
        extra={
          <Space>
            <Button size="small">☐ Liste</Button>
            <Button size="small">Excel</Button>
            <Button size="small">PDF</Button>
          </Space>
        }
      >
        <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Bugünkü Alış
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#cf1322",
                    margin: "5px 0",
                  }}
                >
                  {summary.totalPurchases.toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {summary.totalQuantity} Adet
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowDownOutlined style={{ color: "#cf1322" }} /> -%16
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Son 1 Haftalık Alış
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#cf1322",
                    margin: "5px 0",
                  }}
                >
                  {(summary.totalPurchases * 5).toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {(summary.totalQuantity * 5).toLocaleString()} Adet
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowDownOutlined style={{ color: "#cf1322" }} /> -%16
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Son 1 Aylık Alış
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#3f8600",
                    margin: "5px 0",
                  }}
                >
                  {(summary.totalPurchases * 20).toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {(summary.totalQuantity * 20).toLocaleString()} Adet
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowUpOutlined style={{ color: "#3f8600" }} /> %16
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Bu Ay Alış
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#3f8600",
                    margin: "5px 0",
                  }}
                >
                  {(summary.totalPurchases * 18).toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {(summary.totalQuantity * 18).toLocaleString()} Adet
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowUpOutlined style={{ color: "#3f8600" }} /> %16
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: 30 }}>
          <Title level={5} style={{ fontSize: 13 }}>
            Tüm Alış Grafiği
          </Title>
          {monthlyPurchases.length > 0 && <LineChart data={monthlyPurchases} />}
        </div>

        <div style={{ marginTop: 30 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Title level={5} style={{ fontSize: 13 }}>
                Tedarikçi Bazlı
              </Title>
              {supplierData.length > 0 && <BarChart data={supplierData} />}
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Title level={5} style={{ fontSize: 13 }}>
                Marka Bazlı
              </Title>
              {brandData.length > 0 && <BarChart data={brandData} />}
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Title level={5} style={{ fontSize: 13 }}>
                Kategori Bazlı
              </Title>
              {categoryData.length > 0 && <BarChart data={categoryData} />}
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Title level={5} style={{ fontSize: 13 }}>
                Kategori Bazlı
              </Title>
              {categoryData.length > 0 && <BarChart data={categoryData} />}
            </Col>
          </Row>
        </div>

        <div style={{ marginTop: 30 }}>
          <Title level={5} style={{ fontSize: 13 }}>
            ALIŞ RAPORLARI
          </Title>
          <Table
            columns={columns}
            dataSource={tableData}
            scroll={{ x: 1000 }}
            pagination={{ pageSize: 10 }}
            size="small"
          />
        </div>
      </Card>
    </div>
  );
}
