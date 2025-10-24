import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cover = await prisma.cover.findUnique({
      where: { id: params.id },
      include: {
        subProduct: {
          select: {
            id: true,
            name: true,
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
        }
      }
    })

    if (!cover) {
      return NextResponse.json(
        { error: 'Kapak bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(cover)
  } catch (error) {
    console.error('Kapak yüklenirken hata:', error)
    return NextResponse.json(
      { error: 'Kapak yüklenirken hata oluştu' },
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
    const { name, imageUrl, imagePublicId, code, height, width, coatingType, sheetThickness, subProductId, isActive } = body

    if (!name || !code || !subProductId) {
      return NextResponse.json(
        { error: 'Kapak adı, kodu ve alt ürün seçimi zorunludur' },
        { status: 400 }
      )
    }

    // Kapağın var olup olmadığını kontrol et
    const existingCover = await prisma.cover.findUnique({
      where: { id: params.id }
    })

    if (!existingCover) {
      return NextResponse.json(
        { error: 'Kapak bulunamadı' },
        { status: 404 }
      )
    }

    // Alt ürünün var olup olmadığını kontrol et
    const subProduct = await prisma.subProduct.findUnique({
      where: { id: subProductId }
    })

    if (!subProduct) {
      return NextResponse.json(
        { error: 'Seçilen alt ürün bulunamadı' },
        { status: 404 }
      )
    }

    const cover = await prisma.cover.update({
      where: { id: params.id },
      data: {
        name,
        imageUrl,
        imagePublicId,
        code,
        height,
        width,
        coatingType,
        sheetThickness,
        subProductId,
        isActive: isActive !== undefined ? isActive : true
      },
      include: {
        subProduct: {
          select: {
            id: true,
            name: true,
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
        }
      }
    })

    return NextResponse.json(cover)
  } catch (error) {
    console.error('Kapak güncellenirken hata:', error)
    return NextResponse.json(
      { error: 'Kapak güncellenirken hata oluştu' },
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

    const cover = await prisma.cover.findUnique({
      where: { id: params.id }
    })

    if (!cover) {
      return NextResponse.json(
        { error: 'Kapak bulunamadı' },
        { status: 404 }
      )
    }

    await prisma.cover.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Kapak başarıyla silindi' })
  } catch (error) {
    console.error('Kapak silinirken hata:', error)
    return NextResponse.json(
      { error: 'Kapak silinirken hata oluştu' },
      { status: 500 }
    )
  }
}
