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

export default function UrunIslemler() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products')
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [catalogs, setCatalogs] = useState<{ id: string; title: string }[]>([])
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null)
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
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const fileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    fetchProducts()
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

      {activeTab === 'categories' && (
        <div className="mb-10">
          <CategoriesManager />
        </div>
      )}
    </div>
  )
}
