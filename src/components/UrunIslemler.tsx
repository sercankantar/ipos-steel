'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
    categoryId: ''
  })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingProduct 
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products'
      
      const method = editingProduct ? 'PUT' : 'POST'
      
      // Görsel seçilmişse önce yükle
      let upload: { secure_url: string; public_id: string } | null = null
      if (image) {
        const fd = new FormData()
        fd.append('file', image)
        fd.append('folder', 'ipos-steel/products')
        const up = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (up.ok) upload = await up.json()
      }

      const payload: any = {
        ...formData,
        imageUrl: upload?.secure_url || formData.imageUrl || editingProduct?.imageUrl || '',
        imagePublicId: upload?.public_id || editingProduct?.imagePublicId || undefined,
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
      categoryId: ''
    })
    setImage(null)
    setImagePreview(null)
    setEditingProduct(null)
    setShowForm(false)
  }

  if (loading) {
    return <div className="p-8">Yükleniyor...</div>
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
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Ürün Ekle
            </Button>
          </div>

      {showForm && activeTab === 'products' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={resetForm} />
          <div className="relative bg-white p-6 rounded-lg shadow w-full max-w-2xl mx-4">
            <h2 className="text-xl font-semibold mb-4">
              {editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Ürün Adı</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="categoryId">Kategori</Label>
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
              <Label htmlFor="description">Açıklama</Label>
              <Input id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
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
              <Label htmlFor="imageUrl">Resim URL</Label>
              <Input id="imageUrl" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} />
            </div>

              <div className="flex items-center gap-3">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0] || null
                    setImage(f)
                    setImagePreview(f ? URL.createObjectURL(f) : null)
                  }}
                />
                <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
                  Fotoğraf Yükle
                </Button>
                {image ? (
                  <span className="text-sm text-gray-600 truncate max-w-[200px]">{image.name}</span>
                ) : (
                  <span className="text-sm text-gray-400">Seçili dosya yok</span>
                )}
                {imagePreview && <img src={imagePreview} alt="Önizleme" className="h-12 w-12 object-cover rounded border ml-auto" />}
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
                  <p className="text-sm text-gray-500">{product.description}</p>
                  {product.category?.name && (
                    <div className="text-xs text-gray-500 mt-1">Kategori: {product.category.name}</div>
                  )}
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.isActive ? 'Aktif' : 'Pasif'}
                    </span>
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
              {product.imageUrl && (
                <div className="mt-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-32 w-32 object-cover rounded"
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
