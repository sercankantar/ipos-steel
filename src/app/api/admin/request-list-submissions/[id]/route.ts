import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { isRead } = body

    const requestListSubmission = await prisma.requestListSubmission.update({
      where: { id: params.id },
      data: { isRead }
    })

    return NextResponse.json(requestListSubmission)
  } catch (error) {
    console.error('İstek listesi talebi güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'İstek listesi talebi güncellenemedi' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.requestListSubmission.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('İstek listesi talebi silme hatası:', error)
    return NextResponse.json(
      { error: 'İstek listesi talebi silinemedi' },
      { status: 500 }
    )
  }
}

