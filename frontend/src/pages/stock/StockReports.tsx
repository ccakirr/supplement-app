import { Card, Row, Col, Statistic, Table, DatePicker } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function StockReports() {
  const [data] = useState([]);

  const columns = [
    { title: "Ürün", dataIndex: "product", key: "product" },
    { title: "Açılış Stoku", dataIndex: "opening", key: "opening" },
    { title: "Giriş", dataIndex: "in", key: "in" },
    { title: "Çıkış", dataIndex: "out", key: "out" },
    { title: "Kapanış Stoku", dataIndex: "closing", key: "closing" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Stok Raporları</h2>

      <Card style={{ marginBottom: 16 }}>
        <RangePicker defaultValue={[dayjs().subtract(30, "day"), dayjs()]} />
      </Card>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Toplam Giriş"
              value={0}
              prefix={<ArrowDownOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Toplam Çıkış"
              value={0}
              prefix={<ArrowUpOutlined style={{ color: "#cf1322" }} />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Net Değişim" value={0} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Toplam Ürün" value={0} />
          </Card>
        </Col>
      </Row>

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
