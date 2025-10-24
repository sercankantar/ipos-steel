import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const module = await prisma.module.findUnique({
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

    if (!module) {
      return NextResponse.json(
        { error: 'Modül bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(module)
  } catch (error) {
    console.error('Modül yüklenirken hata:', error)
    return NextResponse.json(
      { error: 'Modül yüklenirken hata oluştu' },
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
        { error: 'Modül adı, kodu ve alt ürün seçimi zorunludur' },
        { status: 400 }
      )
    }

    // Modülün var olup olmadığını kontrol et
    const existingModule = await prisma.module.findUnique({
      where: { id: params.id }
    })

    if (!existingModule) {
      return NextResponse.json(
        { error: 'Modül bulunamadı' },
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

    const module = await prisma.module.update({
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

    return NextResponse.json(module)
  } catch (error) {
    console.error('Modül güncellenirken hata:', error)
    return NextResponse.json(
      { error: 'Modül güncellenirken hata oluştu' },
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

    const module = await prisma.module.findUnique({
      where: { id: params.id }
    })

    if (!module) {
      return NextResponse.json(
        { error: 'Modül bulunamadı' },
        { status: 404 }
      )
    }

    await prisma.module.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Modül başarıyla silindi' })
  } catch (error) {
    console.error('Modül silinirken hata:', error)
    return NextResponse.json(
      { error: 'Modül silinirken hata oluştu' },
      { status: 500 }
    )
  }
}
