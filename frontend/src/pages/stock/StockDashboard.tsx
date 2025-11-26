import { useEffect, useState } from "react";
import { Row, Col, Card, Space, Typography, Button } from "antd";
import DonutChart from "../../components/DonutChart";
import BarChart from "../../components/BarChart";
import {
  getStockSummary,
  getCriticalStock,
  getStockTurnover,
} from "../../api/stock";

const { Title, Text } = Typography;

export default function StockDashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [criticalStock, setCriticalStock] = useState<any[]>([]);
  const [turnover, setTurnover] = useState<any>(null);

  useEffect(() => {
    getStockSummary().then((res) => setSummary(res.data));
    getCriticalStock().then((res) => setCriticalStock(res.data));
    getStockTurnover().then((res) => setTurnover(res.data));
  }, []);

  if (!summary || !turnover) {
    return <div>Yükleniyor...</div>;
  }

  const stockValues = [
    {
      title: "Stok Değeri",
      value: `${summary.totalStockValue.toLocaleString()} TL`,
      subtext: `${summary.totalStock} Ürün`,
    },
    {
      title: "SKT Yaklaşan",
      value: `${summary.expiringIn3Months} Ürün`,
      subtext: "3 Ay İçinde",
    },
    {
      title: "SKT Geçen",
      value: `${summary.expired} Ürün`,
      subtext: "Geçmiş",
    },
    {
      title: "Kritik Stok",
      value: `${summary.criticalStock} Ürün`,
      subtext: "Stok < 10",
    },
  ];

  const stockTurnover = [
    { title: "Bugün", value: turnover.daily, label: "Bu Ay" },
    { title: "Son 1 Hafta", value: turnover.weekly, label: "Son 3 Ay" },
    { title: "Son 1 Ay", value: turnover.monthly, label: "Son 6 Ay" },
    { title: "Bu Yıl", value: turnover.yearly, label: "Bu Yıl" },
  ];

  const criticalStockData =
    criticalStock.length > 0
      ? criticalStock.map((item) => ({ name: item.label, value: item.value }))
      : [
          { name: "ÜRÜN 1", value: 21000 },
          { name: "ÜRÜN 2", value: 18000 },
          { name: "ÜRÜN 3", value: 16000 },
          { name: "ÜRÜN 4", value: 15000 },
          { name: "ÜRÜN 5", value: 14000 },
          { name: "ÜRÜN 6", value: 12000 },
          { name: "ÜRÜN 7", value: 12000 },
          { name: "ÜRÜN 8", value: 10000 },
          { name: "ÜRÜN 9", value: 10000 },
          { name: "ÜRÜN 10", value: 10000 },
        ];

  return (
    <div>
      <Card
        title={
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Stok Raporu &gt; Dashboard
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
        style={{ marginBottom: 20 }}
      >
        {/* Üst Özet Kartlar */}
        <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>
          {stockValues.map((item, index) => (
            <Col span={6} key={index}>
              <div style={{ textAlign: "center" }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {item.title}
                </Text>
                <div
                  style={{ fontSize: 24, fontWeight: "bold", margin: "5px 0" }}
                >
                  {item.value}
                </div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {item.subtext}
                </Text>
              </div>
            </Col>
          ))}
        </Row>

        {/* Stok Devir Hızı */}
        <div style={{ marginBottom: 30 }}>
          <Title level={5} style={{ fontSize: 13, marginBottom: 15 }}>
            STOK DEĞİR HIZI
          </Title>
          <Row gutter={[16, 16]}>
            {stockTurnover.map((item, index) => (
              <Col span={6} key={index}>
                <DonutChart
                  title={item.title}
                  value={item.value}
                  legend={item.label}
                />
              </Col>
            ))}
          </Row>
        </div>

        {/* Kritik Stok */}
        <div style={{ marginBottom: 30 }}>
          <Title level={5} style={{ fontSize: 13, marginBottom: 15 }}>
            KRİTİK STOK
          </Title>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Text strong style={{ fontSize: 11 }}>
                Bugün
              </Text>
              <BarChart data={criticalStockData} />
            </Col>
            <Col span={6}>
              <Text strong style={{ fontSize: 11 }}>
                Son 1 Hafta
              </Text>
              <BarChart data={criticalStockData} />
            </Col>
            <Col span={6}>
              <Text strong style={{ fontSize: 11 }}>
                Son 1 Ay
              </Text>
              <BarChart data={criticalStockData} />
            </Col>
            <Col span={6}>
              <Text strong style={{ fontSize: 11 }}>
                Bu Yıl
              </Text>
              <BarChart data={criticalStockData} />
            </Col>
          </Row>
        </div>

        {/* En Çok Satan Ürünler */}
        <div style={{ marginBottom: 30 }}>
          <Title level={5} style={{ fontSize: 13, marginBottom: 15 }}>
            EN ÇOK SATAN ÜRÜNLER
          </Title>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Text strong style={{ fontSize: 11 }}>
                Bugün
              </Text>
              <BarChart data={criticalStockData} />
            </Col>
            <Col span={6}>
              <Text strong style={{ fontSize: 11 }}>
                Son 1 Hafta
              </Text>
              <BarChart data={criticalStockData} />
            </Col>
            <Col span={6}>
              <Text strong style={{ fontSize: 11 }}>
                Son 1 Ay
              </Text>
              <BarChart data={criticalStockData} />
            </Col>
            <Col span={6}>
              <Text strong style={{ fontSize: 11 }}>
                Bu Yıl
              </Text>
              <BarChart data={criticalStockData} />
            </Col>
          </Row>
        </div>

        {/* Hareket Görmeyen Ürünler */}
        <div>
          <Title level={5} style={{ fontSize: 13, marginBottom: 15 }}>
            HAREKET GÖRMEYEN ÜRÜNLER
          </Title>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Text strong style={{ fontSize: 11 }}>
                Son 3 Ay
              </Text>
              <BarChart data={criticalStockData} />
            </Col>
            <Col span={6}>
              <Text strong style={{ fontSize: 11 }}>
                Son 6 Ay
              </Text>
              <BarChart data={criticalStockData} />
            </Col>
            <Col span={6}>
              <Text strong style={{ fontSize: 11 }}>
                Son 6 Ay
              </Text>
              <BarChart data={criticalStockData} />
            </Col>
            <Col span={6}>
              <Text strong style={{ fontSize: 11 }}>
                Bu Yıl
              </Text>
              <BarChart data={criticalStockData} />
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
}
