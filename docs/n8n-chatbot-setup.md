# 🤖 IPOS Steel Chatbot - n8n Kurulum Rehberi

## 📋 İÇİNDEKİLER
1. [API Testi](#1-api-testi)
2. [Telegram Bot Kurulumu](#2-telegram-bot-kurulumu)
3. [n8n Workflow Yapılandırması](#3-n8n-workflow-yapılandırması)
4. [Test Senaryoları](#4-test-senaryoları)
5. [Troubleshooting](#5-troubleshooting)

---

## 1. API TESTİ

### ✅ API Endpoint'i Test Et

**URL:** `https://your-domain.com/api/search/products`

### Test Örnekleri:

#### Test 1: Genel Arama
```bash
GET /api/search/products?q=kablo+kanalı

# Beklenen: Tüm kablo kanalları listelenir
```

#### Test 2: Kaplama Tipi Filtresi
```bash
GET /api/search/products?q=kanal&coatingType=pregalvaniz

# Beklenen: Sadece pregalvaniz kaplı ürünler
```

#### Test 3: Boyut Filtresi
```bash
GET /api/search/products?height=45&width=60

# Beklenen: 45x60 boyutundaki tüm ürünler
```

#### Test 4: Kombine Arama (En Yaygın)
```bash
GET /api/search/products?q=pregalvaniz+kablo+kanalı&height=45&width=60

# Beklenen: Pregalvaniz kaplı, 45x60 boyutunda kablo kanalları
```

### Postman/Thunder Client İçin:

```json
GET https://your-domain.com/api/search/products
Query Parameters:
  - q: "pregalvaniz kablo kanalı"
  - coatingType: "pregalvaniz"
  - height: "45"
  - width: "60"

Expected Response (200):
{
  "success": true,
  "query": "pregalvaniz kablo kanalı",
  "filters": {
    "coatingType": "pregalvaniz",
    "height": "45",
    "width": "60",
    "category": null
  },
  "totalResults": 8,
  "results": [
    {
      "id": "clxx123",
      "type": "channel",
      "typeName": "Kanal",
      "name": "Standart Kablo Kanalı",
      "code": "SK-4560-PG",
      "height": "45",
      "width": "60",
      "coatingType": "Pregalvaniz",
      "sheetThickness": "0.70",
      "imageUrl": "https://...",
      "productName": "Elektrik Kanalları",
      "categoryName": "Kablo Kanalları",
      "categorySlug": "kablo-kanallari",
      "subProductName": "Standart Seri",
      "subProductId": "clxx456",
      "productId": "clxx789",
      "path": "/products/clxx789",
      "fullDescription": "Standart Kablo Kanalı (SK-4560-PG) - Pregalvaniz 45x60 - Kablo Kanalları"
    }
  ]
}
```

---

## 2. TELEGRAM BOT KURULUMU

### Adım 1: Bot Oluşturma

1. Telegram'da **@BotFather**'ı aç
2. `/newbot` komutunu gönder
3. Bot adı: **IPOS Steel Asistan**
4. Username: **ipossteel_bot** (benzersiz olmalı)
5. Token'ı kaydet: `7XXXXXXXXX:AAH...`

### Adım 2: Bot Ayarları

```
/setdescription - Bot açıklaması ekle
"IPOS Steel ürünlerini hızlıca bulmanızı sağlayan akıllı asistan. Ürün adı, boyut veya kaplama tipi yazarak arama yapabilirsiniz."

/setabouttext - Hakkında metni
"IPOS Steel resmi ürün arama botu"

/setcommands - Komutlar ekle
start - Botu başlat
help - Yardım
search - Ürün ara
contact - İletişim bilgileri
catalog - Katalog indir
```

### Adım 3: Bot Token'ı Kaydet
```
Token: 7XXXXXXXXX:AAH...
Webhook URL: https://your-n8n-instance.com/webhook/telegram
```

---

## 3. N8N WORKFLOW YAPIŞLANDIRMASI

### Genel Yapı

```
[Telegram Trigger] 
    ↓
[Mesaj Analizi] 
    ↓
[API HTTP Request] 
    ↓
[Yanıt Formatlama] 
    ↓
[Telegram Reply]
```

---

### NODE 1: Telegram Trigger

**Node Tipi:** `Telegram Trigger`

**Ayarlar:**
```json
{
  "authentication": "telegramApi",
  "updates": ["message"],
  "additionalFields": {}
}
```

**Credentials:**
- Bot Token: `7XXXXXXXXX:AAH...`

---

### NODE 2: Mesaj Analizi (Function Node)

**Node Tipi:** `Function`
**Node Adı:** `Mesaj Analizi`

**JavaScript Code:**

```javascript
// Kullanıcı mesajını al
const userMessage = $input.item.json.message.text || '';
const chatId = $input.item.json.message.chat.id;
const userName = $input.item.json.message.from.first_name || 'Kullanıcı';

// Mesajı temizle
const cleanMessage = userMessage.toLowerCase().trim();

// Özel komutları kontrol et
if (cleanMessage === '/start' || cleanMessage === 'start') {
  return {
    json: {
      isCommand: true,
      command: 'start',
      chatId,
      userName,
      message: `👋 Merhaba ${userName}!\n\n🔍 *IPOS Steel Ürün Arama Botu*\n\nÜrün aramak için:\n• Ürün adı yazın: "kablo kanalı"\n• Boyut ekleyin: "45x60 kanal"\n• Kaplama belirtin: "pregalvaniz kanal"\n• Hepsini birleştirin: "pregalvaniz kablo kanalı 45x60"\n\n📌 *Komutlar:*\n/help - Yardım\n/contact - İletişim\n/catalog - Katalog indir`
    }
  };
}

if (cleanMessage === '/help' || cleanMessage === 'help') {
  return {
    json: {
      isCommand: true,
      command: 'help',
      chatId,
      message: `❓ *Nasıl Kullanılır?*\n\n*Örnek Aramalar:*\n• "kablo kanalı" → Tüm kablo kanalları\n• "45x60" → Bu boyuttaki ürünler\n• "pregalvaniz kanal" → Pregalvaniz kaplı kanallar\n• "pregalvaniz 45x60" → Tam arama\n\n*Kaplama Tipleri:*\n• Pregalvaniz\n• Sıcak Daldırma\n• Elektro\n• Boyalı\n\n*İpucu:* Boyutları "45x60" veya "45*60" şeklinde yazabilirsiniz.`
    }
  };
}

if (cleanMessage === '/contact' || cleanMessage === 'contact') {
  return {
    json: {
      isCommand: true,
      command: 'contact',
      chatId,
      message: `📞 *İletişim Bilgileri*\n\n☎️ Telefon: +90 XXX XXX XX XX\n✉️ Email: info@ipossteel.com\n🌐 Website: https://ipossteel.com\n📍 Adres: [Adresiniz]\n\n💬 Mesai Saatleri:\nPazartesi - Cuma: 08:30 - 17:30`
    }
  };
}

if (cleanMessage === '/catalog' || cleanMessage === 'catalog') {
  return {
    json: {
      isCommand: true,
      command: 'catalog',
      chatId,
      message: `📋 *Katalog ve Dökümanlar*\n\nKataloglarımızı indirmek için:\n🔗 https://ipossteel.com/katalog\n\nYardıma ihtiyacınız varsa bize ulaşın!`
    }
  };
}

// Eğer komut değilse, arama yap
if (!cleanMessage || cleanMessage.length < 2) {
  return {
    json: {
      isCommand: true,
      command: 'error',
      chatId,
      message: `⚠️ Lütfen en az 2 karakter girin.\n\nÖrnek: "kablo kanalı" veya "45x60"`
    }
  };
}

// Boyut tespiti (45x60, 45*60, 45×60, 45 60)
const dimensionMatch = cleanMessage.match(/(\d+)\s*[x*×\s-]+\s*(\d+)/);
const height = dimensionMatch ? dimensionMatch[1] : null;
const width = dimensionMatch ? dimensionMatch[2] : null;

// Kaplama tipi tespiti
const coatingTypes = {
  'pregalvaniz': 'pregalvaniz',
  'pregal': 'pregalvaniz',
  'sıcak daldırma': 'sıcak daldırma',
  'sicak daldirma': 'sıcak daldırma',
  'daldırma': 'sıcak daldırma',
  'elektro': 'elektro',
  'boyalı': 'boyalı',
  'boyali': 'boyalı'
};

let coatingType = null;
for (const [key, value] of Object.entries(coatingTypes)) {
  if (cleanMessage.includes(key)) {
    coatingType = value;
    break;
  }
}

// Kategori tespiti
let category = null;
if (cleanMessage.includes('kablo') || cleanMessage.includes('kanal')) {
  category = 'kablo-kanallari';
}

// API parametrelerini oluştur
const apiParams = {
  q: cleanMessage,
  coatingType: coatingType || undefined,
  height: height || undefined,
  width: width || undefined,
  category: category || undefined
};

// Undefined değerleri temizle
Object.keys(apiParams).forEach(key => {
  if (apiParams[key] === undefined) {
    delete apiParams[key];
  }
});

return {
  json: {
    isCommand: false,
    chatId,
    userName,
    originalMessage: userMessage,
    cleanMessage,
    apiParams,
    parsedData: {
      height,
      width,
      coatingType,
      category
    }
  }
};
```

---

### NODE 3: Router (IF Node)

**Node Tipi:** `IF`
**Node Adı:** `Komut mu Arama mı?`

**Koşul:**
```
Condition: {{ $json.isCommand }} === true
```

- **TRUE → Direkt Telegram Reply** (Komut ise)
- **FALSE → API Request** (Arama ise)

---

### NODE 4: API HTTP Request

**Node Tipi:** `HTTP Request`
**Node Adı:** `API Ürün Arama`

**Ayarlar:**
```json
{
  "method": "GET",
  "url": "https://your-domain.com/api/search/products",
  "sendQuery": true,
  "queryParameters": {
    "parameters": "={{ $json.apiParams }}"
  },
  "options": {
    "timeout": 30000,
    "response": {
      "response": {
        "fullResponse": false,
        "responseFormat": "json"
      }
    }
  }
}
```

**Query String Alternatif (Manuel):**
```javascript
// Eğer otomatik çalışmazsa:
const params = new URLSearchParams();
const apiParams = $json.apiParams;

Object.keys(apiParams).forEach(key => {
  if (apiParams[key]) {
    params.append(key, apiParams[key]);
  }
});

// URL: https://your-domain.com/api/search/products?${params.toString()}
```

---

### NODE 5: Yanıt Formatlama (Function Node)

**Node Tipi:** `Function`
**Node Adı:** `Telegram Yanıt Hazırla`

**JavaScript Code:**

```javascript
const chatId = $('Mesaj Analizi').item.json.chatId;
const userName = $('Mesaj Analizi').item.json.userName;
const originalMessage = $('Mesaj Analizi').item.json.originalMessage;
const apiResponse = $input.item.json;

// API hatası kontrolü
if (!apiResponse.success) {
  return {
    json: {
      chatId,
      message: `❌ Arama sırasında bir hata oluştu.\n\nLütfen tekrar deneyin veya bize ulaşın:\n☎️ +90 XXX XXX XX XX`,
      replyMarkup: {
        inline_keyboard: [
          [
            { text: '🔍 Yeni Arama', callback_data: 'new_search' },
            { text: '☎️ İletişim', callback_data: 'contact' }
          ]
        ]
      }
    }
  };
}

const results = apiResponse.results || [];
const totalResults = apiResponse.totalResults || 0;
const query = apiResponse.query;

// Sonuç yoksa
if (totalResults === 0) {
  return {
    json: {
      chatId,
      message: `🔍 *Arama: "${query}"*\n\n❌ Üzgünüm, aradığınız kriterlerde ürün bulamadım.\n\n💡 *Öneriler:*\n• Farklı boyutlar deneyin\n• Sadece ürün adını yazın (örn: "kablo kanalı")\n• Kaplama tipini değiştirin\n\n📞 Özel talepleriniz için:\n☎️ +90 XXX XXX XX XX\n✉️ info@ipossteel.com`,
      replyMarkup: {
        inline_keyboard: [
          [
            { text: '🔍 Yeni Arama', callback_data: 'new_search' }
          ],
          [
            { text: '☎️ İletişim', callback_data: 'contact' },
            { text: '📋 Katalog', url: 'https://ipossteel.com/katalog' }
          ]
        ]
      }
    }
  };
}

// Sonuç varsa
let message = `🔍 *Arama: "${query}"*\n\n`;
message += `✅ *${totalResults} ürün bulundu!*\n\n`;
message += `━━━━━━━━━━━━━━━\n\n`;

// İlk 5 sonucu göster
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
  
  if (product.sheetThickness) {
    message += `📐 Sac Kalınlığı: ${product.sheetThickness} mm\n`;
  }
  
  if (product.categoryName) {
    message += `📂 Kategori: ${product.categoryName}\n`;
  }
  
  message += `\n`;
});

if (totalResults > 5) {
  message += `━━━━━━━━━━━━━━━\n`;
  message += `_...ve ${totalResults - 5} ürün daha_\n\n`;
}

message += `\n📞 *Detaylı Bilgi ve Teklif İçin:*\n`;
message += `☎️ +90 XXX XXX XX XX\n`;
message += `✉️ info@ipossteel.com\n`;
message += `🌐 ipossteel.com`;

return {
  json: {
    chatId,
    message,
    results: results.slice(0, 5), // İlk 5 ürün
    replyMarkup: {
      inline_keyboard: [
        [
          { text: '🔍 Yeni Arama', callback_data: 'new_search' },
          { text: '📋 Tüm Sonuçlar', callback_data: `show_all_${totalResults}` }
        ],
        [
          { text: '☎️ Teklif İste', callback_data: 'request_quote' },
          { text: '📖 Katalog', url: 'https://ipossteel.com/katalog' }
        ]
      ]
    }
  }
};
```

---

### NODE 6: Telegram Reply

**Node Tipi:** `Telegram`
**Operation:** `Send Message`
**Node Adı:** `Telegram Cevap Gönder`

**Ayarlar:**
```json
{
  "chatId": "={{ $json.chatId }}",
  "text": "={{ $json.message }}",
  "additionalFields": {
    "parse_mode": "Markdown",
    "disable_web_page_preview": true,
    "reply_markup": "={{ JSON.stringify($json.replyMarkup) }}"
  }
}
```

---

## 4. TEST SENARYOLARI

### Test 1: Basit Arama
```
Kullanıcı: "kablo kanalı"
Beklenen: Tüm kablo kanalları listelenir
```

### Test 2: Kaplama Filtresi
```
Kullanıcı: "pregalvaniz kanal"
Beklenen: Sadece pregalvaniz ürünler
```

### Test 3: Boyut Arama
```
Kullanıcı: "45x60"
Beklenen: 45x60 boyutundaki tüm ürünler (kanal, modül, aksesuar)
```

### Test 4: Kombine Arama
```
Kullanıcı: "pregalvaniz kablo kanalı 45x60"
Beklenen: En spesifik sonuçlar
```

### Test 5: Komut Testi
```
Kullanıcı: "/start"
Beklenen: Hoş geldin mesajı

Kullanıcı: "/help"
Beklenen: Yardım metni

Kullanıcı: "/contact"
Beklenen: İletişim bilgileri
```

### Test 6: Bulunamayan
```
Kullanıcı: "999x999 altın kaplama"
Beklenen: "Ürün bulunamadı" mesajı ve öneriler
```

---

## 5. TROUBLESHOOTING

### Sorun: Bot yanıt vermiyor
**Çözüm:**
- Telegram Token'ı doğru mu kontrol et
- n8n workflow aktif mi?
- Webhook URL'i doğru mu?

### Sorun: API sonuç dönmüyor
**Çözüm:**
```bash
# API'yi manuel test et
curl "https://your-domain.com/api/search/products?q=kanal"

# Response 200 OK dönmeli
```

### Sorun: Türkçe karakterler bozuk
**Çözüm:**
- Parse mode: Markdown kullan
- UTF-8 encoding kontrol et

### Sorun: n8n timeout hatası
**Çözüm:**
```json
// HTTP Request Node'da timeout artır
{
  "timeout": 30000
}
```

---

## 🎯 SONRAKI ADIMLAR

1. ✅ API'yi production'a deploy et
2. ✅ Telegram bot'u test et
3. ✅ n8n workflow'unu aktifleştir
4. 📊 Analytics ekle (opsiyonel)
5. 🤖 OpenAI entegrasyonu (opsiyonel)
6. 📱 WhatsApp desteği ekle (opsiyonel)

---

## 📞 DESTEK

Sorularınız için:
- Bu dökümanı inceleyin
- API test edin
- n8n loglarını kontrol edin

**Başarılar!** 🚀

