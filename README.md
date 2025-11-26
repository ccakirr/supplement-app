# Supplement Envanter ve Raporlama Sistemi

Takviye gıda (supplement) perakende işletmeleri için geliştirilmiş kapsamlı envanter yönetimi ve satış raporlama sistemi.

## 🚀 Özellikler

- **Stok Yönetimi**: Gerçek zamanlı stok takibi, kritik stok uyarıları
- **SKT Takibi**: Son kullanma tarihi izleme ve uyarı sistemi
- **Satış Raporları**: Marka, kategori, kanal ve müşteri bazlı analiz
- **Alış Takibi**: Tedarikçi performansı ve alış trendleri
- **Görsel Dashboard**: İnteraktif grafikler ve raporlar
- **Çok Boyutlu Analiz**: Zaman, kategori, marka boyutlarında raporlama

## 🛠️ Teknoloji Stack

### Backend

- ASP.NET Core 8.0
- Entity Framework Core
- SQLite Database

### Frontend

- React 18 + TypeScript
- Vite
- Ant Design
- Recharts
- React Router v6

## 📦 Kurulum

### Gereksinimler

- .NET 8.0 SDK
- Node.js 20+
- npm veya yarn

### Backend Kurulumu

```bash
# Projeyi klonlayın
git clone <repository-url>
cd ReportProject

# Bağımlılıkları yükleyin
dotnet restore

# Uygulamayı çalıştırın
dotnet run
```

Backend http://localhost:5237 adresinde çalışacaktır.

### Frontend Kurulumu

```bash
# Frontend dizinine gidin
cd frontend

# Bağımlılıkları yükleyin
npm install

# Development server'ı başlatın
npm run dev
```

Frontend http://localhost:5173 adresinde çalışacaktır.

## 🐳 Docker ile Çalıştırma

```bash
# Docker image'ı build edin
docker build -t supplement-app .

# Container'ı çalıştırın
docker run -p 8080:8080 -v $(pwd)/data:/app/data supplement-app
```

## 🚂 Railway Deployment

### Adım 1: Railway Hesabı Oluşturun

1. [Railway.app](https://railway.app) adresine gidin
2. GitHub hesabınızla giriş yapın

### Adım 2: Yeni Proje Oluşturun

1. "New Project" butonuna tıklayın
2. "Deploy from GitHub repo" seçeneğini seçin
3. Repository'nizi seçin

### Adım 3: Environment Variables (Opsiyonel)

Railway otomatik olarak PORT değişkenini ayarlayacaktır. İsteğe bağlı olarak:

```
DB_PATH=/app/data/report.db
ASPNETCORE_ENVIRONMENT=Production
```

### Adım 4: Deploy

Railway otomatik olarak Dockerfile'ı algılayacak ve deploy edecektir.

### Adım 5: Volume Ekleme (Veritabanı Kalıcılığı)

1. Railway dashboard'da projenize gidin
2. "Variables" sekmesine tıklayın
3. "Add Volume" butonuna tıklayın
4. Mount path: `/app/data`

## 📁 Proje Yapısı

```
ReportProject/
├── Controllers/          # API Controllers
├── Services/            # Business Logic
├── Models/              # Entity Models
├── Data/                # DbContext & Migrations
├── frontend/            # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable Components
│   │   ├── pages/       # Page Components
│   │   ├── api/         # API Services
│   │   ├── layout/      # Layout Components
│   │   └── config/      # Configuration
│   └── public/
├── Dockerfile           # Docker Configuration
├── railway.json         # Railway Configuration
└── appsettings.json     # App Configuration
```

## 🔧 Geliştirme

### Backend Development

```bash
# Watch mode ile çalıştırma
dotnet watch run

# Migration oluşturma
dotnet ef migrations add MigrationName

# Database güncelleme
dotnet ef database update
```

### Frontend Development

```bash
cd frontend

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 📊 API Endpoints

### Stock Endpoints

- `GET /api/stock/summary` - Stok özeti
- `GET /api/stock/products` - Tüm ürünler
- `GET /api/stock/critical` - Kritik stok listesi
- `GET /api/stock/skt` - SKT analizi
- `GET /api/stock/by-brand` - Marka bazlı stok
- `GET /api/stock/by-category` - Kategori bazlı stok

### Sales Endpoints

- `GET /api/sales/summary` - Satış özeti
- `GET /api/sales/by-brand` - Marka bazlı satışlar
- `GET /api/sales/by-category` - Kategori bazlı satışlar
- `GET /api/sales/by-customer` - Müşteri bazlı satışlar
- `GET /api/sales/by-channel` - Kanal bazlı satışlar
- `GET /api/sales/top-products` - En çok satanlar

### Purchase Endpoints

- `GET /api/purchase/summary` - Alış özeti
- `GET /api/purchase/by-supplier` - Tedarikçi bazlı alışlar
- `GET /api/purchase/by-brand` - Marka bazlı alışlar
- `GET /api/purchase/by-category` - Kategori bazlı alışlar

## 🔒 Güvenlik

- CORS koruması aktif
- SQL Injection koruması (EF Core ORM)
- XSS koruması (React built-in)
- Input validasyonu
- HTTPS zorunluluğu (production)

## 📝 Lisans

Bu proje özel bir projedir.

## 👥 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın
