import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    
    const category = await prisma.newsCategory.findUnique({
      where: { id: params.id }
    })
    
    if (!category) {
      return NextResponse.json({ error: 'Kategori bulunamadı' }, { status: 404 })
    }
    
    return NextResponse.json(category)
  } catch (error) {
    console.error('News category fetch error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    
    const { name, color, isActive } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'Kategori adı gerekli' }, { status: 400 })
    }

    const updatedCategory = await prisma.newsCategory.update({
      where: { id: params.id },
      data: {
        name,
        color,
        isActive
      }
    })

    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error('News category update error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    
    await prisma.newsCategory.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Kategori silindi' })
  } catch (error) {
    console.error('News category deletion error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
