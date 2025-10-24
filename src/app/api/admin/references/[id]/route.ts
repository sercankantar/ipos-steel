import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    
    const data = await request.json()
    const updated = await prisma.reference.update({
      where: { id: params.id },
      data: {
        sector: data.sector,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        location: data.location,
        projectDate: data.projectDate ? new Date(data.projectDate) : null,
        slug: data.slug,
        mainImage: data.mainImage,
        mainImagePublicId: data.mainImagePublicId,
        gallery: data.gallery || [],
        galleryPublicIds: data.galleryPublicIds || [],
        tags: data.tags || [],
        featured: data.featured ?? false,
        isActive: data.isActive ?? true
      }
    })

    // Cache'i temizle
    revalidatePath('/referanslar')
    revalidatePath('/referanslarimiz')
    revalidatePath('/api/references')

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Reference update error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    await prisma.reference.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}


