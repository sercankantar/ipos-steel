import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const certificate = await prisma.certificate.findUnique({
      where: { id: params.id, isActive: true }
    })

    if (!certificate) {
      return NextResponse.json({ error: 'Sertifika bulunamadı' }, { status: 404 })
    }

    // Cloudinary URL'den dosyayı indir
    if (certificate.fileUrl) {
      try {
        const response = await fetch(certificate.fileUrl)
        if (!response.ok) {
          throw new Error('Dosya indirilemedi')
        }

        const buffer = await response.arrayBuffer()
        const headers = new Headers()
        headers.set('Content-Type', certificate.fileType === 'pdf' ? 'application/pdf' : 'image/jpeg')
        
        // Türkçe karakterleri temizle
        const cleanTitle = certificate.title
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
        
        headers.set('Content-Disposition', `attachment; filename="${cleanTitle}.${certificate.fileType}"`)
        
        return new NextResponse(buffer, { headers })
      } catch (error) {
        console.error('Cloudinary dosya indirme hatası:', error)
        return NextResponse.json({ error: 'Dosya indirilemedi' }, { status: 500 })
      }
    }

    return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 404 })
  } catch (error) {
    console.error('Certificate download hatası:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
