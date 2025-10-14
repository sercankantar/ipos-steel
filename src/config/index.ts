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
      {
        name: 'Hakkımızda',
        href: '/hakkimizda',
        imageSrc: '/nav/hakkimizda-nav.png',
      },
      {
        name: 'Misyonumuz ve Vizyonumuz',
        href: '/misyon-vizyon',
        imageSrc: '/nav/misyonvizyon-nav.png',
      },
      {
        name: 'Sertifikalar',
        href: '/sertifikalar',
        imageSrc: '/nav/sertifikalar-nav.png',
      },
      {
        name: 'Referanslarımız',
        href: '/referanslarimiz',
        imageSrc: '/nav/referanslar-nav.png',
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
        name: 'Ücret ve Yan Haklar Yönetimimiz',
        href: '/ucret-ve-yan-haklar-yonetimimiz',
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
