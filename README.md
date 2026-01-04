# BlogApp - Full Stack Blog Uygulaması

Bu proje, Angular frontend ve .NET Core Web API backend kullanılarak geliştirilmiş basit bir Blog uygulamasıdır.

## Proje Yapısı

- **BlogApi**: .NET 7 Web API backend
- **BlogFrontend**: Angular 14 frontend

## Özellikler

### Backend (.NET Core Web API)
- ✅ CRUD işlemleri (Create, Read, Update, Delete)
- ✅ Entity Framework Core (Code First)
- ✅ SQL Server (LocalDB)
- ✅ Swagger UI ile API test
- ✅ CORS yapılandırması
- ✅ Async/await kullanımı
- ✅ Validation
- ✅ Pagination desteği
- ✅ Arama özelliği

### Frontend (Angular)
- ✅ Blog listesi sayfası
- ✅ Blog detay sayfası
- ✅ Yeni blog ekleme
- ✅ Blog düzenleme
- ✅ Blog silme
- ✅ Reactive Forms
- ✅ Form validasyonları
- ✅ HttpClient ile API entegrasyonu
- ✅ Routing
- ✅ Pagination
- ✅ Arama özelliği

## Kullanılan Teknolojiler

### Backend
- .NET 7
- ASP.NET Core Web API
- Entity Framework Core 7.0.20
- SQL Server (LocalDB)
- Swagger (Swashbuckle)

### Frontend
- Angular 14
- TypeScript
- RxJS
- Reactive Forms

## Kurulum ve Çalıştırma

### Backend Kurulumu

1. `BlogApi` klasörüne gidin:
```bash
cd BlogApi
```

2. Veritabanı migration'larını çalıştırın:
```bash
dotnet ef database update
```

3. Projeyi çalıştırın:
```bash
dotnet run
```

Backend API şu adreslerde çalışacaktır:
- HTTP: http://localhost:5001
- HTTPS: https://localhost:7006
- Swagger UI: https://localhost:7006/swagger

### Frontend Kurulumu

1. `BlogFrontend` klasörüne gidin:
```bash
cd BlogFrontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Projeyi çalıştırın:
```bash
npm start
```

Frontend uygulaması http://localhost:4200 adresinde çalışacaktır.

## API Endpoints

- `GET /api/posts` - Tüm blogları listele (pagination ve arama desteği ile)
- `GET /api/posts/{id}` - Blog detay
- `POST /api/posts` - Yeni blog ekle
- `PUT /api/posts/{id}` - Blog güncelle
- `DELETE /api/posts/{id}` - Blog sil

## Veritabanı

SQL Server LocalDB kullanılmaktadır. Connection string `appsettings.json` dosyasında tanımlıdır:
```
Server=(localdb)\MSSQLLocalDB;Database=BlogAppDb;Trusted_Connection=True;TrustServerCertificate=True
```

## Notlar

- Backend çalışmadan frontend API çağrıları yapamaz
- CORS ayarları backend'de Angular için yapılandırılmıştır (http://localhost:4200)
- API URL'i frontend'de `blog.service.ts` dosyasında tanımlıdır

## Geliştirici Notları

Bu proje bir teknik değerlendirme için hazırlanmıştır ve aşağıdaki gereksinimleri karşılamaktadır:

✅ Entity Framework Core kullanımı
✅ Code First yaklaşımı
✅ Migration kullanımı
✅ Basit validation
✅ Async / await kullanımı
✅ Angular Service kullanımı
✅ HttpClient ile API entegrasyonu
✅ Reactive Forms
✅ Basit form validasyonları
✅ Component ve Service ayrımı

### Artı Özellikler (Opsiyonel)
✅ Pagination
✅ Başlığa göre arama
✅ Basit hata yönetimi
