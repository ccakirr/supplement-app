# Railway Deployment Rehberi

Bu doküman, Supplement Envanter ve Raporlama Sistemi'nin Railway'e nasıl deploy edileceğini adım adım açıklar.

## Ön Hazırlık

### 1. GitHub Repository Oluşturma

```bash
# Git repository'sini başlatın
git init

# Tüm dosyaları ekleyin
git add .

# İlk commit
git commit -m "Initial commit"

# GitHub'a push edin
git remote add origin https://github.com/yourusername/supplement-app.git
git branch -M main
git push -u origin main
```

### 2. Gerekli Dosyaların Kontrolü

Aşağıdaki dosyaların proje kök dizininde olduğundan emin olun:

- ✅ `Dockerfile`
- ✅ `railway.json`
- ✅ `.dockerignore`
- ✅ `appsettings.json`
- ✅ `appsettings.Production.json`

## Railway Deployment Adımları

### Adım 1: Railway Hesabı Oluşturma

1. [Railway.app](https://railway.app) adresine gidin
2. "Login" butonuna tıklayın
3. GitHub hesabınızla giriş yapın
4. Railway'e GitHub repository'lerinize erişim izni verin

### Adım 2: Yeni Proje Oluşturma

1. Railway dashboard'da "New Project" butonuna tıklayın
2. "Deploy from GitHub repo" seçeneğini seçin
3. Repository listesinden projenizi seçin
4. Railway otomatik olarak Dockerfile'ı algılayacak ve build başlatacak

### Adım 3: Environment Variables Ayarlama

Railway dashboard'da projenize gidin ve "Variables" sekmesine tıklayın:

**Otomatik Ayarlanan:**

- `PORT` - Railway otomatik olarak ayarlar (genellikle 8080)

**Manuel Ayarlanması Gerekenler (Opsiyonel):**

```
ASPNETCORE_ENVIRONMENT=Production
DB_PATH=/app/data/report.db
```

### Adım 4: Volume Ekleme (Veritabanı Kalıcılığı)

SQLite veritabanının kalıcı olması için volume ekleyin:

1. Railway dashboard'da projenize gidin
2. "Settings" sekmesine tıklayın
3. "Volumes" bölümüne gidin
4. "Add Volume" butonuna tıklayın
5. Volume ayarları:
   - **Mount Path**: `/app/data`
   - **Size**: 1 GB (başlangıç için yeterli)

### Adım 5: Domain Ayarlama

1. "Settings" sekmesinde "Domains" bölümüne gidin
2. "Generate Domain" butonuna tıklayın
3. Railway otomatik olarak bir subdomain oluşturacak (örn: `your-app.up.railway.app`)
4. İsterseniz custom domain ekleyebilirsiniz

### Adım 6: Deployment'ı İzleme

1. "Deployments" sekmesine gidin
2. Build loglarını izleyin
3. Build başarılı olduğunda "View Logs" ile runtime loglarını kontrol edin

## Build Süreci

Railway aşağıdaki adımları otomatik olarak gerçekleştirir:

### 1. Frontend Build

```bash
# Node.js 20 Alpine image kullanılır
cd frontend
npm ci
npm run build
# Çıktı: frontend/dist/
```

### 2. Backend Build

```bash
# .NET 8.0 SDK kullanılır
dotnet restore
dotnet publish -c Release -o out
```

### 3. Runtime Image

```bash
# .NET 8.0 ASP.NET Runtime kullanılır
# Frontend build wwwroot'a kopyalanır
# SQLite kurulur
# Port dinlemeye başlar
```

## Deployment Sonrası Kontroller

### 1. Health Check

```bash
curl https://your-app.up.railway.app/api/stock/summary
```

Beklenen yanıt:

```json
{
  "totalStockValue": 9975.0,
  "totalStock": 8,
  "criticalStock": 0,
  "expired": 1,
  "expiringIn3Months": 1,
  "expiringIn12Months": 2
}
```

### 2. Frontend Kontrolü

Tarayıcıda `https://your-app.up.railway.app` adresini açın:

- ✅ Ana sayfa yüklenmeli
- ✅ Sidebar menüsü görünmeli
- ✅ Dashboard kartları veri göstermeli
- ✅ Grafikler render edilmeli

### 3. Database Kontrolü

Railway logs'da şu mesajı görmelisiniz:

```
Database initialized successfully
Starting server on port 8080
```

## Sorun Giderme

### Problem: Build Hatası

**Çözüm:**

1. Dockerfile syntax'ını kontrol edin
2. .dockerignore dosyasının doğru olduğundan emin olun
3. Railway logs'da detaylı hata mesajını okuyun

### Problem: Database Bulunamıyor

**Çözüm:**

1. Volume'un doğru mount edildiğini kontrol edin (`/app/data`)
2. DB_PATH environment variable'ını kontrol edin
3. Logs'da "Database initialized successfully" mesajını arayın

### Problem: Frontend 404 Hatası

**Çözüm:**

1. Frontend build'in başarılı olduğunu kontrol edin
2. `wwwroot` klasörünün oluştuğunu doğrulayın
3. `Program.cs`'de `app.MapFallbackToFile("index.html")` satırının olduğundan emin olun

### Problem: API CORS Hatası

**Çözüm:**

1. Production'da CORS gerekmez (same-origin)
2. Eğer custom domain kullanıyorsanız, `Program.cs`'de ALLOWED_ORIGINS'e ekleyin

### Problem: Yavaş Performans

**Çözüm:**

1. Railway'in ücretsiz planında sınırlamalar vardır
2. Paid plan'e geçmeyi düşünün
3. Database indekslerini kontrol edin
4. Frontend bundle size'ı optimize edin

## Güncelleme ve Yeniden Deploy

### Otomatik Deploy

Railway, GitHub'a her push'ta otomatik olarak yeniden deploy eder:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

### Manuel Deploy

Railway dashboard'da "Deployments" sekmesinden "Redeploy" butonuna tıklayın.

## Monitoring ve Logs

### Real-time Logs

```bash
# Railway CLI kurulumu
npm install -g @railway/cli

# Login
railway login

# Logs izleme
railway logs
```

### Metrics

Railway dashboard'da "Metrics" sekmesinde:

- CPU kullanımı
- Memory kullanımı
- Network trafiği
- Request count

## Backup Stratejisi

### Database Backup

1. Railway dashboard'da "Settings" > "Volumes" > "Download"
2. Veya Railway CLI ile:

```bash
railway run sqlite3 /app/data/report.db .dump > backup.sql
```

### Otomatik Backup (Gelecek)

Cron job ile günlük backup:

```bash
# Railway'e cron service ekleyin
# Her gün 03:00'te backup al
0 3 * * * railway run sqlite3 /app/data/report.db .dump > /backups/$(date +\%Y\%m\%d).sql
```

## Maliyet Optimizasyonu

### Ücretsiz Plan Limitleri

- 500 saat/ay execution time
- 100 GB network egress
- 8 GB RAM
- 8 vCPU

### Paid Plan Avantajları

- Unlimited execution time
- Priority support
- Custom domains
- Team collaboration

## Güvenlik Önerileri

### 1. Environment Variables

Hassas bilgileri environment variables'da saklayın:

```
DATABASE_PASSWORD=xxx
API_KEY=xxx
```

### 2. HTTPS

Railway otomatik olarak HTTPS sağlar, HTTP'yi devre dışı bırakın.

### 3. Rate Limiting

Production'da rate limiting ekleyin (gelecek feature).

### 4. Authentication

Kullanıcı authentication'ı ekleyin (gelecek feature).

## İletişim ve Destek

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: https://github.com/yourusername/supplement-app/issues

## Checklist

Deploy öncesi kontrol listesi:

- [ ] GitHub repository oluşturuldu
- [ ] Tüm dosyalar commit edildi
- [ ] Railway hesabı oluşturuldu
- [ ] Proje Railway'e bağlandı
- [ ] Volume eklendi
- [ ] Domain ayarlandı
- [ ] Health check başarılı
- [ ] Frontend çalışıyor
- [ ] API endpoints çalışıyor
- [ ] Database seed edildi
- [ ] Logs kontrol edildi

## Sonraki Adımlar

1. Custom domain ekleyin
2. SSL sertifikası doğrulayın
3. Monitoring araçları ekleyin (Sentry, LogRocket)
4. Performance testing yapın
5. Backup stratejisi oluşturun
6. CI/CD pipeline kurun
7. Staging environment oluşturun
