import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const data = await prisma.salaryAndBenefitsManagement.findFirst({
      where: { isActive: true }
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Ücret ve yan haklar verisi yüklenirken hata:', error)
    return NextResponse.json({ error: 'Veri yüklenirken hata oluştu' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Mevcut kaydı bul veya yeni oluştur
    const existing = await prisma.salaryAndBenefitsManagement.findFirst()
    
    let data
    if (existing) {
      data = await prisma.salaryAndBenefitsManagement.update({
        where: { id: existing.id },
        data: {
          heroTitle: body.heroTitle,
          heroSubtitle: body.heroSubtitle,
          salaryPolicyTitle: body.salaryPolicyTitle,
          salaryPolicySubtitle: body.salaryPolicySubtitle,
          salaryPolicyContent: body.salaryPolicyContent,
          salaryPolicyImageUrl: body.salaryPolicyImageUrl,
          salaryPolicyImagePublicId: body.salaryPolicyImagePublicId,
          strategyTitle: body.strategyTitle,
          strategyContent: body.strategyContent,
          strategyBullets: body.strategyBullets,
          benefitsTitle: body.benefitsTitle,
          benefitsSubtitle: body.benefitsSubtitle,
          generalBenefitsTitle: body.generalBenefitsTitle,
          generalBenefitsSubtitle: body.generalBenefitsSubtitle,
          generalBenefits: body.generalBenefits,
          positionBenefitsTitle: body.positionBenefitsTitle,
          positionBenefitsSubtitle: body.positionBenefitsSubtitle,
          positionBenefits: body.positionBenefits,
          positionBenefitsNote: body.positionBenefitsNote,
          ctaTitle: body.ctaTitle,
          ctaContent: body.ctaContent,
          ctaButton1Text: body.ctaButton1Text,
          ctaButton1Link: body.ctaButton1Link,
          ctaButton2Text: body.ctaButton2Text,
          ctaButton2Link: body.ctaButton2Link,
        }
      })
    } else {
      data = await prisma.salaryAndBenefitsManagement.create({
        data: {
          heroTitle: body.heroTitle,
          heroSubtitle: body.heroSubtitle,
          salaryPolicyTitle: body.salaryPolicyTitle,
          salaryPolicySubtitle: body.salaryPolicySubtitle,
          salaryPolicyContent: body.salaryPolicyContent,
          salaryPolicyImageUrl: body.salaryPolicyImageUrl,
          salaryPolicyImagePublicId: body.salaryPolicyImagePublicId,
          strategyTitle: body.strategyTitle,
          strategyContent: body.strategyContent,
          strategyBullets: body.strategyBullets,
          benefitsTitle: body.benefitsTitle,
          benefitsSubtitle: body.benefitsSubtitle,
          generalBenefitsTitle: body.generalBenefitsTitle,
          generalBenefitsSubtitle: body.generalBenefitsSubtitle,
          generalBenefits: body.generalBenefits,
          positionBenefitsTitle: body.positionBenefitsTitle,
          positionBenefitsSubtitle: body.positionBenefitsSubtitle,
          positionBenefits: body.positionBenefits,
          positionBenefitsNote: body.positionBenefitsNote,
          ctaTitle: body.ctaTitle,
          ctaContent: body.ctaContent,
          ctaButton1Text: body.ctaButton1Text,
          ctaButton1Link: body.ctaButton1Link,
          ctaButton2Text: body.ctaButton2Text,
          ctaButton2Link: body.ctaButton2Link,
        }
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Ücret ve yan haklar verisi kaydedilirken hata:', error)
    return NextResponse.json({ error: 'Veri kaydedilirken hata oluştu' }, { status: 500 })
  }
}
