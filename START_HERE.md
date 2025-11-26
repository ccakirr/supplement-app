# 🚀 Supplement Envanter ve Raporlama Sistemi

## Railway'e Deploy Rehberi

### ✅ Hazırlık Tamamlandı!

Projeniz Railway'e deploy edilmeye hazır. Tüm gerekli dosyalar mevcut:

- ✅ Dockerfile (Multi-stage build)
- ✅ railway.json (Railway configuration)
- ✅ Frontend production build
- ✅ Backend configuration
- ✅ Database setup

---

## 🚂 Railway Deployment (5 Dakika)

### 1. Railway'e Giriş

- **URL**: https://railway.app
- "Login with GitHub" ile giriş yapın

### 2. Yeni Proje Oluştur

- "New Project" → "Deploy from GitHub repo"
- `ccakirr/supplement-app` repository'sini seçin
- Railway otomatik build başlatacak

### 3. Volume Ekle (ÖNEMLİ!)

- Settings → Volumes → Add Volume
- **Mount Path**: `/app/data`
- Database kalıcılığı için gerekli

### 4. Domain Al

- Settings → Domains → Generate Domain
- Otomatik domain oluşturulacak

### 5. Test Et

```bash
# API test
curl https://YOUR-APP.up.railway.app/api/stock/summary

# Frontend test (tarayıcıda)
https://YOUR-APP.up.railway.app
```

---

## 📱 Özellikler

### Stok Yönetimi

- Gerçek zamanlı stok takibi
- Kritik stok uyarıları
- SKT (Son Kullanma Tarihi) takibi

### Satış Raporları

- Marka bazlı analiz
- Kategori bazlı analiz
- Müşteri bazlı analiz
- Satış kanalı analizi

### Alış Raporları

- Tedarikçi bazlı analiz
- Kategori ve marka bazlı alışlar
- En çok alınan ürünler

### Görsel Dashboard

- İnteraktif grafikler (Pie, Bar, Line)
- Responsive tasarım (Mobil uyumlu)
- Hamburger menü (Mobil)

---

## 🔧 Teknoloji Stack

**Backend:**

- ASP.NET Core 8.0
- Entity Framework Core
- SQLite Database

**Frontend:**

- React 18 + TypeScript
- Vite
- Ant Design
- Recharts

---

## 📞 Destek

**Railway Docs**: https://docs.railway.app
**GitHub**: https://github.com/ccakirr/supplement-app

---

**Deployment Tarihi**: 26 Kasım 2024  
**Versiyon**: 1.0.0  
**Durum**: ✅ RAILWAY'E DEPLOY EDİLMEYE HAZIR
