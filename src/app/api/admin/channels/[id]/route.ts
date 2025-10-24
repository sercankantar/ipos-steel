import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const channel = await prisma.channel.findUnique({
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

    if (!channel) {
      return NextResponse.json(
        { error: 'Kanal bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json(channel)
  } catch (error) {
    console.error('Kanal yüklenirken hata:', error)
    return NextResponse.json(
      { error: 'Kanal yüklenirken hata oluştu' },
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
        { error: 'Kanal adı, kodu ve alt ürün seçimi zorunludur' },
        { status: 400 }
      )
    }

    // Kanalın var olup olmadığını kontrol et
    const existingChannel = await prisma.channel.findUnique({
      where: { id: params.id }
    })

    if (!existingChannel) {
      return NextResponse.json(
        { error: 'Kanal bulunamadı' },
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

    const channel = await prisma.channel.update({
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

    return NextResponse.json(channel)
  } catch (error) {
    console.error('Kanal güncellenirken hata:', error)
    return NextResponse.json(
      { error: 'Kanal güncellenirken hata oluştu' },
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

    const channel = await prisma.channel.findUnique({
      where: { id: params.id }
    })

    if (!channel) {
      return NextResponse.json(
        { error: 'Kanal bulunamadı' },
        { status: 404 }
      )
    }

    await prisma.channel.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Kanal başarıyla silindi' })
  } catch (error) {
    console.error('Kanal silinirken hata:', error)
    return NextResponse.json(
      { error: 'Kanal silinirken hata oluştu' },
      { status: 500 }
    )
  }
}
