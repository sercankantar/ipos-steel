import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const catalog = await prisma.catalog.findUnique({
      where: { id: params.id, isActive: true }
    })

    if (!catalog) {
      return NextResponse.json({ error: 'Katalog bulunamadı' }, { status: 404 })
    }

    // Dosya verisini görüntüleme için döndür (indirme sayısını artırmadan)
    if (catalog.fileData) {
      // Base64 veriyi data URL olarak döndür
      const mimeType = catalog.fileType === 'pdf' ? 'application/pdf' : 'image/jpeg'
      const dataUrl = `data:${mimeType};base64,${catalog.fileData}`
      
      return NextResponse.json({ 
        success: true, 
        dataUrl: dataUrl,
        fileName: `${catalog.title}.${catalog.fileType}`
      })
    } else if (catalog.fileUrl) {
      // Cloudinary URL'den yönlendir
      return NextResponse.redirect(catalog.fileUrl)
    }

    return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 404 })
  } catch (error) {
    console.error('Catalog view hatası:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const catalog = await prisma.catalog.findUnique({
      where: { id: params.id, isActive: true }
    })

    if (!catalog) {
      return NextResponse.json({ error: 'Katalog bulunamadı' }, { status: 404 })
    }

    // İndirme sayısını artır
    await prisma.catalog.update({
      where: { id: params.id },
      data: { downloadCount: { increment: 1 } }
    })

    // Dosya verisini döndür
    if (catalog.fileData) {
      const buffer = Buffer.from(catalog.fileData, 'base64')
      const headers = new Headers()
      headers.set('Content-Type', catalog.fileType === 'pdf' ? 'application/pdf' : 'image/jpeg')
      
      // Türkçe karakterleri temizle
      const cleanTitle = catalog.title
        .replace(/[ğüşıöçĞÜŞİÖÇ]/g, (char) => {
          const map: { [key: string]: string } = {
            'ğ': 'g', 'ü': 'u', 'ş': 's', 'ı': 'i', 'ö': 'o', 'ç': 'c',
            'Ğ': 'G', 'Ü': 'U', 'Ş': 'S', 'İ': 'I', 'Ö': 'O', 'Ç': 'C'
          }
          return map[char] || char
        })
        .replace(/[^a-zA-Z0-9\s-]/g, '') // Sadece alfanumerik, boşluk ve tire
        .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
        .toLowerCase()
      
      headers.set('Content-Disposition', `attachment; filename="${cleanTitle}.${catalog.fileType}"`)
      
      return new NextResponse(buffer, { headers })
    } else if (catalog.fileUrl) {
      // Cloudinary URL'den yönlendir
      return NextResponse.redirect(catalog.fileUrl)
    }

    return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 404 })
  } catch (error) {
    console.error('Catalog download hatası:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
