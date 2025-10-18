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

    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { category: true }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Ürünler getirilirken hata:', error)
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

    const { name, description, series, material, coatingType, thickness, width, height, imageUrl, imagePublicId, categoryId, isActive } = await request.json()

    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        series: series || null,
        material: material || null,
        coatingType: coatingType || null,
        thickness: thickness || null,
        width: width || null,
        height: height || null,
        imageUrl: imageUrl || null,
        imagePublicId: imagePublicId || null,
        isActive: typeof isActive === 'boolean' ? isActive : true,
        categoryId,
      }
    })

    // Cache'i temizle
    revalidatePath('/products')
    revalidatePath('/api/products')
    revalidatePath('/api/product-categories')

    return NextResponse.json(product)
  } catch (error) {
    console.error('Ürün oluşturulurken hata:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}
