import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const survey = await prisma.customerSatisfactionSurvey.findUnique({
      where: { id: params.id }
    })

    if (!survey) {
      return NextResponse.json({ error: 'Anket bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(survey)
  } catch (error) {
    console.error('Anket yüklenirken hata:', error)
    return NextResponse.json({ error: 'Veri yüklenirken hata oluştu' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const survey = await prisma.customerSatisfactionSurvey.update({
      where: { id: params.id },
      data: {
        notes: body.notes
      }
    })

    return NextResponse.json(survey)
  } catch (error) {
    console.error('Anket güncellenirken hata:', error)
    return NextResponse.json({ error: 'Veri güncellenirken hata oluştu' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.customerSatisfactionSurvey.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Anket silinirken hata:', error)
    return NextResponse.json({ error: 'Veri silinirken hata oluştu' }, { status: 500 })
  }
}
