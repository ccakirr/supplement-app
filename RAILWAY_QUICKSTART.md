# Railway Hızlı Başlangıç Rehberi

## 🚀 5 Dakikada Deploy

### 1. GitHub'a Push

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/KULLANICI_ADINIZ/supplement-app.git
git push -u origin main
```

### 2. Railway'e Bağlan

1. [railway.app](https://railway.app) → Login with GitHub
2. "New Project" → "Deploy from GitHub repo"
3. Repository'nizi seçin

### 3. Volume Ekle (Önemli!)

1. Proje dashboard → "Settings" → "Volumes"
2. "Add Volume" → Mount path: `/app/data`

### 4. Deploy Tamamlandı! 🎉

Railway otomatik olarak:

- ✅ Dockerfile'ı build eder
- ✅ Frontend'i compile eder
- ✅ Backend'i çalıştırır
- ✅ Domain oluşturur

## 📋 Environment Variables (Opsiyonel)

Railway otomatik ayarlar, manuel ayar gerekmez:

```
PORT=8080 (otomatik)
ASPNETCORE_ENVIRONMENT=Production
DB_PATH=/app/data/report.db
```

## ✅ Test Etme

### API Test

```bash
curl https://YOUR-APP.up.railway.app/api/stock/summary
```

### Frontend Test

Tarayıcıda: `https://YOUR-APP.up.railway.app`

## 🔄 Güncelleme

```bash
git add .
git commit -m "Update"
git push
```

Railway otomatik olarak yeniden deploy eder!

## 📊 Monitoring

Railway dashboard'da:

- Logs → Real-time loglar
- Metrics → CPU, Memory, Network
- Deployments → Build history

## 🆘 Sorun mu var?

### Build Hatası

```bash
# Logs kontrol et
railway logs

# Local test
docker build -t test .
docker run -p 8080:8080 test
```

### Database Hatası

- Volume'un `/app/data` path'ine mount edildiğini kontrol et
- Logs'da "Database initialized successfully" mesajını ara

### Frontend 404

- Build logs'da "frontend build" adımını kontrol et
- `wwwroot` klasörünün oluştuğunu doğrula

## 💰 Maliyet

**Ücretsiz Plan:**

- 500 saat/ay
- 100 GB network
- Hobby projeler için yeterli

**Paid Plan ($5/ay):**

- Unlimited execution
- Priority support
- Production apps için önerili

## 📚 Daha Fazla Bilgi

- Detaylı rehber: `DEPLOYMENT.md`
- Railway docs: https://docs.railway.app
- Proje README: `README.md`

---

**Not:** İlk deploy 5-10 dakika sürebilir. Sabırlı olun! ☕
