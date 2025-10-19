import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const policy = await prisma.kvkkPrivacyPolicy.findUnique({
      where: { id: params.id }
    })

    if (!policy) {
      return NextResponse.json({ error: 'KVKK Gizlilik Politikası bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(policy)
  } catch (error) {
    console.error('KVKK Gizlilik Politikası getirme hatası:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()

    const policy = await prisma.kvkkPrivacyPolicy.update({
      where: { id: params.id },
      data: {
        title: data.title,
        content: data.content,
        
        // Bölüm Başlıkları
        amacTitle: data.amacTitle,
        kapsamTitle: data.kapsamTitle,
        tanimlarTitle: data.tanimlarTitle,
        rollerTitle: data.rollerTitle,
        yukumluluklerTitle: data.yukumluluklerTitle,
        siniflandirmaTitle: data.siniflandirmaTitle,
        islenmesiTitle: data.islenmesiTitle,
        aktarilmasiTitle: data.aktarilmasiTitle,
        saklanmasiTitle: data.saklanmasiTitle,
        guvenligiTitle: data.guvenligiTitle,
        haklariTitle: data.haklariTitle,
        gizlilikTitle: data.gizlilikTitle,
        girisCikisTitle: data.girisCikisTitle,
        silinmesiTitle: data.silinmesiTitle,
        yayinlanmasiTitle: data.yayinlanmasiTitle,
        guncellemeTitle: data.guncellemeTitle,
        yururlukTitle: data.yururlukTitle,

        // Bölüm İçerikleri
        amac: data.amac,
        kapsam: data.kapsam,
        tanimlar: data.tanimlar,
        roller: data.roller,
        yukumlulukler: data.yukumlulukler,
        siniflandirma: data.siniflandirma,
        islenmesi: data.islenmesi,
        aktarilmasi: data.aktarilmasi,
        saklanmasi: data.saklanmasi,
        guvenligi: data.guvenligi,
        haklari: data.haklari,
        gizlilik: data.gizlilik,
        girisCikis: data.girisCikis,
        silinmesi: data.silinmesi,
        yayinlanmasi: data.yayinlanmasi,
        guncelleme: data.guncelleme,
        yururluk: data.yururluk,
        email: data.email,
        telefon: data.telefon,
        adres: data.adres,
        isActive: data.isActive,
        lastUpdated: new Date()
      }
    })

    // Cache'i temizle
    revalidatePath('/kvkk-gizlilik-politikasi')
    revalidatePath('/api/kvkk-privacy-policy')

    return NextResponse.json(policy)
  } catch (error) {
    console.error('KVKK Gizlilik Politikası güncelleme hatası:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.kvkkPrivacyPolicy.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'KVKK Gizlilik Politikası silindi' })
  } catch (error) {
    console.error('KVKK Gizlilik Politikası silme hatası:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
