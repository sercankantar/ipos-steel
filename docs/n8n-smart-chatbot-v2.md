# 🧠 Akıllı Chatbot v2.0 - Konuşma Hafızalı Sistem

## 🎯 YENİ ÖZELLİKLER

### ✨ Önceki Versiyon vs Yeni Versiyon

**v1.0 (Önceki):**
```
Kullanıcı: "50lik kablo kanalı"
Bot: ✅ 8 ürün bulundu

Kullanıcı: "40lıkları getir"
Bot: ❌ Yeni arama (öncekini unuttu)
```

**v2.0 (Yeni - Akıllı!):**
```
Kullanıcı: "kablo kanalı"
Bot: 🤔 Hangi boyutta arıyorsunuz? 40lık mı, 50lik mi?

Kullanıcı: "50lik"
Bot: ✅ 50mm kablo kanalı - 8 ürün bulundu

Kullanıcı: "40lıkları getir"
Bot: ✅ 40mm kablo kanalı - 5 ürün bulundu
     (önceki "kablo kanalı" aramasını hatırladı!)

Kullanıcı: "bunun aksesuarları"
Bot: ✅ İlgili aksesuarlar - 12 ürün
     (son ürünü hatırladı!)

Kullanıcı: "hakkınızda bilgi"
Bot: 🏢 IPOS Steel hakkında... (veritabanından çekti)
```

---

## 🏗️ YENİ MİMARİ

```
[Telegram]
    ↓
[n8n Workflow]
    ↓
┌─────────────────┐
│  Intelligence   │ ← Akıllı API
│      API        │ ← Context Management
└────────┬────────┘ ← Intent Analysis
         ↓
    ┌────┴────┐
    ↓         ↓
[Memory]  [Search API]
[Store]   [About API]
          [Contact API]
```

---

## 🆕 YENİ API ENDPOINT'LERİ

### 1. `/api/chatbot/intelligence` (Ana Beyin)

**POST Request:**
```json
{
  "userId": "telegram_123456",
  "message": "50lik kablo kanalı",
  "conversationHistory": [...],
  "openaiKey": "sk-..." 
}
```

**Response:**
```json
{
  "success": true,
  "intent": "product_search",
  "response": "✅ 8 ürün bulundu!",
  "searchResults": [...],
  "requiresMoreInfo": false,
  "context": {
    "hasLastSearch": true,
    "hasLastProduct": false,
    "messageCount": 3
  }
}
```

### 2. `/api/chatbot/conversation` (Memory Store)

**POST - Mesaj kaydet:**
```json
{
  "userId": "telegram_123456",
  "message": "50lik kanal"
}
```

**GET - History getir:**
```
GET /api/chatbot/conversation?userId=telegram_123456
```

**DELETE - History temizle:**
```
DELETE /api/chatbot/conversation?userId=telegram_123456
```

---

## 🔧 YENI N8N WORKFLOW

### Workflow Yapısı

```
1. [Telegram Trigger]
      ↓
2. [User ID Al] (Function)
      ↓
3. [Intelligence API Call] (HTTP Request)
      ↓
4. [Intent Router] (Switch)
      ├─ product_search → [Format Results]
      ├─ incomplete_search → [Ask Question]
      ├─ follow_up_search → [Format Results]
      ├─ company_info → [Format Info]
      ├─ contact_info → [Format Info]
      ├─ product_accessories → [Format Results]
      └─ general → [General Response]
      ↓
5. [Telegram Reply]
```

---

## 📝 NODE KONFİGÜRASYONLARI

### NODE 1: Telegram Trigger
Aynı kalıyor.

### NODE 2: User ID ve Context Hazırlama

**Type:** Function  
**Name:** Prepare Context

```javascript
const userMessage = $input.item.json.message.text || '';
const chatId = $input.item.json.message.chat.id;
const userName = $input.item.json.message.from.first_name || 'Kullanıcı';
const userId = `telegram_${chatId}`; // Unique user ID

// Komut kontrolü
const cleanMessage = userMessage.toLowerCase().trim();

if (cleanMessage === '/start') {
  return {
    json: {
      isCommand: true,
      command: 'start',
      chatId,
      message: `👋 Merhaba ${userName}!\n\n🧠 *IPOS Steel Akıllı Asistan v2.0*\n\n✨ Artık daha akıllıyım!\n• Konuşmalarımızı hatırlıyorum\n• Eksik bilgi varsa size soruyorum\n• Önceki aramalarınızı güncelleyebiliyorum\n\n*Örnekler:*\n• "kablo kanalı" → Size soru sorarım\n• "50lik pregal" → Direkt buluyorum\n• "40lıkları göster" → Öncekini hatırlıyorum\n• "bunun aksesuarları" → Son ürünü biliyorum\n• "hakkınızda" → Şirket bilgisi\n• "iletişim" → İletişim bilgileri\n\n📌 Komutlar:\n/start - Hoş geldin\n/clear - Konuşmayı temizle\n/help - Yardım`
    }
  };
}

if (cleanMessage === '/clear' || cleanMessage === 'clear' || cleanMessage === 'temizle') {
  return {
    json: {
      isCommand: true,
      command: 'clear',
      chatId,
      userId,
      message: '🗑️ Konuşma geçmişi temizlendi!\n\nYeni bir arama başlatabilirsiniz.'
    }
  };
}

if (cleanMessage === '/help' || cleanMessage === 'help') {
  return {
    json: {
      isCommand: true,
      command: 'help',
      chatId,
      message: `❓ *Nasıl Kullanılır?*\n\n*🧠 Akıllı Özellikler:*\n• Konuşmaları hatırlıyorum!\n• \"40lıkları getir\" dediğinizde önceki aramayı biliyorum\n• \"bunun aksesuarları\" dediğinizde son ürünü anlıyorum\n\n*💬 Doğal Dilde Konuşun:*\n• "kablo kanalı" → Size boyut sorarım\n• "50lik pregal" → Direkt bulurum\n• "pregalvaniz olanları" → Önceki aramayı güncellerim\n• "bunun modülleri" → İlgili ürünleri gösteririm\n\n*🏢 Şirket Bilgileri:*\n• "hakkınızda"\n• "misyonunuz nedir"\n• "iletişim"\n• "telefon numarası"\n\n*🔧 Komutlar:*\n/start - Başla\n/clear - Konuşmayı temizle\n/help - Bu yardım`
    }
  };
}

// İntelligence API için hazırla
return {
  json: {
    isCommand: false,
    chatId,
    userId,
    userName,
    userMessage,
    cleanMessage
  }
};
```

### NODE 3: Command Router (IF)

**Type:** IF  
**Name:** Is Command?

**Condition:** `{{ $json.isCommand }} === true`

- TRUE → Handle Command
- FALSE → Intelligence API

### NODE 4: Handle Command (Function + IF)

**Clear command için ayrı endpoint çağırmalı**

```javascript
const command = $input.item.json.command;
const userId = $input.item.json.userId;
const chatId = $input.item.json.chatId;

if (command === 'clear') {
  // Conversation'ı temizle
  return {
    json: {
      shouldClearConversation: true,
      userId,
      chatId,
      message: $input.item.json.message
    }
  };
}

// Diğer komutlar için direkt mesaj gönder
return {
  json: {
    shouldClearConversation: false,
    chatId,
    message: $input.item.json.message
  }
};
```

### NODE 5: Clear Conversation (HTTP Request)

**Type:** HTTP Request  
**Name:** Clear Conversation API  
**Condition:** Only if shouldClearConversation = true

```json
{
  "method": "DELETE",
  "url": "=https://YOUR-DOMAIN.com/api/chatbot/conversation?userId={{$json.userId}}",
  "options": {
    "timeout": 10000
  }
}
```

### NODE 6: Intelligence API Call

**Type:** HTTP Request  
**Name:** Chatbot Intelligence API

```json
{
  "method": "POST",
  "url": "https://YOUR-DOMAIN.com/api/chatbot/intelligence",
  "sendHeaders": true,
  "headerParameters": {
    "parameters": [
      {
        "name": "Content-Type",
        "value": "application/json"
      }
    ]
  },
  "sendBody": true,
  "bodyParameters": {},
  "jsonBody": "={{ JSON.stringify({\n  userId: $json.userId,\n  message: $json.userMessage,\n  openaiKey: $credentials.openAi.apiKey || null\n}) }}",
  "options": {
    "timeout": 30000
  }
}
```

### NODE 7: Intent Router (Switch)

**Type:** Switch  
**Name:** Route by Intent

**Mode:** Expression

**Rules:**
```javascript
// Rule 1: product_search
{{ $json.intent === 'product_search' }}

// Rule 2: incomplete_search  
{{ $json.intent === 'incomplete_search' }}

// Rule 3: follow_up_search
{{ $json.intent === 'follow_up_search' }}

// Rule 4: company_info
{{ $json.intent === 'company_info' }}

// Rule 5: contact_info
{{ $json.intent === 'contact_info' }}

// Rule 6: product_accessories
{{ $json.intent === 'product_accessories' }}

// Default: general
```

### NODE 8: Format Search Results (Function)

**Type:** Function  
**Name:** Format Product Results

```javascript
const response = $input.item.json;
const chatId = $('Prepare Context').item.json.chatId;

if (!response.success || !response.searchResults) {
  return {
    json: {
      chatId,
      message: response.response || 'Bir hata oluştu.'
    }
  };
}

const results = response.searchResults;
const totalResults = results.length;

if (totalResults === 0) {
  return {
    json: {
      chatId,
      message: response.response
    }
  };
}

let message = `${response.response}\n\n`;
message += `━━━━━━━━━━━━━━━\n\n`;

// İlk 5 sonuç
results.slice(0, 5).forEach((product, index) => {
  message += `*${index + 1}. ${product.name}*\n`;
  
  if (product.code) {
    message += `🏷️ Kod: \`${product.code}\`\n`;
  }
  
  if (product.typeName) {
    message += `📦 Tip: ${product.typeName}\n`;
  }
  
  if (product.height && product.width) {
    message += `📏 Boyut: ${product.height}×${product.width} mm\n`;
  }
  
  if (product.coatingType) {
    message += `🎨 Kaplama: ${product.coatingType}\n`;
  }
  
  message += `\n`;
});

if (totalResults > 5) {
  message += `━━━━━━━━━━━━━━━\n`;
  message += `_...ve ${totalResults - 5} ürün daha_\n\n`;
}

// Context bilgisi
if (response.context?.hasLastSearch) {
  message += `\n💡 *İpucu:* \"40lıkları göster\" veya \"pregalvaniz olanları\" diyerek filtreleyebilirsiniz.`;
}

message += `\n\n📞 Teklif: +90 XXX XXX XX XX`;

return {
  json: {
    chatId,
    message,
    replyMarkup: {
      inline_keyboard: [
        [
          { text: '🔍 Yeni Arama', callback_data: 'new_search' },
          { text: '📋 Filtrele', callback_data: 'filter' }
        ],
        [
          { text: '🗑️ Geçmişi Temizle', callback_data: 'clear_history' },
          { text: '📖 Katalog', url: 'https://ipossteel.com/katalog' }
        ]
      ]
    }
  }
};
```

### NODE 9: Format Question (Function)

**Type:** Function  
**Name:** Format Clarification Question

```javascript
const response = $input.item.json;
const chatId = $('Prepare Context').item.json.chatId;

let message = response.response;

// Butonlarla seçenekler sun
const buttons = [];

// Boyut seçenekleri
if (response.missingParams?.includes('height') || response.missingParams?.includes('width')) {
  buttons.push([
    { text: '40mm', callback_data: 'size_40' },
    { text: '45mm', callback_data: 'size_45' },
    { text: '50mm', callback_data: 'size_50' }
  ]);
  buttons.push([
    { text: '60mm', callback_data: 'size_60' },
    { text: '80mm', callback_data: 'size_80' },
    { text: '100mm', callback_data: 'size_100' }
  ]);
}

// Kaplama seçenekleri
if (response.missingParams?.includes('coatingType')) {
  buttons.push([
    { text: 'Pregalvaniz', callback_data: 'coating_pregalvaniz' },
    { text: 'Sıcak Daldırma', callback_data: 'coating_sicak' }
  ]);
  buttons.push([
    { text: 'Elektro', callback_data: 'coating_elektro' },
    { text: 'Boyalı', callback_data: 'coating_boyali' }
  ]);
}

// Genel butonlar
buttons.push([
  { text: '❌ İptal', callback_data: 'cancel' }
]);

return {
  json: {
    chatId,
    message,
    replyMarkup: {
      inline_keyboard: buttons
    }
  }
};
```

### NODE 10: Format Company Info (Function)

**Type:** Function  
**Name:** Format Company Info

```javascript
const response = $input.item.json;
const chatId = $('Prepare Context').item.json.chatId;

return {
  json: {
    chatId,
    message: response.response,
    replyMarkup: {
      inline_keyboard: [
        [
          { text: '📞 İletişim', callback_data: 'contact' },
          { text: '📋 Katalog', url: 'https://ipossteel.com/katalog' }
        ],
        [
          { text: '🔍 Ürün Ara', callback_data: 'search' }
        ]
      ]
    }
  }
};
```

### NODE 11: Telegram Reply

**Type:** Telegram Send Message  
**Name:** Send Response

```json
{
  "chatId": "={{$json.chatId}}",
  "text": "={{$json.message}}",
  "additionalFields": {
    "parse_mode": "Markdown",
    "disable_web_page_preview": true,
    "reply_markup": "={{JSON.stringify($json.replyMarkup || {})}}"
  }
}
```

---

## 📊 CONVERSATION FLOW ÖRNEKLERİ

### Örnek 1: Eksik Parametre → Soru Sor

```
👤 Kullanıcı: "kablo kanalı"

🤖 Bot: "🤔 Hangi boyutta arıyorsunuz?
       [40mm] [45mm] [50mm]
       [60mm] [80mm] [100mm]"

👤 Kullanıcı: "50mm" (veya butona tıklar)

🤖 Bot: "✅ 50mm kablo kanalı - 8 ürün bulundu
       1. Standart Kablo Kanalı...
       
       💡 İpucu: 'pregalvaniz olanları' diyerek filtreleyebilirsiniz."
```

### Örnek 2: Follow-up Search (Context Aware)

```
👤 Kullanıcı: "50lik pregal kablo kanalı"

🤖 Bot: "✅ 8 ürün bulundu
       1. Standart Kablo Kanalı 50x50 Pregalvaniz..."

👤 Kullanıcı: "40lıkları getir"

🤖 Bot: "✅ 40mm kablo kanalı - 5 ürün bulundu
       (Önceki 'kablo kanalı' aramanızı 40mm olarak güncelledim)
       1. Standart Kablo Kanalı 40x40..."
```

### Örnek 3: Product Accessories (Context Aware)

```
👤 Kullanıcı: "50lik pregal kanal"

🤖 Bot: "✅ 8 ürün bulundu
       1. Standart Kablo Kanalı SK-5050-PG..."

👤 Kullanıcı: "bunun aksesuarları neler?"

🤖 Bot: "📦 İlgili aksesuarlar:
       1. Köşe Bağlantı Parçası...
       2. Dirsek...
       3. T Bağlantı..."
```

### Örnek 4: Company Info

```
👤 Kullanıcı: "hakkınızda bilgi verir misiniz?"

🤖 Bot: "🏢 *IPOS Steel Hakkında*
       
       IPOS Steel, 2005 yılından beri...
       
       🎯 *Misyonumuz:*
       Müşterilerimize en kaliteli...
       
       👁️ *Vizyonumuz:*
       Sektörde lider...
       
       [📞 İletişim] [📋 Katalog]"
```

---

## 🎯 AVANTAJLAR

### ✅ Kullanıcı Deneyimi

**Önceki:**
- Her seferinde tam bilgi vermek zorunda
- Önceki aramalar unutuluyor
- Tekrar tekrar yazmak gerekiyor

**Yeni:**
- Eksik bilgi sorulup tamamlanıyor
- Önceki aramalar hatırlanıyor
- "40lıkları getir" gibi kısa komutlar yeterli

### ✅ Doğal Konuşma

**Önceki:**
- "pregalvaniz kablo kanalı 45x60"
- Robotik, komut benzeri

**Yeni:**
- "kablo kanalı" → Bot sorar
- "50lik" → Bot anlar
- "pregalvaniz olanları" → Bot günceller
- İnsan gibi konuşma!

### ✅ Akıllı Öneriler

- Eksik parametre varsa butonsun
- İlgili ürünler öner
- Filtrele meseçenekleri sun

---

## 💰 MALİYET

**v1.0:** ~$0.000135/mesaj  
**v2.0:** ~$0.0003/mesaj (context + history)

**Neden biraz daha pahalı?**
- Conversation history GPT'ye gönderiliyor
- Context management
- Daha uzun prompts

**Ama yine de ÇOK UCUZ!**
- 1000 mesaj = $0.30/ay
- 10,000 mesaj = $3/ay

---

## 🚀 KURULUM

### 1. Backend API'leri Deploy Et

```bash
# API'ler hazır:
✅ /api/chatbot/intelligence
✅ /api/chatbot/conversation
✅ /api/search/products (mevcut)
✅ /api/about (mevcut)
✅ /api/mission-vision (mevcut)

# Deploy
vercel deploy
# veya
npm run build && npm start
```

### 2. n8n Workflow Import Et

```
1. n8n → Import from File
2. docs/n8n-smart-chatbot-v2.json seç
3. Credential'ları ayarla:
   - Telegram Bot
   - OpenAI API
4. Domain'i değiştir (YOUR-DOMAIN.com)
5. Activate!
```

### 3. Test Et

```
✅ "kablo kanalı" → Bot soru sormalı
✅ "50lik" → Bot bulmalı
✅ "40lıkları getir" → Context aware çalışmalı
✅ "bunun aksesuarları" → İlgili ürünler
✅ "hakkınızda" → Şirket bilgisi
✅ "/clear" → Memory temizlenmeli
```

---

## 🔧 PRODUCTION İYİLEŞTİRMELERİ

### Memory Store: Redis Kullanın

**Şu an:** In-memory (Map)  
**Production:** Redis

```typescript
// Redis ile
import { Redis } from 'ioredis'
const redis = new Redis(process.env.REDIS_URL)

// Kaydet
await redis.set(`conversation:${userId}`, JSON.stringify(history), 'EX', 86400) // 24 saat

// Al
const history = JSON.parse(await redis.get(`conversation:${userId}`) || '[]')
```

### Rate Limiting

```typescript
// n8n'de veya API'de
const rateLimiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: 'minute'
})
```

### Analytics

```typescript
// Her mesajı logla
await prisma.chatLog.create({
  data: {
    userId,
    message,
    intent,
    responseTime,
    success: true
  }
})
```

---

## 📞 DESTEK

### Dokümantasyon
- `docs/n8n-smart-chatbot-v2.md` - Bu dosya
- `docs/n8n-smart-chatbot-v2.json` - Import dosyası (yakında)

### Debug
```javascript
// Intelligence API'de
console.log('Context:', context)
console.log('Analysis:', analysis)
console.log('Response:', response)
```

---

## ✅ SONUÇ

Artık botunuz **gerçekten akıllı!** 🧠

**Özellikler:**
- ✅ Konuşma hafızası
- ✅ Bağlamsal sorgular
- ✅ Akıllı soru sorma
- ✅ Şirket bilgileri
- ✅ Follow-up search
- ✅ İlişkisel sorgular

**Kullanıcı Deneyimi:** 📈📈📈

**Başarılar!** 🎉


