import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { name, description, series, material, coatingType, thickness, width, height, imageUrl, imagePublicId, categoryId, isActive } = await request.json()

    const product = await prisma.product.update({
      where: { id: params.id },
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
        categoryId,
        isActive,
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Ürün güncellenirken hata:', error)
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

    await prisma.product.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Ürün silinirken hata:', error)
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}
