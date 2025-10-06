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
        name: 'Referanslar',
        href: '/referanslar',
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
        name: 'Staj Sürecimiz',
        href: '/staj-surecimiz',
        imageSrc: '/nav/career-nav.png',
      },
    ],
  },
  {
    label: 'Medya',
    value: 'media' as const,
    featured: [
      {
        name: 'Haberler',
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
    ],
  },
]
