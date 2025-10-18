import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const policies = await prisma.kvkkPrivacyPolicy.findMany({
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(policies)
  } catch (error) {
    console.error('KVKK Gizlilik Politikaları getirme hatası:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const policy = await prisma.kvkkPrivacyPolicy.create({
      data: {
        title: data.title || "Kişisel Verilerin Korunması, İşlenmesi ve Gizlilik Politikası",
        
        // Bölüm Başlıkları
        amacTitle: data.amacTitle || "Amaç",
        kapsamTitle: data.kapsamTitle || "Kapsam",
        tanimlarTitle: data.tanimlarTitle || "Tanım ve Kısaltmalar",
        rollerTitle: data.rollerTitle || "Rol ve Sorumluluklar",
        yukumluluklerTitle: data.yukumluluklerTitle || "Hukuki Yükümlülükler",
        siniflandirmaTitle: data.siniflandirmaTitle || "Kişisel Verilerin Sınıflandırılması",
        islenmesiTitle: data.islenmesiTitle || "Kişisel Verilerin İşlenmesi",
        aktarilmasiTitle: data.aktarilmasiTitle || "Kişisel Verilerin Aktarılması",
        saklanmasiTitle: data.saklanmasiTitle || "Kişisel Verilerin Saklanması",
        guvenligiTitle: data.guvenligiTitle || "Kişisel Verilerin Güvenliği",
        haklariTitle: data.haklariTitle || "Kişisel Veri Sahibinin Hakları",
        gizlilikTitle: data.gizlilikTitle || "Gizlilik Politikası",
        girisCikisTitle: data.girisCikisTitle || "Şirket Giriş-Çıkışları ve Kişisel Veriler",
        silinmesiTitle: data.silinmesiTitle || "Kişisel Verilerin Silinmesi",
        yayinlanmasiTitle: data.yayinlanmasiTitle || "Dokümanın Yayınlanması",
        guncellemeTitle: data.guncellemeTitle || "Güncelleme Periyodu",
        yururlukTitle: data.yururlukTitle || "Yürürlük",

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
        isActive: data.isActive !== undefined ? data.isActive : true
      }
    })

    // Cache'i temizle
    revalidatePath('/kvkk-gizlilik-politikasi')
    revalidatePath('/api/kvkk-privacy-policy')
    
    return NextResponse.json(policy, { status: 201 })
  } catch (error) {
    console.error('KVKK Gizlilik Politikası oluşturma hatası:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
