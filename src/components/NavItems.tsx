'use client'

import Link from 'next/link'

const NavItems = () => {
  const navItems = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Ürünler', href: '/products' },
    { label: 'Hakkımızda', href: '/about' },
    { label: 'İletişim', href: '/contact' },
  ]

  return (
    <div className='flex gap-8 h-full items-center'>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className='font-medium text-gray-700 hover:text-primary-blue transition-colors duration-200 relative group'
        >
          {item.label}
          <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all duration-300 group-hover:w-full'></span>
        </Link>
      ))}
    </div>
  )
}

export default NavItems
