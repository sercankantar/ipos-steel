import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const data = await prisma.recruitmentProcess.findFirst({
      where: { isActive: true }
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('İşe alım süreci verisi yüklenirken hata:', error)
    return NextResponse.json({ error: 'Veri yüklenirken hata oluştu' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Mevcut kaydı bul veya yeni oluştur
    const existing = await prisma.recruitmentProcess.findFirst()
    
    let data
    if (existing) {
      data = await prisma.recruitmentProcess.update({
        where: { id: existing.id },
        data: {
          heroTitle: body.heroTitle,
          heroSubtitle: body.heroSubtitle,
          purposeTitle: body.purposeTitle,
          purposeMissionTitle: body.purposeMissionTitle,
          purposeMissionContent: body.purposeMissionContent,
          purposeValuesTitle: body.purposeValuesTitle,
          purposeValuesContent: body.purposeValuesContent,
          purposeValues: body.purposeValues,
          purposeImageUrl: body.purposeImageUrl,
          purposeImagePublicId: body.purposeImagePublicId,
          purposeImageCaption: body.purposeImageCaption,
          requirementsTitle: body.requirementsTitle,
          requirementsSubtitle: body.requirementsSubtitle,
          requirementsCategories: body.requirementsCategories,
          processTitle: body.processTitle,
          processSubtitle: body.processSubtitle,
          processSteps: body.processSteps,
          ctaTitle: body.ctaTitle,
          ctaContent: body.ctaContent,
          ctaButton1Text: body.ctaButton1Text,
          ctaButton1Link: body.ctaButton1Link,
          ctaButton2Text: body.ctaButton2Text,
          ctaButton2Link: body.ctaButton2Link,
        }
      })
    } else {
      data = await prisma.recruitmentProcess.create({
        data: {
          heroTitle: body.heroTitle,
          heroSubtitle: body.heroSubtitle,
          purposeTitle: body.purposeTitle,
          purposeMissionTitle: body.purposeMissionTitle,
          purposeMissionContent: body.purposeMissionContent,
          purposeValuesTitle: body.purposeValuesTitle,
          purposeValuesContent: body.purposeValuesContent,
          purposeValues: body.purposeValues,
          purposeImageUrl: body.purposeImageUrl,
          purposeImagePublicId: body.purposeImagePublicId,
          purposeImageCaption: body.purposeImageCaption,
          requirementsTitle: body.requirementsTitle,
          requirementsSubtitle: body.requirementsSubtitle,
          requirementsCategories: body.requirementsCategories,
          processTitle: body.processTitle,
          processSubtitle: body.processSubtitle,
          processSteps: body.processSteps,
          ctaTitle: body.ctaTitle,
          ctaContent: body.ctaContent,
          ctaButton1Text: body.ctaButton1Text,
          ctaButton1Link: body.ctaButton1Link,
          ctaButton2Text: body.ctaButton2Text,
          ctaButton2Link: body.ctaButton2Link,
        }
      })
    }

    // Cache'i temizle
    revalidatePath('/ise-alim-sureci')
    revalidatePath('/api/recruitment-process')

    return NextResponse.json(data)
  } catch (error) {
    console.error('İşe alım süreci verisi kaydedilirken hata:', error)
    return NextResponse.json({ error: 'Veri kaydedilirken hata oluştu' }, { status: 500 })
  }
}
