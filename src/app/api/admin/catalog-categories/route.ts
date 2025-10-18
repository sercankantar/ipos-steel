import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const categories = await prisma.catalogCategory.findMany({
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Catalog categories getirilirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { name, color } = await request.json()

    const category = await prisma.catalogCategory.create({
      data: { name, color: color || 'bg-slate-600 text-white' }
    })

    // Cache'i temizle
    revalidatePath('/katalog-brosurler')
    revalidatePath('/api/catalog-categories')

    return NextResponse.json(category)
  } catch (error) {
    console.error('Catalog category oluşturulurken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { id, name, color, isActive } = await request.json()

    const category = await prisma.catalogCategory.update({
      where: { id },
      data: { name, color, isActive }
    })

    // Cache'i temizle
    revalidatePath('/katalog-brosurler')
    revalidatePath('/api/catalog-categories')

    return NextResponse.json(category)
  } catch (error) {
    console.error('Catalog category güncellenirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'ID gerekli' }, { status: 400 })

    await prisma.catalogCategory.delete({ where: { id } })

    // Cache'i temizle
    revalidatePath('/katalog-brosurler')
    revalidatePath('/api/catalog-categories')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Catalog category silinirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
