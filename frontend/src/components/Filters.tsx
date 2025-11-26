import { Card, Select, DatePicker, Button, Space } from "antd";
import { useState } from "react";

const { RangePicker } = DatePicker;

interface FiltersProps {
  onFilterChange?: (filters: any) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState({
    depot: null,
    brand: null,
    category: null,
    product: null,
    source: null,
    channel: null,
    customer: null,
    supplier: null,
    dateRange: null,
  });

  const handleChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <Card
      title="RAPOR KRİTERLERİ"
      style={{ marginBottom: 20 }}
      styles={{
        header: { background: "#f5f5f5", fontWeight: "bold", fontSize: 12 },
      }}
    >
      <Space style={{ width: "100%", flexDirection: "column" }} size="middle">
        <div>
          <div style={{ marginBottom: 5, fontSize: 11, fontWeight: 500 }}>
            STOK DEĞERİ HESAPLAMA
          </div>
          <Select
            style={{ width: "100%" }}
            placeholder="Seçiniz"
            size="small"
            options={[
              { label: "Alış Fiyatı", value: "purchase" },
              { label: "Satış Fiyatı", value: "sale" },
            ]}
          />
        </div>

        <div>
          <div style={{ marginBottom: 5, fontSize: 11, fontWeight: 500 }}>
            STOK TÜRÜ
          </div>
          <Select
            style={{ width: "100%" }}
            placeholder="Seçiniz"
            size="small"
            options={[
              { label: "Tümü", value: "all" },
              { label: "Kritik Stok", value: "critical" },
            ]}
          />
        </div>

        <div>
          <div style={{ marginBottom: 5, fontSize: 11, fontWeight: 500 }}>
            TARİH
          </div>
          <RangePicker
            style={{ width: "100%" }}
            format="DD.MM.YYYY"
            placeholder={["Başlangıç", "Bitiş"]}
            size="small"
          />
        </div>

        <div>
          <div style={{ marginBottom: 5, fontSize: 11, fontWeight: 500 }}>
            SKT DURUMU
          </div>
          <Select
            style={{ width: "100%" }}
            placeholder="Seçiniz"
            size="small"
            options={[
              { label: "Tümü", value: "all" },
              { label: "Geçmiş", value: "expired" },
              { label: "Yaklaşan", value: "approaching" },
            ]}
          />
        </div>

        <div>
          <div style={{ marginBottom: 5, fontSize: 11, fontWeight: 500 }}>
            DEPO
          </div>
          <Select
            style={{ width: "100%" }}
            placeholder="Seçiniz"
            size="small"
            onChange={(value) => handleChange("depot", value)}
          />
        </div>

        <div>
          <div style={{ marginBottom: 5, fontSize: 11, fontWeight: 500 }}>
            MARKA
          </div>
          <Select
            style={{ width: "100%" }}
            placeholder="Seçiniz"
            size="small"
            onChange={(value) => handleChange("brand", value)}
          />
        </div>

        <div>
          <div style={{ marginBottom: 5, fontSize: 11, fontWeight: 500 }}>
            KATEGORİ
          </div>
          <Select
            style={{ width: "100%" }}
            placeholder="Seçiniz"
            size="small"
            onChange={(value) => handleChange("category", value)}
          />
        </div>

        <div>
          <div style={{ marginBottom: 5, fontSize: 11, fontWeight: 500 }}>
            ÜRÜN
          </div>
          <Select
            style={{ width: "100%" }}
            placeholder="Seçiniz"
            size="small"
            onChange={(value) => handleChange("product", value)}
          />
        </div>

        <div>
          <div style={{ marginBottom: 5, fontSize: 11, fontWeight: 500 }}>
            KAYNAK
          </div>
          <Select
            style={{ width: "100%" }}
            placeholder="Seçiniz"
            size="small"
            onChange={(value) => handleChange("source", value)}
          />
        </div>

        <div>
          <div style={{ marginBottom: 5, fontSize: 11, fontWeight: 500 }}>
            SATIŞ KANALI
          </div>
          <Select
            style={{ width: "100%" }}
            placeholder="Seçiniz"
            size="small"
            onChange={(value) => handleChange("channel", value)}
          />
        </div>

        <div>
          <div style={{ marginBottom: 5, fontSize: 11, fontWeight: 500 }}>
            MÜŞTERİ
          </div>
          <Select
            style={{ width: "100%" }}
            placeholder="Seçiniz"
            size="small"
            onChange={(value) => handleChange("customer", value)}
          />
        </div>

        <div>
          <div style={{ marginBottom: 5, fontSize: 11, fontWeight: 500 }}>
            TEDARİKÇİ
          </div>
          <Select
            style={{ width: "100%" }}
            placeholder="Seçiniz"
            size="small"
            onChange={(value) => handleChange("supplier", value)}
          />
        </div>

        <Button
          type="primary"
          block
          size="small"
          style={{
            marginTop: 10,
            background: "#e8e8e8",
            color: "#000",
            borderColor: "#d9d9d9",
          }}
        >
          RAPOR OLUŞTUR
        </Button>
      </Space>
    </Card>
  );
}
