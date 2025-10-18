import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

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

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Mevcut kaydı bul veya yeni oluştur
    const existing = await prisma.internshipProcess.findFirst()
    
    let data
    if (existing) {
      data = await prisma.internshipProcess.update({
        where: { id: existing.id },
        data: {
          heroTitle: body.heroTitle,
          heroSubtitle: body.heroSubtitle,
          mainDescription: body.mainDescription,
          highSchoolTitle: body.highSchoolTitle,
          highSchoolBullets: body.highSchoolBullets,
          universityTitle: body.universityTitle,
          universityBullets: body.universityBullets,
          criteriaTitle: body.criteriaTitle,
          criteriaBullets: body.criteriaBullets,
          conclusionParagraph: body.conclusionParagraph,
          imageUrl: body.imageUrl,
          imagePublicId: body.imagePublicId,
          imageAlt: body.imageAlt,
        }
      })
    } else {
      data = await prisma.internshipProcess.create({
        data: {
          heroTitle: body.heroTitle,
          heroSubtitle: body.heroSubtitle,
          mainDescription: body.mainDescription,
          highSchoolTitle: body.highSchoolTitle,
          highSchoolBullets: body.highSchoolBullets,
          universityTitle: body.universityTitle,
          universityBullets: body.universityBullets,
          criteriaTitle: body.criteriaTitle,
          criteriaBullets: body.criteriaBullets,
          conclusionParagraph: body.conclusionParagraph,
          imageUrl: body.imageUrl,
          imagePublicId: body.imagePublicId,
          imageAlt: body.imageAlt,
        }
      })
    }

    // Cache'i temizle
    revalidatePath('/staj-surecimiz')
    revalidatePath('/api/internship-process')

    return NextResponse.json(data)
  } catch (error) {
    console.error('Staj süreci verisi kaydedilirken hata:', error)
    return NextResponse.json({ error: 'Veri kaydedilirken hata oluştu' }, { status: 500 })
  }
}
