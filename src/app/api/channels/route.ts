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

    const channels = await prisma.channel.findMany({
      where: {
        subProductId: subProductId,
        isActive: true
      },
      include: {
        subProduct: {
          select: {
            id: true,
            name: true,
            product: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(channels)
  } catch (error) {
    console.error('Kanallar yüklenirken hata:', error)
    return NextResponse.json(
      { error: 'Kanallar yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}
