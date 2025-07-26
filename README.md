# 🎨 LT UI - Log Tracking & Security Management Frontend

[![Angular](https://img.shields.io/badge/Angular-17-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![PrimeNG](https://img.shields.io/badge/PrimeNG-17.18.0-green.svg)](https://primeng.org/)
[![Sakai](https://img.shields.io/badge/Sakai-Admin_Template-orange.svg)](https://www.primefaces.org/sakai-ng/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)

## 🎯 Proje Amacı

**LT UI (Log Tracking User Interface)**, lt-bg backend projesinin modern ve kullanıcı dostu frontend arayüzüdür. Bu Angular uygulaması, sistem yöneticilerinin ve güvenlik uzmanlarının log izleme, güvenlik yönetimi ve sistem kontrolü işlemlerini kolayca gerçekleştirmelerini sağlar.

### 🔍 Ana İşlevler

#### 📊 **Dashboard & Analytics**
- **Gerçek Zamanlı İstatistikler** - Sistem durumu ve güvenlik metrikleri
- **Grafik ve Chart'lar** - Log aktivitelerinin görsel analizi
- **KPI Göstergeleri** - Önemli performans göstergeleri
- **Aktivite Akışı** - Son olayların kronolojik görünümü

#### 🛡️ **Güvenlik Yönetimi**
- **IP Kontrol Paneli** - AbuseIPDB entegrasyonu ile IP güvenlik kontrolü
- **Blacklist Yönetimi** - Şüpheli IP'leri görüntüleme ve yönetme
- **Ban Sistemi** - IP engelleme ve kaldırma işlemleri
- **Güvenlik Olayları** - Güvenlik ihlallerinin takibi

#### 📝 **Log İzleme ve Analiz**
- **Log Listener Kontrolü** - Log dinleme servisini başlatma/durdurma
- **Log Filtreleme** - Gelişmiş filtreleme seçenekleri
- **Regex Pattern Yönetimi** - Özel log desenlerini tanımlama
- **Log İstatistikleri** - Detaylı log analizi

#### 🌍 **Coğrafi Analiz**
- **Ülke Bazlı Filtreleme** - Coğrafi konum bazlı IP analizi
- **GeoIP Entegrasyonu** - IP adreslerinin coğrafi konumunu görüntüleme
- **Bölgesel Güvenlik** - Coğrafi bazlı güvenlik politikaları

#### ⚙️ **Sistem Yönetimi**
- **Sunucu Durumu** - Sistem kaynaklarının izlenmesi
- **Ayarlar Yönetimi** - Uygulama konfigürasyonu
- **Kullanıcı Yönetimi** - Kimlik doğrulama ve yetkilendirme

---

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Proje Yapısı](#-proje-yapısı)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [API Entegrasyonu](#-api-entegrasyonu)
- [Geliştirme](#-geliştirme)
- [Deployment](#-deployment)
- [Katkıda Bulunma](#-katkıda-bulunma)

---

## ✨ Özellikler

### 🎨 **Modern UI/UX**
- **Responsive Design** - Tüm cihazlarda mükemmel görünüm
- **Material Design** - Modern ve kullanıcı dostu arayüz
- **Dark/Light Theme** - Tema seçenekleri
- **Accessibility** - Erişilebilirlik standartları

### 📊 **Dashboard & Analytics**
- **Real-time Charts** - Chart.js ile dinamik grafikler
- **KPI Widgets** - Önemli metriklerin görselleştirilmesi
- **Activity Timeline** - Olayların kronolojik görünümü
- **Status Indicators** - Sistem durumu göstergeleri

### 🛡️ **Güvenlik Yönetimi**
- **IP Security Panel** - IP güvenlik kontrolü arayüzü
- **Blacklist Management** - Şüpheli IP'lerin yönetimi
- **Ban System** - IP engelleme işlemleri
- **Security Events** - Güvenlik olaylarının takibi

### 📝 **Log Management**
- **Log Listener Control** - Log dinleme servisinin kontrolü
- **Advanced Filtering** - Gelişmiş filtreleme seçenekleri
- **Pattern Management** - Regex desenlerinin yönetimi
- **Log Analytics** - Detaylı log analizi

### 🌍 **Geographic Analysis**
- **Country-based Filtering** - Ülke bazlı IP analizi
- **GeoIP Integration** - Coğrafi konum görüntüleme
- **Regional Security** - Bölgesel güvenlik politikaları

### ⚙️ **System Administration**
- **Server Monitoring** - Sistem kaynaklarının izlenmesi
- **Settings Management** - Uygulama ayarları
- **User Management** - Kullanıcı yönetimi

---

## 🛠️ Teknolojiler

### Frontend Framework
- **Angular 17.0.5** - Modern frontend framework
- **TypeScript 5.2.2** - Tip güvenli JavaScript
- **RxJS 7.8.1** - Reactive programming

### UI Components & Styling
- **PrimeNG 17.18.0** - Premium UI component library
- **PrimeFlex 3.3.1** - CSS utility framework
- **PrimeIcons 6.0.1** - Icon library
- **SCSS** - Advanced CSS preprocessing

### Charts & Visualization
- **Chart.js 3.3.2** - Interactive charts
- **FullCalendar 6.0.3** - Calendar component

### Authentication & Security
- **JWT Decode 4.0.0** - JWT token handling
- **Angular Guards** - Route protection

### Rich Text & Code
- **Quill 1.3.7** - Rich text editor
- **PrismJS 1.29.0** - Syntax highlighting

### Development Tools
- **Angular CLI 17.0.5** - Development tools
- **ESLint** - Code linting
- **Jasmine & Karma** - Testing framework

---

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── guards/              # Route guards
│   ├── interceptors/        # HTTP interceptors
│   ├── layout/              # Layout components
│   └── main/
│       ├── api/             # API service interfaces
│       ├── components/      # UI components
│       │   ├── auth/        # Authentication pages
│       │   ├── dashboard/   # Dashboard components
│       │   └── pages/       # Feature pages
│       │       ├── abuse/           # IP security control
│       │       ├── banned-ip/       # IP ban management
│       │       ├── country/         # Geographic analysis
│       │       ├── log-listener/    # Log monitoring
│       │       └── server/          # Server management
│       ├── models/          # Data models
│       ├── service/         # Business logic services
│       └── util/            # Utility functions
├── assets/                  # Static assets
└── environments/            # Environment configurations
```

---

## 🚀 Kurulum

### Gereksinimler
- **Node.js 18+** veya üzeri
- **npm** veya **yarn**
- **Angular CLI 17+**

### 1. Repository'yi Klonlayın
```bash
git clone https://github.com/OnurErkanToros/lt-ui.git
cd lt-ui
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
# veya
yarn install
```

### 3. Environment Dosyasını Yapılandırın
`src/environments/environment.ts` dosyasını düzenleyin:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:1999', // lt-bg backend URL
  appName: 'LT Security Management'
};
```

### 4. Uygulamayı Çalıştırın

#### Development Server
```bash
ng serve
# veya
npm start
```

#### Production Build
```bash
ng build --configuration production
```

---

## 📖 Kullanım

### 🏠 **Dashboard**
Ana sayfa, sistem genel durumunu ve önemli metrikleri gösterir:
- **Sistem Durumu** - CPU, RAM, Disk kullanımı
- **Güvenlik Metrikleri** - Engellenen IP'ler, güvenlik olayları
- **Log İstatistikleri** - Log aktivitelerinin analizi
- **Aktivite Akışı** - Son olayların kronolojisi

### 🛡️ **IP Güvenlik Kontrolü**
IP adreslerinin güvenlik durumunu kontrol edin:
- **IP Kontrol** - Tek IP veya IP listesi kontrolü
- **Blacklist Yönetimi** - Şüpheli IP'leri görüntüleme
- **Ban İşlemleri** - IP engelleme/kaldırma
- **Güvenlik Raporları** - Detaylı güvenlik analizi

### 📝 **Log İzleme**
Log dinleme servisini yönetin:
- **Servis Kontrolü** - Log dinlemeyi başlatma/durdurma
- **Durum İzleme** - Servis durumunu kontrol etme
- **Pattern Yönetimi** - Regex desenlerini tanımlama
- **Log Filtreleme** - Gelişmiş filtreleme seçenekleri

### 🌍 **Coğrafi Analiz**
IP adreslerinin coğrafi konumunu analiz edin:
- **Ülke Bazlı Filtreleme** - Belirli ülkelerden gelen trafiği izleme
- **GeoIP Görüntüleme** - IP'nin coğrafi konumunu görme
- **Bölgesel Güvenlik** - Coğrafi bazlı güvenlik politikaları

### ⚙️ **Sistem Yönetimi**
Sistem ayarlarını ve durumunu yönetin:
- **Sunucu Durumu** - Sistem kaynaklarının izlenmesi
- **Ayarlar** - Uygulama konfigürasyonu
- **Kullanıcı Yönetimi** - Kimlik doğrulama ayarları

---

## 🔌 API Entegrasyonu

### Backend Bağlantısı
Uygulama, lt-bg backend projesi ile entegre çalışır:

```typescript
// API endpoint örnekleri
const API_ENDPOINTS = {
  LOG_LISTENER: '/log-listener/',
  ABUSE_CHECK: '/abuse/check-ip',
  BLACKLIST: '/abuse/blacklist/',
  GEOIP: '/geoip/country',
  AUTH: '/auth/'
};
```

### HTTP Interceptors
- **Authentication** - JWT token yönetimi
- **Error Handling** - Hata yakalama ve işleme
- **Loading States** - Yükleme durumları

### Real-time Updates
- **WebSocket** - Gerçek zamanlı veri güncellemeleri
- **Polling** - Periyodik veri yenileme
- **Event-driven** - Olay tabanlı güncellemeler

---

## 🧪 Geliştirme

### Development Server
```bash
# Development server başlat
ng serve

# Belirli port'ta çalıştır
ng serve --port 4201

# Host binding
ng serve --host 0.0.0.0
```

### Code Quality
```bash
# Linting
ng lint

# Formatting
npm run format

# Type checking
ng build --type-check
```

### Testing
```bash
# Unit tests
ng test

# E2E tests
ng e2e

# Coverage report
ng test --code-coverage
```

### Build Options
```bash
# Development build
ng build

# Production build
ng build --configuration production

# AOT compilation
ng build --aot
```

---

## 🚀 Deployment

### Production Build
```bash
# Production build
ng build --configuration production

# Build artifacts
dist/lt-ui/
```

### Docker Deployment
```dockerfile
# Dockerfile örneği
FROM nginx:alpine
COPY dist/lt-ui /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass http://backend:1999/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Environment Variables
```bash
# Production environment
export API_URL=https://api.lt-security.com
export APP_NAME=LT Security Management
export VERSION=1.0.0
```

---

## 📊 Performance

### Optimization Features
- **Lazy Loading** - Modül bazlı yükleme
- **Tree Shaking** - Kullanılmayan kod eliminasyonu
- **AOT Compilation** - Ahead-of-time derleme
- **Bundle Optimization** - Paket boyutu optimizasyonu

### Caching Strategy
- **Browser Caching** - Statik dosyaların önbelleklenmesi
- **Service Worker** - Offline çalışma desteği
- **API Caching** - API yanıtlarının önbelleklenmesi

---

## 🔐 Güvenlik

### Authentication
- **JWT Tokens** - Güvenli token tabanlı kimlik doğrulama
- **Route Guards** - Sayfa erişim kontrolü
- **HTTP Interceptors** - Otomatik token yönetimi

### Data Protection
- **HTTPS** - Güvenli veri iletimi
- **Input Validation** - Kullanıcı girdisi doğrulama
- **XSS Protection** - Cross-site scripting koruması

---

## 🤝 Katkıda Bulunma

1. **Fork** yapın
2. **Feature branch** oluşturun (`git checkout -b feature/amazing-feature`)
3. **Commit** yapın (`git commit -m 'Add amazing feature'`)
4. **Push** yapın (`git push origin feature/amazing-feature`)
5. **Pull Request** oluşturun

### Geliştirme Kuralları
- ✅ Angular style guide'ını takip edin
- ✅ TypeScript best practices uygulayın
- ✅ Unit test yazın
- ✅ Commit mesajlarını açıklayıcı yazın

---

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE.md](LICENSE.md) dosyasına bakın.

---

## 👨‍💻 Geliştirici

**Onur Erkan Toros**

- **GitHub:** [@OnurErkanToros](https://github.com/OnurErkanToros)
- **LinkedIn:** [Onur Erkan Toros](https://www.linkedin.com/in/onurerkantoros/)

---

<div align="center">
  <img src="https://img.shields.io/badge/Angular-17-red?style=for-the-badge&logo=angular&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/PrimeNG-17.18.0-green?style=for-the-badge&logo=primeng&logoColor=white"/>
  <img src="https://img.shields.io/badge/Sakai-Admin-orange?style=for-the-badge&logo=sakai&logoColor=white"/>
</div>

---

*"Modern, kullanıcı dostu ve güvenli arayüzler ile log izleme ve güvenlik yönetimini kolaylaştırıyoruz!"* 🚀