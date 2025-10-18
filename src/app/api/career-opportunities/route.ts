import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const data = await prisma.careerOpportunities.findFirst({
      where: { isActive: true }
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Kariyer fırsatları verisi yüklenirken hata:', error)
    return NextResponse.json({ error: 'Veri yüklenirken hata oluştu' }, { status: 500 })
  }
}
