import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { isRead } = body

    const quoteRequest = await prisma.quoteRequest.update({
      where: { id },
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
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { id } = await params
    await prisma.quoteRequest.delete({
      where: { id }
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

