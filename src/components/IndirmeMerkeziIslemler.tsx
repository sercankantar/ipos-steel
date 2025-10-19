'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import { uploadImage } from '@/lib/cloudinary' // Base64 kullanacağız

type DownloadTabKey = 'katalog-brosurler' | 'el-kitaplari-montaj-kilavuzlari'

interface Category {
  id: string
  name: string
  color: string
  isActive: boolean
}

interface Catalog {
  id: string
  title: string
  description: string
  categoryId: string
  fileType: string
  fileSize: string
  fileData?: string
  fileUrl?: string
  imageUrl?: string
  pages?: number
  language: string
  version?: string
  publishDate: string
  downloadCount: number
  featured: boolean
  isActive: boolean
  category: Category
}

export default function IndirmeMerkeziIslemler() {
  const [activeTab, setActiveTab] = useState<DownloadTabKey>('katalog-brosurler')
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // Kategori yönetimi
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryColor, setNewCategoryColor] = useState('bg-slate-600 text-white')
  
  // Katalog yönetimi
  const [catalogs, setCatalogs] = useState<Catalog[]>([])
  const [catalogForm, setCatalogForm] = useState({
    title: '',
    description: '',
    categoryId: '',
    fileType: 'pdf',
    fileSize: '',
    pages: 0,
    language: 'Türkçe',
    version: '',
    publishDate: new Date().toISOString().split('T')[0],
    featured: false,
    isActive: true
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [editingCatalog, setEditingCatalog] = useState<Catalog | null>(null)

  // Sayfa ayarları
  const [pageSettings, setPageSettings] = useState({
    heroTitle: '',
    heroSubtitle: ''
  })
  const [editingSettings, setEditingSettings] = useState(false)

  // El kitabı yönetimi
  const [manualCategories, setManualCategories] = useState<Category[]>([])
  const [manuals, setManuals] = useState<Catalog[]>([])
  const [manualForm, setManualForm] = useState({
    title: '',
    description: '',
    categoryId: '',
    fileType: 'pdf',
    fileSize: '',
    pages: 0,
    language: 'Türkçe',
    version: '',
    publishDate: new Date().toISOString().split('T')[0],
    featured: false,
    isActive: true
  })
  const [selectedManualFile, setSelectedManualFile] = useState<File | null>(null)
  const [selectedManualImage, setSelectedManualImage] = useState<File | null>(null)
  const [editingManual, setEditingManual] = useState<Catalog | null>(null)

  // El kitabı sayfa ayarları
  const [manualPageSettings, setManualPageSettings] = useState({
    heroTitle: '',
    heroSubtitle: ''
  })
  const [editingManualSettings, setEditingManualSettings] = useState(false)

  // Kategorileri yükle
  useEffect(() => {
    if (activeTab === 'katalog-brosurler') {
      loadCategories()
      loadCatalogs()
      loadPageSettings()
    } else if (activeTab === 'el-kitaplari-montaj-kilavuzlari') {
      loadManualCategories()
      loadManuals()
      loadManualPageSettings()
    }
  }, [activeTab])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/catalog-categories')
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Kategoriler yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadCatalogs = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/catalogs')
      if (res.ok) {
        const data = await res.json()
        setCatalogs(data)
      }
    } catch (error) {
      console.error('Kataloglar yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadPageSettings = async () => {
    try {
      const res = await fetch('/api/admin/catalog-page-settings')
      if (res.ok) {
        const data = await res.json()
        if (data) {
          setPageSettings({
            heroTitle: data.heroTitle || '',
            heroSubtitle: data.heroSubtitle || ''
          })
        }
      }
    } catch (error) {
      console.error('Sayfa ayarları yüklenirken hata:', error)
    }
  }

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return
    
    try {
      setIsSaving(true)
      const res = await fetch('/api/admin/catalog-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName, color: newCategoryColor })
      })
      
      if (res.ok) {
        const newCategory = await res.json()
        // Kategori listesini anında güncelle
        setCategories(prev => [...prev, newCategory])
        setNewCategoryName('')
        setNewCategoryColor('bg-slate-600 text-white')
      }
    } catch (error) {
      console.error('Kategori eklenirken hata:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      console.log('Dosya yükleniyor:', file.name, 'Boyut:', file.size, 'Tip:', file.type)
      
      // Dosya boyutu kontrolü (10MB limit)
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        console.error('Dosya çok büyük:', file.size, 'bytes')
        alert('Dosya boyutu 10MB\'dan küçük olmalıdır')
        return null
      }
      
      // Base64 encoding kullan
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => {
          const base64 = reader.result as string
          console.log('Dosya base64 olarak hazırlandı, boyut:', base64.length)
          resolve(base64)
        }
        reader.onerror = () => {
          console.error('Dosya okuma hatası')
          resolve(null)
        }
        reader.readAsDataURL(file)
      })
    } catch (error) {
      console.error('Dosya yükleme hatası:', error)
      return null
    }
  }

  const handleAddCatalog = async () => {
    if (!catalogForm.title.trim() || !catalogForm.categoryId || !selectedFile) return
    
    try {
      setIsSaving(true)
      
      // Dosyayı base64'e çevir
      const fileData = await uploadFile(selectedFile)
      if (!fileData) {
        alert('Dosya yüklenemedi')
        return
      }
      
      // Görsel yükle (opsiyonel)
      let imageUrl = ''
      if (selectedImage) {
        const imageData = await uploadFile(selectedImage)
        if (imageData) {
          imageUrl = imageData
        }
      }
      
      const res = await fetch('/api/admin/catalogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...catalogForm,
          fileData,
          imageUrl,
          publishDate: new Date(catalogForm.publishDate)
        })
      })
      
      if (res.ok) {
        setCatalogForm({
          title: '',
          description: '',
          categoryId: '',
          fileType: 'pdf',
          fileSize: '',
          pages: 0,
          language: 'Türkçe',
          version: '',
          publishDate: new Date().toISOString().split('T')[0],
          featured: false,
          isActive: true
        })
        setSelectedFile(null)
        setSelectedImage(null)
        loadCatalogs()
      }
    } catch (error) {
      console.error('Katalog eklenirken hata:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteCatalog = async (id: string) => {
    if (!confirm('Bu katalogu silmek istediğinizden emin misiniz?')) return
    
    try {
      const res = await fetch(`/api/admin/catalogs?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        loadCatalogs()
      }
    } catch (error) {
      console.error('Katalog silinirken hata:', error)
    }
  }

  const handleSavePageSettings = async () => {
    if (!pageSettings.heroTitle.trim() || !pageSettings.heroSubtitle.trim()) return
    
    try {
      setIsSaving(true)
      const res = await fetch('/api/admin/catalog-page-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageSettings)
      })
      
      if (res.ok) {
        setEditingSettings(false)
        loadPageSettings()
      }
    } catch (error) {
      console.error('Sayfa ayarları kaydedilirken hata:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // El kitabı fonksiyonları
  const loadManualCategories = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/manual-categories')
      if (res.ok) {
        const data = await res.json()
        setManualCategories(data)
      }
    } catch (error) {
      console.error('El kitabı kategorileri yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadManuals = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/manuals')
      if (res.ok) {
        const data = await res.json()
        setManuals(data)
      }
    } catch (error) {
      console.error('El kitapları yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadManualPageSettings = async () => {
    try {
      const res = await fetch('/api/admin/manual-page-settings')
      if (res.ok) {
        const data = await res.json()
        if (data) {
          setManualPageSettings({
            heroTitle: data.heroTitle || '',
            heroSubtitle: data.heroSubtitle || ''
          })
        }
      }
    } catch (error) {
      console.error('El kitabı sayfa ayarları yüklenirken hata:', error)
    }
  }

  const handleAddManualCategory = async () => {
    if (!newCategoryName.trim()) return
    
    try {
      setIsSaving(true)
      const res = await fetch('/api/admin/manual-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName, color: newCategoryColor })
      })
      
      if (res.ok) {
        const newCategory = await res.json()
        // El kitabı kategori listesini anında güncelle
        setManualCategories(prev => [...prev, newCategory])
        setNewCategoryName('')
        setNewCategoryColor('bg-slate-600 text-white')
      }
    } catch (error) {
      console.error('El kitabı kategorisi eklenirken hata:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddManual = async () => {
    if (!manualForm.title.trim() || !manualForm.categoryId || !selectedManualFile) return
    
    try {
      setIsSaving(true)
      
      const fileData = await uploadFile(selectedManualFile)
      if (!fileData) {
        alert('Dosya yüklenemedi')
        return
      }
      
      let imageUrl = ''
      if (selectedManualImage) {
        const imageData = await uploadFile(selectedManualImage)
        if (imageData) {
          imageUrl = imageData
        }
      }
      
      const res = await fetch('/api/admin/manuals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...manualForm,
          fileData,
          imageUrl,
          publishDate: new Date(manualForm.publishDate)
        })
      })
      
      if (res.ok) {
        setManualForm({
          title: '',
          description: '',
          categoryId: '',
          fileType: 'pdf',
          fileSize: '',
          pages: 0,
          language: 'Türkçe',
          version: '',
          publishDate: new Date().toISOString().split('T')[0],
          featured: false,
          isActive: true
        })
        setSelectedManualFile(null)
        setSelectedManualImage(null)
        loadManuals()
      }
    } catch (error) {
      console.error('El kitabı eklenirken hata:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteManual = async (id: string) => {
    if (!confirm('Bu el kitabını silmek istediğinizden emin misiniz?')) return
    
    try {
      const res = await fetch(`/api/admin/manuals?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        loadManuals()
      }
    } catch (error) {
      console.error('El kitabı silinirken hata:', error)
    }
  }

  const handleSaveManualPageSettings = async () => {
    if (!manualPageSettings.heroTitle.trim() || !manualPageSettings.heroSubtitle.trim()) return
    
    try {
      setIsSaving(true)
      const res = await fetch('/api/admin/manual-page-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manualPageSettings)
      })
      
      if (res.ok) {
        setEditingManualSettings(false)
        loadManualPageSettings()
      }
    } catch (error) {
      console.error('El kitabı sayfa ayarları kaydedilirken hata:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleEditCatalog = (catalog: Catalog) => {
    setEditingCatalog(catalog)
    setCatalogForm({
      title: catalog.title,
      description: catalog.description,
      categoryId: catalog.categoryId,
      fileType: catalog.fileType,
      fileSize: catalog.fileSize,
      pages: catalog.pages || 0,
      language: catalog.language,
      version: catalog.version || '',
      publishDate: new Date(catalog.publishDate).toISOString().split('T')[0],
      featured: catalog.featured,
      isActive: catalog.isActive
    })
    setSelectedFile(null)
    setSelectedImage(null)
  }

  const handleUpdateCatalog = async () => {
    if (!editingCatalog || !catalogForm.title.trim() || !catalogForm.categoryId) return
    
    try {
      setIsSaving(true)
      
      const updateData: any = {
        id: editingCatalog.id,
        ...catalogForm,
        publishDate: new Date(catalogForm.publishDate)
      }
      
      // Yeni dosya yüklendiyse
      if (selectedFile) {
        const fileData = await uploadFile(selectedFile)
        if (fileData) {
          updateData.fileData = fileData
        }
      }
      
      // Yeni görsel yüklendiyse
      if (selectedImage) {
        const imageData = await uploadFile(selectedImage)
        if (imageData) {
          updateData.imageUrl = imageData
        }
      }
      
      const res = await fetch('/api/admin/catalogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      })
      
      if (res.ok) {
        setEditingCatalog(null)
        setCatalogForm({
          title: '',
          description: '',
          categoryId: '',
          fileType: 'pdf',
          fileSize: '',
          pages: 0,
          language: 'Türkçe',
          version: '',
          publishDate: new Date().toISOString().split('T')[0],
          featured: false,
          isActive: true
        })
        setSelectedFile(null)
        setSelectedImage(null)
        loadCatalogs()
      }
    } catch (error) {
      console.error('Katalog güncellenirken hata:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">İndirme Merkezi</h1>
        <p className="text-gray-600 mt-1">Katalog, broşür ve el kitaplarını yönetin.</p>
      </div>

      <div className="mb-2 flex items-center gap-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex items-center gap-2 min-w-max [::-webkit-scrollbar]:hidden">
          <button
            onClick={() => setActiveTab('katalog-brosurler')}
            className={`px-4 py-2 rounded-md text-sm font-medium border whitespace-nowrap ${
              activeTab === 'katalog-brosurler' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            Katalog & Broşürler
          </button>
          <button
            onClick={() => setActiveTab('el-kitaplari-montaj-kilavuzlari')}
            className={`px-4 py-2 rounded-md text-sm font-medium border whitespace-nowrap ${
              activeTab === 'el-kitaplari-montaj-kilavuzlari' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
            }`}
          >
            El Kitapları & Montaj Kılavuzları
          </button>
        </div>
      </div>

      <Separator />

      {activeTab === 'katalog-brosurler' && (
        <div className="space-y-6">
          {/* Sayfa Ayarları */}
          <div className="bg-white border rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Sayfa Ayarları</h2>
              <Button 
                variant="outline" 
                onClick={() => setEditingSettings(!editingSettings)}
              >
                {editingSettings ? 'İptal' : 'Düzenle'}
              </Button>
            </div>
            
            {editingSettings ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hero-title">Hero Başlık</Label>
                  <Input 
                    id="hero-title" 
                    value={pageSettings.heroTitle}
                    onChange={(e) => setPageSettings({ ...pageSettings, heroTitle: e.target.value })}
                    placeholder="Katalog & Broşürler"
                  />
                </div>
                <div>
                  <Label htmlFor="hero-subtitle">Hero Açıklama</Label>
                  <textarea 
                    id="hero-subtitle"
                    value={pageSettings.heroSubtitle}
                    onChange={(e) => setPageSettings({ ...pageSettings, heroSubtitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Ürün gamımız hakkında detaylı bilgi edinmek için..."
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleSavePageSettings} disabled={isSaving}>
                    {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
                  </Button>
                  <Button variant="outline" onClick={() => setEditingSettings(false)}>
                    İptal
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p><strong>Başlık:</strong> {pageSettings.heroTitle || 'Ayarlanmamış'}</p>
                <p><strong>Açıklama:</strong> {pageSettings.heroSubtitle || 'Ayarlanmamış'}</p>
              </div>
            )}
          </div>

          {/* Kategori Yönetimi */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Kategori Yönetimi</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="category-name">Kategori Adı</Label>
                <Input 
                  id="category-name" 
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Kategori adı girin" 
                />
              </div>
              <div>
                <Label htmlFor="category-color">Renk</Label>
                <select 
                  id="category-color"
                  value={newCategoryColor}
                  onChange={(e) => setNewCategoryColor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="bg-blue-600 text-white">Mavi</option>
                  <option value="bg-green-600 text-white">Yeşil</option>
                  <option value="bg-yellow-600 text-white">Sarı</option>
                  <option value="bg-red-600 text-white">Kırmızı</option>
                  <option value="bg-purple-600 text-white">Mor</option>
                  <option value="bg-gray-600 text-white">Gri</option>
                  <option value="bg-slate-600 text-white">Koyu Gri</option>
                </select>
              </div>
            </div>
            
            <Button onClick={handleAddCategory} disabled={isSaving || !newCategoryName.trim()}>
              {isSaving ? 'Ekleniyor...' : 'Kategori Ekle'}
            </Button>
            
            <div className="mt-4">
              <h3 className="font-medium text-gray-900 mb-2">Mevcut Kategoriler</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span 
                    key={category.id}
                    className={`px-3 py-1 rounded-full text-sm ${category.color}`}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Katalog Ekleme/Düzenleme */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editingCatalog ? 'Katalog Düzenle' : 'Katalog Ekle'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="catalog-title">Başlık</Label>
                <Input 
                  id="catalog-title" 
                  value={catalogForm.title}
                  onChange={(e) => setCatalogForm({ ...catalogForm, title: e.target.value })}
                  placeholder="Katalog başlığı girin" 
                />
              </div>
              <div>
                <Label htmlFor="catalog-category">Kategori</Label>
                <select 
                  id="catalog-category"
                  value={catalogForm.categoryId}
                  onChange={(e) => setCatalogForm({ ...catalogForm, categoryId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Kategori seçin</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="catalog-description">Açıklama</Label>
              <textarea 
                id="catalog-description"
                value={catalogForm.description}
                onChange={(e) => setCatalogForm({ ...catalogForm, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Katalog açıklaması girin"
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="catalog-file-type">Dosya Tipi</Label>
                <select 
                  id="catalog-file-type"
                  value={catalogForm.fileType}
                  onChange={(e) => setCatalogForm({ ...catalogForm, fileType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="pdf">PDF</option>
                  <option value="jpeg">JPEG</option>
                </select>
              </div>
              <div>
                <Label htmlFor="catalog-file-size">Dosya Boyutu (örn: 8.0 MB)</Label>
                <Input 
                  id="catalog-file-size" 
                  value={catalogForm.fileSize}
                  onChange={(e) => setCatalogForm({ ...catalogForm, fileSize: e.target.value })}
                  placeholder="8.0 MB" 
                />
              </div>
              <div>
                <Label htmlFor="catalog-pages">Sayfa Sayısı</Label>
                <Input 
                  id="catalog-pages" 
                  type="number"
                  value={catalogForm.pages}
                  onChange={(e) => setCatalogForm({ ...catalogForm, pages: parseInt(e.target.value) || 0 })}
                  placeholder="48" 
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="catalog-language">Dil</Label>
                <select 
                  id="catalog-language"
                  value={catalogForm.language}
                  onChange={(e) => setCatalogForm({ ...catalogForm, language: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Türkçe">Türkçe</option>
                  <option value="İngilizce">İngilizce</option>
                </select>
              </div>
              <div>
                <Label htmlFor="catalog-version">Versiyon</Label>
                <Input 
                  id="catalog-version" 
                  value={catalogForm.version}
                  onChange={(e) => setCatalogForm({ ...catalogForm, version: e.target.value })}
                  placeholder="2024.1" 
                />
              </div>
              <div>
                <Label htmlFor="catalog-publish-date">Yayın Tarihi</Label>
                <Input 
                  id="catalog-publish-date" 
                  type="date"
                  value={catalogForm.publishDate}
                  onChange={(e) => setCatalogForm({ ...catalogForm, publishDate: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="catalog-file">Dosya (PDF/JPEG)</Label>
                <Input 
                  id="catalog-file" 
                  type="file" 
                  accept=".pdf,.jpeg,.jpg"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
                {editingCatalog && !selectedFile && (
                  <p className="text-sm text-gray-500 mt-1">Mevcut dosya korunacak. Değiştirmek için yeni dosya seçin.</p>
                )}
              </div>
              <div>
                <Label htmlFor="catalog-image">Görsel</Label>
                <Input 
                  id="catalog-image" 
                  type="file" 
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                />
                {editingCatalog && !selectedImage && (
                  <p className="text-sm text-gray-500 mt-1">Mevcut görsel korunacak. Değiştirmek için yeni görsel seçin.</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  checked={catalogForm.featured}
                  onChange={(e) => setCatalogForm({ ...catalogForm, featured: e.target.checked })}
                />
                <span>Öne Çıkan</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  checked={catalogForm.isActive}
                  onChange={(e) => setCatalogForm({ ...catalogForm, isActive: e.target.checked })}
                />
                <span>Aktif</span>
              </label>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={editingCatalog ? handleUpdateCatalog : handleAddCatalog} 
                disabled={isSaving || !catalogForm.title.trim() || !catalogForm.categoryId || (!selectedFile && !editingCatalog)}
              >
                {isSaving ? 'Kaydediliyor...' : editingCatalog ? 'Güncelle' : 'Katalog Ekle'}
              </Button>
              {editingCatalog && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingCatalog(null)
                    setCatalogForm({
                      title: '',
                      description: '',
                      categoryId: '',
                      fileType: 'pdf',
                      fileSize: '',
                      pages: 0,
                      language: 'Türkçe',
                      version: '',
                      publishDate: new Date().toISOString().split('T')[0],
                      featured: false,
                      isActive: true
                    })
                    setSelectedFile(null)
                    setSelectedImage(null)
                  }}
                >
                  İptal
                </Button>
              )}
            </div>
          </div>

          {/* Katalog Listesi */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mevcut Kataloglar</h2>
            
            {loading ? (
              <p>Yükleniyor...</p>
            ) : (
              <div className="space-y-4">
                {catalogs.map((catalog) => (
                  <div key={catalog.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{catalog.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{catalog.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded text-xs ${catalog.category.color}`}>
                            {catalog.category.name}
                          </span>
                          <span>{catalog.fileSize}</span>
                          <span>{catalog.pages} sayfa</span>
                          <span>{catalog.downloadCount} indirme</span>
                          {catalog.featured && <span className="text-blue-600">Öne Çıkan</span>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditCatalog(catalog)}
                        >
                          Düzenle
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteCatalog(catalog.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Sil
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'el-kitaplari-montaj-kilavuzlari' && (
        <div className="space-y-6">
          {/* Sayfa Ayarları */}
          <div className="bg-white border rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Sayfa Ayarları</h2>
              <Button 
                variant="outline" 
                onClick={() => setEditingManualSettings(!editingManualSettings)}
              >
                {editingManualSettings ? 'İptal' : 'Düzenle'}
              </Button>
            </div>
            
            {editingManualSettings ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="manual-hero-title">Hero Başlık</Label>
                  <Input 
                    id="manual-hero-title" 
                    value={manualPageSettings.heroTitle}
                    onChange={(e) => setManualPageSettings({ ...manualPageSettings, heroTitle: e.target.value })}
                    placeholder="El Kitapları & Montaj Kılavuzları"
                  />
                </div>
                <div>
                  <Label htmlFor="manual-hero-subtitle">Hero Açıklama</Label>
                  <textarea 
                    id="manual-hero-subtitle"
                    value={manualPageSettings.heroSubtitle}
                    onChange={(e) => setManualPageSettings({ ...manualPageSettings, heroSubtitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Ürünlerimizin doğru montajı için detaylı el kitapları..."
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleSaveManualPageSettings} disabled={isSaving}>
                    {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
                  </Button>
                  <Button variant="outline" onClick={() => setEditingManualSettings(false)}>
                    İptal
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p><strong>Başlık:</strong> {manualPageSettings.heroTitle || 'Ayarlanmamış'}</p>
                <p><strong>Açıklama:</strong> {manualPageSettings.heroSubtitle || 'Ayarlanmamış'}</p>
              </div>
            )}
          </div>

          {/* Kategori Yönetimi */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Kategori Yönetimi</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="manual-category-name">Kategori Adı</Label>
                <Input 
                  id="manual-category-name" 
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Kategori adı girin" 
                />
              </div>
              <div>
                <Label htmlFor="manual-category-color">Renk</Label>
                <select 
                  id="manual-category-color"
                  value={newCategoryColor}
                  onChange={(e) => setNewCategoryColor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="bg-blue-600 text-white">Mavi</option>
                  <option value="bg-green-600 text-white">Yeşil</option>
                  <option value="bg-yellow-600 text-white">Sarı</option>
                  <option value="bg-red-600 text-white">Kırmızı</option>
                  <option value="bg-purple-600 text-white">Mor</option>
                  <option value="bg-gray-600 text-white">Gri</option>
                  <option value="bg-slate-600 text-white">Koyu Gri</option>
                </select>
              </div>
            </div>
            
            <Button onClick={handleAddManualCategory} disabled={isSaving || !newCategoryName.trim()}>
              {isSaving ? 'Ekleniyor...' : 'Kategori Ekle'}
            </Button>
            
            <div className="mt-4">
              <h3 className="font-medium text-gray-900 mb-2">Mevcut Kategoriler</h3>
              <div className="flex flex-wrap gap-2">
                {manualCategories.map((category) => (
                  <span 
                    key={category.id}
                    className={`px-3 py-1 rounded-full text-sm ${category.color}`}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* El Kitabı Ekleme */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">El Kitabı Ekle</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="manual-title">Başlık</Label>
                <Input 
                  id="manual-title" 
                  value={manualForm.title}
                  onChange={(e) => setManualForm({ ...manualForm, title: e.target.value })}
                  placeholder="El kitabı başlığı girin" 
                />
              </div>
              <div>
                <Label htmlFor="manual-category">Kategori</Label>
                <select 
                  id="manual-category"
                  value={manualForm.categoryId}
                  onChange={(e) => setManualForm({ ...manualForm, categoryId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Kategori seçin</option>
                  {manualCategories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="manual-description">Açıklama</Label>
              <textarea 
                id="manual-description"
                value={manualForm.description}
                onChange={(e) => setManualForm({ ...manualForm, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="El kitabı açıklaması girin"
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="manual-file-type">Dosya Tipi</Label>
                <select 
                  id="manual-file-type"
                  value={manualForm.fileType}
                  onChange={(e) => setManualForm({ ...manualForm, fileType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="pdf">PDF</option>
                  <option value="jpeg">JPEG</option>
                </select>
              </div>
              <div>
                <Label htmlFor="manual-file-size">Dosya Boyutu (örn: 8.0 MB)</Label>
                <Input 
                  id="manual-file-size" 
                  value={manualForm.fileSize}
                  onChange={(e) => setManualForm({ ...manualForm, fileSize: e.target.value })}
                  placeholder="8.0 MB" 
                />
              </div>
              <div>
                <Label htmlFor="manual-pages">Sayfa Sayısı</Label>
                <Input 
                  id="manual-pages" 
                  type="number"
                  value={manualForm.pages}
                  onChange={(e) => setManualForm({ ...manualForm, pages: parseInt(e.target.value) || 0 })}
                  placeholder="48" 
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="manual-file">Dosya (PDF/JPEG)</Label>
                <Input 
                  id="manual-file" 
                  type="file" 
                  accept=".pdf,.jpeg,.jpg"
                  onChange={(e) => setSelectedManualFile(e.target.files?.[0] || null)}
                />
              </div>
              <div>
                <Label htmlFor="manual-image">Görsel</Label>
                <Input 
                  id="manual-image" 
                  type="file" 
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => setSelectedManualImage(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  checked={manualForm.featured}
                  onChange={(e) => setManualForm({ ...manualForm, featured: e.target.checked })}
                />
                <span>Öne Çıkan</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  checked={manualForm.isActive}
                  onChange={(e) => setManualForm({ ...manualForm, isActive: e.target.checked })}
                />
                <span>Aktif</span>
              </label>
            </div>
            
            <Button onClick={handleAddManual} disabled={isSaving || !manualForm.title.trim() || !manualForm.categoryId || !selectedManualFile}>
              {isSaving ? 'Kaydediliyor...' : 'El Kitabı Ekle'}
            </Button>
          </div>

          {/* El Kitabı Listesi */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mevcut El Kitapları</h2>
            
            {loading ? (
              <p>Yükleniyor...</p>
            ) : (
              <div className="space-y-4">
                {manuals.map((manual) => (
                  <div key={manual.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{manual.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{manual.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded text-xs ${manual.category.color}`}>
                            {manual.category.name}
                          </span>
                          <span>{manual.fileSize}</span>
                          <span>{manual.pages} sayfa</span>
                          <span>{manual.downloadCount} indirme</span>
                          {manual.featured && <span className="text-blue-600">Öne Çıkan</span>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingManual(manual)}
                        >
                          Düzenle
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteManual(manual.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Sil
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
