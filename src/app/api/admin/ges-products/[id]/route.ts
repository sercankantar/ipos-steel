import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const gesProduct = await prisma.gesProduct.findUnique({
      where: { id: params.id },
      include: { 
        category: true,
        catalog: true
      }
    })

    if (!gesProduct) {
      return NextResponse.json({ error: 'GES ürünü bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(gesProduct)
  } catch (error) {
    console.error('GES ürünü getirilirken hata:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { 
      name, 
      mainImageUrl, 
      mainImagePublicId, 
      categoryId,
      catalogId,
      technicalSpecs,
      description1,
      image1Url,
      image1PublicId,
      description2,
      image2Url,
      image2PublicId,
      description3,
      image3Url,
      image3PublicId,
      isActive
    } = await request.json()

    const gesProduct = await prisma.gesProduct.update({
      where: { id: params.id },
      data: {
        name,
        mainImageUrl: mainImageUrl || null,
        mainImagePublicId: mainImagePublicId || null,
        categoryId,
        catalogId: catalogId || null,
        technicalSpecs: technicalSpecs || [],
        description1: description1 || null,
        image1Url: image1Url || null,
        image1PublicId: image1PublicId || null,
        description2: description2 || null,
        image2Url: image2Url || null,
        image2PublicId: image2PublicId || null,
        description3: description3 || null,
        image3Url: image3Url || null,
        image3PublicId: image3PublicId || null,
        isActive: typeof isActive === 'boolean' ? isActive : true
      },
      include: {
        category: true,
        catalog: true
      }
    })

    // Cache'i temizle
    revalidatePath('/products')
    revalidatePath('/api/products')
    revalidatePath('/api/product-categories')

    return NextResponse.json(gesProduct)
  } catch (error) {
    console.error('GES ürünü güncellenirken hata:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    await prisma.gesProduct.delete({
      where: { id: params.id }
    })

    // Cache'i temizle
    revalidatePath('/products')
    revalidatePath('/api/products')
    revalidatePath('/api/product-categories')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('GES ürünü silinirken hata:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}
