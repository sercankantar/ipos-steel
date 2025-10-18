import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const items = await prisma.galleryItem.findMany({ 
      include: {
        images: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { publishedAt: 'desc' } 
    })
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

    const { title, summary, category, publishedAt, imageUrl, imagePublicId, images, isActive } = await request.json()
    
    const created = await prisma.galleryItem.create({
      data: { 
        title, 
        summary, 
        category, 
        publishedAt: new Date(publishedAt), 
        imageUrl, // Ana görsel (geriye uyumluluk)
        imagePublicId, // Ana görsel public ID (geriye uyumluluk)
        isActive: isActive ?? true,
        images: images && images.length > 0 ? {
          create: images.map((img: any, index: number) => ({
            imageUrl: img.imageUrl,
            imagePublicId: img.imagePublicId,
            order: index
          }))
        } : undefined
      },
      include: {
        images: {
          orderBy: { order: 'asc' }
        }
      }
    })
    
    return NextResponse.json(created)
  } catch (error) {
    console.error('Gallery creation error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}


