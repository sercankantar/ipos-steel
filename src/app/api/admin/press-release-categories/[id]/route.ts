import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Önce bu kategoriye ait basın açıklaması var mı kontrol et
    const pressReleasesCount = await prisma.pressRelease.count({
      where: { category: { contains: id } }
    })

    if (pressReleasesCount > 0) {
      return NextResponse.json(
        { error: 'Bu kategoriye ait basın açıklamaları bulunduğu için silinemez' },
        { status: 400 }
      )
    }

    await prisma.pressReleaseCategory.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Kategori silindi' })
  } catch (error) {
    console.error('Press release category deletion error:', error)
    return NextResponse.json({ error: 'Kategori silinemedi' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { name, color, isActive } = await request.json()

    const category = await prisma.pressReleaseCategory.update({
      where: { id },
      data: {
        name: name?.trim(),
        color,
        isActive
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Press release category update error:', error)
    return NextResponse.json({ error: 'Kategori güncellenemedi' }, { status: 500 })
  }
}
