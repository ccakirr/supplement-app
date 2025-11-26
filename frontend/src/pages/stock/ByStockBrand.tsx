import { Card, Table, DatePicker, Row, Col } from "antd";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import PieChart from "../../components/PieChart";
import API_BASE_URL from "../../config/api";

const { RangePicker } = DatePicker;

export default function ByStockBrand() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stock/by-brand`);
      const brands = response.data.map((item: any, index: number) => ({
        key: index,
        brand: item.brand,
        productCount: item.productCount,
        totalStock: item.totalStock,
        totalValue: `₺${item.totalValue?.toFixed(2) || 0}`,
      }));
      setData(brands);

      const pieData = response.data.map((item: any) => ({
        name: item.label || item.brand,
        value: item.value || item.totalStock,
      }));
      setChartData(pieData);
    } catch (error) {
      console.error("Error fetching brand data:", error);
    }
  };

  const columns = [
    { title: "Marka", dataIndex: "brand", key: "brand" },
    { title: "Ürün Sayısı", dataIndex: "productCount", key: "productCount" },
    { title: "Toplam Stok", dataIndex: "totalStock", key: "totalStock" },
    { title: "Toplam Değer", dataIndex: "totalValue", key: "totalValue" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Marka Bazlı Stok Raporu</h2>

      <Card style={{ marginBottom: 16 }}>
        <RangePicker defaultValue={[dayjs().subtract(30, "day"), dayjs()]} />
      </Card>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col xs={24} md={12}>
          <Card title="Marka Dağılımı">
            <PieChart data={chartData} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
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
