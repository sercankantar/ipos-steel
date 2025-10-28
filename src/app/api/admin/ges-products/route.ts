import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const gesProducts = await prisma.gesProduct.findMany({
      orderBy: { createdAt: 'desc' },
      include: { 
        category: true,
        catalog: true
      }
    })

    return NextResponse.json(gesProducts)
  } catch (error) {
    console.error('GES ürünleri getirilirken hata:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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
      bonusImage1Url,
      bonusImage1PublicId,
      bonusImage2Url,
      bonusImage2PublicId,
      bonusImage3Url,
      bonusImage3PublicId,
      bonusImage4Url,
      bonusImage4PublicId,
      isActive
    } = await request.json()

    const gesProduct = await prisma.gesProduct.create({
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
        bonusImage1Url: bonusImage1Url || null,
        bonusImage1PublicId: bonusImage1PublicId || null,
        bonusImage2Url: bonusImage2Url || null,
        bonusImage2PublicId: bonusImage2PublicId || null,
        bonusImage3Url: bonusImage3Url || null,
        bonusImage3PublicId: bonusImage3PublicId || null,
        bonusImage4Url: bonusImage4Url || null,
        bonusImage4PublicId: bonusImage4PublicId || null,
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
    console.error('GES ürünü oluşturulurken hata:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}
