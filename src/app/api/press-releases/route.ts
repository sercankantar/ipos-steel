import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export async function GET() {
  try {
    // Basın açıklamalarını ve kategorileri al
    const [items, categories] = await Promise.all([
      prisma.pressRelease.findMany({ 
        where: { isActive: true },
        orderBy: { publishedAt: 'desc' } 
      }),
      prisma.pressReleaseCategory.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      })
    ])

    // Her basın açıklaması için kategori rengini ekle
    const itemsWithColors = items.map(item => {
      const category = categories.find(cat => cat.name === item.category)
      return {
        ...item,
        categoryColor: category?.color || 'bg-gray-100 text-gray-800'
      }
    })

    return NextResponse.json(itemsWithColors, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('Press releases fetch error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}


