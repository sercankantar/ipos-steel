import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const catalogs = await prisma.catalog.findMany({
      include: {
        category: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(catalogs)
  } catch (error) {
    console.error('Catalogs getirilirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const data = await request.json()

    const catalog = await prisma.catalog.create({
      data: {
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        fileType: data.fileType,
        fileSize: data.fileSize,
        fileData: data.fileData,
        fileUrl: data.fileUrl,
        filePublicId: data.filePublicId,
        imageUrl: data.imageUrl,
        imagePublicId: data.imagePublicId,
        pages: data.pages,
        language: data.language,
        version: data.version,
        publishDate: data.publishDate ? new Date(data.publishDate) : new Date(),
        featured: data.featured || false,
        isActive: data.isActive !== false
      },
      include: {
        category: true
      }
    })

    return NextResponse.json(catalog)
  } catch (error) {
    console.error('Catalog oluşturulurken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const data = await request.json()

    const catalog = await prisma.catalog.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        fileType: data.fileType,
        fileSize: data.fileSize,
        fileData: data.fileData,
        fileUrl: data.fileUrl,
        filePublicId: data.filePublicId,
        imageUrl: data.imageUrl,
        imagePublicId: data.imagePublicId,
        pages: data.pages,
        language: data.language,
        version: data.version,
        publishDate: data.publishDate ? new Date(data.publishDate) : undefined,
        featured: data.featured,
        isActive: data.isActive
      },
      include: {
        category: true
      }
    })

    return NextResponse.json(catalog)
  } catch (error) {
    console.error('Catalog güncellenirken hata:', error)
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

    await prisma.catalog.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Catalog silinirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
