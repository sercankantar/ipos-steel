import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const jobs = await prisma.jobPosition.findMany({
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const job = await prisma.jobPosition.create({
      data: {
        title: body.title,
        departmentId: body.departmentId,
        location: body.location,
        type: body.type,
        experience: body.experience,
        publishDate: new Date(body.publishDate),
        description: body.description,
        responsibilities: body.responsibilities || [],
        qualifications: body.qualifications || [],
        benefits: body.benefits || [],
        salary: body.salary,
        workingHours: body.workingHours,
        reportingTo: body.reportingTo,
        featured: body.featured || false,
        slug: body.slug
      }
    })

    return NextResponse.json(job)
  } catch (error) {
    console.error('İş pozisyonu oluşturulurken hata:', error)
    return NextResponse.json({ error: 'Veri kaydedilirken hata oluştu' }, { status: 500 })
  }
}
