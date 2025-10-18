import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Gelen anket verisi:', body)
    
    // Gerekli alanları kontrol et
    const requiredFields = ['firmaUnvani', 'adSoyad', 'email', 'telefon', 'webSayfaYeterli', 'aktivitelerYeterli', 'istenilenUrunler', 'beklentiOneriler']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: `Eksik alanlar: ${missingFields.join(', ')}` 
      }, { status: 400 })
    }
    
    const survey = await prisma.customerSatisfactionSurvey.create({
      data: {
        firmaUnvani: body.firmaUnvani,
        adSoyad: body.adSoyad,
        email: body.email,
        telefon: body.telefon,
        kilikKiyafet: body.kilikKiyafet || null,
        konusma: body.konusma || null,
        teknikYeterlilik: body.teknikYeterlilik || null,
        ulasimGeriDonus: body.ulasimGeriDonus || null,
        bayilerUlasim: body.bayilerUlasim || null,
        ziyaretSikligi: body.ziyaretSikligi || null,
        talepKarsilama: body.talepKarsilama || null,
        dokumanlar: body.dokumanlar || null,
        webSayfaYeterli: body.webSayfaYeterli,
        aktivitelerYeterli: body.aktivitelerYeterli,
        nedenIpos: body.nedenIpos || [],
        tekrarCalisma: body.tekrarCalisma || null,
        istenilenUrunler: body.istenilenUrunler,
        beklentiOneriler: body.beklentiOneriler,
        kvkkOnay: body.kvkkOnay || false
      }
    })

    console.log('Anket başarıyla oluşturuldu:', survey.id)
    return NextResponse.json(survey, { status: 201 })
  } catch (error) {
    console.error('Anket oluşturulurken hata:', error)
    return NextResponse.json({ 
      error: 'Anket gönderilirken hata oluştu',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
}
