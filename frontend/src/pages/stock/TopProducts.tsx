import { Card, Table, DatePicker, Row, Col, Statistic } from "antd";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const { RangePicker } = DatePicker;

export default function TopProducts() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({ total: 0, totalSales: 0, avgPrice: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/sales/top-products?count=20`
      );
      const products = response.data.map((item: any, index: number) => ({
        key: index,
        rank: index + 1,
        product: item.label || item.productName,
        category: item.category || "-",
        brand: item.brand || "-",
        quantity: item.totalQuantity,
        total: `₺${(item.value || item.totalAmount || 0).toFixed(2)}`,
      }));
      setData(products);

      const barData = response.data.slice(0, 10).map((item: any) => ({
        name: (item.label || item.productName || "").substring(0, 15),
        Satış: item.value || item.totalAmount || 0,
      }));
      setChartData(barData);

      const totalSales = response.data.reduce(
        (sum: number, item: any) => sum + (item.value || item.totalAmount || 0),
        0
      );
      const avgPrice =
        response.data.length > 0 ? totalSales / response.data.length : 0;
      setStats({
        total: response.data.length,
        totalSales,
        avgPrice,
      });
    } catch (error) {
      console.error("Error fetching top products:", error);
    }
  };

  const columns = [
    { title: "Sıra", dataIndex: "rank", key: "rank" },
    { title: "Ürün", dataIndex: "product", key: "product" },
    { title: "Kategori", dataIndex: "category", key: "category" },
    { title: "Marka", dataIndex: "brand", key: "brand" },
    { title: "Satış Adedi", dataIndex: "quantity", key: "quantity" },
    { title: "Toplam Tutar", dataIndex: "total", key: "total" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>En Çok Satan Ürünler</h2>

      <Card style={{ marginBottom: 16 }}>
        <RangePicker defaultValue={[dayjs().subtract(30, "day"), dayjs()]} />
      </Card>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Toplam Ürün" value={stats.total} />
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
              title="Ortalama Fiyat"
              value={stats.avgPrice.toFixed(2)}
              prefix="₺"
            />
          </Card>
        </Col>
      </Row>

      <Card title="Top 10 Ürün Satışları" style={{ marginBottom: 16 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Satış" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 20 }}
        />
      </Card>
    </div>
  );
}
