'use client'

import AdminLayout from '@/components/AdminLayout'
import { usePathname } from 'next/navigation'

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return <AdminLayout>{children}</AdminLayout>
}
