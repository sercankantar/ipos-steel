import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    // Prisma client kontrolü
    if (!prisma) {
      console.error('Prisma client bulunamadı')
      return NextResponse.json([])
    }

    const disclosureTexts = await prisma.kvkkDisclosureText.findMany({
      orderBy: { updatedAt: 'desc' }
    })

    // Her zaman array döndür
    return NextResponse.json(disclosureTexts || [])
  } catch (error) {
    console.error('KVKK Aydınlatma Metinleri getirme hatası:', error)
    // Hata durumunda da boş array döndür
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const disclosureText = await prisma.kvkkDisclosureText.create({
      data: {
        title: data.title || "Kişisel Verilere İlişkin Aydınlatma Metni",
        content: data.content || "",
        
        // Hero Section
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,

        // Veri Sorumlusu Bölümü
        veriSorumlusuTitle: data.veriSorumlusuTitle || "Veri Sorumlusu",
        veriSorumlusuContent: data.veriSorumlusuContent,

        // Eski alanlar için boş değerler
        islemeAmaciTitle: data.islemeAmaciTitle || "",
        islemeAmaciContent: data.islemeAmaciContent || "",
        islemeAmaciBullets: data.islemeAmaciBullets || [],
        calisanVerileriTitle: data.calisanVerileriTitle || "",
        calisanVerileriContent: data.calisanVerileriContent || "",
        aktarilmaTitle: data.aktarilmaTitle || "",
        aktarilmaContent: data.aktarilmaContent || "",
        yurtIciAktarim: data.yurtIciAktarim || [],
        yurtDisiAktarim: data.yurtDisiAktarim || [],
        acikRizaTitle: data.acikRizaTitle || "",
        acikRizaContent: data.acikRizaContent || "",
        acikRizaBullets: data.acikRizaBullets || [],
        toplamaYontemiTitle: data.toplamaYontemiTitle || "",
        toplamaYontemiContent: data.toplamaYontemiContent || "",
        dijitalKanallar: data.dijitalKanallar || [],
        fizikselKanallar: data.fizikselKanallar || [],
        iletisimKanallari: data.iletisimKanallari || [],
        haklarTitle: data.haklarTitle || "",
        haklarContent: data.haklarContent || "",
        haklarListesi: data.haklarListesi || [],
        haklarKullanimTitle: data.haklarKullanimTitle || "",
        haklarKullanimContent: data.haklarKullanimContent || "",
        emailIletisim: data.emailIletisim || "",
        kepIletisim: data.kepIletisim || "",
        basvuruSartlari: data.basvuruSartlari || [],

        // İletişim Bölümü
        iletisimTitle: data.iletisimTitle || "İletişim",
        iletisimContent: data.iletisimContent,

        // İletişim Bilgileri
        email: data.email,
        telefon: data.telefon,
        adres: data.adres,
        mapUrl: data.mapUrl,
        isActive: data.isActive !== undefined ? data.isActive : true
      }
    })

    // Cache'i temizle
    revalidatePath('/kvkk-aydinlatma-metni')
    revalidatePath('/api/kvkk-disclosure-text')
    
    return NextResponse.json(disclosureText, { status: 201 })
  } catch (error) {
    console.error('KVKK Aydınlatma Metni oluşturma hatası:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
