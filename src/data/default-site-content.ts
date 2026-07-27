import type { SiteContent } from "@/types/content";

export const defaultSiteContent: SiteContent = {
  lastUpdated: new Date().toISOString(),
  settings: {
    siteName: "ventoraevent",
    logoText: "Ventora Event",
    tagline: "Fikirleri Unutulmaz Deneyimlere Dönüştürüyoruz.",
    footerDescription:
      "Yaratıcı fikirleri güçlü prodüksiyon ve kusursuz operasyonla unutulmaz deneyimlere dönüştürüyoruz.",
    primaryAccent: "#3b82f6",
    secondaryAccent: "#8b5cf6",
    seoTitle: "Ventora Event | Etkinlik ve Organizasyon",
    seoDescription:
      "Kurumsal etkinliklerden marka lansmanlarına, festival ve özel davetlerden teknik prodüksiyona kadar uçtan uca etkinlik çözümleri.",
    copyrightText: "Ventora Event. Tüm hakları saklıdır.",
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
    heroHeadline: "Fikirleri Unutulmaz Deneyimlere Dönüştürüyoruz.",
    heroDescription:
      "Markalar, kurumlar ve topluluklar için yaratıcı, etkileyici ve kusursuz etkinlik deneyimleri tasarlıyoruz.",
    primaryButtonText: "Neler Yapıyoruz",
    primaryButtonUrl: "/neler-yapiyoruz",
    secondaryButtonText: "Bize Ulaşın",
    secondaryButtonUrl: "/iletisim",
    marqueeTexts: [
      { id: "m1", text: "YARATICI FİKİRLER" },
      { id: "m2", text: "ETKİLEYİCİ DENEYİMLER" },
      { id: "m3", text: "UNUTULMAZ ETKİNLİKLER" },
      { id: "m4", text: "TASARIM • PRODÜKSİYON • ORGANİZASYON" },
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
      { id: "s4", value: 10, suffix: "+", label: "Yıllık Deneyim" },
    ],
    valuesSectionTitle: "Bizi Biz Yapan Değerler",
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
      { id: "as4", value: 10, suffix: "+", label: "Yıllık Deneyim" },
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
  values: [
    {
      id: "v1",
      title: "Yaratıcılık",
      description:
        "Her projeye özgün bir bakış açısıyla yaklaşır; markanın karakterini yansıtan, akılda kalan konseptler üretiriz.",
      icon: "Sparkles",
      active: true,
      sortOrder: 1,
    },
    {
      id: "v2",
      title: "Güven",
      description:
        "Sözümüzü tutar, süreçleri şeffaf yönetir ve müşterilerimizin her aşamada kendilerini güvende hissetmelerini sağlarız.",
      icon: "Shield",
      active: true,
      sortOrder: 2,
    },
    {
      id: "v3",
      title: "Yenilikçilik",
      description:
        "Teknoloji, sahne tasarımı ve deneyim formatlarında güncel trendleri takip eder; cesur ama ölçülü yenilikler deneriz.",
      icon: "Lightbulb",
      active: true,
      sortOrder: 3,
    },
    {
      id: "v4",
      title: "Sürdürülebilirlik",
      description:
        "Kaynak kullanımını bilinçli planlar; mümkün olan her noktada daha sürdürülebilir malzeme ve operasyon tercihleri yaparız.",
      icon: "Leaf",
      active: true,
      sortOrder: 4,
    },
    {
      id: "v5",
      title: "Kusursuz Uygulama",
      description:
        "Detaylara takıntılı yaklaşırız. Zamanlama, teknik kurulum ve misafir deneyimi aynı titizlikle yönetilir.",
      icon: "Target",
      active: true,
      sortOrder: 5,
    },
    {
      id: "v6",
      title: "İnsan Odaklılık",
      description:
        "Her kararın merkezinde katılımcı, ekip ve markanın insanı vardır. Duygu, konfor ve erişilebilirlik önceliğimizdir.",
      icon: "Heart",
      active: true,
      sortOrder: 6,
    },
  ],
  services: [
    {
      id: "svc1",
      title: "Kurumsal Etkinlikler",
      shortDescription:
        "Şirket toplantıları, zirveler ve kurumsal kutlamalar için uçtan uca organizasyon.",
      detailedDescription:
        "Yıllık toplantılardan liderlik zirvelerine, ödül törenlerinden çalışan deneyimi etkinliklerine kadar kurumsal ihtiyaçlara özel planlama ve uygulama sunuyoruz. Markanızın dilini sahneye taşıyor, operasyonu kusursuz yönetiyoruz.",
      imageUrl: "/images/services/kurumsal-etkinlikler.jpg",
      features: [
        { id: "f1", text: "Konsept ve senaryo tasarımı" },
        { id: "f2", text: "Mekân seçimi ve yönetimi" },
        { id: "f3", text: "Teknik kurulum ve saha yönetimi" },
        { id: "f4", text: "Misafir deneyimi planlaması" },
      ],
      buttonText: "Teklif Al",
      active: true,
      sortOrder: 1,
    },
    {
      id: "svc2",
      title: "Lansman ve Marka Deneyimleri",
      shortDescription:
        "Ürün ve marka lansmanlarında güçlü ilk izlenim ve duygusal bağ oluşturuyoruz.",
      detailedDescription:
        "Yeni bir ürünü veya marka kimliğini tanıtmak için sahne, ışık, anlatı ve etkileşimi bir araya getiriyoruz. Hedef kitlenizin aklında ve kalbinde yer edecek lansman deneyimleri tasarlıyoruz.",
      imageUrl: "/images/services/lansman-marka-deneyimleri.jpg",
      features: [
        { id: "f5", text: "Marka hikâyesi ve mesaj mimarisi" },
        { id: "f6", text: "Deneyim istasyonları" },
        { id: "f7", text: "Medya ve basın koordinasyonu" },
        { id: "f8", text: "Görsel kimlik uygulaması" },
      ],
      buttonText: "Teklif Al",
      active: true,
      sortOrder: 2,
    },
    {
      id: "svc3",
      title: "Festival ve Konser Yönetimi",
      shortDescription:
        "Büyük ölçekli açık ve kapalı alan etkinliklerinde güvenli, akıcı operasyon.",
      detailedDescription:
        "Kapasite planlamasından güvenlik protokollerine, artist rider’larından crowd management’a kadar festival ve konser organizasyonunun tüm katmanlarını yönetiyoruz.",
      imageUrl: "/images/services/festival-konser-yonetimi.jpg",
      features: [
        { id: "f9", text: "Sahne ve backstage planlama" },
        { id: "f10", text: "Kapasite ve akış yönetimi" },
        { id: "f11", text: "Güvenlik ve acil durum koordinasyonu" },
        { id: "f12", text: "Sponsor ve aktivasyon alanları" },
      ],
      buttonText: "Teklif Al",
      active: true,
      sortOrder: 3,
    },
    {
      id: "svc4",
      title: "Özel Davetler",
      shortDescription:
        "VIP davetler, gala geceleri ve özel kutlamalar için premium deneyim tasarımı.",
      detailedDescription:
        "Seçkin davetli listeleri için zarif, kişiselleştirilmiş ve akılda kalan özel davetler hazırlıyoruz. Atmosfer, hizmet kalitesi ve detay yönetimi ön plandadır.",
      imageUrl: "/images/services/ozel-davetler.jpg",
      features: [
        { id: "f13", text: "Tema ve dekor tasarımı" },
        { id: "f14", text: "Catering koordinasyonu" },
        { id: "f15", text: "Davetiye ve RSVP yönetimi" },
        { id: "f16", text: "VIP karşılama protokolü" },
      ],
      buttonText: "Teklif Al",
      active: true,
      sortOrder: 4,
    },
    {
      id: "svc5",
      title: "Teknik Prodüksiyon",
      shortDescription:
        "Ses, ışık, LED, görüntü ve sahne teknolojilerinde profesyonel kurulum.",
      detailedDescription:
        "Etkinliğinizin teknik altyapısını baştan sona planlıyor ve uyguluyoruz. Güvenilir ekipman, deneyimli teknisyenler ve yedekli sistemlerle riski minimize ediyoruz.",
      imageUrl: "/images/services/teknik-produksiyon.jpg",
      features: [
        { id: "f17", text: "Ses ve ışık tasarımı" },
        { id: "f18", text: "LED ekran ve mapping" },
        { id: "f19", text: "Canlı yayın ve kayıt" },
        { id: "f20", text: "Teknik prova yönetimi" },
      ],
      buttonText: "Teklif Al",
      active: true,
      sortOrder: 5,
    },
    {
      id: "svc6",
      title: "Sahne Tasarımı",
      shortDescription:
        "Markanıza özel sahne mimarisi, dekor ve görsel anlatım çözümleri.",
      detailedDescription:
        "Sahneyi yalnızca bir platform değil; hikâyenin kalbi olarak ele alıyoruz. Mekân ölçeğine, marka kimliğine ve program akışına uygun sahne tasarımları üretiyoruz.",
      imageUrl: "/images/services/sahne-tasarimi.png",
      features: [
        { id: "f21", text: "3D sahne görselleştirme" },
        { id: "f22", text: "Dekor ve set üretimi" },
        { id: "f23", text: "Işık senaryosu entegrasyonu" },
        { id: "f24", text: "Kurulum ve demontaj" },
      ],
      buttonText: "Teklif Al",
      active: true,
      sortOrder: 6,
    },
    {
      id: "svc7",
      title: "Kreatif Konsept",
      shortDescription:
        "Fikirden görsel dile: etkinliğinizin yaratıcı omurgasını oluşturuyoruz.",
      detailedDescription:
        "Konsept geliştirme, isimlendirme, görsel dil, içerik senaryosu ve deneyim dokunuşlarını tek bir yaratıcı çerçevede birleştiriyoruz.",
      imageUrl: "/images/service-creative.svg",
      features: [
        { id: "f25", text: "Konsept atölyeleri" },
        { id: "f26", text: "Görsel kimlik ve key visual" },
        { id: "f27", text: "İçerik ve konuşma senaryosu" },
        { id: "f28", text: "Deneyim dokunuşları" },
      ],
      buttonText: "Teklif Al",
      active: true,
      sortOrder: 7,
    },
    {
      id: "svc8",
      title: "Etkinlik Operasyonu",
      shortDescription:
        "Saha yönetimi, zamanlama ve misafir deneyimini kusursuz yürüten operasyon ekibi.",
      detailedDescription:
        "Etkinlik günü her şeyin yolunda gitmesi için run-of-show, ekip koordinasyonu, tedarikçi yönetimi ve anlık problem çözme süreçlerini profesyonelce yürütüyoruz.",
      imageUrl: "/images/service-ops.svg",
      features: [
        { id: "f29", text: "Run-of-show hazırlığı" },
        { id: "f30", text: "Tedarikçi koordinasyonu" },
        { id: "f31", text: "Saha ekibi yönetimi" },
        { id: "f32", text: "Anlık kriz yönetimi" },
      ],
      buttonText: "Teklif Al",
      active: true,
      sortOrder: 8,
    },
  ],
  references: [
    {
      id: "ref1",
      companyName: "Aurora Teknoloji",
      projectTitle: "Yıllık Liderlik Zirvesi 2025",
      category: "Kurumsal",
      eventDate: "2025-03-15",
      shortDescription:
        "800 kişilik kurumsal zirve; sahne tasarımı, teknik prodüksiyon ve misafir deneyimi yönetimi.",
      logoUrl: "/images/logo-aurora.svg",
      coverImageUrl: "/images/project-summit.svg",
      active: true,
      sortOrder: 1,
      testimonial:
        "Ventora Event ekibi, zirvemizi hem içerik hem sahne açısından beklediğimizin ötesine taşıdı.",
      testimonialAuthor: "Elif Kaya, Pazarlama Direktörü",
    },
    {
      id: "ref2",
      companyName: "Lumina Cosmetics",
      projectTitle: "Yeni Ürün Lansmanı",
      category: "Lansman",
      eventDate: "2025-01-22",
      shortDescription:
        "İstanbul’da immersive ürün lansmanı; interaktif istasyonlar ve canlı performans.",
      logoUrl: "/images/logo-lumina.svg",
      coverImageUrl: "/images/project-launch.svg",
      active: true,
      sortOrder: 2,
      testimonial:
        "Lansman gecemiz markamızın yeni dönemini kusursuz yansıttı. Her detay düşünülmüştü.",
      testimonialAuthor: "Deniz Arslan, Marka Müdürü",
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
      coverImageUrl: "/images/project-festival.svg",
      active: true,
      sortOrder: 3,
    },
    {
      id: "ref4",
      companyName: "Echo Music",
      projectTitle: "Stad Konser Prodüksiyonu",
      category: "Konser",
      eventDate: "2024-11-05",
      shortDescription:
        "15.000 kişilik stadyum konseri için teknik kurulum ve sahne yönetimi.",
      logoUrl: "/images/logo-echo.svg",
      coverImageUrl: "/images/project-concert.svg",
      active: true,
      sortOrder: 4,
    },
    {
      id: "ref5",
      companyName: "Vespera Holding",
      projectTitle: "Gala ve Ödül Töreni",
      category: "Özel Davet",
      eventDate: "2024-12-14",
      shortDescription:
        "Premium gala gecesi; dekor, protokol ve sahne akışı yönetimi.",
      logoUrl: "/images/logo-vespera.svg",
      coverImageUrl: "/images/project-gala.svg",
      active: true,
      sortOrder: 5,
      testimonial:
        "Gala gecemiz hem zarif hem etkileyiciydi. Misafirlerimiz hâlâ bahsediyor.",
      testimonialAuthor: "Canan Demir, Kurumsal İletişim",
    },
    {
      id: "ref6",
      companyName: "PixelWorks",
      projectTitle: "İmmersive Ürün Demo Sahnesi",
      category: "Prodüksiyon",
      eventDate: "2025-02-08",
      shortDescription:
        "LED mapping, interaktif sahne ve canlı demo altyapısı ile teknik prodüksiyon.",
      logoUrl: "/images/logo-pixel.svg",
      coverImageUrl: "/images/project-tech.svg",
      active: true,
      sortOrder: 6,
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
