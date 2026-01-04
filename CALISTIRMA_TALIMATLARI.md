# Blog Uygulaması - Çalıştırma Talimatları

## 📋 Ön Gereksinimler

1. **.NET 7 SDK** yüklü olmalı
   - Kontrol etmek için: `dotnet --version` (7.x.x olmalı)
   - Yüklü değilse: https://dotnet.microsoft.com/download

2. **Node.js ve npm** yüklü olmalı
   - Kontrol etmek için: `node --version` ve `npm --version`
   - Yüklü değilse: https://nodejs.org/

3. **Angular CLI** yüklü olmalı
   - Kontrol etmek için: `ng version`
   - Yüklü değilse: `npm install -g @angular/cli@14`

4. **SQL Server LocalDB** yüklü olmalı (genellikle Visual Studio ile gelir)

---

## 🚀 ADIM 1: Backend'i Çalıştırma

### Terminal 1 (Backend için)

```powershell
# Proje klasörüne git
cd BlogApi

# Veritabanını oluştur (ilk kez çalıştırıyorsanız)
dotnet ef database update

# Projeyi çalıştır
dotnet run
```

**Beklenen Çıktı:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7006
      Now listening on: http://localhost:5001
```

✅ Backend başarıyla çalışıyorsa:
- Swagger UI: https://localhost:7006/swagger
- API: https://localhost:7006/api/posts

**Not:** Eğer `dotnet ef` komutu çalışmazsa:
```powershell
dotnet tool install --global dotnet-ef
```

---

## 🎨 ADIM 2: Frontend'i Çalıştırma

### Terminal 2 (Frontend için - YENİ BİR TERMİNAL AÇIN)

```powershell
# Proje klasörüne git
cd BlogFrontend

# Bağımlılıkları yükle (ilk kez çalıştırıyorsanız)
npm install

# Frontend'i çalıştır
npm start
```

**Beklenen Çıktı:**
```
** Angular Live Development Server is listening on localhost:4200 **
```

✅ Frontend başarıyla çalışıyorsa:
- Tarayıcı otomatik açılır: http://localhost:4200
- Veya manuel olarak: http://localhost:4200

---

## 🔧 Sorun Giderme

### Backend Sorunları

**1. Port zaten kullanılıyor hatası:**
```powershell
# Farklı bir port kullanmak için launchSettings.json'ı düzenleyin
# Veya çalışan process'i durdurun
```

**2. Veritabanı bağlantı hatası:**
- SQL Server LocalDB'nin çalıştığından emin olun
- Connection string'i kontrol edin: `BlogApi/appsettings.json`

**3. Migration hatası:**
```powershell
# Migration'ları sıfırlamak için (dikkatli kullanın!)
dotnet ef database drop
dotnet ef database update
```

### Frontend Sorunları

**1. npm install hatası:**
```powershell
# Node modules'ü temizleyip tekrar yükleyin
rm -r node_modules
rm package-lock.json
npm install
```

**2. Angular CLI bulunamadı:**
```powershell
npm install -g @angular/cli@14
```

**3. API bağlantı hatası (CORS):**
- Backend'in çalıştığından emin olun
- API URL'ini kontrol edin: `BlogFrontend/src/app/services/blog.service.ts`
- Backend'de CORS ayarlarını kontrol edin: `BlogApi/Program.cs`

**4. Port 4200 zaten kullanılıyor:**
```powershell
# Farklı port kullanmak için
ng serve --port 4201
```

---

## ✅ Test Etme

### Backend Test (Swagger)
1. Tarayıcıda açın: https://localhost:7006/swagger
2. `/api/posts` endpoint'lerini test edin
3. Örnek blog ekleyin

### Frontend Test
1. Tarayıcıda açın: http://localhost:4200
2. "Yeni Blog Ekle" butonuna tıklayın
3. Formu doldurup kaydedin
4. Blog listesinde görünmeli

---

## 📝 Hızlı Başlangıç (Özet)

**Terminal 1:**
```powershell
cd BlogApi
dotnet ef database update
dotnet run
```

**Terminal 2 (Yeni Terminal):**
```powershell
cd BlogFrontend
npm install
npm start
```

**Tarayıcı:**
- Frontend: http://localhost:4200
- Backend Swagger: https://localhost:7006/swagger

---

## 🎯 Önemli Notlar

1. **Backend önce çalışmalı** - Frontend backend'e bağımlı
2. **İki terminal gerekli** - Biri backend, biri frontend için
3. **HTTPS sertifikası** - İlk çalıştırmada tarayıcı sertifika uyarısı verebilir, "Gelişmiş" > "Devam et" yapın
4. **Port değişikliği** - Eğer portlar farklıysa, `blog.service.ts` dosyasındaki API URL'ini güncelleyin

---

## 🆘 Hala Çalışmıyor mu?

1. Tüm hata mesajlarını kontrol edin
2. .NET SDK ve Node.js versiyonlarını kontrol edin
3. SQL Server LocalDB'nin çalıştığından emin olun
4. Firewall veya antivirüs yazılımının portları engellemediğinden emin olun

