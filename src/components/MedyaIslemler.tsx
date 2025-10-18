'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2 } from 'lucide-react'
import PressReleasesManager from '@/components/PressReleasesManager'
import NewsManager from '@/components/NewsManager'
import GalleryManager from '@/components/GalleryManager'
import CustomerSatisfactionManager from '@/components/CustomerSatisfactionManager'

interface CorporateMediaProduct {
  id: string
  title: string
  description?: string
  imageUrl?: string
  category: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function MedyaIslemler() {
  const [products, setProducts] = useState<CorporateMediaProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'media' | 'press' | 'news' | 'gallery' | 'surveys'>('press')
  const [editingProduct, setEditingProduct] = useState<CorporateMediaProduct | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'medya'
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      const data = await response.json()
      // Sadece medya kategorisindeki ürünleri filtrele
      const medyaProducts = data.filter((product: CorporateMediaProduct) => product.category === 'medya')
      setProducts(medyaProducts)
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingProduct 
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products'
      
      const method = editingProduct ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchProducts()
        resetForm()
      }
    } catch (error) {
      console.error('Ürün kaydedilirken hata:', error)
    }
  }

  const handleEdit = (product: CorporateMediaProduct) => {
    setEditingProduct(product)
    setFormData({
      title: product.title,
      description: product.description || '',
      imageUrl: product.imageUrl || '',
      category: product.category
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
      title: '',
      description: '',
      imageUrl: '',
      category: 'medya'
    })
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
          Medya İşlemleri
        </h1>
        <p className="text-gray-600">
          Medya içeriklerini yönetin
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex items-center gap-2">
        
        <button
          onClick={() => setActiveTab('press')}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            activeTab === 'press' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
          }`}
        >
          Basın Açıklamaları
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            activeTab === 'news' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
          }`}
        >
          Haberler
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            activeTab === 'gallery' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
          }`}
        >
          Galeri
        </button>
        <button
          onClick={() => setActiveTab('surveys')}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            activeTab === 'surveys' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
          }`}
        >
          Anket Değerlendirmeleri
        </button>
      </div>

      {activeTab === 'media' && (
        <>
          <div className="mb-8">
            
          </div>
        
          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {editingProduct ? 'Medya İçeriği Düzenle' : 'Yeni Medya İçeriği Ekle'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Başlık</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Açıklama</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="imageUrl">Resim URL</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  />
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
            </div>
            <div className="divide-y divide-gray-200">
              {products.map((product) => (
                <div key={product.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{product.title}</h4>
                      <p className="text-sm text-gray-500">{product.description}</p>
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
                        alt={product.title}
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

      {activeTab === 'press' && (
        <div className="mb-10">
          <PressReleasesManager />
        </div>
      )}

      {activeTab === 'news' && (
        <div className="mb-10">
          <NewsManager />
        </div>
      )}

      {activeTab === 'gallery' && (
        <div className="mb-10">
          <GalleryManager />
        </div>
      )}

      {activeTab === 'surveys' && (
        <div className="mb-10">
          <CustomerSatisfactionManager />
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingProduct ? 'Medya İçeriği Düzenle' : 'Yeni Medya İçeriği Ekle'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="imageUrl">Resim URL</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
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
        </div>
        <div className="divide-y divide-gray-200">
          {products.map((product) => (
            <div key={product.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900">{product.title}</h4>
                  <p className="text-sm text-gray-500">{product.description}</p>
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
                    alt={product.title}
                    className="h-32 w-32 object-cover rounded"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
