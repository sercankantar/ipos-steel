import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const rules = await prisma.businessEthicsRules.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' }
    })
    return NextResponse.json(rules)
  } catch (error) {
    console.error('Business ethics rules getirilirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
