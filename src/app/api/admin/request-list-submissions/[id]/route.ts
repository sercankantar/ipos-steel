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

    const requestListSubmission = await prisma.requestListSubmission.update({
      where: { id },
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
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { id } = await params
    await prisma.requestListSubmission.delete({
      where: { id }
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

