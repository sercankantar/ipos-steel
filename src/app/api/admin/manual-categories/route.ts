import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const categories = await prisma.manualCategory.findMany({
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Manual categories getirilirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { name, color } = await request.json()

    const category = await prisma.manualCategory.create({
      data: { name, color: color || 'bg-slate-600 text-white' }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Manual category oluşturulurken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id, name, color, isActive } = await request.json()

    const category = await prisma.manualCategory.update({
      where: { id },
      data: { name, color, isActive }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Manual category güncellenirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = request.nextUrl
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID gerekli' }, { status: 400 })

    await prisma.manualCategory.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Manual category silinirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
