# Ventora Event — Etkinlik ve Organizasyon Web Sitesi

Ventora Event için hazırlanmış modern, profesyonel bir etkinlik / prodüksiyon / organizasyon şirket web sitesidir. Tüm kullanıcı arayüzü metinleri **Türkçe**dir. Proje şu an yalnızca **yerel geliştirme** ortamında çalışacak şekilde kurgulanmıştır.

## Uyarı

> Bu projedeki admin giriş sistemi yalnızca yerel geliştirme ve demo amacıyla hazırlanmıştır. Gerçek güvenlik sağlamaz. Proje yayına alınmadan önce güvenli bir kimlik doğrulama sistemi ve veritabanı entegrasyonu kurulmalıdır.

## Teknoloji Yığını

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Hook Form + Zod
- Zustand
- LocalStorage tabanlı geçici içerik yönetimi

## Kurulum

```bash
npm install
```

## Yerel Geliştirme

```bash
npm run dev
```

- Genel site: [http://localhost:3000](http://localhost:3000)
- Yönetim paneli: [http://localhost:3000/admin](http://localhost:3000/admin)

### Geçici Admin Bilgileri (yalnızca yerel demo)

- Kullanıcı adı: `admin`
- Şifre: `admin123`

Bu kimlik bilgileri güvenli değildir. Production’da **Supabase Auth**, **Auth.js** veya benzeri güvenli bir kimlik doğrulama sistemi kurulmalıdır.

## İçerik Yönetimi (LocalStorage)

Admin panelinden yapılan değişiklikler tarayıcıda şu anahtar altında saklanır:

- `event-site-content`

İletişim formundan gelen mesajlar şu anahtarda tutulur:

- `contactMessages`

Uygulama açıldığında:

1. LocalStorage’da kayıtlı içerik varsa o yüklenir
2. Yoksa `src/data/default-site-content.ts` içindeki varsayılan Türkçe içerik kullanılır

Admin panelindeki **Varsayılan İçeriklere Dön** butonu yerel değişiklikleri siler ve varsayılan içeriği geri yükler.

## Mevcut Durum (Yerel Geliştirme)

Bu proje şu an:

- Vercel’e deploy edilmemiştir
- Domain bağlanmamıştır
- GitHub deposu oluşturulmamıştır / uzak repoya push yapılmamıştır
- Production altyapısı yapılandırılmamıştır
- Gerçek e-posta gönderimi yoktur
- Gerçek veritabanı yoktur
- Analytics / takip araçları yoktur

Kod yapısı ileride Vercel’e taşınabilecek şekilde hazırlanmıştır; ancak **şu anda herhangi bir deployment işlemi yapılmamıştır**.

## Production Öncesi Öneriler

1. **Kimlik doğrulama:** Supabase Auth, Auth.js vb. güvenli auth ekleyin
2. **Veritabanı:** PostgreSQL / Supabase / benzeri kalıcı içerik deposu
3. **Görsel depolama:** Cloudinary, Supabase Storage veya Vercel Blob
4. **E-posta:** Resend, SendGrid veya benzeri servis ile iletişim formu bildirimleri
5. **Ortam değişkenleri:** Secret’ları `.env` ile yönetin; asla istemciye sızdırmayın

## İleride Vercel’e Alma (yalnızca kavramsal)

Deployment şu an yapılmamalıdır. İleride örnek akış:

1. Güvenli auth ve veritabanını bağlayın
2. Gerekli environment değişkenlerini tanımlayın
3. Projeyi bir Git deposuna bağlayın
4. Vercel’de yeni proje oluşturup framework olarak Next.js seçin
5. Preview / production ortamlarını ayrı yönetin

## Kullanışlı Komutlar

```bash
npm run dev
npm run lint
npm run build
```

## Klasör Yapısı (özet)

```text
src/
├── app/                 # App Router sayfaları (public + admin)
├── components/          # UI, layout, sections, admin, animations
├── data/                # Varsayılan site içeriği
├── hooks/
├── lib/
├── store/               # Zustand store’ları
└── types/
public/images/           # Yerel placeholder görseller
```

## Lisans / Not

Örnek içerikler ve marka adı (`Ventora Event`) demo amaçlıdır. Gerçek müşteri projelerinde içerik, görseller ve yasal metinler güncellenmelidir.
