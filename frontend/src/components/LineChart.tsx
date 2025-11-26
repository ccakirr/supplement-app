import {
  LineChart as RCLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  data: any[];
  dataKey?: string;
}

export default function LineChart({ data, dataKey = "value" }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RCLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
        <YAxis tick={{ fontSize: 10 }} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="#1890ff"
          strokeWidth={2}
        />
      </RCLineChart>
    </ResponsiveContainer>
  );
}
