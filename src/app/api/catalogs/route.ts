import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    const catalogs = await prisma.catalog.findMany({
      where,
      include: {
        category: true
      },
      orderBy: [
        { featured: 'desc' },
        { publishDate: 'desc' }
      ]
    })

    return NextResponse.json(catalogs)
  } catch (error) {
    console.error('Catalogs getirilirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
