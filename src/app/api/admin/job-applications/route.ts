import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where: any = {}
    
    if (status && status !== 'all') {
      where.status = status
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { positionTitle: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [applications, total] = await Promise.all([
      prisma.jobApplication.findMany({
        where,
        include: {
          jobPosition: {
            include: {
              department: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.jobApplication.count({ where })
    ])

    return NextResponse.json({
      applications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Başvurular yüklenirken hata:', error)
    return NextResponse.json({ error: 'Veri yüklenirken hata oluştu' }, { status: 500 })
  }
}
