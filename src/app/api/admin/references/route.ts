import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const items = await prisma.reference.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

    const data = await request.json()
    
    // Validation
    if (!data.name || !data.sector) {
      return NextResponse.json({ error: 'Şirket adı ve sektör gerekli' }, { status: 400 })
    }

    const created = await prisma.reference.create({ 
      data: {
        name: data.name,
        sector: data.sector,
        logoUrl: data.logoUrl || null,
        logoPublicId: data.logoPublicId || null,
        title: data.title || null,
        excerpt: data.excerpt || null,
        content: data.content || null,
        category: data.category || null,
        location: data.location || null,
        client: data.client || null,
        projectValue: data.projectValue || null,
        duration: data.duration || null,
        slug: data.slug || null,
        mainImage: data.mainImage || null,
        mainImagePublicId: data.mainImagePublicId || null,
        gallery: data.gallery || [],
        galleryPublicIds: data.galleryPublicIds || [],
        tags: data.tags || [],
        featured: data.featured ?? false,
        views: 0,
        isActive: data.isActive ?? true
      }
    })
    return NextResponse.json(created)
  } catch (error) {
    console.error('Reference creation error:', error)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Bu slug zaten kullanımda' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Sunucu hatası: ' + error.message }, { status: 500 })
  }
}


