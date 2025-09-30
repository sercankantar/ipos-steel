import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Sadece /admin yollarını koru; login ve API login/logout serbest
  const isAdminPath = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'
  const isApiAdminLogin = pathname === '/api/admin/login'
  const isApiAdminLogout = pathname === '/api/admin/logout'

  if (!isAdminPath) {
    return NextResponse.next()
  }

  if (isLoginPage || isApiAdminLogin || isApiAdminLogout) {
    return NextResponse.next()
  }

  const adminToken = req.cookies.get('admin-token')?.value
  const isAuthenticated = adminToken === 'authenticated'

  if (!isAuthenticated) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
