// IPOS Steel Ürün Kataloğu
// Dijital satış danışmanı için ana ürün bilgileri

export const PRODUCT_CATALOG = {
  products: [
    {
      code: 'SCT',
      name: 'Standart Tip Kablo Kanalı',
      fullName: 'SCT - Standart Tip Kablo Kanalı',
      sizes: ['40H', '50H', '60H', '80H', '100H'],
      coatings: ['Pregalvaniz', 'Sıcak Daldırma', 'Boyalı', 'Elektro'],
      description: 'Genel amaçlı kullanım için tasarlanmış ekonomik kablo kanalı sistemi',
      useCases: ['İç mekan uygulamaları', 'Ofis binaları', 'Ticari alanlar', 'Konut projeleri'],
      features: [
        'Ekonomik çözüm',
        'Kolay montaj',
        'Geniş aksesuar desteği',
        'Standart kablo kapasitesi'
      ],
      accessories: ['L Köşe', 'T Köşe', 'X Köşe', 'Kapak (Tam/Yarım)', 'Askı Sistemleri', 'Kenar Profili'],
      recommendation: 'Ofis ve iç mekan projeleri için ideal seçim'
    },
    {
      code: 'CT',
      name: 'Ağır Hizmet Tipi Kablo Kanalı',
      fullName: 'CT - Ağır Hizmet Tipi Kablo Kanalı',
      sizes: ['40H', '50H', '60H', '80H', '100H'],
      coatings: ['Pregalvaniz', 'Sıcak Daldırma', 'Boyalı', 'Elektro'],
      description: 'Endüstriyel tesisler ve ağır hizmet şartları için yüksek dayanıklı kanal sistemi',
      useCases: ['Endüstriyel tesisler', 'Fabrikalar', 'Ağır sanayi', 'Yüksek mekanik dayanım gereken alanlar'],
      features: [
        'Kalın sac yapısı',
        'Yüksek mekanik dayanım',
        'Ağır yük taşıma kapasitesi',
        'Profesyonel uygulamalar için'
      ],
      accessories: ['L Köşe', 'T Köşe', 'X Köşe', 'Redüksiyon', 'Kapak Sistemleri', 'Endüstriyel Askılar'],
      recommendation: 'Fabrika ve endüstriyel tesis projelerinde tercih edilir'
    },
    {
      code: 'SUCT',
      name: 'Deliksiz Standart Tip Kablo Kanalı',
      fullName: 'SUCT - Deliksiz Standart Tip Kablo Kanalı',
      sizes: ['40H', '50H', '60H'],
      coatings: ['Pregalvaniz', 'Sıcak Daldırma', 'Boyalı'],
      description: 'Deliksiz yüzey yapısı ile estetik ve pratik kullanım sunan kanal sistemi',
      useCases: ['Görünür montajlar', 'Estetik öncelikli projeler', 'Modern binalar', 'Showroom alanları'],
      features: [
        'Deliksiz estetik yüzey',
        'Kolay temizlenebilir',
        'Modern görünüm',
        'Standart dayanıklılık'
      ],
      accessories: ['Özel Köşe Elemanları', 'Estetik Kapaklar', 'Görünür Montaj Askıları'],
      recommendation: 'Estetik görünümün önemli olduğu projelerde önerilir'
    },
    {
      code: 'HUCT',
      name: 'Deliksiz Ağır Hizmet Tipi Kablo Kanalı',
      fullName: 'HUCT - Deliksiz Ağır Hizmet Tipi Kablo Kanalı',
      sizes: ['50H', '60H', '80H'],
      coatings: ['Pregalvaniz', 'Sıcak Daldırma', 'Boyalı'],
      description: 'Ağır hizmet dayanıklılığı ile deliksiz estetik yüzeyi birleştiren premium kanal',
      useCases: ['Endüstriyel görünür montajlar', 'Premium projeler', 'Yüksek dayanım + estetik', 'Özel tesisler'],
      features: [
        'Deliksiz premium yüzey',
        'Ağır hizmet dayanımı',
        'Estetik + güç birlikteliği',
        'Yüksek kalite standartları'
      ],
      accessories: ['Premium Köşe Sistemleri', 'Deliksiz Kapaklar', 'Özel Montaj Elemanları'],
      recommendation: 'Hem dayanıklılık hem estetik arayan projeler için mükemmel'
    },
    {
      code: 'ICT',
      name: 'Formlu/Geçmeli Tip Kablo Kanalı',
      fullName: 'ICT - Formlu/Geçmeli Tip Kablo Kanalı',
      sizes: ['40H', '50H', '60H'],
      coatings: ['Pregalvaniz', 'Sıcak Daldırma', 'Boyalı'],
      description: 'Özel form yapısı ve geçmeli montaj sistemi ile hızlı kurulum sağlayan kanal',
      useCases: ['Hızlı montaj projeleri', 'Modüler sistemler', 'Esnek konfigürasyonlar', 'Retrofit uygulamaları'],
      features: [
        'Hızlı geçmeli montaj',
        'Özel form tasarımı',
        'Esnek konfigürasyon',
        'Kolay değişiklik yapılabilir'
      ],
      accessories: ['Geçmeli Köşeler', 'Hızlı Montaj Elemanları', 'Modüler Kapaklar'],
      recommendation: 'Hızlı montaj ve esneklik gereken projelerde avantajlı'
    },
    {
      code: 'TRU',
      name: 'Trunking Kablo Kanalı',
      fullName: 'TRU - Trunking Kablo Kanalı (Büyük Kanal Sistemi)',
      sizes: ['80H', '100H', '120H', '150H'],
      coatings: ['Pregalvaniz', 'Sıcak Daldırma'],
      description: 'Yüksek kablo kapasiteli ana kablo hatları için büyük boyutlu kanal sistemi',
      useCases: ['Ana kablo hatları', 'Büyük tesisler', 'Yüksek kablo yoğunluğu', 'Omurga sistemleri'],
      features: [
        'Yüksek kablo kapasitesi',
        'Büyük boyutlar (80-150mm)',
        'Ağır yük taşıma',
        'Ana hat uygulamaları'
      ],
      accessories: ['Büyük Köşe Sistemleri', 'Trunking Kapakları', 'Özel Askı Sistemleri', 'Bölme Elemanları'],
      recommendation: 'Büyük tesislerde ana kablo dağıtım hatları için ideal'
    },
    {
      code: 'CL',
      name: 'Kablo Merdiveni',
      fullName: 'CL - Kablo Merdiveni Sistemleri',
      sizes: ['Çeşitli genişlik ve yükseklikler'],
      coatings: ['Pregalvaniz', 'Sıcak Daldırma'],
      description: 'Açık tip kablo taşıma sistemi, kolay bakım ve yüksek havalandırma',
      useCases: ['Endüstriyel tesisler', 'Veri merkezleri', 'Yüksek kablo trafiği', 'Kolay erişim gereken alanlar'],
      features: [
        'Açık sistem (kolay erişim)',
        'Mükemmel havalandırma',
        'Esnek konfigürasyon',
        'Kolay kablo ekleme/çıkarma'
      ],
      accessories: ['Merdiven Köşeleri', 'Askı Sistemleri', 'Bağlantı Elemanları', 'Kapaklar (opsiyonel)'],
      recommendation: 'Veri merkezi ve yüksek kablo yoğunluklu projelerde tercih edilir'
    },
    {
      code: 'GES',
      name: 'Geçiş Sistemleri',
      fullName: 'GES - Elektrik Geçiş Sistemleri',
      sizes: ['Özel boyutlar'],
      coatings: ['Çeşitli'],
      description: 'Elektrik panolarına ve cihazlara kablo geçişi için özel sistemler',
      useCases: ['Pano girişleri', 'Cihaz bağlantıları', 'Yangın duvarı geçişleri', 'Su yalıtımlı geçişler'],
      features: [
        'Özel geçiş çözümleri',
        'Yalıtımlı sistemler',
        'IP korumalı versiyonlar',
        'Yangın durdurucu seçenekler'
      ],
      accessories: ['Geçiş Flanşları', 'Yalıtım Elemanları', 'Conta Sistemleri'],
      recommendation: 'Pano ve cihaz bağlantılarında profesyonel geçiş çözümü'
    }
  ],

  coatingInfo: {
    'Pregalvaniz': {
      description: 'Ekonomik ve dayanıklı çinko kaplama',
      bestFor: ['İç mekan uygulamaları', 'Normal nem koşulları', 'Bütçe dostu projeler'],
      features: ['Ekonomik', 'İç mekan için yeterli koruma', 'Hızlı teslimat']
    },
    'Sıcak Daldırma': {
      description: 'Yüksek korozyon direnci, dış mekan uyumlu',
      bestFor: ['Dış mekan uygulamaları', 'Yüksek nem ortamları', 'Uzun ömür beklentisi', 'Sahil bölgeleri'],
      features: ['20+ yıl dayanım', 'Maksimum korozyon koruması', 'Dış mekan standartı']
    },
    'Boyalı': {
      description: 'Estetik görünüm, özel renk seçenekleri',
      bestFor: ['Görünür montajlar', 'Estetik öncelikli projeler', 'Özel renk talebi', 'Modern binalar'],
      features: ['RAL renk seçenekleri', 'Estetik görünüm', 'Dekoratif uygulamalar']
    },
    'Elektro': {
      description: 'Elektro galvaniz, hafif koruma',
      bestFor: ['Kontrollü iç ortamlar', 'Düşük bütçeli projeler', 'Kısa vadeli kullanım'],
      features: ['En ekonomik seçenek', 'Hafif koruma', 'İç mekan']
    }
  },

  usageRecommendations: {
    'iç mekan': 'İç mekan kullanımı için Pregalvaniz kaplama ekonomik ve yeterli koruma sağlar. SCT serisi ideal.',
    'dış mekan': 'Dış mekan kullanımı için mutlaka Sıcak Daldırma kaplama önerilir. 20+ yıl korozyon koruması.',
    'endüstriyel': 'Endüstriyel tesislerde CT (Ağır Hizmet) veya HUCT serisi yüksek mekanik dayanım sağlar.',
    'estetik': 'Görünür montajlarda Boyalı kaplama veya SUCT/HUCT deliksiz seriler estetik görünüm sunar.',
    'ekonomik': 'Bütçe dostu projeler için SCT Pregalvaniz serisi en ekonomik çözümdür.',
    'büyük kapasite': 'Yüksek kablo sayısı için TRU (Trunking) veya CL (Merdiven) sistemleri uygundur.',
    'hızlı montaj': 'Hızlı kurulum için ICT (Geçmeli) serisi avantajlıdır.',
    'kolay bakım': 'Kolay erişim ve bakım için CL (Kablo Merdiveni) sistemleri idealdir.'
  },

  accessories: {
    corners: ['L Köşe (90°)', 'T Köşe', 'X Köşe (Çapraz)', 'Y Köşe', 'İç/Dış Köşe'],
    covers: ['Tam Kapak', 'Yarım Kapak', 'Delikli Kapak', 'Transparan Kapak'],
    mounting: ['Tavan Askısı', 'Duvar Bağlantısı', 'Zemin Montaj Elemanı', 'U Profil Askı'],
    connections: ['Redüksiyon', 'Genişletme', 'Bölme Elemanı', 'Kenar Profili', 'Son Kapak'],
    special: ['Yangın Bariyeri', 'Su Yalıtım', 'IP Korumalı Sistemler']
  },

  contactInfo: {
    phone: '0262 674 47 67',
    email: 'info@ipos-steel.com',
    website: 'https://ipossteel.com',
    address: 'Köseler, Kocaeli Kafe OSB, 1. Cd. No:22, 41420 Dilovası/Kocaeli',
    workingHours: 'Pazartesi - Cuma: 08:30 - 17:30'
  }
}

// Ürün önerisi için yardımcı fonksiyon
export function getProductRecommendation(criteria: {
  location?: 'indoor' | 'outdoor',
  budget?: 'economy' | 'standard' | 'premium',
  capacity?: 'small' | 'medium' | 'large',
  aesthetic?: boolean,
  industrial?: boolean
}): string[] {
  const recommendations: string[] = []

  if (criteria.location === 'outdoor') {
    recommendations.push('TRU', 'CT', 'CL')
  }
  
  if (criteria.budget === 'economy') {
    recommendations.push('SCT')
  }
  
  if (criteria.capacity === 'large') {
    recommendations.push('TRU', 'CL')
  }
  
  if (criteria.aesthetic) {
    recommendations.push('SUCT', 'HUCT')
  }
  
  if (criteria.industrial) {
    recommendations.push('CT', 'HUCT', 'TRU')
  }

  return recommendations.length > 0 ? recommendations : ['SCT', 'CT']
}

