import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    
    const { title, summary, category, publishedAt, imageUrl, imagePublicId, images, deletedImageIds, isActive } = await request.json()
    
    // Transaction kullanarak güncelleme işlemini gerçekleştir
    const updated = await prisma.$transaction(async (tx) => {
      // Silinecek görselleri sil
      if (deletedImageIds && deletedImageIds.length > 0) {
        await tx.galleryImage.deleteMany({
          where: {
            id: { in: deletedImageIds }
          }
        })
      }

      // Galeri öğesini güncelle
      const updatedItem = await tx.galleryItem.update({
        where: { id: params.id },
        data: { 
          title, 
          summary, 
          category, 
          publishedAt: new Date(publishedAt), 
          imageUrl, 
          imagePublicId, 
          isActive 
        }
      })

      // Yeni görselleri ekle
      if (images && images.length > 0) {
        await tx.galleryImage.createMany({
          data: images.map((img: any, index: number) => ({
            galleryItemId: params.id,
            imageUrl: img.imageUrl,
            imagePublicId: img.imagePublicId,
            order: img.order || index
          }))
        })
      }

      // Güncellenmiş öğeyi görselleriyle birlikte getir
      return await tx.galleryItem.findUnique({
        where: { id: params.id },
        include: {
          images: {
            orderBy: { order: 'asc' }
          }
        }
      })
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Gallery update error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    await prisma.galleryItem.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}


