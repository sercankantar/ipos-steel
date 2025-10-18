import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const { id } = params

    const disclosureText = await prisma.kvkkDisclosureText.update({
      where: { id },
      data: {
        title: data.title,
        
        // Hero Section
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,

        // Veri Sorumlusu Bölümü
        veriSorumlusuTitle: data.veriSorumlusuTitle,
        veriSorumlusuContent: data.veriSorumlusuContent,

        // Kişisel Verilerin İşlenme Amacı Bölümü
        islemeAmaciTitle: data.islemeAmaciTitle,
        islemeAmaciContent: data.islemeAmaciContent,
        islemeAmaciBullets: data.islemeAmaciBullets || [],
        calisanVerileriTitle: data.calisanVerileriTitle,
        calisanVerileriContent: data.calisanVerileriContent,

        // Kişisel Verilerin Aktarılması Bölümü
        aktarilmaTitle: data.aktarilmaTitle,
        aktarilmaContent: data.aktarilmaContent,
        yurtIciAktarim: data.yurtIciAktarim || [],
        yurtDisiAktarim: data.yurtDisiAktarim || [],
        acikRizaTitle: data.acikRizaTitle,
        acikRizaContent: data.acikRizaContent,
        acikRizaBullets: data.acikRizaBullets || [],

        // Toplanma Yöntemi ve Hukuki Sebep Bölümü
        toplamaYontemiTitle: data.toplamaYontemiTitle,
        toplamaYontemiContent: data.toplamaYontemiContent,
        dijitalKanallar: data.dijitalKanallar || [],
        fizikselKanallar: data.fizikselKanallar || [],
        iletisimKanallari: data.iletisimKanallari || [],

        // Kişisel Veri Sahibi Hakları Bölümü
        haklarTitle: data.haklarTitle,
        haklarContent: data.haklarContent,
        haklarListesi: data.haklarListesi || [],
        haklarKullanimTitle: data.haklarKullanimTitle,
        haklarKullanimContent: data.haklarKullanimContent,
        emailIletisim: data.emailIletisim,
        kepIletisim: data.kepIletisim,
        basvuruSartlari: data.basvuruSartlari || [],

        // İletişim Bölümü
        iletisimTitle: data.iletisimTitle,
        iletisimContent: data.iletisimContent,

        // İletişim Bilgileri
        email: data.email,
        telefon: data.telefon,
        adres: data.adres,
        mapUrl: data.mapUrl,
        isActive: data.isActive
      }
    })

    // Cache'i temizle
    revalidatePath('/kvkk-aydinlatma-metni')
    revalidatePath('/api/kvkk-disclosure-text')
    
    return NextResponse.json(disclosureText)
  } catch (error) {
    console.error('KVKK Aydınlatma Metni güncelleme hatası:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    await prisma.kvkkDisclosureText.delete({
      where: { id }
    })

    // Cache'i temizle
    revalidatePath('/kvkk-aydinlatma-metni')
    revalidatePath('/api/kvkk-disclosure-text')
    
    return NextResponse.json({ message: 'KVKK Aydınlatma Metni silindi' })
  } catch (error) {
    console.error('KVKK Aydınlatma Metni silme hatası:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
