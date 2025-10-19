import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const search = searchParams.get('search')

    const where: any = { isActive: true }
    
    if (categoryId && categoryId !== 'all') {
      where.categoryId = categoryId
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const manuals = await prisma.manual.findMany({
      where,
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
        // fileData ve fileUrl'yi dahil etmiyoruz - performans için
      },
      orderBy: [
        { featured: 'desc' },
        { publishDate: 'desc' }
      ]
    })

    return NextResponse.json(manuals, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('Manuals getirilirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
