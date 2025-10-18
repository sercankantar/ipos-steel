import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const department = searchParams.get('department')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')

    const where: any = {
      isActive: true
    }

    if (department && department !== 'Tümü') {
      where.department = {
        name: department
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (featured === 'true') {
      where.featured = true
    }

    const jobs = await prisma.jobPosition.findMany({
      where,
      include: {
        department: true
      },
      orderBy: [
        { featured: 'desc' },
        { publishDate: 'desc' }
      ]
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('İş pozisyonları yüklenirken hata:', error)
    return NextResponse.json({ error: 'Veri yüklenirken hata oluştu' }, { status: 500 })
  }
}
