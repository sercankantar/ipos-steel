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
        href: `/about`,
        imageSrc: '/nav/icons/picks.jpg',
      },
      {
        name: 'Vizyonumuz',
        href: '/about#vision',
        imageSrc: '/nav/icons/new.jpg',
      },
      {
        name: 'Referanslar',
        href: '/references',
        imageSrc: '/nav/icons/bestsellers.jpg',
      },
    ],
  },
  {
    label: 'Medya',
    value: 'media' as const,
    featured: [
      {
        name: 'Haberler',
        href: `/news`,
        imageSrc: '/nav/icons/picks.jpg',
      },
      {
        name: 'Basın Bültenleri',
        href: '/press',
        imageSrc: '/nav/icons/new.jpg',
      },
      {
        name: 'Galeri',
        href: '/gallery',
        imageSrc: '/nav/icons/bestsellers.jpg',
      },
    ],
  },
]
