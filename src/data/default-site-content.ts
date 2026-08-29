import type { SiteContent } from "@/types/content";

export const defaultSiteContent: SiteContent = {
  lastUpdated: new Date().toISOString(),
  settings: {
    siteName: "ventoraevent",
    logoText: "Ventora Event",
    tagline: "Fikirleri Unutulmaz Deneyimlere Dönüştürüyoruz.",
    footerDescription:
      "Yaratıcı fikirleri güçlü prodüksiyon ve kusursuz operasyonla unutulmaz deneyimlere dönüştürüyoruz.",
    primaryAccent: "#ef4938",
    secondaryAccent: "#c45a3a",
    seoTitle: "Ventora Event | Etkinlik ve Organizasyon",
    seoDescription:
      "Kurumsal etkinliklerden marka lansmanlarına, festival ve özel davetlerden teknik prodüksiyona kadar uçtan uca etkinlik çözümleri.",
    copyrightText:
      "Ventora Event, Tatil Travel & The Best Adventure Travel Markasıdır. Tüm hakları saklıdır.",
    instagram: "https://instagram.com/ventoraevent",
    linkedin: "https://linkedin.com/company/ventoraevent",
    youtube: "https://youtube.com/@ventoraevent",
  },
  contactInfo: {
    mobilePhone: "+905321715043",
    landlinePhone: "02128792991",
    email: "info@ventoraevent.com",
    address:
      "BOSB mh. 3. cd. Birlik Sanayi Sitesi, Birlik 1 İş Merkezi No:5 Daire:61, Beylikdüzü / İstanbul",
    workingHours: "Pazartesi – Cuma: 09:00 – 19:00",
    instagram: "https://instagram.com/ventoraevent",
    linkedin: "https://linkedin.com/company/ventoraevent",
    youtube: "https://youtube.com/@ventoraevent",
    mapUrl: "https://maps.google.com/?q=Beylikd%C3%BCz%C3%BC+%C4%B0stanbul",
    whatsappUrl: "https://wa.me/905321715043",
  },
  home: {
    heroHeadline: "Fikri sahneye, sahneyi deneyime dönüştürüyoruz.",
    heroDescription:
      "Strateji, kreatif, prodüksiyon ve operasyonu tek bir güçlü deneyimde buluşturuyoruz.",
    primaryButtonText: "Projeleri Keşfet",
    primaryButtonUrl: "/referanslar",
    secondaryButtonText: "Teklif Al",
    secondaryButtonUrl: "/iletisim",
    marqueeTexts: [
      { id: "m1", text: "YARATICI FİKİRLER" },
      { id: "m2", text: "ETKİLEYİCİ DENEYİMLER" },
      { id: "m3", text: "UNUTULMAZ ETKİNLİKLER" },
      { id: "m4", text: "ORGANİZASYON" },
      { id: "m5", text: "HAYAL EDİN, BİZ GERÇEKLEŞTİRELİM" },
      { id: "m6", text: "HER DETAYDA AYRI BİR DENEYİM" },
    ],
    aboutPreviewTitle: "Sadece etkinlik değil, deneyim tasarlıyoruz.",
    aboutPreviewDescription:
      "Stratejiden kreatif konsepte, teknik prodüksiyondan saha yönetimine kadar tüm süreci uçtan uca planlıyor ve hayata geçiriyoruz.",
    servicesSectionTitle: "Neler Yapıyoruz",
    projectsSectionTitle: "Öne Çıkan Projeler",
    statistics: [
      { id: "s1", value: 150, suffix: "+", label: "Tamamlanan Etkinlik" },
      { id: "s2", value: 75, suffix: "+", label: "Marka İş Birliği" },
      { id: "s3", value: 50000, suffix: "+", label: "Katılımcı" },
      { id: "s4", value: 15, suffix: "+", label: "Yıllık Deneyim" },
    ],
    contactCtaTitle: "Bir sonraki etkinliğinizi birlikte tasarlayalım.",
    contactCtaDescription:
      "Fikrinizi dinleyelim, konsepti birlikte şekillendirelim ve sahnede unutulmaz bir deneyim yaratalım.",
  },
  about: {
    pageTitle: "Hayalleri planlıyor, deneyimleri gerçeğe dönüştürüyoruz.",
    pageSubtitle:
      "Ventora Event; strateji, kreatif ve prodüksiyonu tek çatı altında birleştiren bir etkinlik ve organizasyon stüdyosudur.",
    companyStory:
      "Ventora Event, etkinliği yalnızca bir takvim maddesi olarak değil; markanın hikâyesini, duygusunu ve amacını taşıyan bütüncül bir deneyim olarak ele alır. Kurulduğumuz günden bu yana kurumsal lansmanlardan festival sahnesine, özel davetlerden teknik prodüksiyona kadar yüzlerce projeyi aynı titizlikle hayata geçirdik. Her projede yaratıcı vizyonu operasyonel disipliniyle buluşturarak markaların hedeflerine görünür, ölçülebilir ve duygusal etki katan sonuçlar üretiyoruz.",
    vision:
      "Türkiye’nin ve bölgenin en güvenilir, en yaratıcı etkinlik deneyimi markası olmak; her projede standartları yükseltmek ve sektörde yeni referans noktaları oluşturmak.",
    mission:
      "Markaların ve kurumların hikâyelerini, kusursuz planlama ve güçlü prodüksiyonla unutulmaz deneyimlere dönüştürmek; her detayda kalite, yaratıcılık ve güven sunmak.",
    companyApproach:
      "Önce dinleriz, sonra tasarlarız. Her proje; keşif, konsept, planlama, prodüksiyon ve saha yönetimi aşamalarından geçen net bir yol haritasına sahiptir. Kreatif ekibimiz ile teknik ekibimiz aynı masada çalışır; böylece fikirler sahneye çıkarken kaybolmaz, güçlenir.",
    workCultureTitle: "Çalışma Kültürümüz",
    workCultureDescription:
      "Açık iletişim, kolektif yaratım ve sahadaki disiplin bizim DNA’mızdır. Her ekip üyesi hem fikir üretir hem de uygulamada sorumluluk alır. Stresli anlarda bile sakin, çözüm odaklı ve misafir deneyimini merkeze alan bir yaklaşım benimseriz.",
    teamPhilosophy:
      "İyi bir etkinlik tek bir kişinin değil, uyumlu bir ekibin eseridir. Tasarımcıdan teknisyene, proje yöneticisinden sahne ekibine kadar herkes aynı hedefe odaklanır: misafirin hissedeceği o ‘unutulmaz an’ı yaratmak.",
    statistics: [
      { id: "as1", value: 150, suffix: "+", label: "Tamamlanan Etkinlik" },
      { id: "as2", value: 75, suffix: "+", label: "Marka İş Birliği" },
      { id: "as3", value: 40, suffix: "+", label: "Uzman Ekip Üyesi" },
      { id: "as4", value: 15, suffix: "+", label: "Yıllık Deneyim" },
    ],
    ctaTitle: "Hikâyenizi birlikte yazalım.",
    ctaDescription:
      "Markanız için doğru konsepti, doğru sahneyi ve doğru deneyimi birlikte kuralım.",
    marqueeTexts: [
      { id: "am1", text: "STRATEJİ" },
      { id: "am2", text: "KREATİF" },
      { id: "am3", text: "PRODÜKSİYON" },
      { id: "am4", text: "OPERASYON" },
      { id: "am5", text: "DENEYİM" },
    ],
  },
  services: [
    {
      id: "svc1",
      title: "Kurumsal Etkinlikler",
      shortDescription:
        "Şirket toplantıları, zirveler ve kurumsal kutlamalar için uçtan uca organizasyon.",
      detailedDescription:
        "Yıllık toplantılardan liderlik zirvelerine, ödül törenlerinden çalışan deneyimi etkinliklerine kadar kurumsal ihtiyaçlara özel planlama ve uygulama sunuyoruz. Markanızın dilini sahneye taşıyor, operasyonu kusursuz yönetiyoruz.",
      imageUrl: "/images/services/kurumsal-etkinlikler-2026.jpg",
      features: [
        { id: "f1", text: "Konsept ve senaryo tasarımı" },
        { id: "f2", text: "Mekân seçimi ve yönetimi" },
        { id: "f3", text: "Teknik kurulum ve saha yönetimi" },
        { id: "f4", text: "Misafir deneyimi planlaması" },
      ],
      buttonText: "Hizmeti İncele",
      active: true,
      sortOrder: 1,
      eyebrow: "VENTORA",
      featured: true,
      layoutVariant: "split",
    },
    {
      id: "svc3",
      title: "Festival ve Açık Hava Etkinlikleri",
      shortDescription:
        "Büyük ölçekli açık ve kapalı alan etkinliklerinde güvenli, akıcı operasyon.",
      detailedDescription:
        "Kapasite planlamasından güvenlik protokollerine, artist rider’larından crowd management’a kadar festival ve açık hava organizasyonunun tüm katmanlarını yönetiyoruz.",
      imageUrl: "/images/services/festival-konser-yonetimi.mp4",
      features: [
        { id: "f9", text: "Sahne ve backstage planlama" },
        { id: "f10", text: "Kapasite ve akış yönetimi" },
        { id: "f11", text: "Güvenlik ve acil durum koordinasyonu" },
        { id: "f12", text: "Sponsor ve aktivasyon alanları" },
      ],
      buttonText: "Hizmeti İncele",
      active: true,
      sortOrder: 2,
      eyebrow: "SAHA",
      featured: true,
      layoutVariant: "editorial",
    },
    {
      id: "svc4",
      title: "Özel Davetler",
      shortDescription:
        "VIP davetler, gala geceleri ve özel kutlamalar için premium deneyim tasarımı.",
      detailedDescription:
        "Seçkin davetli listeleri için zarif, kişiselleştirilmiş ve akılda kalan özel davetler hazırlıyoruz. Atmosfer, hizmet kalitesi ve detay yönetimi ön plandadır.",
      imageUrl: "/images/services/ozel-davetler-2026.jpg",
      features: [
        { id: "f13", text: "Tema ve dekor tasarımı" },
        { id: "f14", text: "Catering koordinasyonu" },
        { id: "f15", text: "Davetiye ve RSVP yönetimi" },
        { id: "f16", text: "VIP karşılama protokolü" },
      ],
      buttonText: "Hizmeti İncele",
      active: true,
      sortOrder: 3,
      eyebrow: "DAVET",
      featured: true,
      layoutVariant: "collage",
    },
    {
      id: "svc5",
      title: "Mezuniyet",
      shortDescription:
        "Okul, lise ve üniversite mezuniyet törenleri için uçtan uca organizasyon.",
      detailedDescription:
        "Kep atma anından aile protokolüne, sahne akışından kokteyle kadar mezuniyet gününü bir bütün olarak planlıyoruz. İlkokul, lise ve üniversite törenlerinde kapasite, sahne, kayıt ve misafir deneyimini aynı titizlikle yönetiyoruz.",
      imageUrl: "/images/services/mezuniyet.png",
      features: [
        { id: "f17", text: "Kep töreni ve sahne akışı" },
        { id: "f18", text: "Mezun ve aile protokolü" },
        { id: "f19", text: "Mekân, dekor ve ışık" },
        { id: "f20", text: "Fotoğraf, kayıt ve after party" },
      ],
      buttonText: "Hizmeti İncele",
      active: true,
      sortOrder: 4,
      eyebrow: "MEZUNİYET",
      featured: true,
      layoutVariant: "split",
    },
    {
      id: "svc6",
      title: "M.I.C.E & EVENT",
      shortDescription:
        "Toplantı, incentive, kongre ve fuarları tek bir kurumsal etkinlik deneyiminde yönetiyoruz.",
      detailedDescription:
        "M.I.C.E (Meetings, Incentives, Conferences, Exhibitions) kapsamındaki kurumsal programları uçtan uca planlıyoruz. Kongre, toplantı, fuar ve incentive organizasyonlarında akış, misafir deneyimi ve saha operasyonunu aynı titizlikle yönetiyoruz.",
      imageUrl: "/images/services/mice-event.png",
      features: [
        { id: "f21", text: "Toplantı ve kongre yönetimi" },
        { id: "f22", text: "Incentive ve özel programlar" },
        { id: "f23", text: "Fuar ve sergi operasyonu" },
        { id: "f24", text: "Kurumsal seyahat ve misafir deneyimi" },
      ],
      buttonText: "Hizmeti İncele",
      active: true,
      sortOrder: 5,
      eyebrow: "M.I.C.E",
      featured: true,
      layoutVariant: "editorial",
    },
    {
      id: "svc9",
      title: "Yurt İçi Organizasyonları",
      shortDescription:
        "Türkiye genelinde kurumsal ve özel grup organizasyonları.",
      detailedDescription:
        "Şehir turlarından kurumsal ofsite’lara, grup gezilerinden özel programlara kadar yurt içi organizasyonları uçtan uca planlıyor ve sahada yönetiyoruz.",
      imageUrl: "/images/services/yurtici-org.webp",
      features: [
        { id: "f33", text: "Rota ve program tasarımı" },
        { id: "f34", text: "Grup ve rehber koordinasyonu" },
        { id: "f35", text: "Konaklama ve transfer" },
        { id: "f36", text: "Saha operasyonu" },
      ],
      buttonText: "Hizmeti İncele",
      active: true,
      sortOrder: 6,
      eyebrow: "YURT İÇİ",
      featured: true,
      layoutVariant: "split",
    },
    {
      id: "svc10",
      title: "Yurt Dışı Organizasyonları",
      shortDescription:
        "Yurt dışı grup gezileri, incentive ve kurumsal programlar.",
      detailedDescription:
        "Uluslararası destinasyonlarda grup organizasyonlarını; uçuş, vize, konaklama ve saha akışını tek operasyonda birleştirerek yönetiyoruz.",
      imageUrl: "/images/services/yurtdisi-org.jpg",
      imageFit: "contain",
      features: [
        { id: "f37", text: "Destinasyon ve program kurgusu" },
        { id: "f38", text: "Uçuş ve vize koordinasyonu" },
        { id: "f39", text: "Yerel operasyon ve rehberlik" },
        { id: "f40", text: "Incentive ve kurumsal geziler" },
      ],
      buttonText: "Hizmeti İncele",
      active: true,
      sortOrder: 7,
      eyebrow: "YURT DIŞI",
      featured: true,
      layoutVariant: "editorial",
    },
    {
      id: "svc11",
      title: "Okul Eğitim Gezileri",
      shortDescription:
        "Okul ve üniversite grupları için eğitim, kültür ve keşif gezileri.",
      detailedDescription:
        "Müze, kampüs, bilim ve kültür rotalarını pedagojik akışla planlıyor; öğrenci güvenliği, öğretmen koordinasyonu ve aile bilgilendirmesini aynı titizlikle yürütüyoruz.",
      imageUrl: "/images/services/egitim-1.jpg",
      galleryUrls: ["/images/services/egitim-2.jpg"],
      features: [
        { id: "f41", text: "Eğitim odaklı rota tasarımı" },
        { id: "f42", text: "Öğrenci güvenliği ve refakat" },
        { id: "f43", text: "Rehber ve içerik planı" },
        { id: "f44", text: "Ulaşım ve yemek organizasyonu" },
      ],
      buttonText: "Hizmeti İncele",
      active: true,
      sortOrder: 8,
      eyebrow: "EĞİTİM",
      featured: true,
      layoutVariant: "collage",
    },
    {
      id: "svc12",
      title: "Konaklama, Transfer ve Vize Hizmetleri",
      shortDescription:
        "Otel, transfer ve vize süreçlerini tek çatı altında yönetiyoruz.",
      detailedDescription:
        "Grup ve kurumsal programlarda konaklama rezervasyonu, havalimanı–otel transferleri ve vize/pasaport süreçlerini aynı operasyonel ritimde koordine ediyoruz.",
      imageUrl: "/images/services/hotel.jpg",
      galleryUrls: [
        "/images/services/transfer.webp",
        "/images/services/vize-pasaport.png",
      ],
      features: [
        { id: "f45", text: "Otel ve konaklama rezervasyonu" },
        { id: "f46", text: "Havalimanı ve şehir transferi" },
        { id: "f47", text: "Vize ve pasaport danışmanlığı" },
        { id: "f48", text: "Grup lojistiği" },
      ],
      buttonText: "Hizmeti İncele",
      active: true,
      sortOrder: 9,
      eyebrow: "LOJİSTİK",
      featured: true,
      layoutVariant: "split",
    },
    {
      id: "svc13",
      title: "Spor Kampları",
      shortDescription:
        "Takım kampları, hazırlık dönemi ve spor organizasyonları.",
      detailedDescription:
        "Antrenman sahası, konaklama, beslenme ve transferi sporun ritmine göre kurguluyor; kulüp ve okul takımları için kamp operasyonunu uçtan uca yönetiyoruz.",
      imageUrl: "/images/services/spor.mp4",
      features: [
        { id: "f49", text: "Kamp programı ve tesis seçimi" },
        { id: "f50", text: "Antrenman sahası koordinasyonu" },
        { id: "f51", text: "Konaklama ve beslenme" },
        { id: "f52", text: "Transfer ve saha lojistiği" },
      ],
      buttonText: "Hizmeti İncele",
      active: true,
      sortOrder: 10,
      eyebrow: "SPOR",
      featured: true,
      layoutVariant: "split",
    },
  ],
  references: [
    {
      id: "ref2",
      companyName: "Marmara Üniversitesi",
      projectTitle: "Üniversite Mezuniyet Töreni",
      category: "Mezuniyet",
      eventDate: "2025-06-18",
      shortDescription:
        "Açık hava mezuniyet töreni; kep akışı, aile protokolü, sahne ve kayıt yönetimi.",
      logoUrl: "/images/logo-aurora.svg",
      coverImageUrl: "/images/services/mezuniyet.png",
      active: true,
      sortOrder: 1,
      testimonial:
        "Mezuniyet törenimiz hem duygusal hem kusursuz aktı. Aileler ve mezunlar gün boyu konuştu.",
      testimonialAuthor: "Ayşe Yılmaz, Öğrenci İşleri",
    },
    {
      id: "ref3",
      companyName: "Boğaz Festivali",
      projectTitle: "Açık Hava Müzik Festivali",
      category: "Festival",
      eventDate: "2024-08-10",
      shortDescription:
        "Üç günlük açık hava festivali; sahne, güvenlik ve crowd management operasyonu.",
      logoUrl: "/images/logo-bogaz.svg",
      coverImageUrl: "/images/projects/acik-hava-muzik-festivali.jpg",
      active: true,
      sortOrder: 2,
    },
    {
      id: "ref5",
      companyName: "PixelWorks",
      projectTitle: "İmmersive Ürün Demo Sahnesi",
      category: "Prodüksiyon",
      eventDate: "2025-02-08",
      shortDescription:
        "LED mapping, interaktif sahne ve canlı demo altyapısı ile teknik prodüksiyon.",
      logoUrl: "/images/logo-pixel.svg",
      coverImageUrl: "/images/project-tech.svg",
      active: true,
      sortOrder: 3,
    },
  ],
  clientLogos: [
    { id: "cl1", name: "Aurora Teknoloji", logoUrl: "/images/logo-aurora.svg" },
    { id: "cl2", name: "Lumina Cosmetics", logoUrl: "/images/logo-lumina.svg" },
    { id: "cl3", name: "Boğaz Festivali", logoUrl: "/images/logo-bogaz.svg" },
    { id: "cl4", name: "Echo Music", logoUrl: "/images/logo-echo.svg" },
    { id: "cl5", name: "Vespera Holding", logoUrl: "/images/logo-vespera.svg" },
    { id: "cl6", name: "PixelWorks", logoUrl: "/images/logo-pixel.svg" },
    { id: "cl7", name: "Nordic Bank", logoUrl: "/images/logo-nordic.svg" },
    { id: "cl8", name: "Atlas Otomotiv", logoUrl: "/images/logo-atlas.svg" },
  ],
};
