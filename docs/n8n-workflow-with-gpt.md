# 🤖 GPT-4o-mini ile Akıllı Chatbot - n8n Workflow

## 🎯 Amaç
Kullanıcının doğal dil sorgusunu GPT-4o-mini ile analiz edip API parametrelerine çevirme.

**Örnek Dönüşümler:**
```
"50lik kablo kanalı neler var" 
  → { q: "kablo kanalı", height: "50", width: "50" }

"pregalvanizli 60lık istiyorum"
  → { q: "kablo kanalı", coatingType: "pregalvaniz", height: "60", width: "60" }

"sıcak daldırmalı kanallarınız var mı?"
  → { q: "kanal", coatingType: "sıcak daldırma" }
```

---

## 🏗️ YENİ WORKFLOW YAPISI

```
[Telegram Trigger]
    ↓
[Komut Kontrolü] → IF → [Telegram Reply (Komut)]
    ↓ (değilse)
[🆕 GPT-4o-mini: Mesajı Analiz Et]
    ↓
[🆕 GPT Çıktısını Parse Et]
    ↓
[API HTTP Request]
    ↓
[Yanıt Formatlama]
    ↓
[Telegram Reply]
```

---

## 🔧 YENİ NODE'LAR

### NODE 2.5: GPT-4o-mini Mesaj Analizi

**Node Tipi:** `HTTP Request`  
**Node Adı:** `GPT Mesaj Analizi`  
**Pozisyon:** Komut Kontrolü ile API Request arasına

**Yapılandırma:**

```json
{
  "method": "POST",
  "url": "https://api.openai.com/v1/chat/completions",
  "authentication": "predefinedCredentialType",
  "nodeCredentialType": "openAiApi",
  "sendHeaders": true,
  "headerParameters": {
    "parameters": [
      {
        "name": "Content-Type",
        "value": "application/json"
      },
      {
        "name": "Authorization",
        "value": "=Bearer {{$credentials.openAiApi.apiKey}}"
      }
    ]
  },
  "sendBody": true,
  "bodyParameters": {
    "parameters": []
  },
  "jsonBody": "={{ JSON.stringify({\n  model: 'gpt-4o-mini',\n  messages: [\n    {\n      role: 'system',\n      content: $json.systemPrompt\n    },\n    {\n      role: 'user',\n      content: $json.userMessage\n    }\n  ],\n  functions: [\n    {\n      name: 'extract_product_search_params',\n      description: 'Kullanıcının ürün arama sorgusundan parametreleri çıkar',\n      parameters: {\n        type: 'object',\n        properties: {\n          searchQuery: {\n            type: 'string',\n            description: 'Genel arama terimi (örn: kablo kanalı, modül, aksesuar)'\n          },\n          coatingType: {\n            type: 'string',\n            enum: ['pregalvaniz', 'sıcak daldırma', 'elektro', 'boyalı', null],\n            description: 'Kaplama tipi'\n          },\n          height: {\n            type: 'string',\n            description: 'Yükseklik (mm) - sadece sayı'\n          },\n          width: {\n            type: 'string',\n            description: 'Genişlik (mm) - sadece sayı'\n          },\n          productType: {\n            type: 'string',\n            enum: ['channel', 'module', 'accessory', 'cover', 'all'],\n            description: 'Ürün tipi'\n          },\n          intent: {\n            type: 'string',\n            enum: ['search', 'info', 'price', 'availability', 'general'],\n            description: 'Kullanıcının niyeti'\n          }\n        },\n        required: ['searchQuery', 'intent']\n      }\n    }\n  ],\n  function_call: { name: 'extract_product_search_params' },\n  temperature: 0.3\n}) }}"
}
```

**Alternatif: Manuel JSON Body (daha kolay):**

```json
{
  "model": "gpt-4o-mini",
  "messages": [
    {
      "role": "system",
      "content": "={{$json.systemPrompt}}"
    },
    {
      "role": "user",
      "content": "={{$json.userMessage}}"
    }
  ],
  "functions": [
    {
      "name": "extract_product_search_params",
      "description": "Kullanıcının ürün arama sorgusundan parametreleri çıkar",
      "parameters": {
        "type": "object",
        "properties": {
          "searchQuery": {
            "type": "string",
            "description": "Genel arama terimi (örn: kablo kanalı, modül, aksesuar)"
          },
          "coatingType": {
            "type": "string",
            "enum": ["pregalvaniz", "sıcak daldırma", "elektro", "boyalı", null],
            "description": "Kaplama tipi"
          },
          "height": {
            "type": "string",
            "description": "Yükseklik (mm) - sadece sayı"
          },
          "width": {
            "type": "string",
            "description": "Genişlik (mm) - sadece sayı"
          },
          "productType": {
            "type": "string",
            "enum": ["channel", "module", "accessory", "cover", "all"],
            "description": "Ürün tipi"
          },
          "intent": {
            "type": "string",
            "enum": ["search", "info", "price", "availability", "general"],
            "description": "Kullanıcının niyeti"
          }
        },
        "required": ["searchQuery", "intent"]
      }
    }
  ],
  "function_call": {
    "name": "extract_product_search_params"
  },
  "temperature": 0.3
}
```

---

### NODE 2: Mesaj Ön İşleme (Güncellenmiş)

**Node Tipi:** `Function`  
**Node Adı:** `Mesaj Ön İşleme`

**JavaScript Code:**

```javascript
const userMessage = $input.item.json.message.text || '';
const chatId = $input.item.json.message.chat.id;
const userName = $input.item.json.message.from.first_name || 'Kullanıcı';

// Temizlik
const cleanMessage = userMessage.toLowerCase().trim();

// Komut kontrolü
const commands = {
  '/start': 'start',
  'start': 'start',
  '/help': 'help',
  'help': 'help',
  '/contact': 'contact',
  'contact': 'contact',
  '/catalog': 'catalog',
  'catalog': 'catalog'
};

if (commands[cleanMessage]) {
  const commandMessages = {
    start: `👋 Merhaba ${userName}!\n\n🔍 *IPOS Steel Ürün Arama Botu*\n\nÜrün aramak için doğal dilde yazın:\n• "50lik kablo kanalı neler var?"\n• "pregalvanizli 60lık istiyorum"\n• "sıcak daldırmalı kanallar"\n• "45x60 pregal kanal"\n\n🤖 Yapay zeka destekli arama!\n\n📌 *Komutlar:*\n/help - Yardım\n/contact - İletişim\n/catalog - Katalog`,
    
    help: `❓ *Nasıl Kullanılır?*\n\n*Doğal Dilde Sorun:*\n• "50lik kablo kanalı var mı?"\n• "pregalvanizli 60lık lazım"\n• "sıcak daldırmalı kanal"\n• "45 60 boyutunda pregal"\n\n*Kaplama Tipleri:*\n• Pregalvaniz (pregal)\n• Sıcak Daldırma\n• Elektro\n• Boyalı\n\n*Boyut Örnekleri:*\n• "50lik" → 50mm\n• "45x60" → 45mm x 60mm\n• "60 lık" → 60mm\n\n🤖 Bot sizi anlayacak, endişelenmeyin!`,
    
    contact: `📞 *İletişim Bilgileri*\n\n☎️ Telefon: +90 XXX XXX XX XX\n✉️ Email: info@ipossteel.com\n🌐 Website: https://ipossteel.com\n📍 Adres: [Adresiniz]\n\n💬 Mesai Saatleri:\nPazartesi - Cuma: 08:30 - 17:30`,
    
    catalog: `📋 *Katalog ve Dökümanlar*\n\nKataloglarımızı indirmek için:\n🔗 https://ipossteel.com/katalog\n\nYardıma ihtiyacınız varsa bize ulaşın!`
  };
  
  return {
    json: {
      isCommand: true,
      command: commands[cleanMessage],
      chatId,
      message: commandMessages[commands[cleanMessage]]
    }
  };
}

// Çok kısa mesaj kontrolü
if (cleanMessage.length < 2) {
  return {
    json: {
      isCommand: true,
      command: 'error',
      chatId,
      message: `⚠️ Lütfen en az 2 karakter girin.\n\nÖrnek: "50lik kanal" veya "pregalvaniz"`
    }
  };
}

// GPT için hazırla
const systemPrompt = `Sen IPOS Steel'in ürün arama asistanısın. Kullanıcının Türkçe sorgusunu analiz edip ürün arama parametrelerine çeviriyorsun.

**Görevin:**
1. Kullanıcının ne aradığını anla
2. Parametreleri çıkar (boyut, kaplama tipi, ürün tipi)
3. Structured format'ta döndür

**Örnekler:**
- "50lik kablo kanalı neler var" → searchQuery: "kablo kanalı", height: "50", width: "50"
- "pregalvanizli 60lık" → searchQuery: "kanal", coatingType: "pregalvaniz", height: "60", width: "60"
- "45x60 pregal kanal" → searchQuery: "kablo kanalı", height: "45", width: "60", coatingType: "pregalvaniz"
- "sıcak daldırmalı kanallarınız var mı?" → searchQuery: "kanal", coatingType: "sıcak daldırma"

**Boyut Çevirileri:**
- "50lik", "50 lik", "50'lik" → "50"
- "45x60", "45*60", "45 60" → height: "45", width: "60"

**Kaplama Tipleri:**
- "pregal", "pregalvaniz", "pregalvanizli" → "pregalvaniz"
- "sıcak daldırma", "sıcak daldırmalı", "galvaniz" → "sıcak daldırma"
- "elektro" → "elektro"
- "boyalı", "boyali" → "boyalı"

**Ürün Tipleri:**
- "kablo kanalı", "kanal" → productType: "channel"
- "modül" → productType: "module"
- "aksesuar" → productType: "accessory"
- "kapak" → productType: "cover"

**Önemli:**
- Sadece sayıları döndür (birim yok)
- Türkçe karakter normalizasyonu yap
- Eğer boyut tek ise hem height hem width olabilir`;

return {
  json: {
    isCommand: false,
    chatId,
    userName,
    userMessage: userMessage,
    cleanMessage: cleanMessage,
    systemPrompt: systemPrompt
  }
};
```

---

### NODE 2.6: GPT Yanıtını Parse Et

**Node Tipi:** `Function`  
**Node Adı:** `GPT Çıktısını Parse Et`

**JavaScript Code:**

```javascript
const chatId = $('Mesaj Ön İşleme').item.json.chatId;
const originalMessage = $('Mesaj Ön İşleme').item.json.userMessage;
const gptResponse = $input.item.json;

try {
  // GPT Function Calling response'unu parse et
  const functionCall = gptResponse.choices[0].message.function_call;
  const params = JSON.parse(functionCall.arguments);
  
  console.log('GPT Extracted Params:', params);
  
  // API parametrelerini oluştur
  const apiParams = {
    q: params.searchQuery || '',
    coatingType: params.coatingType || undefined,
    height: params.height || undefined,
    width: params.width || undefined
  };
  
  // Undefined değerleri temizle
  Object.keys(apiParams).forEach(key => {
    if (apiParams[key] === undefined || apiParams[key] === null || apiParams[key] === '') {
      delete apiParams[key];
    }
  });
  
  // En az bir parametre olmalı
  if (Object.keys(apiParams).length === 0) {
    return {
      json: {
        isError: true,
        chatId,
        message: `⚠️ Üzgünüm, aramanızı anlayamadım.\n\nLütfen daha açık bir şekilde belirtin:\n• Ürün adı: "kablo kanalı"\n• Boyut: "50lik" veya "45x60"\n• Kaplama: "pregalvaniz", "sıcak daldırma"\n\nÖrnek: "50lik pregalvaniz kablo kanalı"`
      }
    };
  }
  
  return {
    json: {
      isError: false,
      chatId,
      originalMessage,
      apiParams,
      gptParams: params, // Debug için
      intent: params.intent
    }
  };
  
} catch (error) {
  console.error('GPT Parse Error:', error);
  
  return {
    json: {
      isError: true,
      chatId,
      message: `❌ Arama sırasında bir hata oluştu.\n\nLütfen tekrar deneyin veya daha basit bir şekilde sorun.\n\nÖrnek: "50lik kablo kanalı"`
    }
  };
}
```

---

### NODE 2.7: Hata Kontrolü (IF Node)

**Node Tipi:** `IF`  
**Node Adı:** `Hata Var mı?`

**Koşul:**
```
Condition: {{ $json.isError }} === true
```

- **TRUE → Telegram Reply (Hata Mesajı)**
- **FALSE → API Request**

---

## 🔄 GÜNCELLENMIŞ WORKFLOW AKIŞI

```
1. [Telegram Trigger]
      ↓
2. [Mesaj Ön İşleme] (Function)
      ↓
3. [Komut mu?] (IF)
      ├─ TRUE → [Telegram Reply (Komut)]
      └─ FALSE ↓
4. [🆕 GPT Mesaj Analizi] (HTTP - OpenAI)
      ↓
5. [🆕 GPT Çıktısını Parse Et] (Function)
      ↓
6. [🆕 Hata Var mı?] (IF)
      ├─ TRUE → [Telegram Reply (Hata)]
      └─ FALSE ↓
7. [API Ürün Arama] (HTTP)
      ↓
8. [Yanıt Formatlama] (Function)
      ↓
9. [Telegram Cevap Gönder]
```

---

## 🔑 OPENAI CREDENTIALS EKLEME

### n8n'de OpenAI Credential Oluşturma

1. **Settings** → **Credentials** → **New**
2. **Credential Type:** HTTP Header Auth (Manuel)
3. veya **OpenAI** (Varsa built-in)

**Manuel Yapılandırma:**
```json
{
  "name": "OpenAI API",
  "type": "httpHeaderAuth",
  "data": {
    "name": "Authorization",
    "value": "Bearer sk-YOUR_OPENAI_KEY_HERE"
  }
}
```

### OpenAI API Key Alma

1. https://platform.openai.com/ adresine git
2. **API Keys** → **Create new secret key**
3. Key'i kopyala: `sk-proj-...`
4. n8n'e ekle

---

## 💰 MALİYET TAHMİNİ (GPT-4o-mini)

### Fiyatlandırma
- Input: $0.150 / 1M tokens
- Output: $0.600 / 1M tokens

### Örnek Hesaplama

**Tek Mesaj:**
- Input: ~500 tokens (system prompt + user message) = $0.000075
- Output: ~100 tokens (JSON response) = $0.00006
- **Toplam: ~$0.000135 per mesaj**

**Aylık (1000 mesaj):**
- 1000 mesaj × $0.000135 = **$0.135/ay** (≈ 13 cent!)

**Aylık (10,000 mesaj):**
- 10,000 mesaj × $0.000135 = **$1.35/ay**

🎉 **ÇOK UCUZ!**

---

## 📝 TEST ÖRNEKLERİ

### Test 1: Boyut Arama
```
Kullanıcı: "50lik kablo kanalı neler var"

GPT Çıktısı:
{
  "searchQuery": "kablo kanalı",
  "height": "50",
  "width": "50",
  "intent": "search"
}

API Call:
GET /api/search/products?q=kablo+kanalı&height=50&width=50
```

### Test 2: Kaplama + Boyut
```
Kullanıcı: "pregalvanizli 60lık istiyorum"

GPT Çıktısı:
{
  "searchQuery": "kablo kanalı",
  "coatingType": "pregalvaniz",
  "height": "60",
  "width": "60",
  "intent": "search"
}

API Call:
GET /api/search/products?q=kablo+kanalı&coatingType=pregalvaniz&height=60&width=60
```

### Test 3: Tam Boyut
```
Kullanıcı: "45x60 pregal kanal"

GPT Çıktısı:
{
  "searchQuery": "kablo kanalı",
  "coatingType": "pregalvaniz",
  "height": "45",
  "width": "60",
  "intent": "search"
}

API Call:
GET /api/search/products?q=kablo+kanalı&coatingType=pregalvaniz&height=45&width=60
```

### Test 4: Sadece Kaplama
```
Kullanıcı: "sıcak daldırmalı kanallarınız var mı?"

GPT Çıktısı:
{
  "searchQuery": "kanal",
  "coatingType": "sıcak daldırma",
  "intent": "availability"
}

API Call:
GET /api/search/products?q=kanal&coatingType=sıcak+daldırma
```

### Test 5: Karmaşık Sorgu
```
Kullanıcı: "45 60 boyutunda pregal kablo kanalı lazım"

GPT Çıktısı:
{
  "searchQuery": "kablo kanalı",
  "coatingType": "pregalvaniz",
  "height": "45",
  "width": "60",
  "intent": "search"
}
```

---

## 🎯 AVANTAJLARI

### ✅ Doğal Dil Anlama
- "50lik" → height: 50
- "pregal" → pregalvaniz
- "var mı?" → search intent

### ✅ Türkçe Karakter Desteği
- "boyalı" ✅
- "60lık" ✅
- "sıcak daldırma" ✅

### ✅ Esneklik
- "45x60" = "45 60" = "45*60"
- "pregal" = "pregalvaniz" = "pregalvanizli"

### ✅ Intent Tespiti
- "var mı?" → availability
- "fiyatı ne" → price
- "neler var" → search

---

## 🔧 TROUBLESHOOTING

### GPT yanıt vermiyor
```javascript
// HTTP Request timeout'u artır
{
  "timeout": 30000
}
```

### Function calling çalışmıyor
- Model: `gpt-4o-mini` kullanın (function calling destekler)
- `gpt-3.5-turbo` da çalışır ama daha az güvenilir

### Parse hatası
```javascript
// Try-catch ekle
try {
  const params = JSON.parse(functionCall.arguments);
} catch (e) {
  console.error('Parse error:', e);
  // Fallback to basic parsing
}
```

### Yanlış parametreler
- System prompt'u iyileştir
- Daha fazla örnek ekle
- Temperature'ı düşür (0.1-0.3)

---

## 📊 KARŞILAŞTIRMA

### Önceki Sistem (Regex)
```
"50lik kanal" → ✅ Çalışır
"50 lik kanal" → ⚠️ Regex'e bağlı
"elli lik kanal" → ❌ Çalışmaz
"pregal 60lık lazım" → ⚠️ Sınırlı
```

### Yeni Sistem (GPT)
```
"50lik kanal" → ✅ Çalışır
"50 lik kanal" → ✅ Çalışır
"elli lik kanal" → ❌ Çalışmaz (sayıya çevrilmeli)
"pregal 60lık lazım" → ✅ Çalışır!
"45 60 boyutunda pregalvaniz" → ✅ Çalışır!
```

---

## ✅ SONUÇ

GPT-4o-mini ile bot **çok daha akıllı** olacak:
- Doğal dil anlama ✅
- Türkçe karakter desteği ✅
- Esnek sorgulama ✅
- Çok ucuz ($0.0001/mesaj) ✅

**Sonraki Adımlar:**
1. OpenAI API key al
2. n8n'e credential ekle
3. Yeni node'ları workflow'a ekle
4. Test et!

---

## 📞 DESTEK

Sorun olursa:
- OpenAI API logs kontrol et
- n8n execution logs kontrol et
- GPT response'u console.log ile debug et

