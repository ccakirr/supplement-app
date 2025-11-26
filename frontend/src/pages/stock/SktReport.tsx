import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Space, Table, Button } from "antd";
import DonutChart from "../../components/DonutChart";
import { getSktAnalysis } from "../../api/stock";

const { Title, Text } = Typography;

export default function SktReport() {
  const [sktData, setSktData] = useState<any>(null);

  useEffect(() => {
    getSktAnalysis().then((res) => setSktData(res.data));
  }, []);

  if (!sktData) {
    return <div>Yükleniyor...</div>;
  }

  const sktCards = [
    {
      period: "SKT 2 Ay Kalan",
      value: sktData.expiring2MonthsValue,
      count: sktData.expiring2Months,
      color: "#52c41a",
      percentage: (
        (sktData.expiring2MonthsValue / sktData.totalStockValue) *
        100
      ).toFixed(1),
    },
    {
      period: "SKT 6 Ay Kalan",
      value: sktData.expiring6MonthsValue,
      count: sktData.expiring6Months,
      color: "#faad14",
      percentage: (
        (sktData.expiring6MonthsValue / sktData.totalStockValue) *
        100
      ).toFixed(1),
    },
    {
      period: "SKT 12 Ay Kalan",
      value: sktData.expiring12MonthsValue,
      count: sktData.expiring12Months,
      color: "#1890ff",
      percentage: (
        (sktData.expiring12MonthsValue / sktData.totalStockValue) *
        100
      ).toFixed(1),
    },
    {
      period: "Toplam Stok",
      value: sktData.totalStockValue,
      count: sktData.totalStock,
      color: "#52c41a",
      percentage: 100,
    },
    {
      period: "SKT Geçen",
      value: sktData.expiredValue,
      count: sktData.expired,
      color: "#f5222d",
      percentage: (
        (sktData.expiredValue / sktData.totalStockValue) *
        100
      ).toFixed(1),
    },
  ];

  const tableData = [
    {
      key: "1",
      depo: "Depo 1",
      marka: "Marka 1",
      kategori: "Kategori 1",
      urunKodu: "UK001",
      barkod: "123456",
      urunAdi: "Ürün Adı 1",
      lotParti: "LOT001",
      skt: "01.01.2026",
      sktDurumu: "2 Ay",
      miktar: "100",
      alisFiyati: "10.00",
      alisFiyatiToplam: "1000.00",
      toplam: "1000.00",
    },
  ];

  const columns = [
    { title: "Depo", dataIndex: "depo", key: "depo", width: 100 },
    { title: "Marka", dataIndex: "marka", key: "marka", width: 100 },
    { title: "Kategori", dataIndex: "kategori", key: "kategori", width: 100 },
    { title: "Ürün Kodu", dataIndex: "urunKodu", key: "urunKodu", width: 100 },
    { title: "Barkod", dataIndex: "barkod", key: "barkod", width: 100 },
    { title: "Ürün Adı", dataIndex: "urunAdi", key: "urunAdi", width: 150 },
    {
      title: "Lot / Parti",
      dataIndex: "lotParti",
      key: "lotParti",
      width: 100,
    },
    { title: "SKT", dataIndex: "skt", key: "skt", width: 100 },
    {
      title: "SKT DURUMU",
      dataIndex: "sktDurumu",
      key: "sktDurumu",
      width: 100,
    },
    { title: "Miktar", dataIndex: "miktar", key: "miktar", width: 80 },
    {
      title: "Alış Fiyatı",
      dataIndex: "alisFiyati",
      key: "alisFiyati",
      width: 100,
    },
    {
      title: "Alış Fiyatı",
      dataIndex: "alisFiyatiToplam",
      key: "alisFiyatiToplam",
      width: 100,
    },
    { title: "TOPLAM", dataIndex: "toplam", key: "toplam", width: 100 },
  ];

  return (
    <div>
      <Card
        title={
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Stok Raporu &gt; SKT Durum Raporu
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
          {sktCards.map((item, index) => (
            <Col span={4} key={index}>
              <div style={{ textAlign: "center" }}>
                <Title level={5} style={{ fontSize: 12 }}>
                  {item.period}
                </Title>
                <Title
                  level={3}
                  style={{ color: item.color, margin: "5px 0", fontSize: 20 }}
                >
                  {item.value.toLocaleString()} TL
                </Title>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {item.count.toLocaleString()} Adet
                </Text>
                <div style={{ marginTop: 10 }}>
                  <DonutChart
                    title=""
                    value={
                      typeof item.percentage === "string"
                        ? parseFloat(item.percentage)
                        : item.percentage
                    }
                    legend="Toplam Stok"
                  />
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <div style={{ marginTop: 30 }}>
          <Title level={5} style={{ fontSize: 13 }}>
            SKT 3 AY KALAN ÜRÜNLER
          </Title>
          <Table
            columns={columns}
            dataSource={tableData}
            scroll={{ x: 1500 }}
            pagination={false}
            size="small"
          />
        </div>

        <div style={{ marginTop: 30 }}>
          <Title level={5} style={{ fontSize: 13 }}>
            SKT 6 AY KALAN ÜRÜNLER
          </Title>
          <Table
            columns={columns}
            dataSource={[]}
            scroll={{ x: 1500 }}
            pagination={false}
            size="small"
          />
        </div>

        <div style={{ marginTop: 30 }}>
          <Title level={5} style={{ fontSize: 13 }}>
            SKT 12 AY KALAN ÜRÜNLER
          </Title>
          <Table
            columns={columns}
            dataSource={[]}
            scroll={{ x: 1500 }}
            pagination={false}
            size="small"
          />
        </div>
      </Card>
    </div>
  );
}
