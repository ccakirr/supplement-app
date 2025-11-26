import { Card } from "antd";

interface Props {
  title: string;
  value: string;
  color?: string;
}

export default function SummaryCard({ title, value, color = "#1890ff" }: Props) {
  return (
    <Card
      style={{
        borderLeft: `6px solid ${color}`,
        borderRadius: 8,
        height: 120,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ fontSize: 16, opacity: 0.7 }}>{title}</div>
      <div style={{ fontSize: 26, fontWeight: 700 }}>{value}</div>
    </Card>
  );
}
