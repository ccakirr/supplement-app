import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Space, Table, Button } from "antd";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import { getSalesByBrand, getMonthlySales } from "../../api/sales";

const { Title, Text } = Typography;

export default function ByBrand() {
  const [brandData, setBrandData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  useEffect(() => {
    getSalesByBrand().then((res) => {
      const data = res.data.map((item: any) => ({
        name: item.label,
        value: item.value,
      }));
      setBrandData(data);
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
      marka: "Marka 1",
      toplam: "600.000",
      adet: "463.750",
      oran: "79,26%",
      kar: "83.750",
      karOran: "64.000",
      karMarj: "82.250",
      toplamSatis: "34.750",
    },
  ];

  const columns = [
    {
      title: "MARKA",
      dataIndex: "marka",
      key: "marka",
      fixed: "left" as const,
    },
    { title: "TOPLAM", dataIndex: "toplam", key: "toplam" },
    { title: "ADET", dataIndex: "adet", key: "adet" },
    { title: "ORAN", dataIndex: "oran", key: "oran" },
    { title: "KAR", dataIndex: "kar", key: "kar" },
    { title: "KAR ORAN", dataIndex: "karOran", key: "karOran" },
    { title: "KAR MARJ", dataIndex: "karMarj", key: "karMarj" },
    { title: "TOPLAM SATIŞ", dataIndex: "toplamSatis", key: "toplamSatis" },
  ];

  return (
    <div>
      <Card
        title={
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Satış Raporu &gt; Marka Bazlı Satışlar
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
          <Col span={12}>
            <Title level={5} style={{ fontSize: 13 }}>
              Marka Bazlı Satış Dağılımı
            </Title>
            {brandData.length > 0 && <PieChart data={brandData} />}
          </Col>
          <Col span={12}>
            <Title level={5} style={{ fontSize: 13 }}>
              Tüm Markaların Satış Grafiği
            </Title>
            {monthlyData.length > 0 && <LineChart data={monthlyData} />}
          </Col>
        </Row>

        <div style={{ marginTop: 30 }}>
          <Title level={5} style={{ fontSize: 13 }}>
            Marka Bazlı Satış Dağılımı
          </Title>
          {brandData.length > 0 && <BarChart data={brandData} />}
        </div>

        <div style={{ marginTop: 30 }}>
          <Title level={5} style={{ fontSize: 13 }}>
            MARKALAR
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
          <Row gutter={[16, 16]}>
            {brandData.slice(0, 5).map((brand, i) => (
              <Col span={4} key={i}>
                <Title level={5} style={{ fontSize: 12 }}>
                  {brand.name}
                </Title>
                <BarChart data={brandData.slice(0, 3)} />
              </Col>
            ))}
          </Row>
        </div>
      </Card>
    </div>
  );
}
