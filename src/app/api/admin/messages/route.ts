import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const onlyUnread = searchParams.get('unread') === 'true'
  const msgs = await prisma.contactMessage.findMany({
    where: { isRead: onlyUnread ? false : undefined },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(msgs)
}


