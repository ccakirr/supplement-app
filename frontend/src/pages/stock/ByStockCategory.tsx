import { Card, Table, DatePicker, Row, Col } from "antd";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import PieChart from "../../components/PieChart";
import API_BASE_URL from "../../config/api";

const { RangePicker } = DatePicker;

export default function ByStockCategory() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stock/by-category`);
      const categories = response.data.map((item: any, index: number) => ({
        key: index,
        category: item.category,
        productCount: item.productCount,
        totalStock: item.totalStock,
        totalValue: `₺${item.totalValue?.toFixed(2) || 0}`,
      }));
      setData(categories);

      const pieData = response.data.map((item: any) => ({
        name: item.label || item.category,
        value: item.value || item.totalStock,
      }));
      setChartData(pieData);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const columns = [
    { title: "Kategori", dataIndex: "category", key: "category" },
    { title: "Ürün Sayısı", dataIndex: "productCount", key: "productCount" },
    { title: "Toplam Stok", dataIndex: "totalStock", key: "totalStock" },
    { title: "Toplam Değer", dataIndex: "totalValue", key: "totalValue" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Kategori Bazlı Stok Raporu</h2>

      <Card style={{ marginBottom: 16 }}>
        <RangePicker defaultValue={[dayjs().subtract(30, "day"), dayjs()]} />
      </Card>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Card title="Kategori Dağılımı">
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
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
