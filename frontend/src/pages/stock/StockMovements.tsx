import { Card, Table, DatePicker, Select, Space } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function StockMovements() {
  const [data] = useState([]);
  const [loading] = useState(false);

  const columns = [
    { title: "Tarih", dataIndex: "date", key: "date" },
    { title: "Ürün", dataIndex: "product", key: "product" },
    { title: "Hareket Tipi", dataIndex: "type", key: "type" },
    { title: "Miktar", dataIndex: "quantity", key: "quantity" },
    { title: "Birim", dataIndex: "unit", key: "unit" },
    { title: "Depo", dataIndex: "warehouse", key: "warehouse" },
    { title: "Açıklama", dataIndex: "description", key: "description" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Stok Hareketleri</h2>

      <Card style={{ marginBottom: 16 }}>
        <Space wrap>
          <RangePicker defaultValue={[dayjs().subtract(30, "day"), dayjs()]} />
          <Select placeholder="Hareket Tipi" style={{ width: 150 }}>
            <Select.Option value="all">Tümü</Select.Option>
            <Select.Option value="in">Giriş</Select.Option>
            <Select.Option value="out">Çıkış</Select.Option>
          </Select>
          <Select placeholder="Depo" style={{ width: 150 }}>
            <Select.Option value="all">Tümü</Select.Option>
          </Select>
        </Space>
      </Card>

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
