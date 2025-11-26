import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Space, Table, Button } from "antd";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import { getSalesByCategory, getMonthlySales } from "../../api/sales";

const { Title, Text } = Typography;

export default function ByCategory() {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  useEffect(() => {
    getSalesByCategory().then((res) => {
      const data = res.data.map((item: any) => ({
        name: item.label,
        value: item.value,
      }));
      setCategoryData(data);
    });

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
      setMonthlyData(data);
    });
  }, []);

  const tableData = [
    {
      key: "1",
      kategori: "Kategori 1",
      toplam: "600.000",
      adet: "463.750",
      oran: "79,26%",
    },
  ];

  const columns = [
    {
      title: "KATEGORİ",
      dataIndex: "kategori",
      key: "kategori",
      fixed: "left" as const,
    },
    { title: "TOPLAM", dataIndex: "toplam", key: "toplam" },
    { title: "ADET", dataIndex: "adet", key: "adet" },
    { title: "ORAN", dataIndex: "oran", key: "oran" },
  ];

  return (
    <div>
      <Card
        title={
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Satış Raporu &gt; Kategori Bazlı Satışlar
            </Text>
          </div>
        }
        extra={
          <Space>
            <Button size="small">☐ Liste</Button>
            <Button size="small">Filtrele</Button>
            <Button size="small">Excel</Button>
            <Button size="small">PDF</Button>
          </Space>
        }
      >
        <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>
          <Col xs={24} md={12}>
            <Title level={5} style={{ fontSize: 13 }}>
              Kategori Bazlı Satış Dağılımı
            </Title>
            {categoryData.length > 0 && <PieChart data={categoryData} />}
          </Col>
          <Col xs={24} md={12}>
            <Title level={5} style={{ fontSize: 13 }}>
              Tüm Kategorilerin Satış Grafiği
            </Title>
            {monthlyData.length > 0 && <LineChart data={monthlyData} />}
          </Col>
        </Row>

        <div style={{ marginTop: 30 }}>
          <Title level={5} style={{ fontSize: 13 }}>
            Kategori Bazlı Satış Dağılımı
          </Title>
          {categoryData.length > 0 && <BarChart data={categoryData} />}
        </div>

        <div style={{ marginTop: 30 }}>
          <Title level={5} style={{ fontSize: 13 }}>
            KATEGORİLER
          </Title>
          <Table
            columns={columns}
            dataSource={tableData}
            scroll={{ x: 1000 }}
            pagination={false}
            size="small"
          />
        </div>
      </Card>
    </div>
  );
}
