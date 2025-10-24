'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import RichTextEditor from '@/components/ui/RichTextEditor'
import { Plus, Edit, Trash2 } from 'lucide-react'
import CategoriesManager from '@/components/CategoriesManager'

interface ProductItem {
  id: string
  name: string
  description?: string
  series?: string
  material?: string
  coatingType?: string
  thickness?: string
  width?: string
  height?: string
  imageUrl?: string
  imagePublicId?: string
  generalInfo?: string
  technicalInfo?: string
  catalogId?: string
  catalog?: { id: string; title: string }
  images?: { id: string; imageUrl: string; order: number }[]
  isActive: boolean
  categoryId: string
  category?: { id: string; name: string }
  createdAt: string
  updatedAt: string
}

interface SubProductItem {
  id: string
  name: string
  imageUrl?: string
  imagePublicId?: string
  height?: string
  width?: string
  isActive: boolean
  productId: string
  product?: {
    id: string
    name: string
    category?: {
      name: string
    }
  }
  createdAt: string
  updatedAt: string
}

interface ChannelItem {
  id: string
  name: string
  imageUrl?: string
  imagePublicId?: string
  code: string
  height?: string
  width?: string
  coatingType?: string
  sheetThickness?: string
  isActive: boolean
  subProductId: string
  subProduct?: {
    id: string
    name: string
    product?: {
      id: string
      name: string
      category?: {
        name: string
      }
    }
  }
  createdAt: string
  updatedAt: string
}

export default function UrunIslemler() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [subProducts, setSubProducts] = useState<SubProductItem[]>([])
  const [channels, setChannels] = useState<ChannelItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showSubProductForm, setShowSubProductForm] = useState(false)
  const [showChannelForm, setShowChannelForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'sub-products' | 'channels'>('products')
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [catalogs, setCatalogs] = useState<{ id: string; title: string }[]>([])
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null)
  const [editingSubProduct, setEditingSubProduct] = useState<SubProductItem | null>(null)
  const [editingChannel, setEditingChannel] = useState<ChannelItem | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    series: '',
    material: '',
    coatingType: '',
    thickness: '',
    width: '',
    height: '',
    imageUrl: '',
    generalInfo: '',
    technicalInfo: '',
    catalogId: '',
    categoryId: ''
  })
  const [subProductFormData, setSubProductFormData] = useState({
    name: '',
    imageUrl: '',
    height: '',
    width: '',
    productId: ''
  })
  const [channelFormData, setChannelFormData] = useState({
    name: '',
    imageUrl: '',
    code: '',
    height: '',
    width: '',
    coatingType: '',
    sheetThickness: '',
    subProductId: ''
  })
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [subProductImage, setSubProductImage] = useState<File | null>(null)
  const [subProductImagePreview, setSubProductImagePreview] = useState<string>('')
  const [channelImage, setChannelImage] = useState<File | null>(null)
  const [channelImagePreview, setChannelImagePreview] = useState<string>('')
  const fileRef = useRef<HTMLInputElement | null>(null)
  const subProductFileRef = useRef<HTMLInputElement | null>(null)
  const channelFileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    fetchProducts()
    fetchSubProducts()
    fetchChannels()
    fetchCategories()
    fetchCatalogs()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      const data = await response.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/product-categories')
      const data = await res.json()
      setCategories(Array.isArray(data) ? data.map((c: any) => ({ id: c.id, name: c.name })) : [])
    } catch (e) {
      console.error('Kategoriler yüklenirken hata:', e)
    }
  }

  const fetchCatalogs = async () => {
    try {
      const res = await fetch('/api/admin/catalogs')
      const data = await res.json()
      setCatalogs(Array.isArray(data) ? data.map((c: any) => ({ id: c.id, title: c.title })) : [])
    } catch (e) {
      console.error('Kataloglar yüklenirken hata:', e)
    }
  }

  const fetchSubProducts = async () => {
    try {
      const response = await fetch('/api/admin/sub-products')
      const data = await response.json()
      setSubProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Alt ürünler yüklenirken hata:', error)
    }
  }

  const fetchChannels = async () => {
    try {
      const response = await fetch('/api/admin/channels')
      const data = await response.json()
      setChannels(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Kanallar yüklenirken hata:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingProduct 
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products'
      
      const method = editingProduct ? 'PUT' : 'POST'
      
      // Çoklu görsel yükleme
      const uploadedImages: { secure_url: string; public_id: string }[] = []
      if (images.length > 0) {
        for (const image of images) {
          const fd = new FormData()
          fd.append('file', image)
          fd.append('folder', 'ipos-steel/products')
          const up = await fetch('/api/admin/upload', { method: 'POST', body: fd })
          if (up.ok) {
            const upload = await up.json()
            uploadedImages.push(upload)
          }
        }
      }

      const payload: any = {
        ...formData,
        images: uploadedImages.map((img, index) => ({
          imageUrl: img.secure_url,
          imagePublicId: img.public_id,
          order: index
        }))
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        fetchProducts()
        resetForm()
      }
    } catch (error) {
      console.error('Ürün kaydedilirken hata:', error)
    }
  }

  const handleEdit = (product: ProductItem) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description || '',
      series: product.series || '',
      material: product.material || '',
      coatingType: product.coatingType || '',
      thickness: product.thickness || '',
      width: product.width || '',
      height: product.height || '',
      imageUrl: product.imageUrl || '',
      generalInfo: product.generalInfo || '',
      technicalInfo: product.technicalInfo || '',
      catalogId: product.catalogId || '',
      categoryId: product.categoryId
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/admin/products/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          fetchProducts()
        }
      } catch (error) {
        console.error('Ürün silinirken hata:', error)
      }
    }
  }

  const handleSubProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingSubProduct 
        ? `/api/admin/sub-products/${editingSubProduct.id}`
        : '/api/admin/sub-products'
      
      const method = editingSubProduct ? 'PUT' : 'POST'
      
      // Resim yükleme
      let imageUrl = subProductFormData.imageUrl
      let imagePublicId = ''
      
      if (subProductImage) {
        const fd = new FormData()
        fd.append('file', subProductImage)
        fd.append('folder', 'ipos-steel/sub-products')
        const uploadResponse = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (uploadResponse.ok) {
          const upload = await uploadResponse.json()
          imageUrl = upload.secure_url
          imagePublicId = upload.public_id
        }
      }

      const payload = {
        ...subProductFormData,
        imageUrl,
        imagePublicId
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        fetchSubProducts()
        resetSubProductForm()
      }
    } catch (error) {
      console.error('Alt ürün kaydedilirken hata:', error)
    }
  }

  const handleSubProductEdit = (subProduct: SubProductItem) => {
    setEditingSubProduct(subProduct)
    setSubProductFormData({
      name: subProduct.name,
      imageUrl: subProduct.imageUrl || '',
      height: subProduct.height || '',
      width: subProduct.width || '',
      productId: subProduct.productId
    })
    setSubProductImagePreview(subProduct.imageUrl || '')
    setShowSubProductForm(true)
  }

  const handleSubProductDelete = async (id: string) => {
    if (confirm('Bu alt ürünü silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/admin/sub-products/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          fetchSubProducts()
        }
      } catch (error) {
        console.error('Alt ürün silinirken hata:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      series: '',
      material: '',
      coatingType: '',
      thickness: '',
      width: '',
      height: '',
      imageUrl: '',
      generalInfo: '',
      technicalInfo: '',
      catalogId: '',
      categoryId: ''
    })
    setImages([])
    setImagePreviews([])
    setEditingProduct(null)
    setShowForm(false)
  }

  const resetSubProductForm = () => {
    setSubProductFormData({
      name: '',
      imageUrl: '',
      height: '',
      width: '',
      productId: ''
    })
    setSubProductImage(null)
    setSubProductImagePreview('')
    setEditingSubProduct(null)
    setShowSubProductForm(false)
  }

  const handleChannelSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingChannel 
        ? `/api/admin/channels/${editingChannel.id}`
        : '/api/admin/channels'
      
      const method = editingChannel ? 'PUT' : 'POST'
      
      // Resim yükleme
      let imageUrl = channelFormData.imageUrl
      let imagePublicId = ''
      
      if (channelImage) {
        const fd = new FormData()
        fd.append('file', channelImage)
        fd.append('folder', 'ipos-steel/channels')
        const uploadResponse = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (uploadResponse.ok) {
          const upload = await uploadResponse.json()
          imageUrl = upload.secure_url
          imagePublicId = upload.public_id
        }
      }

      const payload = {
        ...channelFormData,
        imageUrl,
        imagePublicId
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        fetchChannels()
        resetChannelForm()
      }
    } catch (error) {
      console.error('Kanal kaydedilirken hata:', error)
    }
  }

  const handleChannelEdit = (channel: ChannelItem) => {
    setEditingChannel(channel)
    setChannelFormData({
      name: channel.name,
      imageUrl: channel.imageUrl || '',
      code: channel.code,
      height: channel.height || '',
      width: channel.width || '',
      coatingType: channel.coatingType || '',
      sheetThickness: channel.sheetThickness || '',
      subProductId: channel.subProductId
    })
    setChannelImagePreview(channel.imageUrl || '')
    setShowChannelForm(true)
  }

  const handleChannelDelete = async (id: string) => {
    if (confirm('Bu kanalı silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/admin/channels/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          fetchChannels()
        }
      } catch (error) {
        console.error('Kanal silinirken hata:', error)
      }
    }
  }

  const resetChannelForm = () => {
    setChannelFormData({
      name: '',
      imageUrl: '',
      code: '',
      height: '',
      width: '',
      coatingType: '',
      sheetThickness: '',
      subProductId: ''
    })
    setChannelImage(null)
    setChannelImagePreview('')
    setEditingChannel(null)
    setShowChannelForm(false)
  }

  if (loading) {
    return <div className="p-8"><div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" /><div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" /><div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" /></div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Ürün İşlemleri
        </h1>
        <p className="text-gray-600">
          Ürün içeriklerini yönetin
        </p>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            activeTab === 'products' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
          }`}
        >
          Ürünler
        </button>
        <button
          onClick={() => setActiveTab('sub-products')}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            activeTab === 'sub-products' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
          }`}
        >
          Alt Ürünler
        </button>
        <button
          onClick={() => setActiveTab('channels')}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            activeTab === 'channels' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
          }`}
        >
          Kanallar
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            activeTab === 'categories' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
          }`}
        >
          Kategoriler
        </button>
      </div>

      {activeTab === 'products' && (
        <>
          <div className="mb-8">
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              {showForm ? 'Formu Gizle' : 'Yeni Ürün Ekle'}
            </Button>
          </div>

          {showForm && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                {editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Ürün Adı *</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            
            <div>
              <Label htmlFor="categoryId">Kategori *</Label>
              <select id="categoryId" className="w-full border rounded-md h-10 px-3"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                required>
                <option value="" disabled>Seçiniz</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="description">Ürün Açıklaması</Label>
              <textarea 
                id="description" 
                value={formData.description} 
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded-md px-3 py-2 min-h-[100px] resize-none"
                placeholder="Ürün hakkında kısa açıklama..."
              />
            </div>

            <div>
              <Label htmlFor="catalogId">Katalog</Label>
              <select id="catalogId" className="w-full border rounded-md h-10 px-3"
                value={formData.catalogId}
                onChange={(e) => setFormData({ ...formData, catalogId: e.target.value })}>
                <option value="">Katalog seçiniz (opsiyonel)</option>
                {catalogs.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="generalInfo">Genel Bilgi</Label>
              <RichTextEditor
                value={formData.generalInfo}
                onChange={(value) => setFormData({ ...formData, generalInfo: value })}
                placeholder="Ürünün genel özellikleri ve kullanım alanları..."
                height={150}
              />
            </div>

            <div>
              <Label htmlFor="technicalInfo">Teknik Bilgi</Label>
              <RichTextEditor
                value={formData.technicalInfo}
                onChange={(value) => setFormData({ ...formData, technicalInfo: value })}
                placeholder="Teknik özellikler, malzeme bilgileri, standartlar..."
                height={150}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="series">Seri</Label>
                <Input id="series" value={formData.series} onChange={(e) => setFormData({ ...formData, series: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="material">Materyal</Label>
                <Input id="material" value={formData.material} onChange={(e) => setFormData({ ...formData, material: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="coatingType">Kaplama Tipi</Label>
                <Input id="coatingType" value={formData.coatingType} onChange={(e) => setFormData({ ...formData, coatingType: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="thickness">Kalınlık</Label>
                <Input id="thickness" value={formData.thickness} onChange={(e) => setFormData({ ...formData, thickness: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="width">Genişlik</Label>
                <Input id="width" value={formData.width} onChange={(e) => setFormData({ ...formData, width: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="height">Yükseklik</Label>
                <Input id="height" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })} />
              </div>
            </div>
            
            <div>
              <Label htmlFor="imageUrl">Resim URL (Opsiyonel)</Label>
              <Input id="imageUrl" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="Manuel resim URL'i girebilirsiniz" />
            </div>

            <div>
              <Label>Fotoğraflar (Birden fazla seçebilirsiniz)</Label>
              <div className="flex items-center gap-3">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    setImages(files)
                    setImagePreviews(files.map(file => URL.createObjectURL(file)))
                  }}
                />
                <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
                  Fotoğraflar Seç
                </Button>
                {images.length > 0 ? (
                  <span className="text-sm text-gray-600">{images.length} dosya seçildi</span>
                ) : (
                  <span className="text-sm text-gray-400">Dosya seçilmedi</span>
                )}
              </div>
              
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={preview} 
                        alt={`Önizleme ${index + 1}`} 
                        className="h-20 w-20 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = images.filter((_, i) => i !== index)
                          const newPreviews = imagePreviews.filter((_, i) => i !== index)
                          setImages(newImages)
                          setImagePreviews(newPreviews)
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
                <div className="flex space-x-4">
                  <Button type="submit">
                    {editingProduct ? 'Güncelle' : 'Ekle'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    İptal
                  </Button>
                </div>
              </form>
            </div>
          )}

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Ürünler</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {products.map((product) => (
            <div key={product.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  {product.category?.name && (
                    <div className="text-xs text-gray-500 mt-1">Kategori: {product.category.name}</div>
                  )}
                  {product.catalog?.title && (
                    <div className="text-xs text-blue-600 mt-1">Katalog: {product.catalog.title}</div>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                    {product.images && product.images.length > 0 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.images.length} Fotoğraf
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {(product.imageUrl || (product.images && product.images.length > 0)) && (
                <div className="mt-4">
                  {product.images && product.images.length > 0 ? (
                    <div className="flex gap-2 flex-wrap">
                      {product.images.slice(0, 3).map((img, index) => (
                        <img
                          key={img.id}
                          src={img.imageUrl}
                          alt={`${product.name} ${index + 1}`}
                          className="h-20 w-20 object-cover rounded"
                        />
                      ))}
                      {product.images.length > 3 && (
                        <div className="h-20 w-20 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                          +{product.images.length - 3}
                        </div>
                      )}
                    </div>
                  ) : product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-32 w-32 object-cover rounded"
                    />
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
        </>
      )}

      {activeTab === 'sub-products' && (
        <>
          <div className="mb-8">
            <Button onClick={() => setShowSubProductForm(!showSubProductForm)}>
              <Plus className="w-4 h-4 mr-2" />
              {showSubProductForm ? 'Formu Gizle' : 'Yeni Alt Ürün Ekle'}
            </Button>
          </div>

          {showSubProductForm && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                {editingSubProduct ? 'Alt Ürün Düzenle' : 'Yeni Alt Ürün Ekle'}
              </h2>
              <form onSubmit={handleSubProductSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="subProductName">Alt Ürün Adı *</Label>
                  <Input 
                    id="subProductName" 
                    value={subProductFormData.name} 
                    onChange={(e) => setSubProductFormData({ ...subProductFormData, name: e.target.value })} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="subProductProductId">Ana Ürün *</Label>
                  <select 
                    id="subProductProductId" 
                    className="w-full border rounded-md h-10 px-3"
                    value={subProductFormData.productId}
                    onChange={(e) => setSubProductFormData({ ...subProductFormData, productId: e.target.value })}
                    required
                  >
                    <option value="" disabled>Ana ürün seçiniz</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} {product.category?.name && `(${product.category.name})`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="subProductHeight">Yükseklik</Label>
                    <Input 
                      id="subProductHeight" 
                      value={subProductFormData.height} 
                      onChange={(e) => setSubProductFormData({ ...subProductFormData, height: e.target.value })} 
                      placeholder="Örn: 100mm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subProductWidth">Genişlik</Label>
                    <Input 
                      id="subProductWidth" 
                      value={subProductFormData.width} 
                      onChange={(e) => setSubProductFormData({ ...subProductFormData, width: e.target.value })} 
                      placeholder="Örn: 200mm"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subProductImageUrl">Resim URL (Opsiyonel)</Label>
                  <Input 
                    id="subProductImageUrl" 
                    value={subProductFormData.imageUrl} 
                    onChange={(e) => setSubProductFormData({ ...subProductFormData, imageUrl: e.target.value })} 
                    placeholder="Manuel resim URL'i girebilirsiniz" 
                  />
                </div>

                <div>
                  <Label>Alt Ürün Fotoğrafı</Label>
                  <div className="flex items-center gap-3">
                    <input
                      ref={subProductFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setSubProductImage(file)
                          setSubProductImagePreview(URL.createObjectURL(file))
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={() => subProductFileRef.current?.click()}>
                      Fotoğraf Seç
                    </Button>
                    {subProductImage ? (
                      <span className="text-sm text-gray-600">Dosya seçildi</span>
                    ) : (
                      <span className="text-sm text-gray-400">Dosya seçilmedi</span>
                    )}
                  </div>
                  
                  {subProductImagePreview && (
                    <div className="mt-4">
                      <img 
                        src={subProductImagePreview} 
                        alt="Önizleme" 
                        className="h-32 w-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <Button type="submit">
                    {editingSubProduct ? 'Güncelle' : 'Ekle'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetSubProductForm}>
                    İptal
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Alt Ürünler</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {subProducts.map((subProduct) => (
                <div key={subProduct.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{subProduct.name}</h4>
                      {subProduct.product && (
                        <div className="text-sm text-gray-500 mt-1">
                          Ana Ürün: {subProduct.product.name}
                          {subProduct.product.category?.name && ` (${subProduct.product.category.name})`}
                        </div>
                      )}
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          subProduct.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {subProduct.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                        {subProduct.height && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Y: {subProduct.height}
                          </span>
                        )}
                        {subProduct.width && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            G: {subProduct.width}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSubProductEdit(subProduct)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSubProductDelete(subProduct.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {subProduct.imageUrl && (
                    <div className="mt-4">
                      <img
                        src={subProduct.imageUrl}
                        alt={subProduct.name}
                        className="h-20 w-20 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'channels' && (
        <>
          <div className="mb-8">
            <Button onClick={() => setShowChannelForm(!showChannelForm)}>
              <Plus className="w-4 h-4 mr-2" />
              {showChannelForm ? 'Formu Gizle' : 'Yeni Kanal Ekle'}
            </Button>
          </div>

          {showChannelForm && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                {editingChannel ? 'Kanal Düzenle' : 'Yeni Kanal Ekle'}
              </h2>
              <form onSubmit={handleChannelSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="channelName">Kanal Adı *</Label>
                  <Input 
                    id="channelName" 
                    value={channelFormData.name} 
                    onChange={(e) => setChannelFormData({ ...channelFormData, name: e.target.value })} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="channelCode">Kanal Kodu *</Label>
                  <Input 
                    id="channelCode" 
                    value={channelFormData.code} 
                    onChange={(e) => setChannelFormData({ ...channelFormData, code: e.target.value })} 
                    required 
                    placeholder="Örn: UKFG-40-100"
                  />
                </div>
                
                <div>
                  <Label htmlFor="channelSubProductId">Alt Ürün *</Label>
                  <select 
                    id="channelSubProductId" 
                    className="w-full border rounded-md h-10 px-3"
                    value={channelFormData.subProductId}
                    onChange={(e) => setChannelFormData({ ...channelFormData, subProductId: e.target.value })}
                    required
                  >
                    <option value="" disabled>Alt ürün seçiniz</option>
                    {subProducts.map((subProduct) => (
                      <option key={subProduct.id} value={subProduct.id}>
                        {subProduct.name} {subProduct.product?.name && `(${subProduct.product.name})`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="channelHeight">Yükseklik</Label>
                    <Input 
                      id="channelHeight" 
                      value={channelFormData.height} 
                      onChange={(e) => setChannelFormData({ ...channelFormData, height: e.target.value })} 
                      placeholder="Örn: 40mm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="channelWidth">Genişlik</Label>
                    <Input 
                      id="channelWidth" 
                      value={channelFormData.width} 
                      onChange={(e) => setChannelFormData({ ...channelFormData, width: e.target.value })} 
                      placeholder="Örn: 100mm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="channelCoatingType">Kaplama Cinsi</Label>
                    <Input 
                      id="channelCoatingType" 
                      value={channelFormData.coatingType} 
                      onChange={(e) => setChannelFormData({ ...channelFormData, coatingType: e.target.value })} 
                      placeholder="Örn: Galvaniz"
                    />
                  </div>
                  <div>
                    <Label htmlFor="channelSheetThickness">Sac Kalınlığı</Label>
                    <Input 
                      id="channelSheetThickness" 
                      value={channelFormData.sheetThickness} 
                      onChange={(e) => setChannelFormData({ ...channelFormData, sheetThickness: e.target.value })} 
                      placeholder="Örn: 1.5mm"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="channelImageUrl">Resim URL (Opsiyonel)</Label>
                  <Input 
                    id="channelImageUrl" 
                    value={channelFormData.imageUrl} 
                    onChange={(e) => setChannelFormData({ ...channelFormData, imageUrl: e.target.value })} 
                    placeholder="Manuel resim URL'i girebilirsiniz" 
                  />
                </div>

                <div>
                  <Label>Kanal Fotoğrafı</Label>
                  <div className="flex items-center gap-3">
                    <input
                      ref={channelFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setChannelImage(file)
                          setChannelImagePreview(URL.createObjectURL(file))
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={() => channelFileRef.current?.click()}>
                      Fotoğraf Seç
                    </Button>
                    {channelImage ? (
                      <span className="text-sm text-gray-600">Dosya seçildi</span>
                    ) : (
                      <span className="text-sm text-gray-400">Dosya seçilmedi</span>
                    )}
                  </div>
                  
                  {channelImagePreview && (
                    <div className="mt-4">
                      <img 
                        src={channelImagePreview} 
                        alt="Önizleme" 
                        className="h-32 w-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <Button type="submit">
                    {editingChannel ? 'Güncelle' : 'Ekle'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetChannelForm}>
                    İptal
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Kanallar</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {channels.map((channel) => (
                <div key={channel.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{channel.name}</h4>
                      <div className="text-sm text-gray-500 mt-1">
                        <div>Kod: <span className="font-medium">{channel.code}</span></div>
                        {channel.subProduct && (
                          <div>
                            Alt Ürün: {channel.subProduct.name}
                            {channel.subProduct.product?.name && ` (${channel.subProduct.product.name})`}
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          channel.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {channel.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                        {channel.height && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Y: {channel.height}
                          </span>
                        )}
                        {channel.width && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            G: {channel.width}
                          </span>
                        )}
                        {channel.coatingType && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Kaplama: {channel.coatingType}
                          </span>
                        )}
                        {channel.sheetThickness && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Kalınlık: {channel.sheetThickness}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleChannelEdit(channel)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleChannelDelete(channel.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {channel.imageUrl && (
                    <div className="mt-4">
                      <img
                        src={channel.imageUrl}
                        alt={channel.name}
                        className="h-20 w-20 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'categories' && (
        <div className="mb-10">
          <CategoriesManager />
        </div>
      )}
    </div>
  )
}
