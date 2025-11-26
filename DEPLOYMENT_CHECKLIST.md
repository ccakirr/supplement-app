# Railway Deployment Checklist

## 📋 Pre-Deployment Checklist

### Kod Hazırlığı

- [x] Tüm API endpoints test edildi
- [x] Frontend build başarılı (`npm run build`)
- [x] Backend build başarılı (`dotnet build -c Release`)
- [x] Tüm environment variables yapılandırıldı
- [x] Database seed data hazır
- [x] CORS ayarları yapılandırıldı
- [x] Static file serving aktif
- [x] SPA routing fallback eklendi

### Dosya Kontrolü

- [x] `Dockerfile` mevcut ve doğru
- [x] `railway.json` mevcut
- [x] `.dockerignore` mevcut
- [x] `.gitignore` mevcut
- [x] `appsettings.json` production-ready
- [x] `appsettings.Production.json` mevcut
- [x] `frontend/vite.config.ts` production build ayarları
- [x] `frontend/src/config/api.ts` environment-aware

### Git Repository

- [ ] GitHub repository oluşturuldu
- [ ] `.gitignore` commit edildi
- [ ] Tüm dosyalar commit edildi
- [ ] `main` branch'e push edildi
- [ ] Repository public veya Railway'e erişim verildi

## 🚀 Deployment Checklist

### Railway Setup

- [ ] Railway hesabı oluşturuldu
- [ ] GitHub ile bağlantı kuruldu
- [ ] Yeni proje oluşturuldu
- [ ] Repository seçildi
- [ ] Build başlatıldı

### Configuration

- [ ] Volume eklendi (`/app/data`)
- [ ] Environment variables kontrol edildi
- [ ] Domain oluşturuldu
- [ ] HTTPS aktif

### Build Monitoring

- [ ] Build logs kontrol edildi
- [ ] Frontend build başarılı
- [ ] Backend build başarılı
- [ ] Docker image oluşturuldu
- [ ] Container başlatıldı

## ✅ Post-Deployment Checklist

### Functional Testing

- [ ] Ana sayfa açılıyor
- [ ] Sidebar menüsü çalışıyor
- [ ] Dashboard kartları veri gösteriyor
- [ ] Grafikler render ediliyor
- [ ] Tüm sayfalar erişilebilir

### API Testing

```bash
# Stock API
- [ ] GET /api/stock/summary
- [ ] GET /api/stock/products
- [ ] GET /api/stock/critical
- [ ] GET /api/stock/skt
- [ ] GET /api/stock/by-brand
- [ ] GET /api/stock/by-category

# Sales API
- [ ] GET /api/sales/summary
- [ ] GET /api/sales/by-brand
- [ ] GET /api/sales/by-category
- [ ] GET /api/sales/by-customer
- [ ] GET /api/sales/by-channel
- [ ] GET /api/sales/top-products

# Purchase API
- [ ] GET /api/purchase/summary
- [ ] GET /api/purchase/by-supplier
- [ ] GET /api/purchase/by-brand
- [ ] GET /api/purchase/by-category
```

### Database Testing

- [ ] Database oluşturuldu
- [ ] Seed data yüklendi
- [ ] Products tablosu dolu
- [ ] Sales tablosu dolu
- [ ] Purchases tablosu dolu
- [ ] Brands, Categories, Customers mevcut

### Performance Testing

- [ ] Ana sayfa < 2 saniye
- [ ] API response < 500ms
- [ ] Grafikler < 1 saniye render
- [ ] Navigation smooth

### Security Testing

- [ ] HTTPS aktif
- [ ] CORS çalışıyor
- [ ] SQL injection koruması aktif
- [ ] XSS koruması aktif

## 📊 Monitoring Setup

### Railway Dashboard

- [ ] Logs açık ve okunabilir
- [ ] Metrics görüntüleniyor
- [ ] Deployment history görünür
- [ ] Alerts yapılandırıldı (opsiyonel)

### External Monitoring (Opsiyonel)

- [ ] Uptime monitoring (UptimeRobot)
- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] Performance monitoring (LogRocket)

## 🔄 Maintenance Checklist

### Daily

- [ ] Logs kontrol et
- [ ] Error rate kontrol et
- [ ] Uptime kontrol et

### Weekly

- [ ] Database backup al
- [ ] Performance metrics gözden geçir
- [ ] User feedback topla

### Monthly

- [ ] Dependencies güncelle
- [ ] Security patches uygula
- [ ] Cost analysis yap
- [ ] Feature requests değerlendir

## 🆘 Rollback Plan

### Hızlı Rollback

1. Railway dashboard → Deployments
2. Önceki başarılı deployment'ı bul
3. "Redeploy" butonuna tıkla
4. 2-3 dakika bekle
5. Test et

### Manuel Rollback

```bash
# Git'te önceki commit'e dön
git revert HEAD
git push

# Railway otomatik redeploy eder
```

## 📝 Documentation Checklist

### User Documentation

- [ ] README.md güncel
- [ ] API documentation hazır
- [ ] User guide oluşturuldu
- [ ] FAQ hazırlandı

### Technical Documentation

- [ ] Architecture diagram
- [ ] Database schema
- [ ] API endpoints documented
- [ ] Deployment process documented

### Team Documentation

- [ ] Onboarding guide
- [ ] Development setup
- [ ] Testing procedures
- [ ] Deployment procedures

## 🎯 Success Criteria

### Must Have

- [x] Application accessible via HTTPS
- [x] All pages load successfully
- [x] All API endpoints working
- [x] Database persistent
- [x] No critical errors in logs

### Should Have

- [ ] Response time < 500ms
- [ ] Uptime > 99%
- [ ] Zero data loss
- [ ] Smooth user experience

### Nice to Have

- [ ] Custom domain
- [ ] SSL certificate
- [ ] Monitoring dashboard
- [ ] Automated backups
- [ ] CI/CD pipeline

## 📞 Support Contacts

### Railway Support

- Docs: https://docs.railway.app
- Discord: https://discord.gg/railway
- Email: team@railway.app

### Project Team

- Developer: [Your Name]
- Email: [your.email@example.com]
- GitHub: [github.com/yourusername]

## 🎉 Deployment Complete!

Tüm checklistler tamamlandığında:

1. ✅ Deployment başarılı
2. ✅ Application live
3. ✅ Monitoring aktif
4. ✅ Documentation güncel

**Sonraki adım:** Kullanıcılara duyuru yap ve feedback topla!

---

**Deployment Date:** ******\_******
**Deployed By:** ******\_******
**Railway URL:** ******\_******
**Custom Domain:** ******\_******
**Notes:** ******\_******
