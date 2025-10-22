export const PRODUCT_CATEGORIES = [
  {
    label: 'Ürünler',
    value: 'ui_kits' as const,
    featured: [
      // Artık dinamik kategorilerden besleyeceğiz; bu statik liste fallback olarak kalabilir
    ],
  },
  {
    label: 'Kurumsal',
    value: 'icons' as const,
    featured: [
      // Hakkımızda bölümü
      {
        name: 'Hakkımızda',
        href: '#',
        imageSrc: '/nav/hakkimizda-nav.png',
        isHeader: true,
      },
      {
        name: 'IPOS-Steel Hakkında',
        href: '/hakkimizda',
        imageSrc: '/nav/hakkimizda-nav.png',
      },
      {
        name: 'Misyonumuz ve Vizyonumuz',
        href: '/misyon-vizyon',
        imageSrc: '/nav/misyonvizyon-nav.png',
      },
      {
        name: 'Sertifikalarımız',
        href: '/sertifikalar',
        imageSrc: '/nav/sertifikalar-nav.png',
      },
      {
        name: 'Referanslarımız',
        href: '/referanslarimiz',
        imageSrc: '/nav/referanslar-nav.png',
      },
      // Medya Merkezi bölümü
      {
        name: 'Medya Merkezi',
        href: '#',
        imageSrc: '/nav/haberler-nav.png',
        isHeader: true,
      },
      {
        name: 'IPOS Haberler',
        href: '/haberler',
        imageSrc: '/nav/haberler-nav.png',
      },
      {
        name: 'Basın Açıklamaları',
        href: '/basin-aciklamalari',
        imageSrc: '/nav/basin-nav.png',
      },
      {
        name: 'Galeri',
        href: '/galeri',
        imageSrc: '/nav/galeri-nav.jpg',
      },
      {
        name: 'Müşteri Memnuniyet Anketi',
        href: '/musteri-memnuniyet-anketi',
        imageSrc: '/nav/musteri-nav.png',
      },
      // KVKK bölümü
      {
        name: 'Kişisel Verilerin Korunması',
        href: '#',
        imageSrc: '/nav/kvkk-nav.png',
        isHeader: true,
      },
      {
        name: 'Kişisel Verilerin Korunması, İşlenmesi ve Gizlilik Politikası',
        href: '/kvkk-gizlilik-politikasi',
        imageSrc: '/nav/kvkk-nav.png',
      },
      {
        name: 'Kişisel Verilere İlişkin Aydınlatma Metni',
        href: '/kvkk-aydinlatma-metni',
        imageSrc: '/nav/kvkk-nav.png',
      },
    ],
  },
  {
    label: 'Kariyer',
    value: 'career' as const,
    featured: [
      {
        name: 'İnsan Kaynakları Politikamız',
        href: '/insan-kaynaklari-politikamiz',
        imageSrc: '/nav/career-nav.png',
      },
      {
        name: 'İş Etiği Kurallarımız',
        href: '/is-etigi-kurallarimiz',
        imageSrc: '/nav/career-nav.png',
      },
      
      {
        name: 'İşe Alım Süreci',
        href: '/ise-alim-sureci',
        imageSrc: '/nav/career-nav.png',
      },
      {
        name: 'Kariyer Fırsatlarımız',
        href: '/kariyer-firsatlari',
        imageSrc: '/nav/career-nav.png',
      },
      {
        name: 'Açık Pozisyonlar',
        href: '/acik-pozisyonlar',
        imageSrc: '/nav/career-nav.png',
      },
      {
        name: 'Staj Sürecimiz',
        href: '/staj-surecimiz',
        imageSrc: '/nav/career-nav.png',
      },
    ],
  },
  {
    label: 'İndirme Merkezi',
    value: 'downloads' as const,
    featured: [
      {
        name: 'Katalog & Broşürler',
        href: '/katalog-brosurler',
        imageSrc: '/nav/katalog-nav.png',
      },
      {
        name: 'El Kitapları & Montaj Kılavuzları',
        href: '/el-kitaplari-montaj-kilavuzlari',
        imageSrc: '/nav/elkitabi-nav.png',
      },
    ],
  },
]
