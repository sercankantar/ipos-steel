import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const { isRead } = await req.json()
  const updated = await prisma.contactMessage.update({ where: { id: params.id }, data: { isRead: Boolean(isRead) } })
  return NextResponse.json(updated)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  await prisma.contactMessage.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}


