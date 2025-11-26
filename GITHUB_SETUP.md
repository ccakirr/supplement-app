# GitHub Setup ve Push Rehberi

## ❌ Hata: Authentication Failed

GitHub artık şifre ile authentication'a izin vermiyor. Personal Access Token (PAT) kullanmanız gerekiyor.

---

## ✅ Çözüm: Personal Access Token Oluşturma

### Adım 1: GitHub'da Token Oluşturun

1. GitHub'a gidin: https://github.com
2. Sağ üst köşe → Profile picture → **Settings**
3. Sol menüden en altta → **Developer settings**
4. **Personal access tokens** → **Tokens (classic)**
5. **Generate new token** → **Generate new token (classic)**

### Adım 2: Token Ayarları

**Note**: `supplement-app-deploy` (veya istediğiniz bir isim)

**Expiration**: `90 days` (veya istediğiniz süre)

**Select scopes** (İşaretleyin):

- ✅ `repo` (Full control of private repositories)
  - ✅ repo:status
  - ✅ repo_deployment
  - ✅ public_repo
  - ✅ repo:invite
  - ✅ security_events

**Generate token** butonuna tıklayın

### Adım 3: Token'ı Kopyalayın

⚠️ **ÖNEMLİ**: Token'ı hemen kopyalayın! Sayfayı kapattıktan sonra bir daha göremezsiniz.

Token şuna benzer: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## 🚀 Git Push Komutları

### Yöntem 1: Token ile Push (Önerilen)

```bash
# Remote URL'i token ile güncelleyin
git remote set-url origin https://ghp_YOUR_TOKEN_HERE@github.com/ccakirr/supplement-app.git

# Push edin
git push -u origin main
```

**Örnek:**

```bash
git remote set-url origin https://ghp_abc123xyz789@github.com/ccakirr/supplement-app.git
git push -u origin main
```

### Yöntem 2: SSH Kullanma (Alternatif)

SSH key'iniz varsa:

```bash
# Remote URL'i SSH'e çevirin
git remote set-url origin git@github.com:ccakirr/supplement-app.git

# Push edin
git push -u origin main
```

### Yöntem 3: Her Seferinde Token Girin

```bash
# Push ederken kullanıcı adı ve token soracak
git push -u origin main

# Username: ccakirr
# Password: ghp_YOUR_TOKEN_HERE (token'ınızı yapıştırın)
```

---

## 🔐 Token'ı Güvenli Saklama

### Linux/Mac için Git Credential Helper

```bash
# Token'ı cache'de sakla (15 dakika)
git config --global credential.helper cache

# Token'ı kalıcı olarak sakla
git config --global credential.helper store

# Sonra push edin, token'ı bir kez girin
git push -u origin main
```

### Windows için

```bash
# Windows Credential Manager kullan
git config --global credential.helper wincred

# Push edin, token'ı bir kez girin
git push -u origin main
```

---

## ✅ Başarılı Push Sonrası

Push başarılı olduğunda şunu göreceksiniz:

```
Enumerating objects: 98, done.
Counting objects: 100% (98/98), done.
Delta compression using up to 8 threads
Compressing objects: 100% (92/92), done.
Writing objects: 100% (98/98), 234.56 KiB | 5.67 MiB/s, done.
Total 98 (delta 12), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (12/12), done.
To https://github.com/ccakirr/supplement-app.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 🚂 Railway'e Deploy

Push başarılı olduktan sonra:

1. [railway.app](https://railway.app) → Login with GitHub
2. "New Project" → "Deploy from GitHub repo"
3. `ccakirr/supplement-app` repository'sini seçin
4. Railway otomatik build başlatacak

---

## 🆘 Sorun Giderme

### Hata: "remote: Repository not found"

**Çözüm**: Repository adını kontrol edin

```bash
git remote -v  # Mevcut remote'u göster
git remote set-url origin https://github.com/ccakirr/supplement-app.git
```

### Hata: "Permission denied"

**Çözüm**: Token'ın `repo` scope'una sahip olduğundan emin olun

### Hata: "Token expired"

**Çözüm**: Yeni token oluşturun ve remote URL'i güncelleyin

### Token'ı Unuttum

**Çözüm**: GitHub'da yeni token oluşturun, eski token'ı silin

---

## 📝 Hızlı Komutlar

```bash
# 1. Branch'i main'e çevir (zaten yapıldı)
git branch -M main

# 2. Token ile remote URL'i ayarla
git remote set-url origin https://ghp_YOUR_TOKEN@github.com/ccakirr/supplement-app.git

# 3. Push et
git push -u origin main

# 4. Başarılı! Railway'e geç
```

---

## 🎯 Sonraki Adım

Push başarılı olduktan sonra:

**👉 `RAILWAY_QUICKSTART.md` dosyasını açın ve Railway'e deploy edin!**

---

## 📞 Yardım

**GitHub Token Docs**: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

**Git Credential Helper**: https://git-scm.com/docs/gitcredentials

---

**Not**: Token'ınızı asla kimseyle paylaşmayın ve public repository'lere commit etmeyin!
