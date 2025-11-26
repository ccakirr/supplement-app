import { Card, Table, DatePicker, Row, Col, Statistic } from "antd";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import PieChart from "../../components/PieChart";
import API_BASE_URL from "../../config/api";

const { RangePicker } = DatePicker;

export default function ByCustomer() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalSales: 0,
    avgOrder: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sales/by-customer`);
      const customers = response.data.map((item: any, index: number) => ({
        key: index,
        customer: item.label || item.customer,
        totalSales: `₺${(item.value || item.totalSales || 0).toFixed(2)}`,
        productCount: item.productCount || 0,
        avgOrder: `₺${item.avgOrder?.toFixed(2) || 0}`,
      }));
      setData(customers);

      const pieData = response.data.slice(0, 10).map((item: any) => ({
        name: item.label || item.customer,
        value: item.value || item.totalSales || 0,
      }));
      setChartData(pieData);

      const totalSales = response.data.reduce(
        (sum: number, item: any) => sum + (item.value || item.totalSales || 0),
        0
      );
      const avgOrder =
        response.data.length > 0 ? totalSales / response.data.length : 0;
      setStats({
        totalCustomers: response.data.length,
        totalSales,
        avgOrder,
      });
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const columns = [
    { title: "Müşteri", dataIndex: "customer", key: "customer" },
    { title: "Toplam Satış", dataIndex: "totalSales", key: "totalSales" },
    { title: "Ürün Sayısı", dataIndex: "productCount", key: "productCount" },
    { title: "Ortalama Sipariş", dataIndex: "avgOrder", key: "avgOrder" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Müşteri Bazlı Stok Raporu</h2>

      <Card style={{ marginBottom: 16 }}>
        <RangePicker defaultValue={[dayjs().subtract(30, "day"), dayjs()]} />
      </Card>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Toplam Müşteri" value={stats.totalCustomers} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Toplam Satış"
              value={stats.totalSales.toFixed(2)}
              prefix="₺"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Ortalama Sipariş"
              value={stats.avgOrder.toFixed(2)}
              prefix="₺"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Card title="Top 10 Müşteri">
            <PieChart data={chartData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              size="small"
              scroll={{ y: 300 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
