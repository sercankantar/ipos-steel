import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function authenticateAdmin(username: string, password: string) {
  const user = await prisma.adminUser.findUnique({ where: { username } })
  if (!user) return false
  return await bcrypt.compare(password, user.password)
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  const adminToken = cookieStore.get('admin-token')
  return adminToken?.value === 'authenticated'
}

export async function setAdminAuth() {
  const cookieStore = await cookies()
  cookieStore.set('admin-token', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 saat
  })
}

export async function clearAdminAuth() {
  const cookieStore = await cookies()
  cookieStore.delete('admin-token')
}
