import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { name, surname, email, phone, message } = await req.json()
    if (!name || !surname || !email || !message) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik' }, { status: 400 })
    }
    await prisma.contactMessage.create({
      data: { name, surname, email, phone: phone || null, message },
    })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}


