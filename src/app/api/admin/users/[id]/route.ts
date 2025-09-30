import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const { username, password } = await req.json()
  const data: any = {}
  if (username) data.username = username
  if (password) data.password = await bcrypt.hash(password, 10)
  const updated = await prisma.adminUser.update({ where: { id: params.id }, data })
  return NextResponse.json({ id: updated.id, username: updated.username, createdAt: updated.createdAt })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  await prisma.adminUser.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}


