import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { isRead } = body

    const quoteRequest = await prisma.quoteRequest.update({
      where: { id: params.id },
      data: { isRead }
    })

    return NextResponse.json(quoteRequest)
  } catch (error) {
    console.error('Teklif talebi güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Teklif talebi güncellenemedi' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.quoteRequest.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Teklif talebi silme hatası:', error)
    return NextResponse.json(
      { error: 'Teklif talebi silinemedi' },
      { status: 500 }
    )
  }
}

