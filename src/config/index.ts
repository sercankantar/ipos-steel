export const PRODUCT_CATEGORIES = [
  {
    label: 'Ürünler',
    value: 'ui_kits' as const,
    featured: [
      {
        name: 'Busbar Sistemleri',
        href: `/products?category=busbar`,
        imageSrc: '/nav/ui-kits/mixed.jpg',
      },
      {
        name: 'Askı Sistemleri',
        href: '/products?category=aski',
        imageSrc: '/nav/ui-kits/blue.jpg',
      },
      {
        name: 'Kablo Kanalı Sistemleri',
        href: '/products?category=kablo',
        imageSrc: '/nav/ui-kits/purple.jpg',
      },
    ],
  },
  {
    label: 'Kurumsal',
    value: 'icons' as const,
    featured: [
      {
        name: 'Hakkımızda',
        href: '/hakkimizda',
        imageSrc: '/nav/icons/picks.jpg',
      },
      {
        name: 'Misyonumuz ve Vizyonumuz',
        href: '/misyon-vizyon',
        imageSrc: '/nav/icons/new.jpg',
      },
      {
        name: 'Sertifikalar',
        href: '/sertifikalar',
        imageSrc: '/nav/icons/bestsellers.jpg',
      },
      {
        name: 'Referanslar',
        href: '/referanslar',
        imageSrc: '/nav/ui-kits/blue.jpg',
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
        imageSrc: '/nav/icons/new.jpg',
      },
      {
        name: 'Basın Açıklamaları',
        href: '/basin-aciklamalari',
        imageSrc: '/nav/icons/picks.jpg',
      },
      {
        name: 'Galeri',
        href: '/galeri',
        imageSrc: '/nav/ui-kits/mixed.jpg',
      },
    ],
  },
]
