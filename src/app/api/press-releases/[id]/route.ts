import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const item = await prisma.pressRelease.findUnique({ where: { id: params.id } })
    if (!item) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
    return NextResponse.json(item, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}


