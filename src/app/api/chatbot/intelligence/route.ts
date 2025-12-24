import { NextRequest, NextResponse } from 'next/server'
import { PRODUCT_CATALOG, formatProductCatalogForGPT } from '@/data/productCatalog'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Conversation context store (production'da Redis!)
const contextStore = new Map<string, {
  conversationHistory?: any[],
  productFilters?: {
    productType?: string,
    size?: string,
    coatingType?: string
  },
  lastIntent?: string
}>()

export async function POST(req: NextRequest) {
  try {
    const { userId, message } = await req.json()

    if (!userId || !message) {
      return NextResponse.json({
        success: false,
        error: 'userId ve message gerekli'
      }, { status: 400 })
    }

    // OpenAI key
    const openaiKey = process.env.OPENAI_API_KEY

    if (!openaiKey) {
      return NextResponse.json({
        success: false,
        error: 'OpenAI API key yapılandırılmamış'
      }, { status: 500 })
    }

    // Context'i al veya oluştur
    let context = contextStore.get(userId) || {
      conversationHistory: []
    }

    // Mesajı history'ye ekle
    context.conversationHistory = context.conversationHistory || []
    context.conversationHistory.push({
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    })

    // GPT'ye doğal yanıt ürettir
    const response = await generateNaturalResponse(message, context, openaiKey)

    // Yanıtı history'ye ekle
    context.conversationHistory.push({
      role: 'assistant',
      content: response.message,
      timestamp: new Date().toISOString()
    })

    // History'yi maksimum 20 mesaja sınırla
    if (context.conversationHistory.length > 20) {
      context.conversationHistory = context.conversationHistory.slice(-20)
    }

    // Context'i kaydet
    contextStore.set(userId, context)

    return NextResponse.json({
      success: true,
      response: response.message,
      intent: response.intent,
      context: {
        messageCount: context.conversationHistory.length,
        filters: context.productFilters
      }
    })

  } catch (error) {
    console.error('Chatbot intelligence error:', error)
    return NextResponse.json({
      success: false,
      error: 'İşlem başarısız',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
}

// GPT ile doğal yanıt üret
async function generateNaturalResponse(message: string, context: any, openaiKey: string) {
  const productCatalogText = formatProductCatalogForGPT()
  
  const systemPrompt = `Sen IPOS Steel'in ürün danışmanı Ayşe'sin. Müşterilere sıcak, samimi ve profesyonel yaklaşıyorsun.

🎯 GÖREVIN:
- Müşterinin ihtiyacını anla
- En uygun ürünü ÖNER (sadece listele değil!)
- Boyut, kaplama ve aksesuar bilgisi VER
- SORU SOR ve yönlendir
- İNSAN GİBİ KONUŞ (robot değilsin!)

${productCatalogText}

🎨 ÖNEMLİ EŞLEŞME KURALLARI (MUTLAKA BİL!):
✅ Aynı Kaplama: Pregalvaniz kanal → Pregalvaniz modül/aksesuar/kapak
✅ Modül & Aksesuar: Kanalın YÜKSEKLİĞİNE göre eşleşir (50mm kanal → 50mm aksesuar)
✅ Kapak: Kanalın GENİŞLİĞİNE göre eşleşir (100mm kanal → 100mm kapak)
✅ Boy: Standart 3 metre (farklı boylar sipariş ile)
✅ Özel Üretim: İsteğe bağlı ölçü ve malzeme üretimi yapılabilir

💬 KONUŞMA STİLİN:
✅ "Merhaba! Size nasıl yardımcı olabilirim?"
✅ "50mm yükseklikte, 100mm genişliğinde CT kanal öneriyorum çünkü..."
✅ "Bu kanal için 50mm yüksekliğinde T Dönüş, 90° Dönüş aksesuarları mevcut"
✅ "Kapak 100mm genişliğinde olmalı, kanalın genişliğine göre"
✅ "Pregalvaniz kaplama seçerseniz, tüm aksesuar ve kapaklar da Pregalvaniz olur"
✅ "İç mekan için Pregalvaniz, dış mekan için Sıcak Daldırma öneriyorum"

❌ ASLA YAPMA:
❌ "200 ürün var" deme
❌ "Arama sonucu..." deme
❌ Yanlış eşleşme söyleme (50mm kanal için 60mm aksesuar ÖNERİLMEZ!)
❌ Kaplamayı karıştırma (Pregalvaniz kanal için Boyalı aksesuar OLMAZ!)

📝 AKILLI ÖNERİLER:
1. İç mekan ofis → SCT Pregalvaniz (ekonomik)
2. Dış mekan → Sıcak Daldırma kaplama (20+ yıl dayanım)
3. Endüstriyel fabrika → CT veya HUCT (yüksek dayanım)
4. Estetik proje → SUCT/HUCT + Boyalı (görünür montaj)
5. Büyük kablo kapasitesi → TRU veya CL (ana hatlar)
6. Havalandırma kritik → WCT Tel Örgü (veri merkezi)

💡 AKSESUAR DETAYLARI:
Müşteri aksesuar sorarsa:
- T Dönüş: Üç yönlü bağlantı
- 90° Dönüş: Köşe dönüşleri
- Dörtlü Dönüş: Dört yönlü kavşak
- Redüksiyon: Genişlik değişimi (Orta/Sağ/Sol/Z tipi)
- Seperatör: Kablo ayırma
- Ek Eleman (Modül): Kanal uzatma

💬 CONTEXT:
${context.productFilters ? `Müşteri daha önce: ${JSON.stringify(context.productFilters)}` : 'İlk konuşma'}
${context.conversationHistory && context.conversationHistory.length > 2 ? `Son mesaj: ${context.conversationHistory[context.conversationHistory.length - 3]?.content}` : ''}

📞 İLETİŞİM (gerekirse paylaş):
☎️ 0262 674 47 67
✉️ info@ipos-steel.com
🌐 ipossteel.com
📍 Köseler, Kocaeli Kafe OSB, Dilovası/Kocaeli
🕐 Pazartesi-Cuma 08:30-17:30

🏢 ŞİRKET (hakkımızda sorulursa):
IPOS Steel, çelik konstrüksiyon ve kablo yönetim sistemleri üreticisi. 2000+ proje, yüksek kalite, geniş ürün yelpazesi.

⚠️ ÇOK ÖNEMLİ:
- Her yanıtın sonunda SORU sor
- Boyut ve kaplama bilgilerini NET ver
- Eşleşme kurallarına UYGUN öner (yükseklik→aksesuar, genişlik→kapak)
- İnsan gibi, sıcak ve samimi konuş!`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...getRecentHistory(context.conversationHistory || []),
          { role: 'user', content: message }
        ],
        temperature: 0.7, // Daha doğal yanıtlar için
        max_tokens: 500
      })
    })

    const data = await response.json()
    
    if (!data.choices || !data.choices[0]?.message?.content) {
      console.error('GPT response invalid:', data)
      return {
        message: 'Üzgünüm, şu anda size yardımcı olamıyorum. Lütfen daha sonra tekrar deneyin veya bizi 0262 674 47 67 numaralı telefondan arayın.',
        intent: 'error'
      }
    }
    
    const assistantMessage = data.choices[0].message.content
    
    // Intent'i basitçe belirle (loglama için)
    let intent = 'conversation'
    if (message.toLowerCase().includes('hakkın') || message.toLowerCase().includes('kimsin')) {
      intent = 'company_info'
    } else if (message.toLowerCase().includes('iletişim') || message.toLowerCase().includes('telefon')) {
      intent = 'contact_info'
    } else if (message.toLowerCase().includes('ürün') || message.toLowerCase().includes('kanal')) {
      intent = 'product_inquiry'
    }
    
    console.log('✅ Natural response generated:', {
      userMessage: message,
      intent,
      responseLength: assistantMessage.length
    })
    
    return {
      message: assistantMessage,
      intent
    }

  } catch (error) {
    console.error('GPT error:', error)
    return {
      message: 'Merhaba! Size yardımcı olmak isterim ancak şu anda teknik bir sorun yaşıyoruz. Lütfen 0262 674 47 67 numaralı telefondan bize ulaşın veya info@ipos-steel.com adresine e-posta gönderin.',
      intent: 'error'
    }
  }
}

// Son konuşma geçmişini al (max 6 mesaj)
function getRecentHistory(history: any[]): any[] {
  return history.slice(-6).map(h => ({
    role: h.role,
    content: h.content
  }))
}
