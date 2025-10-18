import { NextRequest, NextResponse } from 'next/server'
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

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Mevcut kaydı bul veya yeni oluştur
    const existing = await prisma.careerOpportunities.findFirst()
    
    let data
    if (existing) {
      data = await prisma.careerOpportunities.update({
        where: { id: existing.id },
        data: {
          heroTitle: body.heroTitle,
          heroSubtitle: body.heroSubtitle,
          mainTitle: body.mainTitle,
          mainSubtitle: body.mainSubtitle,
          mainDescription: body.mainDescription,
          platformCards: body.platformCards,
          kvkkTitle: body.kvkkTitle,
          kvkkContent: body.kvkkContent,
        }
      })
    } else {
      data = await prisma.careerOpportunities.create({
        data: {
          heroTitle: body.heroTitle,
          heroSubtitle: body.heroSubtitle,
          mainTitle: body.mainTitle,
          mainSubtitle: body.mainSubtitle,
          mainDescription: body.mainDescription,
          platformCards: body.platformCards,
          kvkkTitle: body.kvkkTitle,
          kvkkContent: body.kvkkContent,
        }
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Kariyer fırsatları verisi kaydedilirken hata:', error)
    return NextResponse.json({ error: 'Veri kaydedilirken hata oluştu' }, { status: 500 })
  }
}
