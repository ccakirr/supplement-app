import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Space, Table, Button } from "antd";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import {
  getPurchasesBySupplier,
  getMonthlyPurchases,
} from "../../api/purchases";

const { Title, Text } = Typography;

export default function BySupplier() {
  const [supplierData, setSupplierData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  useEffect(() => {
    getPurchasesBySupplier().then((res) => {
      const data = res.data.map((item: any) => ({
        name: item.label,
        value: item.value,
      }));
      setSupplierData(data);
    });

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
      setMonthlyData(data);
    });
  }, []);

  const tableData = [
    {
      key: "1",
      tedarikci: "Tedarikçi 1",
      toplam: "1.200.000",
      adet: "1.390.375",
      oran: "136,28%",
    },
  ];

  const columns = [
    {
      title: "TEDARİKÇİ",
      dataIndex: "tedarikci",
      key: "tedarikci",
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
              Alış Raporu &gt; Tedarikçi Bazlı Alışlar
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
              Tedarikçi Bazlı Alış Dağılımı
            </Title>
            {supplierData.length > 0 && <PieChart data={supplierData} />}
          </Col>
          <Col xs={24} md={12}>
            <Title level={5} style={{ fontSize: 13 }}>
              Tüm Tedarikçilerin Alış Grafiği
            </Title>
            {monthlyData.length > 0 && <LineChart data={monthlyData} />}
          </Col>
        </Row>

        <div style={{ marginTop: 30 }}>
          <Title level={5} style={{ fontSize: 13 }}>
            Tedarikçi Bazlı Alış Dağılımı
          </Title>
          {supplierData.length > 0 && <BarChart data={supplierData} />}
        </div>

        <div style={{ marginTop: 30 }}>
          <Title level={5} style={{ fontSize: 13 }}>
            TEDARİKÇİLER
          </Title>
          <Table
            columns={columns}
            dataSource={tableData}
            scroll={{ x: 1000 }}
            pagination={false}
            size="small"
          />
        </div>

        <div style={{ marginTop: 30 }}>
          <Row gutter={[16, 16]}>
            {supplierData.slice(0, 5).map((supplier, i) => (
              <Col span={4} key={i}>
                <Title level={5} style={{ fontSize: 12 }}>
                  {supplier.name}
                </Title>
                <BarChart data={supplierData.slice(0, 3)} />
              </Col>
            ))}
          </Row>
        </div>
      </Card>
    </div>
  );
}
