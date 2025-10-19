import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const data = await prisma.internshipProcess.findFirst({
      where: { isActive: true }
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Staj süreci verisi yüklenirken hata:', error)
    return NextResponse.json({ error: 'Veri yüklenirken hata oluştu' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { heroTitle, heroSubtitle, content, imageUrl, imagePublicId, imageAlt } = await request.json()

    // Mevcut kaydı bul veya oluştur
    const existing = await prisma.internshipProcess.findFirst({
      where: { isActive: true }
    })

    let data
    if (existing) {
      // Güncelle
      data = await prisma.internshipProcess.update({
        where: { id: existing.id },
        data: {
          heroTitle,
          heroSubtitle,
          content: content || existing.content,
          imageUrl: imageUrl ?? existing.imageUrl,
          imagePublicId: imagePublicId ?? existing.imagePublicId,
          imageAlt: imageAlt ?? existing.imageAlt,
        }
      })
    } else {
      // Yeni oluştur - eski alanları da doldur
      data = await prisma.internshipProcess.create({
        data: {
          heroTitle,
          heroSubtitle,
          content: content || '',
          mainDescription: '',
          highSchoolTitle: '',
          highSchoolBullets: [],
          universityTitle: '',
          universityBullets: [],
          criteriaTitle: '',
          criteriaBullets: [],
          conclusionParagraph: '',
          imageUrl,
          imagePublicId,
          imageAlt,
          isActive: true,
        }
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Staj süreci güncellenirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}