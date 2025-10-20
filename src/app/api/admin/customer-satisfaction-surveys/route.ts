import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where: any = {}
    
    if (search) {
      where.OR = [
        { firmaUnvani: { contains: search, mode: 'insensitive' } },
        { adSoyad: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [surveys, total] = await Promise.all([
      prisma.customerSatisfactionSurvey.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.customerSatisfactionSurvey.count({ where })
    ])

    return NextResponse.json({
      surveys,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Anketler yüklenirken hata:', error)
    return NextResponse.json({ error: 'Veri yüklenirken hata oluştu' }, { status: 500 })
  }
}
