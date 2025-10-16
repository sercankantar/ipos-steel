import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    
    const { name, color, isActive } = await request.json()
    
    const updated = await prisma.referenceCategory.update({
      where: { id: params.id },
      data: {
        name,
        color,
        isActive
      }
    })
    
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Reference category update error:', error)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Bu kategori adı zaten mevcut' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    
    await prisma.referenceCategory.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Reference category delete error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
