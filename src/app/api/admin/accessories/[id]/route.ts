import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const accessory = await prisma.accessory.findUnique({
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

    if (!accessory) {
      return NextResponse.json(
        { error: 'Aksesuar bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(accessory)
  } catch (error) {
    console.error('Aksesuar yüklenirken hata:', error)
    return NextResponse.json(
      { error: 'Aksesuar yüklenirken hata oluştu' },
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
        { error: 'Aksesuar adı, kodu ve alt ürün seçimi zorunludur' },
        { status: 400 }
      )
    }

    // Aksesuarın var olup olmadığını kontrol et
    const existingAccessory = await prisma.accessory.findUnique({
      where: { id: params.id }
    })

    if (!existingAccessory) {
      return NextResponse.json(
        { error: 'Aksesuar bulunamadı' },
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

    const accessory = await prisma.accessory.update({
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

    return NextResponse.json(accessory)
  } catch (error) {
    console.error('Aksesuar güncellenirken hata:', error)
    return NextResponse.json(
      { error: 'Aksesuar güncellenirken hata oluştu' },
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

    const accessory = await prisma.accessory.findUnique({
      where: { id: params.id }
    })

    if (!accessory) {
      return NextResponse.json(
        { error: 'Aksesuar bulunamadı' },
        { status: 404 }
      )
    }

    await prisma.accessory.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Aksesuar başarıyla silindi' })
  } catch (error) {
    console.error('Aksesuar silinirken hata:', error)
    return NextResponse.json(
      { error: 'Aksesuar silinirken hata oluştu' },
      { status: 500 }
    )
  }
}
