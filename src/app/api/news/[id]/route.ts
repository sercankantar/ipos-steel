import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const [item, categories] = await Promise.all([
      prisma.news.findUnique({ 
        where: { 
          id: params.id,
          isActive: true 
        } 
      }),
      prisma.newsCategory.findMany({
        where: { isActive: true }
      })
    ])
    
    if (!item) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
    
    // Kategori rengini ekle
    const category = categories.find(cat => cat.name === item.category)
    const itemWithColor = {
      ...item,
      categoryColor: category?.color || 'bg-gray-100 text-gray-800'
    }
    
    return NextResponse.json(itemWithColor, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('News detail fetch error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}


