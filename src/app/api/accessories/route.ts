import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subProductId = searchParams.get('subProductId')

    if (!subProductId) {
      return NextResponse.json(
        { error: 'Alt ürün ID gerekli' },
        { status: 400 }
      )
    }

    const accessories = await prisma.accessory.findMany({
      where: {
        subProductId: subProductId,
        isActive: true
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        code: true,
        height: true,
        width: true,
        coatingType: true,
        sheetThickness: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(accessories)
  } catch (error) {
    console.error('Aksesuarlar yüklenirken hata:', error)
    return NextResponse.json(
      { error: 'Aksesuarlar yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}
