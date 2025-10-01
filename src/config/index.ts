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
