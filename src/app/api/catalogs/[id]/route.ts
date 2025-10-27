import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const catalog = await prisma.catalog.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        title: true,
        description: true,
        categoryId: true,
        fileType: true,
        fileSize: true,
        imageUrl: true,
        pages: true,
        language: true,
        version: true,
        publishDate: true,
        downloadCount: true,
        featured: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        category: true
      }
    })

    if (!catalog) {
      return NextResponse.json({ error: 'Katalog bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(catalog, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('Katalog getirilirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

