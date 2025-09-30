import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const missionVision = await prisma.missionVision.findFirst({
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(missionVision)
  } catch (error) {
    console.error('Misyon-vizyon getirilirken hata:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { mission, vision, missionImageUrl, missionImagePublicId, visionImageUrl, visionImagePublicId } = await request.json()

    // Önce mevcut kayıtları pasif yap
    await prisma.missionVision.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    })

    // Yeni kayıt oluştur
    const missionVision = await prisma.missionVision.create({
      data: {
        mission,
        vision,
        missionImageUrl,
        missionImagePublicId,
        visionImageUrl,
        visionImagePublicId,
        isActive: true
      }
    })

    return NextResponse.json(missionVision)
  } catch (error) {
    console.error('Misyon-vizyon oluşturulurken hata:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { mission, vision, missionImageUrl, missionImagePublicId, visionImageUrl, visionImagePublicId } = await request.json()

    // Mevcut kaydı bul
    const existingRecord = await prisma.missionVision.findFirst({
      orderBy: { updatedAt: 'desc' }
    })

    if (existingRecord) {
      // Mevcut kaydı güncelle
      const missionVision = await prisma.missionVision.update({
        where: { id: existingRecord.id },
        data: {
          mission,
          vision,
          missionImageUrl: missionImageUrl ?? existingRecord.missionImageUrl,
          missionImagePublicId: missionImagePublicId ?? existingRecord.missionImagePublicId,
          visionImageUrl: visionImageUrl ?? existingRecord.visionImageUrl,
          visionImagePublicId: visionImagePublicId ?? existingRecord.visionImagePublicId,
        }
      })

      return NextResponse.json(missionVision)
    } else {
      // Kayıt yoksa yeni oluştur
      const missionVision = await prisma.missionVision.create({
        data: {
          mission,
          vision,
          missionImageUrl,
          missionImagePublicId,
          visionImageUrl,
          visionImagePublicId,
          isActive: true
        }
      })

      return NextResponse.json(missionVision)
    }
  } catch (error) {
    console.error('Misyon-vizyon güncellenirken hata:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}
