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
      
      // Eğer zaten data URL formatındaysa, olduğu gibi kullan
      let dataUrl = catalog.fileData
      if (!dataUrl.startsWith('data:')) {
        dataUrl = `data:${mimeType};base64,${catalog.fileData}`
      }
      
      return NextResponse.json({ 
        success: true, 
        dataUrl: dataUrl,
        fileName: `${catalog.title}.${catalog.fileType}`
      })
    } else if (catalog.fileUrl) {
      // Cloudinary URL'den dosyayı indir
      try {
        const response = await fetch(catalog.fileUrl)
        if (!response.ok) {
          throw new Error('Dosya indirilemedi')
        }

        const buffer = await response.arrayBuffer()
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
      } catch (error) {
        console.error('Cloudinary dosya indirme hatası:', error)
        return NextResponse.json({ error: 'Dosya indirilemedi' }, { status: 500 })
      }
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
      // Base64 verisini temizle (data URL prefix'ini kaldır)
      let cleanBase64 = catalog.fileData
      if (cleanBase64.includes(',')) {
        cleanBase64 = cleanBase64.split(',')[1]
      }
      
      const buffer = Buffer.from(cleanBase64, 'base64')
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
      // Cloudinary URL'den dosyayı indir
      try {
        const response = await fetch(catalog.fileUrl)
        if (!response.ok) {
          throw new Error('Dosya indirilemedi')
        }

        const buffer = await response.arrayBuffer()
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
      } catch (error) {
        console.error('Cloudinary dosya indirme hatası:', error)
        return NextResponse.json({ error: 'Dosya indirilemedi' }, { status: 500 })
      }
    }

    return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 404 })
  } catch (error) {
    console.error('Catalog download hatası:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
