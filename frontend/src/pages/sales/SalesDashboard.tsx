import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Space, Button, Table } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import {
  getSalesSummary,
  getMonthlySales,
  getSalesByChannel,
  getSalesByCustomer,
  getSalesByBrand,
  getSalesByCategory,
} from "../../api/sales";

const { Title, Text } = Typography;

export default function SalesDashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [monthlySales, setMonthlySales] = useState<any[]>([]);
  const [channelData, setChannelData] = useState<any[]>([]);
  const [customerData, setCustomerData] = useState<any[]>([]);
  const [brandData, setBrandData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);

  useEffect(() => {
    getSalesSummary().then((res) => setSummary(res.data));
    getMonthlySales(2025).then((res) => {
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
      setMonthlySales(data);
    });
    getSalesByChannel().then((res) =>
      setChannelData(
        res.data.map((item: any) => ({ name: item.label, value: item.value }))
      )
    );
    getSalesByCustomer().then((res) =>
      setCustomerData(
        res.data.map((item: any) => ({ name: item.label, value: item.value }))
      )
    );
    getSalesByBrand().then((res) =>
      setBrandData(
        res.data.map((item: any) => ({ name: item.label, value: item.value }))
      )
    );
    getSalesByCategory().then((res) =>
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
      depo: "Depo 1",
      marka: "Marka 1",
      kategori: "Kategori 1",
      urunKodu: "UK001",
      barkod: "123456",
      urunAdi: "Ürün Adı 1",
      skt: "01.01.2026",
      sktDurumu: "Normal",
      miktar: "100",
      alisFiyati: "10.00",
      alisFiyatiToplam: "1000.00",
      toplam: "1000.00",
    },
  ];

  const columns = [
    { title: "Depo", dataIndex: "depo", key: "depo" },
    { title: "Marka", dataIndex: "marka", key: "marka" },
    { title: "Kategori", dataIndex: "kategori", key: "kategori" },
    { title: "Ürün Kodu", dataIndex: "urunKodu", key: "urunKodu" },
    { title: "Barkod", dataIndex: "barkod", key: "barkod" },
    { title: "Ürün Adı", dataIndex: "urunAdi", key: "urunAdi" },
    { title: "SKT", dataIndex: "skt", key: "skt" },
    { title: "SKT DURUMU", dataIndex: "sktDurumu", key: "sktDurumu" },
    { title: "Miktar", dataIndex: "miktar", key: "miktar" },
    { title: "Alış Fiyatı", dataIndex: "alisFiyati", key: "alisFiyati" },
    {
      title: "Alış Fiyatı",
      dataIndex: "alisFiyatiToplam",
      key: "alisFiyatiToplam",
    },
    { title: "TOPLAM", dataIndex: "toplam", key: "toplam" },
  ];

  return (
    <div>
      <Card
        title={
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Satış Raporu &gt; Dashboard
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
          <Col span={6}>
            <Card>
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Bugünkü Satış
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#3f8600",
                    margin: "5px 0",
                  }}
                >
                  {summary.totalSales.toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {summary.totalQuantity} Adet
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowUpOutlined style={{ color: "#3f8600" }} /> %16
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Son 1 Haftalık Satış
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#3f8600",
                    margin: "5px 0",
                  }}
                >
                  {(summary.totalSales * 5).toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {(summary.totalQuantity * 5).toLocaleString()} Adet
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowUpOutlined style={{ color: "#3f8600" }} /> %16
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Son 1 Aylık Satış
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#3f8600",
                    margin: "5px 0",
                  }}
                >
                  {(summary.totalSales * 20).toLocaleString()} TL
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
          <Col span={6}>
            <Card>
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Bu Ay Satış
                </Text>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#cf1322",
                    margin: "5px 0",
                  }}
                >
                  {(summary.totalSales * 18).toLocaleString()} TL
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {(summary.totalQuantity * 18).toLocaleString()} Adet
                </Text>
                <div style={{ marginTop: 5 }}>
                  <ArrowDownOutlined style={{ color: "#cf1322" }} /> -%16
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <div style={{ marginTop: 30 }}>
          <Title level={5} style={{ fontSize: 13 }}>
            Tüm Satış Grafiği
          </Title>
          {monthlySales.length > 0 && <LineChart data={monthlySales} />}
        </div>

        <div style={{ marginTop: 30 }}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Title level={5} style={{ fontSize: 13 }}>
                Satış Kanalı Bazlı
              </Title>
              {channelData.length > 0 && <BarChart data={channelData} />}
            </Col>
            <Col span={6}>
              <Title level={5} style={{ fontSize: 13 }}>
                Müşteri Bazlı
              </Title>
              {customerData.length > 0 && <BarChart data={customerData} />}
            </Col>
            <Col span={6}>
              <Title level={5} style={{ fontSize: 13 }}>
                Marka Bazlı
              </Title>
              {brandData.length > 0 && <BarChart data={brandData} />}
            </Col>
            <Col span={6}>
              <Title level={5} style={{ fontSize: 13 }}>
                Kategori Bazlı
              </Title>
              {categoryData.length > 0 && <BarChart data={categoryData} />}
            </Col>
          </Row>
        </div>

        <div style={{ marginTop: 30 }}>
          <Title level={5} style={{ fontSize: 13 }}>
            SATIŞ RAPORLARI
          </Title>
          <Table
            columns={columns}
            dataSource={tableData}
            scroll={{ x: 1500 }}
            pagination={{ pageSize: 10 }}
            size="small"
          />
        </div>
      </Card>
    </div>
  );
}
