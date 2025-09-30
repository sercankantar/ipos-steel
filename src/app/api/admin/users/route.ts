import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function GET() {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const users = await prisma.adminUser.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(users.map(u => ({ id: u.id, username: u.username, createdAt: u.createdAt })))
}

export async function POST(req: NextRequest) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const { username, password } = await req.json()
  if (!username || !password) return NextResponse.json({ error: 'Eksik alan' }, { status: 400 })
  const hash = await bcrypt.hash(password, 10)
  const created = await prisma.adminUser.create({ data: { username, password: hash } })
  return NextResponse.json({ id: created.id, username: created.username, createdAt: created.createdAt })
}

