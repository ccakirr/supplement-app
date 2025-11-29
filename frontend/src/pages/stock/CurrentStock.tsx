import { Card, Table, Tag } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

export default function CurrentStock() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/stock/products`);
      const products = response.data.map((item: any, index: number) => ({
        key: index,
        code: item.barcode,
        name: item.name,
        category: item.category,
        brand: item.brand,
        quantity: item.stock,
        unit: "Adet",
        warehouse: "Ana Depo",
      }));
      setData(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Ürün Kodu", dataIndex: "code", key: "code" },
    { title: "Ürün Adı", dataIndex: "name", key: "name" },
    { title: "Kategori", dataIndex: "category", key: "category" },
    { title: "Marka", dataIndex: "brand", key: "brand" },
    {
      title: "Stok Miktarı",
      dataIndex: "quantity",
      key: "quantity",
      render: (val: number) => (
        <Tag color={val < 10 ? "red" : val < 50 ? "orange" : "green"}>
          {val}
        </Tag>
      ),
    },
    { title: "Birim", dataIndex: "unit", key: "unit" },
    { title: "Depo", dataIndex: "warehouse", key: "warehouse" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Güncel Stoklar</h2>
      <Card>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: 20 }}
        />
      </Card>
    </div>
  );
}
