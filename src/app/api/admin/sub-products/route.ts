import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const subProducts = await prisma.subProduct.findMany({
      include: {
        product: {
          select: {
            id: true,
            name: true,
            category: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(subProducts)
  } catch (error) {
    console.error('Alt ürünler yüklenirken hata:', error)
    return NextResponse.json(
      { error: 'Alt ürünler yüklenirken hata oluştu' },
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

    const body = await request.json()
    const { name, imageUrl, imagePublicId, height, width, productId } = body

    if (!name || !productId) {
      return NextResponse.json(
        { error: 'Alt ürün adı ve ürün seçimi zorunludur' },
        { status: 400 }
      )
    }

    // Ürünün var olup olmadığını kontrol et
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Seçilen ürün bulunamadı' },
        { status: 404 }
      )
    }

    const subProduct = await prisma.subProduct.create({
      data: {
        name,
        imageUrl,
        imagePublicId,
        height,
        width,
        productId
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            category: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(subProduct, { status: 201 })
  } catch (error) {
    console.error('Alt ürün oluşturulurken hata:', error)
    return NextResponse.json(
      { error: 'Alt ürün oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
}
