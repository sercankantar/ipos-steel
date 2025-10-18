import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const application = await prisma.jobApplication.findUnique({
      where: { id: params.id },
      include: {
        jobPosition: {
          include: {
            department: true
          }
        }
      }
    })

    if (!application) {
      return NextResponse.json({ error: 'Başvuru bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error('Başvuru yüklenirken hata:', error)
    return NextResponse.json({ error: 'Veri yüklenirken hata oluştu' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const application = await prisma.jobApplication.update({
      where: { id: params.id },
      data: {
        status: body.status,
        notes: body.notes
      },
      include: {
        jobPosition: {
          include: {
            department: true
          }
        }
      }
    })

    return NextResponse.json(application)
  } catch (error) {
    console.error('Başvuru güncellenirken hata:', error)
    return NextResponse.json({ error: 'Veri güncellenirken hata oluştu' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.jobApplication.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Başvuru silinirken hata:', error)
    return NextResponse.json({ error: 'Veri silinirken hata oluştu' }, { status: 500 })
  }
}
