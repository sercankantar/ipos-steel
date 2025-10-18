import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const settings = await prisma.catalogPageSettings.findFirst({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Catalog page settings getirilirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { heroTitle, heroSubtitle } = await request.json()

    // Önce mevcut aktif ayarları pasif yap
    await prisma.catalogPageSettings.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    })

    const settings = await prisma.catalogPageSettings.create({
      data: { heroTitle, heroSubtitle }
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Catalog page settings oluşturulurken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id, heroTitle, heroSubtitle } = await request.json()

    const settings = await prisma.catalogPageSettings.update({
      where: { id },
      data: { heroTitle, heroSubtitle }
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Catalog page settings güncellenirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
