import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subProduct = await prisma.subProduct.findUnique({
      where: { id: params.id },
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

    if (!subProduct) {
      return NextResponse.json(
        { error: 'Alt ürün bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(subProduct)
  } catch (error) {
    console.error('Alt ürün yüklenirken hata:', error)
    return NextResponse.json(
      { error: 'Alt ürün yüklenirken hata oluştu' },
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

    const body = await request.json()
    const { name, imageUrl, imagePublicId, height, width, productId, isActive } = body

    if (!name || !productId) {
      return NextResponse.json(
        { error: 'Alt ürün adı ve ürün seçimi zorunludur' },
        { status: 400 }
      )
    }

    // Alt ürünün var olup olmadığını kontrol et
    const existingSubProduct = await prisma.subProduct.findUnique({
      where: { id: params.id }
    })

    if (!existingSubProduct) {
      return NextResponse.json(
        { error: 'Alt ürün bulunamadı' },
        { status: 404 }
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

    const subProduct = await prisma.subProduct.update({
      where: { id: params.id },
      data: {
        name,
        imageUrl,
        imagePublicId,
        height,
        width,
        productId,
        isActive: isActive !== undefined ? isActive : true
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

    return NextResponse.json(subProduct)
  } catch (error) {
    console.error('Alt ürün güncellenirken hata:', error)
    return NextResponse.json(
      { error: 'Alt ürün güncellenirken hata oluştu' },
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

    const subProduct = await prisma.subProduct.findUnique({
      where: { id: params.id }
    })

    if (!subProduct) {
      return NextResponse.json(
        { error: 'Alt ürün bulunamadı' },
        { status: 404 }
      )
    }

    await prisma.subProduct.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Alt ürün başarıyla silindi' })
  } catch (error) {
    console.error('Alt ürün silinirken hata:', error)
    return NextResponse.json(
      { error: 'Alt ürün silinirken hata oluştu' },
      { status: 500 }
    )
  }
}
