import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const manuals = await prisma.manual.findMany({
      include: {
        category: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(manuals)
  } catch (error) {
    console.error('Manuals getirilirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const data = await request.json()

    const manual = await prisma.manual.create({
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

    // Cache'i temizle
    revalidatePath('/el-kitaplari-montaj-kilavuzlari')
    revalidatePath('/api/manuals')

    return NextResponse.json(manual)
  } catch (error) {
    console.error('Manual oluşturulurken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const data = await request.json()

    const manual = await prisma.manual.update({
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

    // Cache'i temizle
    revalidatePath('/el-kitaplari-montaj-kilavuzlari')
    revalidatePath('/api/manuals')

    return NextResponse.json(manual)
  } catch (error) {
    console.error('Manual güncellenirken hata:', error)
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

    await prisma.manual.delete({ where: { id } })

    // Cache'i temizle
    revalidatePath('/el-kitaplari-montaj-kilavuzlari')
    revalidatePath('/api/manuals')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Manual silinirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
