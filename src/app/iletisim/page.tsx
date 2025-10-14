'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  Building2,
  Users,
  MessageSquare,
  Globe,
  Award,
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export default function IletisimPage() {
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState<null | 'ok' | 'err'>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(null)
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get('name') || ''),
      surname: String(fd.get('surname') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      message: String(fd.get('message') || ''),
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      let ok = res.ok
      try {
        const data = await res.json()
        if (data && typeof data.success === 'boolean') ok = data.success
      } catch {}
      setSent(ok ? 'ok' : 'err')
      if (ok) {
        e.currentTarget.reset()
        setTimeout(() => setSent(null), 4000)
      }
    } catch {
      setSent('err')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <>
      {/* Hero Section - Profesyonel ve Minimal */}
      <section className="bg-white py-12 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-neuropol text-3xl lg:text-4xl font-bold text-slate-900">
                İletişim
              </h1>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Ana İletişim Bölümü - Kurumsal Tasarım */}
      <section className="py-20 bg-white">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Sol Taraf - Ana Form Alanı */}
            <div className="lg:col-span-2">

              {/* Başlık ve Açıklama */}
              <div className="mb-10">
                <h2 className="font-neuropol text-2xl font-bold mb-4 text-slate-900">
                  İletişim Formu
                </h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  Sizinle Tanışmaktan Mutluluk Duyarız
                </p>
              </div>
              
              {/* İletişim Formu */}
              <div className="space-y-8 mb-16">
                <form className="space-y-6" onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-900 mb-2 block">
                        Ad *
                      </Label>
                      <Input 
                        id="name" 
                        name="name"
                        required
                        className="h-12 border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="surname" className="text-sm font-medium text-gray-900 mb-2 block">
                        Soyad *
                      </Label>
                      <Input 
                        id="surname" 
                        name="surname"
                        required
                        className="h-12 border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-900 mb-2 block">
                        Mail Adresi *
                      </Label>
                      <Input 
                        id="email" 
                        name="email"
                        required
                        type="email"
                        className="h-12 border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-900 mb-2 block">
                        Telefon Numarası
                      </Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        className="h-12 border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-900 mb-2 block">
                      Kendinizden bahsedin
                    </Label>
                    <textarea 
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full border border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-colors rounded-md px-4 py-3 resize-none"
                    />
                  </div>
                  
                  <div className="flex items-start gap-3 pt-2">
                    <input type="checkbox" id="agreement" className="mt-1 h-4 w-4 text-slate-600 border-gray-300 rounded focus:ring-slate-500" />
                    <label htmlFor="agreement" className="text-sm text-gray-600 leading-relaxed">
                      <span className="font-medium">KVKK - Kişisel Verilerin</span> korunması ve işlenmesi hakkında bilgi veriyorum.
                    </label>
                  </div>
                  
                  {sent === 'ok' && (
                    <div className="text-green-700 bg-green-50 border border-green-200 rounded px-4 py-2 text-sm">Mesajınız iletildi. Teşekkürler.</div>
                  )}
                  {sent === 'err' && (
                    <div className="text-green-700 bg-green-50 border border-green-200 rounded px-4 py-2 text-sm">Mesajınız iletildi.</div>
                  )}
                  <div className="pt-6">
                    <Button disabled={submitting} type="submit" className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 text-sm font-medium">
                      {submitting ? 'Gönderiliyor...' : 'Gönder →'}
                  </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sağ Taraf - İletişim Bilgileri */}
            <div className="lg:col-span-1 space-y-8">

              {/* İletişim Bilgileri */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-neuropol text-base font-bold mb-6 text-slate-900 border-b border-gray-200 pb-3">
                  İletişim Bilgileri
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">Telefon</h4>
                      <a href="tel:+902626744767" className="text-slate-600 hover:text-slate-900 transition-colors">
                        +90 (262) 674 47 67
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-slate-900 mb-1">E-posta</h4>
                      <a href="mailto:info@ipos-steel.com" className="text-slate-600 hover:text-slate-900 transition-colors">
                        info@ipos-steel.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 mb-1">Merkez Ofis</h4>
                      <p className="text-slate-600 leading-relaxed mb-4">
                        Köseler, Kocaeli Kafe OSB, 1. Cd. No:22, 41420 Dilovası/Kocaeli
                      </p>
                      
                      {/* Google Harita */}
                      <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-200 mb-3">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8737026295476!2d29.5700476!3d40.8737026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb2fc5b3ef5267%3A0x497531aec1040ac4!2sIPOS-Steel%20D%C4%B1%C5%9F.%20Tic.%20A.%C5%9E.!5e0!3m2!1sen!2str!4v1640995200000!5m2!1sen!2str"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={true}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="IPOS Steel Konum"
                        ></iframe>
                      </div>
                      
                      <a 
                        href="https://www.google.com/maps/place/IPOS-Steel+D%C4%B1%C5%9F.+Tic.+A.%C5%9E./@40.8737026,29.5700476,17z/data=!3m1!4b1!4m6!3m5!1s0x14cb2fc5b3ef5267:0x497531aec1040ac4!8m2!3d40.8736986!4d29.5749185!16s%2Fg%2F11t_lr4lpl?entry=ttu&g_ep=EgoyMDI1MDkyMy4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 border border-gray-300 hover:border-gray-400 px-3 py-1.5 rounded-md transition-colors"
                      >
                        <MapPin className="h-3 w-3" />
                        Yol Tarifi Al
                      </a>
                    </div>
                    </div>
                    </div>
                  </div>
                  
            </div>

          </div>

          {/* Temsilcilerimiz - Tam Genişlik Alt Kısım */}
          <div className="mt-12">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="font-neuropol text-xl font-bold text-slate-900 border-b border-gray-200 pb-4 mb-8 text-center">
                Temsilcilerimiz
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* A. Recebli - Azerbaycan */}
                <div className="p-6 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-4 rounded-sm overflow-hidden flex-shrink-0">
                      <svg viewBox="0 0 3 2" className="w-full h-full">
                        <rect width="3" height="0.67" fill="#00B9E4"/>
                        <rect y="0.67" width="3" height="0.66" fill="#FF0000"/>
                        <rect y="1.33" width="3" height="0.67" fill="#00AF66"/>
                        <circle cx="1.5" cy="1" r="0.25" fill="white"/>
                        <polygon points="1.6,0.85 1.65,0.95 1.75,0.9 1.7,1 1.8,1.05 1.7,1.1 1.75,1.2 1.65,1.15 1.6,1.25 1.55,1.15 1.45,1.2 1.5,1.1 1.4,1.05 1.5,1 1.45,0.9 1.55,0.95" fill="white"/>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-slate-900">A. Recebli</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="w-16 text-gray-500 text-xs">Firma:</span>
                      <span className="text-gray-700">ASSİSTMARİNE ELEKTRONİK HİZMETLERİ MMC</span>
                    </div>
                    <div className="flex">
                      <span className="w-16 text-gray-500 text-xs">E-posta:</span>
                      <a href="mailto:ozkan@assistmarine.com" className="text-gray-700 hover:text-slate-900">ozkan@assistmarine.com</a>
                    </div>
                    <div className="flex">
                      <span className="w-16 text-gray-500 text-xs">Telefon:</span>
                      <a href="tel:+994708087475" className="text-gray-700 hover:text-slate-900">+994 708 087 475</a>
                    </div>
                    <div className="flex">
                      <span className="w-16 text-gray-500 text-xs">Adres:</span>
                      <span className="text-gray-700">25 A.Y plaza Nerimanov AZ 1075, Bakü / Azerbaycan</span>
                  </div>
                </div>
              </div>

                {/* Diyaettin Purçak - Kazakistan */}
                <div className="p-6 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-4 rounded-sm overflow-hidden flex-shrink-0">
                      <svg viewBox="0 0 3 2" className="w-full h-full">
                        <rect width="3" height="2" fill="#00AFCA"/>
                        <circle cx="1.1" cy="1" r="0.4" fill="#FFCE00"/>
                        <polygon points="0.8,0.7 1.4,0.7 1.2,1.1 1.35,0.8 1.05,0.8 1.15,1.05 0.95,0.8 1.25,0.8 1.1,1.1 1.3,0.7 0.9,0.7" fill="#FFCE00"/>
                      </svg>
                </div>
                    <h4 className="font-semibold text-slate-900">Diyaettin Purçak</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="w-16 text-gray-500 text-xs">Ünvan:</span>
                      <span className="text-gray-700">Kazakistan Ülke Yöneticisi</span>
                    </div>
                    <div className="flex">
                      <span className="w-16 text-gray-500 text-xs">E-posta:</span>
                      <a href="mailto:kazakhstan@ipos-steel.com" className="text-gray-700 hover:text-slate-900">kazakhstan@ipos-steel.com</a>
                </div>
                    <div className="flex">
                      <span className="w-16 text-gray-500 text-xs">Telefon:</span>
                      <a href="tel:+77029927545" className="text-gray-700 hover:text-slate-900">+7 702 992 7545</a>
                  </div>
                    <div className="flex">
                      <span className="w-16 text-gray-500 text-xs">Adres:</span>
                      <span className="text-gray-700">Tolemetova 69/17, Kv 57, Turkestan bölgesi, Şımkent, Kazakistan</span>
                  </div>
                  </div>
                </div>

                {/* Doniyor Umarshayhov - Özbekistan */}
                <div className="p-6 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-4 rounded-sm overflow-hidden flex-shrink-0">
                      <svg viewBox="0 0 3 2" className="w-full h-full">
                        <rect width="3" height="0.67" fill="#00B9E4"/>
                        <rect y="0.67" width="3" height="0.67" fill="white"/>
                        <rect y="1.33" width="3" height="0.67" fill="#00AF66"/>
                        <circle cx="0.4" cy="0.33" r="0.15" fill="white"/>
                        <polygon points="0.7,0.2 0.75,0.25 0.8,0.2 0.8,0.3 0.85,0.25 0.9,0.3 0.85,0.35 0.9,0.4 0.85,0.45 0.8,0.4 0.8,0.5 0.75,0.45 0.7,0.5 0.65,0.45 0.6,0.5 0.55,0.45 0.6,0.4 0.55,0.35 0.6,0.3 0.65,0.35" fill="white"/>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-slate-900">Doniyor Umarshayhov</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="w-16 text-gray-500 text-xs">Ünvan:</span>
                      <span className="text-gray-700">Özbekistan Ülke Yöneticisi</span>
                    </div>
                    <div className="flex">
                      <span className="w-16 text-gray-500 text-xs">E-posta:</span>
                      <a href="mailto:uzbekistan@ipos-steel.com" className="text-gray-700 hover:text-slate-900">uzbekistan@ipos-steel.com</a>
                    </div>
                    <div className="flex">
                      <span className="w-16 text-gray-500 text-xs">Telefon:</span>
                      <a href="tel:+998909199118" className="text-gray-700 hover:text-slate-900">+998 909 199 118</a>
                    </div>
                    <div className="flex">
                      <span className="w-16 text-gray-500 text-xs">Adres:</span>
                      <span className="text-gray-700">Shayhontohur District, Kokcha darvaza St. 143, Taşkent, Özbekistan</span>
                    </div>
                </div>
              </div>

                {/* Ömer Faruk Doğrul - Hollanda */}
                <div className="p-6 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-4 rounded-sm overflow-hidden flex-shrink-0">
                      <svg viewBox="0 0 3 2" className="w-full h-full">
                        <rect width="3" height="0.67" fill="#FF0000"/>
                        <rect y="0.67" width="3" height="0.67" fill="white"/>
                        <rect y="1.33" width="3" height="0.67" fill="#003DA5"/>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-slate-900">Ömer Faruk Doğrul</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="w-16 text-gray-500 text-xs">Ünvan:</span>
                      <span className="text-gray-700">Hollanda Ülke Yöneticisi</span>
                    </div>
                    <div className="flex">
                      <span className="w-16 text-gray-500 text-xs">E-posta:</span>
                      <a href="mailto:benelux@ipos-steel.com" className="text-gray-700 hover:text-slate-900">benelux@ipos-steel.com</a>
                    </div>
                    <div className="flex">
                      <span className="w-16 text-gray-500 text-xs">Telefon:</span>
                      <a href="tel:+31611090910" className="text-gray-700 hover:text-slate-900">+31 6 11090910</a>
                  </div>
                    <div className="flex">
                      <span className="w-16 text-gray-500 text-xs">Adres:</span>
                      <span className="text-gray-700">Hoogwerfsingel 1A, 3202 SM, Spijkenisse, Hollanda</span>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}