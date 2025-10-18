import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.pressReleaseCategory.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Press release categories fetch error:', error)
    return NextResponse.json({ error: 'Kategoriler yüklenemedi' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, color } = await request.json()

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Kategori adı gerekli' }, { status: 400 })
    }

    // Aynı isimde kategori var mı kontrol et
    const existing = await prisma.pressReleaseCategory.findFirst({
      where: { name: name.trim() }
    })

    if (existing) {
      return NextResponse.json({ error: 'Bu isimde bir kategori zaten mevcut' }, { status: 400 })
    }

    const category = await prisma.pressReleaseCategory.create({
      data: {
        name: name.trim(),
        color: color || 'bg-blue-100 text-blue-800'
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Press release category creation error:', error)
    return NextResponse.json({ error: 'Kategori oluşturulamadı' }, { status: 500 })
  }
}
