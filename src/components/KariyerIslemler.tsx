"use client"

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SalaryAndBenefitsManager from '@/components/SalaryAndBenefitsManager'
import RecruitmentProcessManager from '@/components/RecruitmentProcessManager'
import CareerOpportunitiesManager from '@/components/CareerOpportunitiesManager'
import InternshipProcessManager from '@/components/InternshipProcessManager'
import JobPositionsManager from '@/components/JobPositionsManager'
import RichTextEditor from '@/components/ui/RichTextEditor'

type CareerTabKey =
  | 'ikPolitikamiz'
  | 'isEtigiKurallarimiz'
  | 'ucretYanHaklar'
  | 'kariyerFirsatlari'
  | 'iseAlimSüreci'
  | 'acikPozisyonlar'
  | 'stajSüreci'

export default function KariyerIslemler() {
  const [activeTab, setActiveTab] = useState<CareerTabKey>('ikPolitikamiz')
  const [isSaving, setIsSaving] = useState(false)
  const [loadingHR, setLoadingHR] = useState(false)
  const [loadingEthics, setLoadingEthics] = useState(false)

  // İK Politikamız form state
  const [hrForm, setHrForm] = useState({
    heroTitle: '',
    heroSubtitle: '',
    section1Title: '',
    section1Paragraph: '',
    section1ImageUrl: '',
    section2Title: '',
    section2Paragraph: '',
    section2ImageUrl: '',
    section3Title: '',
    section3Paragraph: '',
    section3Highlight: '',
    section3ImageUrl: '',
    valuesTitle: '',
    valuesParagraph: '',
    values: [
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ],
    closingParagraph: '',
  })

  const s1InputRef = useRef<HTMLInputElement | null>(null)
  const s2InputRef = useRef<HTMLInputElement | null>(null)
  const s3InputRef = useRef<HTMLInputElement | null>(null)
  const [s1File, setS1File] = useState<File | null>(null)
  const [s1Preview, setS1Preview] = useState<string | null>(null)
  const [s2File, setS2File] = useState<File | null>(null)
  const [s2Preview, setS2Preview] = useState<string | null>(null)
  const [s3File, setS3File] = useState<File | null>(null)
  const [s3Preview, setS3Preview] = useState<string | null>(null)

  // İş Etiği form state
  const [ethicsForm, setEthicsForm] = useState({
    heroTitle: '',
    content: '',
    contactTitle: '',
    contactDescription: '',
    contactEmail: '',
    contactPhone: '',
    contactAddress: '',
    contactMapUrl: '',
  })

  useEffect(() => {
    if (activeTab === 'ikPolitikamiz') {
      ;(async () => {
        try {
          setLoadingHR(true)
          const res = await fetch('/api/admin/human-resources-policy')
          if (!res.ok) return
          const data = await res.json()
          if (!data) return
          const formData = {
            heroTitle: data.heroTitle || '',
            heroSubtitle: data.heroSubtitle || '',
            section1Title: data.section1Title || '',
            section1Paragraph: data.section1Paragraph || '',
            section1ImageUrl: data.section1ImageUrl || '',
            section2Title: data.section2Title || '',
            section2Paragraph: data.section2Paragraph || '',
            section2ImageUrl: data.section2ImageUrl || '',
            section3Title: data.section3Title || '',
            section3Paragraph: data.section3Paragraph || '',
            section3Highlight: data.section3Highlight || '',
            section3ImageUrl: data.section3ImageUrl || '',
            valuesTitle: data.valuesTitle || '',
            valuesParagraph: data.valuesParagraph || '',
            values: Array.isArray(data.values) && data.values.length > 0 ? data.values : [
              { title: '', description: '' },
              { title: '', description: '' },
              { title: '', description: '' },
            ],
            closingParagraph: data.closingParagraph || '',
          }
          setHrForm(formData)
          if (data.section1ImageUrl) setS1Preview(data.section1ImageUrl)
          if (data.section2ImageUrl) setS2Preview(data.section2ImageUrl)
          if (data.section3ImageUrl) setS3Preview(data.section3ImageUrl)
        } finally {
          setLoadingHR(false)
        }
      })()
    } else if (activeTab === 'isEtigiKurallarimiz') {
      ;(async () => {
        try {
          setLoadingEthics(true)
          const res = await fetch('/api/admin/business-ethics-rules')
          if (!res.ok) return
          const data = await res.json()
          if (!data) return
          setEthicsForm({
            heroTitle: data.heroTitle || '',
            content: data.content || '',
            contactTitle: data.contactTitle || '',
            contactDescription: data.contactDescription || '',
            contactEmail: data.contactEmail || '',
            contactPhone: data.contactPhone || '',
            contactAddress: data.contactAddress || '',
            contactMapUrl: data.contactMapUrl || '',
          })
        } finally {
          setLoadingEthics(false)
        }
      })()
    }
  }, [activeTab])

  const uploadImage = async (file: File, folder: string) => {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('folder', folder)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    if (!res.ok) return null
    return res.json()
  }

  const handleSubmitHR = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      let s1Upload: { secure_url: string; public_id: string } | null = null
      let s2Upload: { secure_url: string; public_id: string } | null = null
      let s3Upload: { secure_url: string; public_id: string } | null = null

      if (s1File) s1Upload = await uploadImage(s1File, 'ipos-steel/hr')
      if (s2File) s2Upload = await uploadImage(s2File, 'ipos-steel/hr')
      if (s3File) s3Upload = await uploadImage(s3File, 'ipos-steel/hr')

      const payload = {
        heroTitle: hrForm.heroTitle,
        heroSubtitle: hrForm.heroSubtitle,
        section1Title: hrForm.section1Title,
        section1Paragraph: hrForm.section1Paragraph,
        section1ImageUrl: s1Upload?.secure_url || (hrForm.section1ImageUrl || undefined),
        section1ImagePublicId: s1Upload?.public_id,
        section2Title: hrForm.section2Title,
        section2Paragraph: hrForm.section2Paragraph,
        section2ImageUrl: s2Upload?.secure_url || (hrForm.section2ImageUrl || undefined),
        section2ImagePublicId: s2Upload?.public_id,
        section3Title: hrForm.section3Title,
        section3Paragraph: hrForm.section3Paragraph,
        section3Highlight: hrForm.section3Highlight || undefined,
        section3ImageUrl: s3Upload?.secure_url || (hrForm.section3ImageUrl || undefined),
        section3ImagePublicId: s3Upload?.public_id,
        valuesTitle: hrForm.valuesTitle,
        valuesParagraph: hrForm.valuesParagraph,
        values: hrForm.values,
        closingParagraph: hrForm.closingParagraph,
        isActive: true,
      }

      const res = await fetch('/api/admin/human-resources-policy', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        // Refresh preview URLs if any new uploads
        const saved = await res.json()
        setHrForm((prev) => ({
          ...prev,
          section1ImageUrl: saved.section1ImageUrl || prev.section1ImageUrl,
          section2ImageUrl: saved.section2ImageUrl || prev.section2ImageUrl,
          section3ImageUrl: saved.section3ImageUrl || prev.section3ImageUrl,
        }))
        if (saved.section1ImageUrl) setS1Preview(saved.section1ImageUrl)
        if (saved.section2ImageUrl) setS2Preview(saved.section2ImageUrl)
        if (saved.section3ImageUrl) setS3Preview(saved.section3ImageUrl)
        setS1File(null); setS2File(null); setS3File(null)
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleSubmitEthics = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const payload = {
        heroTitle: ethicsForm.heroTitle,
        content: ethicsForm.content,
        contactTitle: ethicsForm.contactTitle,
        contactDescription: ethicsForm.contactDescription,
        contactEmail: ethicsForm.contactEmail,
        contactPhone: ethicsForm.contactPhone,
        contactAddress: ethicsForm.contactAddress,
        contactMapUrl: ethicsForm.contactMapUrl,
        isActive: true,
      }

      const res = await fetch('/api/admin/business-ethics-rules', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        // Success - form data is already updated
      }
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Kariyer İşlemleri</h1>
        <p className="text-gray-600 mt-1">İK içeriklerini ve açık pozisyonları yönetin.</p>
      </div>

      <div className="mb-2 flex items-center gap-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex items-center gap-2 min-w-max [::-webkit-scrollbar]:hidden">
          <button
            onClick={() => setActiveTab('ikPolitikamiz')}
            className={`px-4 py-2 rounded-md text-sm font-medium border whitespace-nowrap ${
              activeTab === 'ikPolitikamiz' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            İnsan Kaynakları Politikamız
          </button>
          <button
            onClick={() => setActiveTab('isEtigiKurallarimiz')}
            className={`px-4 py-2 rounded-md text-sm font-medium border whitespace-nowrap ${
              activeTab === 'isEtigiKurallarimiz' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            İş Etiği Kurallarımız
          </button>
          <button
            onClick={() => setActiveTab('ucretYanHaklar')}
            className={`px-4 py-2 rounded-md text-sm font-medium border whitespace-nowrap ${
              activeTab === 'ucretYanHaklar' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            Ücret ve Yan Haklar Yönetimimiz
          </button>
          <button
            onClick={() => setActiveTab('kariyerFirsatlari')}
            className={`px-4 py-2 rounded-md text-sm font-medium border whitespace-nowrap ${
              activeTab === 'kariyerFirsatlari' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            Kariyer Fırsatlarımız
          </button>
          <button
            onClick={() => setActiveTab('iseAlimSüreci')}
            className={`px-4 py-2 rounded-md text-sm font-medium border whitespace-nowrap ${
              activeTab === 'iseAlimSüreci' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            İşe Alım Süreci
          </button>
          <button
            onClick={() => setActiveTab('acikPozisyonlar')}
            className={`px-4 py-2 rounded-md text-sm font-medium border whitespace-nowrap ${
              activeTab === 'acikPozisyonlar' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            Açık Pozisyonlar
          </button>
          <button
            onClick={() => setActiveTab('stajSüreci')}
            className={`px-4 py-2 rounded-md text-sm font-medium border whitespace-nowrap ${
              activeTab === 'stajSüreci' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            Staj Sürecimiz
          </button>
        </div>
      </div>

      <Separator />

      {activeTab === 'ikPolitikamiz' && (
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900">İnsan Kaynakları Politikamız</h2>
          <p className="text-gray-600 mt-1">Müşteri sayfasındaki içeriklerle uyumlu alanları doldurun.</p>

          <form onSubmit={handleSubmitHR} className="mt-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="heroTitle">Hero Başlık</Label>
                <Input id="heroTitle" value={hrForm.heroTitle} onChange={(e) => setHrForm({ ...hrForm, heroTitle: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="heroSubtitle">Hero Alt Başlık</Label>
                <Input id="heroSubtitle" value={hrForm.heroSubtitle} onChange={(e) => setHrForm({ ...hrForm, heroSubtitle: e.target.value })} />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Bölüm 1</h3>
              <div>
                <Label htmlFor="s1Title">Başlık</Label>
                <Input id="s1Title" value={hrForm.section1Title} onChange={(e) => setHrForm({ ...hrForm, section1Title: e.target.value })} required />
              </div>
              <div className="pb-8">
                <Label htmlFor="s1Paragraph">Paragraf</Label>
                <RichTextEditor
                  value={hrForm.section1Paragraph}
                  onChange={(value) => setHrForm({ ...hrForm, section1Paragraph: value })}
                  placeholder="Paragraf içeriğini girin..."
                  height={150}
                />
              </div>
              <div className="flex items-center gap-3">
                <input ref={s1InputRef} id="s1Image" type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0] || null; setS1File(f); setS1Preview(f ? URL.createObjectURL(f) : hrForm.section1ImageUrl || null) }} />
                <Button type="button" variant="outline" onClick={() => s1InputRef.current?.click()}>Bölüm 1 Görsel Seç</Button>
                {s1Preview && <span className="text-sm text-gray-600 truncate max-w-[200px]">Seçili</span>}
                {s1Preview && <img src={s1Preview} alt="Bölüm 1" className="h-16 w-16 object-cover border" />}
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Bölüm 2</h3>
              <div>
                <Label htmlFor="s2Title">Başlık</Label>
                <Input id="s2Title" value={hrForm.section2Title} onChange={(e) => setHrForm({ ...hrForm, section2Title: e.target.value })} required />
              </div>
              <div className="pb-8">
                <Label htmlFor="s2Paragraph">Paragraf</Label>
                <RichTextEditor
                  value={hrForm.section2Paragraph}
                  onChange={(value) => setHrForm({ ...hrForm, section2Paragraph: value })}
                  placeholder="Paragraf içeriğini girin..."
                  height={150}
                />
              </div>
              <div className="flex items-center gap-3">
                <input ref={s2InputRef} id="s2Image" type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0] || null; setS2File(f); setS2Preview(f ? URL.createObjectURL(f) : hrForm.section2ImageUrl || null) }} />
                <Button type="button" variant="outline" onClick={() => s2InputRef.current?.click()}>Bölüm 2 Görsel Seç</Button>
                {s2Preview && <span className="text-sm text-gray-600 truncate max-w-[200px]">Seçili</span>}
                {s2Preview && <img src={s2Preview} alt="Bölüm 2" className="h-16 w-16 object-cover border" />}
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Bölüm 3</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="s3Title">Başlık</Label>
                  <Input id="s3Title" value={hrForm.section3Title} onChange={(e) => setHrForm({ ...hrForm, section3Title: e.target.value })} required />
                </div>
                <div className="pb-8">
                  <Label htmlFor="s3Highlight">Vurgu Bloğu</Label>
                  <RichTextEditor
                    value={hrForm.section3Highlight}
                    onChange={(value) => setHrForm({ ...hrForm, section3Highlight: value })}
                    placeholder="Vurgu bloğu içeriğini girin..."
                    height={120}
                  />
                </div>
              </div>
              <div className="pb-8">
                <Label htmlFor="s3Paragraph">Paragraf</Label>
                <RichTextEditor
                  value={hrForm.section3Paragraph}
                  onChange={(value) => setHrForm({ ...hrForm, section3Paragraph: value })}
                  placeholder="Paragraf içeriğini girin..."
                  height={150}
                />
              </div>
              <div className="flex items-center gap-3">
                <input ref={s3InputRef} id="s3Image" type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0] || null; setS3File(f); setS3Preview(f ? URL.createObjectURL(f) : hrForm.section3ImageUrl || null) }} />
                <Button type="button" variant="outline" onClick={() => s3InputRef.current?.click()}>Bölüm 3 Görsel Seç</Button>
                {s3Preview && <span className="text-sm text-gray-600 truncate max-w-[200px]">Seçili</span>}
                {s3Preview && <img src={s3Preview} alt="Bölüm 3" className="h-16 w-16 object-cover border" />}
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Değerler</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {hrForm.values.map((v, idx) => (
                  <div key={idx} className="space-y-2 border p-3 rounded-md">
                    <div>
                      <Label>Başlık</Label>
                      <Input value={v.title} onChange={(e) => {
                        const arr = [...hrForm.values]
                        arr[idx] = { ...arr[idx], title: e.target.value }
                        setHrForm({ ...hrForm, values: arr })
                      }} />
                    </div>
                    <div>
                      <Label>Açıklama</Label>
                      <Input value={v.description} onChange={(e) => {
                        const arr = [...hrForm.values]
                        arr[idx] = { ...arr[idx], description: e.target.value }
                        setHrForm({ ...hrForm, values: arr })
                      }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pb-8">
                <Label>Değerler Giriş Paragrafı</Label>
                <RichTextEditor
                  value={hrForm.valuesParagraph}
                  onChange={(value) => setHrForm({ ...hrForm, valuesParagraph: value })}
                  placeholder="Değerler giriş paragrafını girin..."
                  height={120}
                />
              </div>
            </div>

            <Separator />

            <div className="pb-8">
              <Label>Kapanış Paragrafı</Label>
              <RichTextEditor
                value={hrForm.closingParagraph}
                onChange={(value) => setHrForm({ ...hrForm, closingParagraph: value })}
                placeholder="Kapanış paragrafını girin..."
                height={150}
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={isSaving || loadingHR}>{isSaving ? 'Kaydediliyor...' : 'Kaydet'}</Button>
              <Button type="button" variant="outline" disabled={isSaving || loadingHR} onClick={() => setActiveTab('ikPolitikamiz')}>İptal</Button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'isEtigiKurallarimiz' && (
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900">İş Etiği Kurallarımız</h2>
          <p className="text-gray-600 mt-1">Müşteri sayfasındaki içeriklerle uyumlu alanları doldurun.</p>

          <form onSubmit={handleSubmitEthics} className="mt-6 space-y-6">
            {/* Hero Bölümü */}
            <div>
              <Label htmlFor="ethicsHeroTitle">Hero Başlık</Label>
              <Input id="ethicsHeroTitle" value={ethicsForm.heroTitle} onChange={(e) => setEthicsForm({ ...ethicsForm, heroTitle: e.target.value })} required />
            </div>

            <Separator />

            {/* İçerik */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium mb-4">İçerik</h3>
              <div className="pb-8">
                <Label htmlFor="ethicsContent">İş Etiği Kuralları İçeriği</Label>
                <RichTextEditor
                  value={ethicsForm.content}
                  onChange={(value) => setEthicsForm({ ...ethicsForm, content: value })}
                  placeholder="İş etiği kuralları hakkında detaylı bilgileri girin..."
                  height={400}
                />
              </div>
            </div>

            <Separator />

            {/* İletişim Bilgileri */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">İletişim Bilgileri</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactTitle">Başlık</Label>
                  <Input id="contactTitle" value={ethicsForm.contactTitle} onChange={(e) => setEthicsForm({ ...ethicsForm, contactTitle: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="contactEmail">E-posta</Label>
                  <Input id="contactEmail" value={ethicsForm.contactEmail} onChange={(e) => setEthicsForm({ ...ethicsForm, contactEmail: e.target.value })} />
                </div>
              </div>
              <div>
                <Label htmlFor="contactDescription">Açıklama</Label>
                <textarea id="contactDescription" value={ethicsForm.contactDescription} onChange={(e) => setEthicsForm({ ...ethicsForm, contactDescription: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={3} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactPhone">Telefon</Label>
                  <Input id="contactPhone" value={ethicsForm.contactPhone} onChange={(e) => setEthicsForm({ ...ethicsForm, contactPhone: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="contactMapUrl">Harita URL</Label>
                  <Input id="contactMapUrl" value={ethicsForm.contactMapUrl} onChange={(e) => setEthicsForm({ ...ethicsForm, contactMapUrl: e.target.value })} />
                </div>
              </div>
              <div>
                <Label htmlFor="contactAddress">Adres</Label>
                <textarea id="contactAddress" value={ethicsForm.contactAddress} onChange={(e) => setEthicsForm({ ...ethicsForm, contactAddress: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={3} />
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={isSaving || loadingEthics}>{isSaving ? 'Kaydediliyor...' : 'Kaydet'}</Button>
              <Button type="button" variant="outline" disabled={isSaving || loadingEthics} onClick={() => setActiveTab('isEtigiKurallarimiz')}>İptal</Button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'ucretYanHaklar' && (
        <SalaryAndBenefitsManager />
      )}

      {activeTab === 'kariyerFirsatlari' && (
        <CareerOpportunitiesManager />
      )}

      {activeTab === 'iseAlimSüreci' && (
        <RecruitmentProcessManager />
      )}

      {activeTab === 'acikPozisyonlar' && (
        <JobPositionsManager />
      )}

      {activeTab === 'stajSüreci' && (
        <InternshipProcessManager />
      )}
    </div>
  )
}


