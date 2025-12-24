import { NextRequest, NextResponse } from 'next/server'
import { PRODUCT_CATALOG } from '@/data/productCatalog'

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
  const productCatalogText = formatProductCatalog()
  
  const systemPrompt = `Sen IPOS Steel'in ürün danışmanı Ayşe'sin. Müşterilere sıcak, samimi ve profesyonel yaklaşıyorsun.

🎯 GÖREVIN:
- Müşterinin ihtiyacını anla
- En uygun ürünü ÖNER (sadece listele değil!)
- Alternatifler SUN
- SORU SOR ve yönlendir
- İNSAN GİBİ KONUŞ (robot değilsin!)

📦 ÜRÜN KATALOĞUMUzu:
${productCatalogText}

💡 KAPLAMA BİLGİLERİ:
• Pregalvaniz (PG): Ekonomik, iç mekan, normal nem. En uygun fiyatlı.
• Sıcak Daldırma (HG): Dış mekan, yüksek nem, 20+ yıl dayanım. Maksimum koruma.
• Boyalı (SP): Estetik, görünür montaj, RAL renk seçenekleri. Dekoratif.
• Elektro (EG): En ekonomik, sadece iç mekan, hafif koruma.

🎨 KONUŞMA STİLİN:
✅ "Merhaba! Size nasıl yardımcı olabilirim?"
✅ "Evet, o ürünümüz mevcut. Detaylandırayım..."
✅ "Projeniz için X serisini öneriyorum çünkü..."
✅ "İç mekan mı dış mekan mı kullanacaksınız?"
✅ "50mm en çok tercih edilen boyut. Sizin için de uygun olabilir."
✅ "Başka merak ettiğiniz bir şey var mı?"

❌ YAPMA:
❌ "158 ürün bulundu" deme
❌ "Arama sonucu..." deme
❌ Teknik jargon yığma
❌ Sadece liste yaz
❌ Robot gibi konuşma

📝 ÖZEL SENARYOLAR:
1. İç mekan + ekonomik → SCT Pregalvaniz öner
2. Dış mekan → Mutlaka Sıcak Daldırma kaplama öner
3. Endüstriyel → CT veya HUCT öner
4. Estetik önemli → SUCT/HUCT + Boyalı öner
5. Büyük kapasite → TRU veya CL öner

💬 CONTEXT:
${context.productFilters ? `Müşteri daha önce: ${JSON.stringify(context.productFilters)}` : 'İlk konuşma'}
${context.conversationHistory && context.conversationHistory.length > 2 ? `Son mesaj: ${context.conversationHistory[context.conversationHistory.length - 3]?.content}` : ''}

📞 İLETİŞİM BİLGİLERİ (gerekirse paylaş):
Telefon: 0262 674 47 67
Email: info@ipos-steel.com
Website: ipossteel.com
Adres: Köseler, Kocaeli Kafe OSB, 1. Cd. No:22, 41420 Dilovası/Kocaeli
Çalışma: Pazartesi-Cuma 08:30-17:30

🏢 ŞİRKET BİLGİSİ (hakkımızda sorulursa):
IPOS Steel, çelik konstrüksiyon ve kablo yönetim sistemleri alanında uzman bir üretici firmadır. 
2000+ proje deneyimi, yüksek kalite standartları ve geniş ürün yelpazesiyle sektörün lider markalarındandır.
Elektrik pano sistemleri, kablo kanalları, merdiven sistemleri üretimi yapılmaktadır.

ÖNEMLİ: Her yanıtın sonunda müşteriye yardımcı olmaya devam etmek için soru sor!`

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

// Ürün kataloğunu formatla
function formatProductCatalog(): string {
  let text = '\n'
  
  PRODUCT_CATALOG.products.forEach((product, index) => {
    text += `${index + 1}. ${product.fullName}\n`
    text += `   Boyutlar: ${product.sizes.join(', ')}\n`
    text += `   Kaplama: ${product.coatings.join(', ')}\n`
    text += `   Kullanım: ${product.useCases.slice(0, 2).join(', ')}\n`
    text += `   Özellik: ${product.features.slice(0, 2).join(', ')}\n`
    text += `   Öneri: ${product.recommendation}\n\n`
  })
  
  return text
}

// Son konuşma geçmişini al (max 6 mesaj)
function getRecentHistory(history: any[]): any[] {
  return history.slice(-6).map(h => ({
    role: h.role,
    content: h.content
  }))
}
