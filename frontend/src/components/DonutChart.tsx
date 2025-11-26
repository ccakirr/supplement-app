import { PieChart, Pie, Cell } from "recharts";

interface Props {
  title: string;
  value: number;
  legend: string;
}

export default function DonutChart({ title, value, legend }: Props) {
  const data = [
    { name: "Kullanılan", value: value },
    { name: "Kalan", value: 100 - value },
  ];

  // Görseldeki renk şeması
  const getColor = (val: number) => {
    if (val < 1) return "#1890ff"; // Mavi
    if (val < 2) return "#faad14"; // Turuncu
    return "#52c41a"; // Yeşil
  };

  const COLORS = [getColor(value), "#e8e8e8"];

  return (
    <div style={{ textAlign: "center" }}>
      {title && (
        <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 10 }}>
          {title}
        </div>
      )}
      <div style={{ position: "relative", display: "inline-block" }}>
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={0}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx]} strokeWidth={0} />
            ))}
          </Pie>
        </PieChart>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 32,
            fontWeight: "bold",
            color: "#000",
          }}
        >
          {value.toFixed(2)}
        </div>
      </div>
      {legend && (
        <div style={{ fontSize: 11, color: "#999", marginTop: 5 }}>
          {legend}
        </div>
      )}
    </div>
  );
}
