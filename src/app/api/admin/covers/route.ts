import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const covers = await prisma.cover.findMany({
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(covers)
  } catch (error) {
    console.error('Kapaklar yüklenirken hata:', error)
    return NextResponse.json(
      { error: 'Kapaklar yüklenirken hata oluştu' },
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
    const { name, imageUrl, imagePublicId, code, height, width, coatingType, sheetThickness, subProductId } = body

    if (!name || !code || !subProductId) {
      return NextResponse.json(
        { error: 'Kapak adı, kodu ve alt ürün seçimi zorunludur' },
        { status: 400 }
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

    const cover = await prisma.cover.create({
      data: {
        name,
        imageUrl,
        imagePublicId,
        code,
        height,
        width,
        coatingType,
        sheetThickness,
        subProductId
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

    return NextResponse.json(cover, { status: 201 })
  } catch (error) {
    console.error('Kapak oluşturulurken hata:', error)
    return NextResponse.json(
      { error: 'Kapak oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
}
