import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const job = await prisma.jobPosition.findUnique({
      where: { id: params.id },
      include: {
        department: true
      }
    })

    if (!job) {
      return NextResponse.json({ error: 'İş pozisyonu bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error('İş pozisyonu yüklenirken hata:', error)
    return NextResponse.json({ error: 'Veri yüklenirken hata oluştu' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const job = await prisma.jobPosition.update({
      where: { id: params.id },
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
        isActive: body.isActive !== undefined ? body.isActive : true,
        slug: body.slug
      }
    })

    return NextResponse.json(job)
  } catch (error) {
    console.error('İş pozisyonu güncellenirken hata:', error)
    return NextResponse.json({ error: 'Veri güncellenirken hata oluştu' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.jobPosition.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('İş pozisyonu silinirken hata:', error)
    return NextResponse.json({ error: 'Veri silinirken hata oluştu' }, { status: 500 })
  }
}
