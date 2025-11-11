'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import RichTextEditor from '@/components/ui/RichTextEditor'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import CategoriesManager from '@/components/CategoriesManager'

interface ProductItem {
  id: string
  name: string
  description?: string
  series?: string
  material?: string
  coatingType?: string
  surfaceTreatment?: string
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

interface ModuleItem {
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

interface AccessoryItem {
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

interface CoverItem {
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

interface GesProductItem {
  id: string
  name: string
  mainImageUrl?: string
  mainImagePublicId?: string
  categoryId: string
  category?: { id: string; name: string }
  catalogId?: string
  catalog?: { id: string; title: string }
  technicalSpecs: { property: string; value: string }[]
  description1?: string
  image1Url?: string
  image1PublicId?: string
  description2?: string
  image2Url?: string
  image2PublicId?: string
  description3?: string
  image3Url?: string
  image3PublicId?: string
  bonusImage1Url?: string
  bonusImage1PublicId?: string
  bonusImage2Url?: string
  bonusImage2PublicId?: string
  bonusImage3Url?: string
  bonusImage3PublicId?: string
  bonusImage4Url?: string
  bonusImage4PublicId?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function UrunIslemler() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [subProducts, setSubProducts] = useState<SubProductItem[]>([])
  const [channels, setChannels] = useState<ChannelItem[]>([])
  const [modules, setModules] = useState<ModuleItem[]>([])
  const [accessories, setAccessories] = useState<AccessoryItem[]>([])
  const [covers, setCovers] = useState<CoverItem[]>([])
  const [gesProducts, setGesProducts] = useState<GesProductItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showSubProductForm, setShowSubProductForm] = useState(false)
  const [showChannelForm, setShowChannelForm] = useState(false)
  const [showModuleForm, setShowModuleForm] = useState(false)
  const [showAccessoryForm, setShowAccessoryForm] = useState(false)
  const [showCoverForm, setShowCoverForm] = useState(false)
  const [showGesProductForm, setShowGesProductForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'sub-products' | 'channels' | 'modules' | 'accessories' | 'covers' | 'ges-products'>('products')
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [catalogs, setCatalogs] = useState<{ id: string; title: string }[]>([])
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null)
  const [editingSubProduct, setEditingSubProduct] = useState<SubProductItem | null>(null)
  const [editingChannel, setEditingChannel] = useState<ChannelItem | null>(null)
  const [editingModule, setEditingModule] = useState<ModuleItem | null>(null)
  const [editingAccessory, setEditingAccessory] = useState<AccessoryItem | null>(null)
  const [editingCover, setEditingCover] = useState<CoverItem | null>(null)
  const [editingGesProduct, setEditingGesProduct] = useState<GesProductItem | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    series: '',
    material: '',
    coatingType: '',
    surfaceTreatment: '',
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
  const [moduleFormData, setModuleFormData] = useState({
    name: '',
    imageUrl: '',
    code: '',
    height: '',
    width: '',
    coatingType: '',
    sheetThickness: '',
    subProductId: ''
  })
  const [accessoryFormData, setAccessoryFormData] = useState({
    name: '',
    imageUrl: '',
    code: '',
    height: '',
    width: '',
    coatingType: '',
    sheetThickness: '',
    subProductId: ''
  })
  const [coverFormData, setCoverFormData] = useState({
    name: '',
    imageUrl: '',
    code: '',
    height: '',
    width: '',
    coatingType: '',
    sheetThickness: '',
    subProductId: ''
  })
  const [gesProductFormData, setGesProductFormData] = useState({
    name: '',
    mainImageUrl: '',
    categoryId: '',
    catalogId: '',
    technicalSpecs: [] as { property: string; value: string }[],
    description1: '',
    image1Url: '',
    description2: '',
    image2Url: '',
    description3: '',
    image3Url: '',
    bonusImage1Url: '',
    bonusImage2Url: '',
    bonusImage3Url: '',
    bonusImage4Url: ''
  })
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [subProductImage, setSubProductImage] = useState<File | null>(null)
  const [subProductImagePreview, setSubProductImagePreview] = useState<string>('')
  const [channelImage, setChannelImage] = useState<File | null>(null)
  const [channelImagePreview, setChannelImagePreview] = useState<string>('')
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [moduleImage, setModuleImage] = useState<File | null>(null)
  const [moduleImagePreview, setModuleImagePreview] = useState<string>('')
  const moduleFileRef = useRef<HTMLInputElement | null>(null)
  const [accessoryImage, setAccessoryImage] = useState<File | null>(null)
  const [accessoryImagePreview, setAccessoryImagePreview] = useState<string>('')
  const accessoryFileRef = useRef<HTMLInputElement | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string>('')
  const coverFileRef = useRef<HTMLInputElement | null>(null)
  const subProductFileRef = useRef<HTMLInputElement | null>(null)
  const channelFileRef = useRef<HTMLInputElement | null>(null)
  
  // GES ürünleri için image state'leri
  const [gesMainImage, setGesMainImage] = useState<File | null>(null)
  const [gesMainImagePreview, setGesMainImagePreview] = useState<string>('')
  const [gesImage1, setGesImage1] = useState<File | null>(null)
  const [gesImage1Preview, setGesImage1Preview] = useState<string>('')
  const [gesImage2, setGesImage2] = useState<File | null>(null)
  const [gesImage2Preview, setGesImage2Preview] = useState<string>('')
  const [gesImage3, setGesImage3] = useState<File | null>(null)
  const [gesImage3Preview, setGesImage3Preview] = useState<string>('')
  const gesMainFileRef = useRef<HTMLInputElement | null>(null)
  const gesImage1FileRef = useRef<HTMLInputElement | null>(null)
  const gesImage2FileRef = useRef<HTMLInputElement | null>(null)
  const gesImage3FileRef = useRef<HTMLInputElement | null>(null)
  
  // Bonus fotoğraflar için state'ler
  const [gesBonusImage1, setGesBonusImage1] = useState<File | null>(null)
  const [gesBonusImage1Preview, setGesBonusImage1Preview] = useState<string>('')
  const [gesBonusImage2, setGesBonusImage2] = useState<File | null>(null)
  const [gesBonusImage2Preview, setGesBonusImage2Preview] = useState<string>('')
  const [gesBonusImage3, setGesBonusImage3] = useState<File | null>(null)
  const [gesBonusImage3Preview, setGesBonusImage3Preview] = useState<string>('')
  const [gesBonusImage4, setGesBonusImage4] = useState<File | null>(null)
  const [gesBonusImage4Preview, setGesBonusImage4Preview] = useState<string>('')
  const gesBonusImage1FileRef = useRef<HTMLInputElement | null>(null)
  const gesBonusImage2FileRef = useRef<HTMLInputElement | null>(null)
  const gesBonusImage3FileRef = useRef<HTMLInputElement | null>(null)
  const gesBonusImage4FileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    fetchProducts()
    fetchSubProducts()
    fetchChannels()
    fetchModules()
    fetchAccessories()
    fetchCovers()
    fetchGesProducts()
    fetchCategories()
    fetchCatalogs()
  }, [])

  // ESC tuşu ile modal'ı kapatma ve body scroll kontrolü
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showForm) {
        resetForm()
      }
    }

    if (showForm) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [showForm])

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

  const fetchModules = async () => {
    try {
      const response = await fetch('/api/admin/modules')
      const data = await response.json()
      setModules(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Modüller yüklenirken hata:', error)
    }
  }

  const fetchAccessories = async () => {
    try {
      const response = await fetch('/api/admin/accessories')
      const data = await response.json()
      setAccessories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Aksesuarlar yüklenirken hata:', error)
    }
  }

  const fetchCovers = async () => {
    try {
      const response = await fetch('/api/admin/covers')
      const data = await response.json()
      setCovers(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Kapaklar yüklenirken hata:', error)
    }
  }

  const fetchGesProducts = async () => {
    try {
      const response = await fetch('/api/admin/ges-products')
      const data = await response.json()
      setGesProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('GES ürünleri yüklenirken hata:', error)
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
      surfaceTreatment: product.surfaceTreatment || '',
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
      surfaceTreatment: '',
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

  const handleModuleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingModule 
        ? `/api/admin/modules/${editingModule.id}`
        : '/api/admin/modules'
      
      const method = editingModule ? 'PUT' : 'POST'
      
      // Resim yükleme
      let imageUrl = moduleFormData.imageUrl
      let imagePublicId = ''
      
      if (moduleImage) {
        const fd = new FormData()
        fd.append('file', moduleImage)
        fd.append('folder', 'ipos-steel/modules')
        const uploadResponse = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (uploadResponse.ok) {
          const upload = await uploadResponse.json()
          imageUrl = upload.secure_url
          imagePublicId = upload.public_id
        }
      }

      const payload = {
        ...moduleFormData,
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
        fetchModules()
        resetModuleForm()
      }
    } catch (error) {
      console.error('Modül kaydedilirken hata:', error)
    }
  }

  const handleModuleEdit = (module: ModuleItem) => {
    setEditingModule(module)
    setModuleFormData({
      name: module.name,
      imageUrl: module.imageUrl || '',
      code: module.code,
      height: module.height || '',
      width: module.width || '',
      coatingType: module.coatingType || '',
      sheetThickness: module.sheetThickness || '',
      subProductId: module.subProductId
    })
    setModuleImagePreview(module.imageUrl || '')
    setShowModuleForm(true)
  }

  const handleModuleDelete = async (id: string) => {
    if (confirm('Bu modülü silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/admin/modules/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          fetchModules()
        }
      } catch (error) {
        console.error('Modül silinirken hata:', error)
      }
    }
  }

  const resetModuleForm = () => {
    setModuleFormData({
      name: '',
      imageUrl: '',
      code: '',
      height: '',
      width: '',
      coatingType: '',
      sheetThickness: '',
      subProductId: ''
    })
    setModuleImage(null)
    setModuleImagePreview('')
    setEditingModule(null)
    setShowModuleForm(false)
  }

  const handleAccessorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingAccessory 
        ? `/api/admin/accessories/${editingAccessory.id}`
        : '/api/admin/accessories'
      
      const method = editingAccessory ? 'PUT' : 'POST'
      
      // Resim yükleme
      let imageUrl = accessoryFormData.imageUrl
      let imagePublicId = ''
      
      if (accessoryImage) {
        const fd = new FormData()
        fd.append('file', accessoryImage)
        fd.append('folder', 'ipos-steel/accessories')
        const uploadResponse = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (uploadResponse.ok) {
          const upload = await uploadResponse.json()
          imageUrl = upload.secure_url
          imagePublicId = upload.public_id
        }
      }

      const payload = {
        ...accessoryFormData,
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
        fetchAccessories()
        resetAccessoryForm()
      }
    } catch (error) {
      console.error('Aksesuar kaydedilirken hata:', error)
    }
  }

  const handleAccessoryEdit = (accessory: AccessoryItem) => {
    setEditingAccessory(accessory)
    setAccessoryFormData({
      name: accessory.name,
      imageUrl: accessory.imageUrl || '',
      code: accessory.code,
      height: accessory.height || '',
      width: accessory.width || '',
      coatingType: accessory.coatingType || '',
      sheetThickness: accessory.sheetThickness || '',
      subProductId: accessory.subProductId
    })
    setAccessoryImagePreview(accessory.imageUrl || '')
    setShowAccessoryForm(true)
  }

  const handleAccessoryDelete = async (id: string) => {
    if (confirm('Bu aksesuarı silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/admin/accessories/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          fetchAccessories()
        }
      } catch (error) {
        console.error('Aksesuar silinirken hata:', error)
      }
    }
  }

  const resetAccessoryForm = () => {
    setAccessoryFormData({
      name: '',
      imageUrl: '',
      code: '',
      height: '',
      width: '',
      coatingType: '',
      sheetThickness: '',
      subProductId: ''
    })
    setAccessoryImage(null)
    setAccessoryImagePreview('')
    setEditingAccessory(null)
    setShowAccessoryForm(false)
  }

  const handleCoverSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingCover 
        ? `/api/admin/covers/${editingCover.id}`
        : '/api/admin/covers'
      
      const method = editingCover ? 'PUT' : 'POST'
      
      // Resim yükleme
      let imageUrl = coverFormData.imageUrl
      let imagePublicId = ''
      
      if (coverImage) {
        const fd = new FormData()
        fd.append('file', coverImage)
        fd.append('folder', 'ipos-steel/covers')
        const uploadResponse = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (uploadResponse.ok) {
          const upload = await uploadResponse.json()
          imageUrl = upload.secure_url
          imagePublicId = upload.public_id
        }
      }

      const payload = {
        ...coverFormData,
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
        fetchCovers()
        resetCoverForm()
      }
    } catch (error) {
      console.error('Kapak kaydedilirken hata:', error)
    }
  }

  const handleCoverEdit = (cover: CoverItem) => {
    setEditingCover(cover)
    setCoverFormData({
      name: cover.name,
      imageUrl: cover.imageUrl || '',
      code: cover.code,
      height: cover.height || '',
      width: cover.width || '',
      coatingType: cover.coatingType || '',
      sheetThickness: cover.sheetThickness || '',
      subProductId: cover.subProductId
    })
    setCoverImagePreview(cover.imageUrl || '')
    setShowCoverForm(true)
  }

  const handleCoverDelete = async (id: string) => {
    if (confirm('Bu kapağı silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/admin/covers/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          fetchCovers()
        }
      } catch (error) {
        console.error('Kapak silinirken hata:', error)
      }
    }
  }

  const resetCoverForm = () => {
    setCoverFormData({
      name: '',
      imageUrl: '',
      code: '',
      height: '',
      width: '',
      coatingType: '',
      sheetThickness: '',
      subProductId: ''
    })
    setCoverImage(null)
    setCoverImagePreview('')
    setEditingCover(null)
    setShowCoverForm(false)
  }

  const handleGesProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingGesProduct 
        ? `/api/admin/ges-products/${editingGesProduct.id}`
        : '/api/admin/ges-products'
      
      const method = editingGesProduct ? 'PUT' : 'POST'
      
      // Ana resim yükleme
      let mainImageUrl = gesProductFormData.mainImageUrl
      let mainImagePublicId = ''
      
      if (gesMainImage) {
        const fd = new FormData()
        fd.append('file', gesMainImage)
        fd.append('folder', 'ipos-steel/ges-products')
        const uploadResponse = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (uploadResponse.ok) {
          const upload = await uploadResponse.json()
          mainImageUrl = upload.secure_url
          mainImagePublicId = upload.public_id
        }
      }

      // Ek resim 1 yükleme
      let image1Url = gesProductFormData.image1Url
      let image1PublicId = ''
      
      if (gesImage1) {
        const fd = new FormData()
        fd.append('file', gesImage1)
        fd.append('folder', 'ipos-steel/ges-products')
        const uploadResponse = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (uploadResponse.ok) {
          const upload = await uploadResponse.json()
          image1Url = upload.secure_url
          image1PublicId = upload.public_id
        }
      }

      // Ek resim 2 yükleme
      let image2Url = gesProductFormData.image2Url
      let image2PublicId = ''
      
      if (gesImage2) {
        const fd = new FormData()
        fd.append('file', gesImage2)
        fd.append('folder', 'ipos-steel/ges-products')
        const uploadResponse = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (uploadResponse.ok) {
          const upload = await uploadResponse.json()
          image2Url = upload.secure_url
          image2PublicId = upload.public_id
        }
      }

      // Ek resim 3 yükleme
      let image3Url = gesProductFormData.image3Url
      let image3PublicId = ''
      
      if (gesImage3) {
        const fd = new FormData()
        fd.append('file', gesImage3)
        fd.append('folder', 'ipos-steel/ges-products')
        const uploadResponse = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (uploadResponse.ok) {
          const upload = await uploadResponse.json()
          image3Url = upload.secure_url
          image3PublicId = upload.public_id
        }
      }

      // Bonus resim 1 yükleme
      let bonusImage1Url = gesProductFormData.bonusImage1Url
      let bonusImage1PublicId = ''
      
      if (gesBonusImage1) {
        const fd = new FormData()
        fd.append('file', gesBonusImage1)
        fd.append('folder', 'ipos-steel/ges-products/bonus')
        const uploadResponse = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (uploadResponse.ok) {
          const upload = await uploadResponse.json()
          bonusImage1Url = upload.secure_url
          bonusImage1PublicId = upload.public_id
        }
      }

      // Bonus resim 2 yükleme
      let bonusImage2Url = gesProductFormData.bonusImage2Url
      let bonusImage2PublicId = ''
      
      if (gesBonusImage2) {
        const fd = new FormData()
        fd.append('file', gesBonusImage2)
        fd.append('folder', 'ipos-steel/ges-products/bonus')
        const uploadResponse = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (uploadResponse.ok) {
          const upload = await uploadResponse.json()
          bonusImage2Url = upload.secure_url
          bonusImage2PublicId = upload.public_id
        }
      }

      // Bonus resim 3 yükleme
      let bonusImage3Url = gesProductFormData.bonusImage3Url
      let bonusImage3PublicId = ''
      
      if (gesBonusImage3) {
        const fd = new FormData()
        fd.append('file', gesBonusImage3)
        fd.append('folder', 'ipos-steel/ges-products/bonus')
        const uploadResponse = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (uploadResponse.ok) {
          const upload = await uploadResponse.json()
          bonusImage3Url = upload.secure_url
          bonusImage3PublicId = upload.public_id
        }
      }

      // Bonus resim 4 yükleme
      let bonusImage4Url = gesProductFormData.bonusImage4Url
      let bonusImage4PublicId = ''
      
      if (gesBonusImage4) {
        const fd = new FormData()
        fd.append('file', gesBonusImage4)
        fd.append('folder', 'ipos-steel/ges-products/bonus')
        const uploadResponse = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (uploadResponse.ok) {
          const upload = await uploadResponse.json()
          bonusImage4Url = upload.secure_url
          bonusImage4PublicId = upload.public_id
        }
      }

      const payload = {
        ...gesProductFormData,
        mainImageUrl,
        mainImagePublicId,
        image1Url,
        image1PublicId,
        image2Url,
        image2PublicId,
        image3Url,
        image3PublicId,
        bonusImage1Url,
        bonusImage1PublicId,
        bonusImage2Url,
        bonusImage2PublicId,
        bonusImage3Url,
        bonusImage3PublicId,
        bonusImage4Url,
        bonusImage4PublicId
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        fetchGesProducts()
        resetGesProductForm()
      }
    } catch (error) {
      console.error('GES ürünü kaydedilirken hata:', error)
    }
  }

  const handleGesProductEdit = (gesProduct: GesProductItem) => {
    setEditingGesProduct(gesProduct)
    setGesProductFormData({
      name: gesProduct.name,
      mainImageUrl: gesProduct.mainImageUrl || '',
      categoryId: gesProduct.categoryId,
      catalogId: gesProduct.catalogId || '',
      technicalSpecs: gesProduct.technicalSpecs || [],
      description1: gesProduct.description1 || '',
      image1Url: gesProduct.image1Url || '',
      description2: gesProduct.description2 || '',
      image2Url: gesProduct.image2Url || '',
      description3: gesProduct.description3 || '',
      image3Url: gesProduct.image3Url || '',
      bonusImage1Url: gesProduct.bonusImage1Url || '',
      bonusImage2Url: gesProduct.bonusImage2Url || '',
      bonusImage3Url: gesProduct.bonusImage3Url || '',
      bonusImage4Url: gesProduct.bonusImage4Url || ''
    })
    setGesMainImagePreview(gesProduct.mainImageUrl || '')
    setGesImage1Preview(gesProduct.image1Url || '')
    setGesImage2Preview(gesProduct.image2Url || '')
    setGesImage3Preview(gesProduct.image3Url || '')
    setGesBonusImage1Preview(gesProduct.bonusImage1Url || '')
    setGesBonusImage2Preview(gesProduct.bonusImage2Url || '')
    setGesBonusImage3Preview(gesProduct.bonusImage3Url || '')
    setGesBonusImage4Preview(gesProduct.bonusImage4Url || '')
    setShowGesProductForm(true)
  }

  const handleGesProductDelete = async (id: string) => {
    if (confirm('Bu GES ürününü silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/admin/ges-products/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          fetchGesProducts()
        }
      } catch (error) {
        console.error('GES ürünü silinirken hata:', error)
      }
    }
  }

  const resetGesProductForm = () => {
    setGesProductFormData({
      name: '',
      mainImageUrl: '',
      categoryId: '',
      catalogId: '',
      technicalSpecs: [],
      description1: '',
      image1Url: '',
      description2: '',
      image2Url: '',
      description3: '',
      image3Url: '',
      bonusImage1Url: '',
      bonusImage2Url: '',
      bonusImage3Url: '',
      bonusImage4Url: ''
    })
    setGesMainImage(null)
    setGesMainImagePreview('')
    setGesImage1(null)
    setGesImage1Preview('')
    setGesImage2(null)
    setGesImage2Preview('')
    setGesImage3(null)
    setGesImage3Preview('')
    setGesBonusImage1(null)
    setGesBonusImage1Preview('')
    setGesBonusImage2(null)
    setGesBonusImage2Preview('')
    setGesBonusImage3(null)
    setGesBonusImage3Preview('')
    setGesBonusImage4(null)
    setGesBonusImage4Preview('')
    setEditingGesProduct(null)
    setShowGesProductForm(false)
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
          onClick={() => setActiveTab('modules')}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            activeTab === 'modules' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
          }`}
        >
          Modüller
        </button>
        <button
          onClick={() => setActiveTab('accessories')}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            activeTab === 'accessories' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
          }`}
        >
          Aksesuarlar
        </button>
        <button
          onClick={() => setActiveTab('covers')}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            activeTab === 'covers' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
          }`}
        >
          Kapaklar
        </button>
        <button
          onClick={() => setActiveTab('ges-products')}
          className={`px-4 py-2 rounded-md text-sm font-medium border ${
            activeTab === 'ges-products' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'
          }`}
        >
          GES Ürünleri
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

          {/* Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={(e) => {
              if (e.target === e.currentTarget) {
                resetForm()
              }
            }}>
              <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">
                    {editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Modal Body - Scrollable */}
                <div className="overflow-y-auto flex-1 p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Ürün Adı *</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            
            <div>
              <Label htmlFor="categoryId">Kategori *</Label>
              <select id="categoryId" className="w-full border rounded-md h-10 px-3"
                value={formData.categoryId}
                onChange={(e) => {
                  const newCategoryId = e.target.value
                  const newCategory = categories.find(c => c.id === newCategoryId)
                  const categoryName = newCategory?.name || ''
                  
                  // Kategori değiştiğinde, yeni kategori yüzey işleme seçeneklerine sahip değilse surfaceTreatment'ı temizle
                  const hasSurfaceTreatmentOptions = 
                    categoryName === 'Kablo Kanalları' || 
                    categoryName === 'Kablo Merdivenleri' || 
                    categoryName === 'Trunking Kablo Kanalları' ||
                    categoryName === 'Tel Kablo Kanalları'
                  
                  setFormData({ 
                    ...formData, 
                    categoryId: newCategoryId,
                    surfaceTreatment: hasSurfaceTreatmentOptions ? formData.surfaceTreatment : ''
                  })
                }}
                required>
                <option value="" disabled>Seçiniz</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="surfaceTreatment">Yüzey İşleme</Label>
              {(() => {
                const selectedCategory = categories.find(c => c.id === formData.categoryId)
                const categoryName = selectedCategory?.name || ''
                
                // Kategoriye göre seçenekleri belirle
                let options: string[] = []
                if (categoryName === 'Kablo Kanalları' || categoryName === 'Kablo Merdivenleri' || categoryName === 'Trunking Kablo Kanalları') {
                  options = ['sıcak daldırma', 'pregalvaniz', 'boyalı']
                } else if (categoryName === 'Tel Kablo Kanalları') {
                  options = ['elektro', 'sıcak daldırma', 'boyalı']
                }
                
                // Eğer kategori seçilmemişse veya bu kategorilerden biri değilse select'i gösterme
                if (options.length === 0) {
                  return (
                    <Input 
                      id="surfaceTreatment" 
                      value={formData.surfaceTreatment} 
                      onChange={(e) => setFormData({ ...formData, surfaceTreatment: e.target.value })} 
                      placeholder="Kategori seçildiğinde seçenekler görünecek"
                      disabled
                    />
                  )
                }
                
                return (
                  <select
                    id="surfaceTreatment"
                    className="w-full border rounded-md h-10 px-3"
                    value={formData.surfaceTreatment}
                    onChange={(e) => setFormData({ ...formData, surfaceTreatment: e.target.value })}
                  >
                    <option value="">Seçiniz</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )
              })()}
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
            
                    <div className="flex space-x-4 pt-4 border-t border-gray-200">
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

      {activeTab === 'modules' && (
        <>
          <div className="mb-8">
            <Button onClick={() => setShowModuleForm(!showModuleForm)}>
              <Plus className="w-4 h-4 mr-2" />
              {showModuleForm ? 'Formu Gizle' : 'Yeni Modül Ekle'}
            </Button>
          </div>

          {showModuleForm && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                {editingModule ? 'Modül Düzenle' : 'Yeni Modül Ekle'}
              </h2>
              <form onSubmit={handleModuleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="moduleName">Modül Adı *</Label>
                  <Input 
                    id="moduleName" 
                    value={moduleFormData.name} 
                    onChange={(e) => setModuleFormData({ ...moduleFormData, name: e.target.value })} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="moduleCode">Modül Kodu *</Label>
                  <Input 
                    id="moduleCode" 
                    value={moduleFormData.code} 
                    onChange={(e) => setModuleFormData({ ...moduleFormData, code: e.target.value })} 
                    required 
                    placeholder="Örn: MOD-40-100"
                  />
                </div>
                
                <div>
                  <Label htmlFor="moduleSubProductId">Alt Ürün *</Label>
                  <select 
                    id="moduleSubProductId" 
                    className="w-full border rounded-md h-10 px-3"
                    value={moduleFormData.subProductId}
                    onChange={(e) => setModuleFormData({ ...moduleFormData, subProductId: e.target.value })}
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
                    <Label htmlFor="moduleHeight">Yükseklik</Label>
                    <Input 
                      id="moduleHeight" 
                      value={moduleFormData.height} 
                      onChange={(e) => setModuleFormData({ ...moduleFormData, height: e.target.value })} 
                      placeholder="Örn: 40mm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="moduleWidth">Genişlik</Label>
                    <Input 
                      id="moduleWidth" 
                      value={moduleFormData.width} 
                      onChange={(e) => setModuleFormData({ ...moduleFormData, width: e.target.value })} 
                      placeholder="Örn: 100mm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="moduleCoatingType">Kaplama Cinsi</Label>
                    <Input 
                      id="moduleCoatingType" 
                      value={moduleFormData.coatingType} 
                      onChange={(e) => setModuleFormData({ ...moduleFormData, coatingType: e.target.value })} 
                      placeholder="Örn: Galvaniz"
                    />
                  </div>
                  <div>
                    <Label htmlFor="moduleSheetThickness">Sac Kalınlığı</Label>
                    <Input 
                      id="moduleSheetThickness" 
                      value={moduleFormData.sheetThickness} 
                      onChange={(e) => setModuleFormData({ ...moduleFormData, sheetThickness: e.target.value })} 
                      placeholder="Örn: 1.5mm"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="moduleImageUrl">Resim URL (Opsiyonel)</Label>
                  <Input 
                    id="moduleImageUrl" 
                    value={moduleFormData.imageUrl} 
                    onChange={(e) => setModuleFormData({ ...moduleFormData, imageUrl: e.target.value })} 
                    placeholder="Manuel resim URL'i girebilirsiniz" 
                  />
                </div>

                <div>
                  <Label>Modül Fotoğrafı</Label>
                  <div className="flex items-center gap-3">
                    <input
                      ref={moduleFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setModuleImage(file)
                          setModuleImagePreview(URL.createObjectURL(file))
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={() => moduleFileRef.current?.click()}>
                      Fotoğraf Seç
                    </Button>
                    {moduleImage ? (
                      <span className="text-sm text-gray-600">Dosya seçildi</span>
                    ) : (
                      <span className="text-sm text-gray-400">Dosya seçilmedi</span>
                    )}
                  </div>
                  
                  {moduleImagePreview && (
                    <div className="mt-4">
                      <img 
                        src={moduleImagePreview} 
                        alt="Önizleme" 
                        className="h-32 w-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <Button type="submit">
                    {editingModule ? 'Güncelle' : 'Ekle'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetModuleForm}>
                    İptal
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Modüller</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {modules.map((module) => (
                <div key={module.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{module.name}</h4>
                      <div className="text-sm text-gray-500 mt-1">
                        <div>Kod: <span className="font-medium">{module.code}</span></div>
                        {module.subProduct && (
                          <div>
                            Alt Ürün: {module.subProduct.name}
                            {module.subProduct.product?.name && ` (${module.subProduct.product.name})`}
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          module.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {module.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                        {module.height && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Y: {module.height}
                          </span>
                        )}
                        {module.width && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            G: {module.width}
                          </span>
                        )}
                        {module.coatingType && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Kaplama: {module.coatingType}
                          </span>
                        )}
                        {module.sheetThickness && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Kalınlık: {module.sheetThickness}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleModuleEdit(module)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleModuleDelete(module.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {module.imageUrl && (
                    <div className="mt-4">
                      <img
                        src={module.imageUrl}
                        alt={module.name}
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

      {activeTab === 'accessories' && (
        <>
          <div className="mb-8">
            <Button onClick={() => setShowAccessoryForm(!showAccessoryForm)}>
              <Plus className="w-4 h-4 mr-2" />
              {showAccessoryForm ? 'Formu Gizle' : 'Yeni Aksesuar Ekle'}
            </Button>
          </div>

          {showAccessoryForm && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                {editingAccessory ? 'Aksesuar Düzenle' : 'Yeni Aksesuar Ekle'}
              </h2>
              <form onSubmit={handleAccessorySubmit} className="space-y-4">
                <div>
                  <Label htmlFor="accessoryName">Aksesuar Adı *</Label>
                  <Input 
                    id="accessoryName" 
                    value={accessoryFormData.name} 
                    onChange={(e) => setAccessoryFormData({ ...accessoryFormData, name: e.target.value })} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="accessoryCode">Aksesuar Kodu *</Label>
                  <Input 
                    id="accessoryCode" 
                    value={accessoryFormData.code} 
                    onChange={(e) => setAccessoryFormData({ ...accessoryFormData, code: e.target.value })} 
                    required 
                    placeholder="Örn: AKS-40-100"
                  />
                </div>
                
                <div>
                  <Label htmlFor="accessorySubProductId">Alt Ürün *</Label>
                  <select 
                    id="accessorySubProductId" 
                    className="w-full border rounded-md h-10 px-3"
                    value={accessoryFormData.subProductId}
                    onChange={(e) => setAccessoryFormData({ ...accessoryFormData, subProductId: e.target.value })}
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
                    <Label htmlFor="accessoryHeight">Yükseklik</Label>
                    <Input 
                      id="accessoryHeight" 
                      value={accessoryFormData.height} 
                      onChange={(e) => setAccessoryFormData({ ...accessoryFormData, height: e.target.value })} 
                      placeholder="Örn: 40mm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accessoryWidth">Genişlik</Label>
                    <Input 
                      id="accessoryWidth" 
                      value={accessoryFormData.width} 
                      onChange={(e) => setAccessoryFormData({ ...accessoryFormData, width: e.target.value })} 
                      placeholder="Örn: 100mm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accessoryCoatingType">Kaplama Cinsi</Label>
                    <Input 
                      id="accessoryCoatingType" 
                      value={accessoryFormData.coatingType} 
                      onChange={(e) => setAccessoryFormData({ ...accessoryFormData, coatingType: e.target.value })} 
                      placeholder="Örn: Galvaniz"
                    />
                  </div>
                  <div>
                    <Label htmlFor="accessorySheetThickness">Sac Kalınlığı</Label>
                    <Input 
                      id="accessorySheetThickness" 
                      value={accessoryFormData.sheetThickness} 
                      onChange={(e) => setAccessoryFormData({ ...accessoryFormData, sheetThickness: e.target.value })} 
                      placeholder="Örn: 1.5mm"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="accessoryImageUrl">Resim URL (Opsiyonel)</Label>
                  <Input 
                    id="accessoryImageUrl" 
                    value={accessoryFormData.imageUrl} 
                    onChange={(e) => setAccessoryFormData({ ...accessoryFormData, imageUrl: e.target.value })} 
                    placeholder="Manuel resim URL'i girebilirsiniz" 
                  />
                </div>

                <div>
                  <Label>Aksesuar Fotoğrafı</Label>
                  <div className="flex items-center gap-3">
                    <input
                      ref={accessoryFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setAccessoryImage(file)
                          setAccessoryImagePreview(URL.createObjectURL(file))
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={() => accessoryFileRef.current?.click()}>
                      Fotoğraf Seç
                    </Button>
                    {accessoryImage ? (
                      <span className="text-sm text-gray-600">Dosya seçildi</span>
                    ) : (
                      <span className="text-sm text-gray-400">Dosya seçilmedi</span>
                    )}
                  </div>
                  
                  {accessoryImagePreview && (
                    <div className="mt-4">
                      <img 
                        src={accessoryImagePreview} 
                        alt="Önizleme" 
                        className="h-32 w-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <Button type="submit">
                    {editingAccessory ? 'Güncelle' : 'Ekle'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetAccessoryForm}>
                    İptal
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Aksesuarlar</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {accessories.map((accessory) => (
                <div key={accessory.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{accessory.name}</h4>
                      <div className="text-sm text-gray-500 mt-1">
                        <div>Kod: <span className="font-medium">{accessory.code}</span></div>
                        {accessory.subProduct && (
                          <div>
                            Alt Ürün: {accessory.subProduct.name}
                            {accessory.subProduct.product?.name && ` (${accessory.subProduct.product.name})`}
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          accessory.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {accessory.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                        {accessory.height && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Y: {accessory.height}
                          </span>
                        )}
                        {accessory.width && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            G: {accessory.width}
                          </span>
                        )}
                        {accessory.coatingType && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Kaplama: {accessory.coatingType}
                          </span>
                        )}
                        {accessory.sheetThickness && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Kalınlık: {accessory.sheetThickness}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAccessoryEdit(accessory)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAccessoryDelete(accessory.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {accessory.imageUrl && (
                    <div className="mt-4">
                      <img
                        src={accessory.imageUrl}
                        alt={accessory.name}
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

      {activeTab === 'covers' && (
        <>
          <div className="mb-8">
            <Button onClick={() => setShowCoverForm(!showCoverForm)}>
              <Plus className="w-4 h-4 mr-2" />
              {showCoverForm ? 'Formu Gizle' : 'Yeni Kapak Ekle'}
            </Button>
          </div>

          {showCoverForm && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                {editingCover ? 'Kapak Düzenle' : 'Yeni Kapak Ekle'}
              </h2>
              <form onSubmit={handleCoverSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="coverName">Kapak Adı *</Label>
                  <Input 
                    id="coverName" 
                    value={coverFormData.name} 
                    onChange={(e) => setCoverFormData({ ...coverFormData, name: e.target.value })} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="coverCode">Kapak Kodu *</Label>
                  <Input 
                    id="coverCode" 
                    value={coverFormData.code} 
                    onChange={(e) => setCoverFormData({ ...coverFormData, code: e.target.value })} 
                    required 
                    placeholder="Örn: KAP-40-100"
                  />
                </div>
                
                <div>
                  <Label htmlFor="coverSubProductId">Alt Ürün *</Label>
                  <select 
                    id="coverSubProductId" 
                    className="w-full border rounded-md h-10 px-3"
                    value={coverFormData.subProductId}
                    onChange={(e) => setCoverFormData({ ...coverFormData, subProductId: e.target.value })}
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
                    <Label htmlFor="coverHeight">Yükseklik</Label>
                    <Input 
                      id="coverHeight" 
                      value={coverFormData.height} 
                      onChange={(e) => setCoverFormData({ ...coverFormData, height: e.target.value })} 
                      placeholder="Örn: 40mm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="coverWidth">Genişlik</Label>
                    <Input 
                      id="coverWidth" 
                      value={coverFormData.width} 
                      onChange={(e) => setCoverFormData({ ...coverFormData, width: e.target.value })} 
                      placeholder="Örn: 100mm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="coverCoatingType">Kaplama Cinsi</Label>
                    <Input 
                      id="coverCoatingType" 
                      value={coverFormData.coatingType} 
                      onChange={(e) => setCoverFormData({ ...coverFormData, coatingType: e.target.value })} 
                      placeholder="Örn: Galvaniz"
                    />
                  </div>
                  <div>
                    <Label htmlFor="coverSheetThickness">Sac Kalınlığı</Label>
                    <Input 
                      id="coverSheetThickness" 
                      value={coverFormData.sheetThickness} 
                      onChange={(e) => setCoverFormData({ ...coverFormData, sheetThickness: e.target.value })} 
                      placeholder="Örn: 1.5mm"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="coverImageUrl">Resim URL (Opsiyonel)</Label>
                  <Input 
                    id="coverImageUrl" 
                    value={coverFormData.imageUrl} 
                    onChange={(e) => setCoverFormData({ ...coverFormData, imageUrl: e.target.value })} 
                    placeholder="Manuel resim URL'i girebilirsiniz" 
                  />
                </div>

                <div>
                  <Label>Kapak Fotoğrafı</Label>
                  <div className="flex items-center gap-3">
                    <input
                      ref={coverFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setCoverImage(file)
                          setCoverImagePreview(URL.createObjectURL(file))
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={() => coverFileRef.current?.click()}>
                      Fotoğraf Seç
                    </Button>
                    {coverImage ? (
                      <span className="text-sm text-gray-600">Dosya seçildi</span>
                    ) : (
                      <span className="text-sm text-gray-400">Dosya seçilmedi</span>
                    )}
                  </div>
                  
                  {coverImagePreview && (
                    <div className="mt-4">
                      <img 
                        src={coverImagePreview} 
                        alt="Önizleme" 
                        className="h-32 w-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <Button type="submit">
                    {editingCover ? 'Güncelle' : 'Ekle'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetCoverForm}>
                    İptal
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Kapaklar</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {covers.map((cover) => (
                <div key={cover.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{cover.name}</h4>
                      <div className="text-sm text-gray-500 mt-1">
                        <div>Kod: <span className="font-medium">{cover.code}</span></div>
                        {cover.subProduct && (
                          <div>
                            Alt Ürün: {cover.subProduct.name}
                            {cover.subProduct.product?.name && ` (${cover.subProduct.product.name})`}
                          </div>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          cover.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {cover.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                        {cover.height && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Y: {cover.height}
                          </span>
                        )}
                        {cover.width && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            G: {cover.width}
                          </span>
                        )}
                        {cover.coatingType && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Kaplama: {cover.coatingType}
                          </span>
                        )}
                        {cover.sheetThickness && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Kalınlık: {cover.sheetThickness}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCoverEdit(cover)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCoverDelete(cover.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {cover.imageUrl && (
                    <div className="mt-4">
                      <img
                        src={cover.imageUrl}
                        alt={cover.name}
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

      {activeTab === 'ges-products' && (
        <>
          <div className="mb-8">
            <Button onClick={() => setShowGesProductForm(!showGesProductForm)}>
              <Plus className="w-4 h-4 mr-2" />
              {showGesProductForm ? 'Formu Gizle' : 'Yeni GES Ürünü Ekle'}
            </Button>
          </div>

          {showGesProductForm && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                {editingGesProduct ? 'GES Ürünü Düzenle' : 'Yeni GES Ürünü Ekle'}
              </h2>
              <form onSubmit={handleGesProductSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="gesProductName">Ürün Adı *</Label>
                  <Input 
                    id="gesProductName" 
                    value={gesProductFormData.name} 
                    onChange={(e) => setGesProductFormData({ ...gesProductFormData, name: e.target.value })} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="gesProductCategoryId">Kategori *</Label>
                  <select 
                    id="gesProductCategoryId" 
                    className="w-full border rounded-md h-10 px-3"
                    value={gesProductFormData.categoryId}
                    onChange={(e) => setGesProductFormData({ ...gesProductFormData, categoryId: e.target.value })}
                    required
                  >
                    <option value="" disabled>Kategori seçiniz</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="gesProductCatalogId">Katalog</Label>
                  <select 
                    id="gesProductCatalogId" 
                    className="w-full border rounded-md h-10 px-3"
                    value={gesProductFormData.catalogId}
                    onChange={(e) => setGesProductFormData({ ...gesProductFormData, catalogId: e.target.value })}
                  >
                    <option value="">Katalog seçiniz (opsiyonel)</option>
                    {catalogs.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Teknik Özellikler</Label>
                  <div className="space-y-2">
                    {gesProductFormData.technicalSpecs.map((spec, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Özellik adı"
                          value={spec.property}
                          onChange={(e) => {
                            const newSpecs = [...gesProductFormData.technicalSpecs]
                            newSpecs[index].property = e.target.value
                            setGesProductFormData({ ...gesProductFormData, technicalSpecs: newSpecs })
                          }}
                        />
                        <Input
                          placeholder="Değer"
                          value={spec.value}
                          onChange={(e) => {
                            const newSpecs = [...gesProductFormData.technicalSpecs]
                            newSpecs[index].value = e.target.value
                            setGesProductFormData({ ...gesProductFormData, technicalSpecs: newSpecs })
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newSpecs = gesProductFormData.technicalSpecs.filter((_, i) => i !== index)
                            setGesProductFormData({ ...gesProductFormData, technicalSpecs: newSpecs })
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setGesProductFormData({
                          ...gesProductFormData,
                          technicalSpecs: [...gesProductFormData.technicalSpecs, { property: '', value: '' }]
                        })
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Özellik Ekle
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="gesProductMainImageUrl">Ana Fotoğraf URL (Opsiyonel)</Label>
                  <Input 
                    id="gesProductMainImageUrl" 
                    value={gesProductFormData.mainImageUrl} 
                    onChange={(e) => setGesProductFormData({ ...gesProductFormData, mainImageUrl: e.target.value })} 
                    placeholder="Manuel resim URL'i girebilirsiniz" 
                  />
                </div>

                <div>
                  <Label>Ana Fotoğraf</Label>
                  <div className="flex items-center gap-3">
                    <input
                      ref={gesMainFileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setGesMainImage(file)
                          setGesMainImagePreview(URL.createObjectURL(file))
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={() => gesMainFileRef.current?.click()}>
                      Ana Fotoğraf Seç
                    </Button>
                    {gesMainImage ? (
                      <span className="text-sm text-gray-600">Dosya seçildi</span>
                    ) : (
                      <span className="text-sm text-gray-400">Dosya seçilmedi</span>
                    )}
                  </div>
                  
                  {gesMainImagePreview && (
                    <div className="mt-4">
                      <img 
                        src={gesMainImagePreview} 
                        alt="Ana fotoğraf önizleme" 
                        className="h-32 w-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="gesProductDescription1">Açıklama Yazısı 1</Label>
                  <RichTextEditor
                    value={gesProductFormData.description1}
                    onChange={(value) => setGesProductFormData({ ...gesProductFormData, description1: value })}
                    placeholder="İlk açıklama yazısı..."
                    height={150}
                  />
                </div>

                <div>
                  <Label htmlFor="gesProductImage1Url">Fotoğraf Ek 1 URL (Opsiyonel)</Label>
                  <Input 
                    id="gesProductImage1Url" 
                    value={gesProductFormData.image1Url} 
                    onChange={(e) => setGesProductFormData({ ...gesProductFormData, image1Url: e.target.value })} 
                    placeholder="Manuel resim URL'i girebilirsiniz" 
                  />
                </div>

                <div>
                  <Label>Fotoğraf Ek 1</Label>
                  <div className="flex items-center gap-3">
                    <input
                      ref={gesImage1FileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setGesImage1(file)
                          setGesImage1Preview(URL.createObjectURL(file))
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={() => gesImage1FileRef.current?.click()}>
                      Fotoğraf Ek 1 Seç
                    </Button>
                    {gesImage1 ? (
                      <span className="text-sm text-gray-600">Dosya seçildi</span>
                    ) : (
                      <span className="text-sm text-gray-400">Dosya seçilmedi</span>
                    )}
                  </div>
                  
                  {gesImage1Preview && (
                    <div className="mt-4">
                      <img 
                        src={gesImage1Preview} 
                        alt="Fotoğraf ek 1 önizleme" 
                        className="h-32 w-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="gesProductDescription2">Açıklama Yazısı 2</Label>
                  <RichTextEditor
                    value={gesProductFormData.description2}
                    onChange={(value) => setGesProductFormData({ ...gesProductFormData, description2: value })}
                    placeholder="İkinci açıklama yazısı..."
                    height={150}
                  />
                </div>

                <div>
                  <Label htmlFor="gesProductImage2Url">Fotoğraf Ek 2 URL (Opsiyonel)</Label>
                  <Input 
                    id="gesProductImage2Url" 
                    value={gesProductFormData.image2Url} 
                    onChange={(e) => setGesProductFormData({ ...gesProductFormData, image2Url: e.target.value })} 
                    placeholder="Manuel resim URL'i girebilirsiniz" 
                  />
                </div>

                <div>
                  <Label>Fotoğraf Ek 2</Label>
                  <div className="flex items-center gap-3">
                    <input
                      ref={gesImage2FileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setGesImage2(file)
                          setGesImage2Preview(URL.createObjectURL(file))
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={() => gesImage2FileRef.current?.click()}>
                      Fotoğraf Ek 2 Seç
                    </Button>
                    {gesImage2 ? (
                      <span className="text-sm text-gray-600">Dosya seçildi</span>
                    ) : (
                      <span className="text-sm text-gray-400">Dosya seçilmedi</span>
                    )}
                  </div>
                  
                  {gesImage2Preview && (
                    <div className="mt-4">
                      <img 
                        src={gesImage2Preview} 
                        alt="Fotoğraf ek 2 önizleme" 
                        className="h-32 w-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="gesProductDescription3">Açıklama Yazısı 3</Label>
                  <RichTextEditor
                    value={gesProductFormData.description3}
                    onChange={(value) => setGesProductFormData({ ...gesProductFormData, description3: value })}
                    placeholder="Üçüncü açıklama yazısı..."
                    height={150}
                  />
                </div>

                <div>
                  <Label htmlFor="gesProductImage3Url">Fotoğraf Ek 3 URL (Opsiyonel)</Label>
                  <Input 
                    id="gesProductImage3Url" 
                    value={gesProductFormData.image3Url} 
                    onChange={(e) => setGesProductFormData({ ...gesProductFormData, image3Url: e.target.value })} 
                    placeholder="Manuel resim URL'i girebilirsiniz" 
                  />
                </div>

                <div>
                  <Label>Fotoğraf Ek 3</Label>
                  <div className="flex items-center gap-3">
                    <input
                      ref={gesImage3FileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setGesImage3(file)
                          setGesImage3Preview(URL.createObjectURL(file))
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={() => gesImage3FileRef.current?.click()}>
                      Fotoğraf Ek 3 Seç
                    </Button>
                    {gesImage3 ? (
                      <span className="text-sm text-gray-600">Dosya seçildi</span>
                    ) : (
                      <span className="text-sm text-gray-400">Dosya seçilmedi</span>
                    )}
                  </div>
                  
                  {gesImage3Preview && (
                    <div className="mt-4">
                      <img 
                        src={gesImage3Preview} 
                        alt="Fotoğraf ek 3 önizleme" 
                        className="h-32 w-32 object-cover rounded border"
                      />
                    </div>
                  )} 
                </div>

                {/* Bonus Fotoğraflar Bölümü */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Bonus Fotoğraflar</h3>
                  
                  {/* Bonus Fotoğraf 1 */}
                  <div className="mb-6">
                    <Label htmlFor="gesProductBonusImage1Url">Bonus Fotoğraf 1 URL (Opsiyonel)</Label>
                    <Input 
                      id="gesProductBonusImage1Url" 
                      value={gesProductFormData.bonusImage1Url} 
                      onChange={(e) => setGesProductFormData({ ...gesProductFormData, bonusImage1Url: e.target.value })} 
                      placeholder="Manuel resim URL'i girebilirsiniz" 
                    />
                    <div className="flex items-center gap-3 mt-2">
                      <input
                        ref={gesBonusImage1FileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setGesBonusImage1(file)
                            setGesBonusImage1Preview(URL.createObjectURL(file))
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={() => gesBonusImage1FileRef.current?.click()}>
                        Bonus Fotoğraf 1 Seç
                      </Button>
                      {gesBonusImage1Preview && (
                        <img 
                          src={gesBonusImage1Preview} 
                          alt="Bonus fotoğraf 1 önizleme" 
                          className="h-20 w-20 object-cover rounded border"
                        />
                      )}
                    </div>
                  </div>

                  {/* Bonus Fotoğraf 2 */}
                  <div className="mb-6">
                    <Label htmlFor="gesProductBonusImage2Url">Bonus Fotoğraf 2 URL (Opsiyonel)</Label>
                    <Input 
                      id="gesProductBonusImage2Url" 
                      value={gesProductFormData.bonusImage2Url} 
                      onChange={(e) => setGesProductFormData({ ...gesProductFormData, bonusImage2Url: e.target.value })} 
                      placeholder="Manuel resim URL'i girebilirsiniz" 
                    />
                    <div className="flex items-center gap-3 mt-2">
                      <input
                        ref={gesBonusImage2FileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setGesBonusImage2(file)
                            setGesBonusImage2Preview(URL.createObjectURL(file))
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={() => gesBonusImage2FileRef.current?.click()}>
                        Bonus Fotoğraf 2 Seç
                      </Button>
                      {gesBonusImage2Preview && (
                        <img 
                          src={gesBonusImage2Preview} 
                          alt="Bonus fotoğraf 2 önizleme" 
                          className="h-20 w-20 object-cover rounded border"
                        />
                      )}
                    </div>
                  </div>

                  {/* Bonus Fotoğraf 3 */}
                  <div className="mb-6">
                    <Label htmlFor="gesProductBonusImage3Url">Bonus Fotoğraf 3 URL (Opsiyonel)</Label>
                    <Input 
                      id="gesProductBonusImage3Url" 
                      value={gesProductFormData.bonusImage3Url} 
                      onChange={(e) => setGesProductFormData({ ...gesProductFormData, bonusImage3Url: e.target.value })} 
                      placeholder="Manuel resim URL'i girebilirsiniz" 
                    />
                    <div className="flex items-center gap-3 mt-2">
                      <input
                        ref={gesBonusImage3FileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setGesBonusImage3(file)
                            setGesBonusImage3Preview(URL.createObjectURL(file))
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={() => gesBonusImage3FileRef.current?.click()}>
                        Bonus Fotoğraf 3 Seç
                      </Button>
                      {gesBonusImage3Preview && (
                        <img 
                          src={gesBonusImage3Preview} 
                          alt="Bonus fotoğraf 3 önizleme" 
                          className="h-20 w-20 object-cover rounded border"
                        />
                      )}
                    </div>
                  </div>

                  {/* Bonus Fotoğraf 4 */}
                  <div className="mb-6">
                    <Label htmlFor="gesProductBonusImage4Url">Bonus Fotoğraf 4 URL (Opsiyonel)</Label>
                    <Input 
                      id="gesProductBonusImage4Url" 
                      value={gesProductFormData.bonusImage4Url} 
                      onChange={(e) => setGesProductFormData({ ...gesProductFormData, bonusImage4Url: e.target.value })} 
                      placeholder="Manuel resim URL'i girebilirsiniz" 
                    />
                    <div className="flex items-center gap-3 mt-2">
                      <input
                        ref={gesBonusImage4FileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setGesBonusImage4(file)
                            setGesBonusImage4Preview(URL.createObjectURL(file))
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={() => gesBonusImage4FileRef.current?.click()}>
                        Bonus Fotoğraf 4 Seç
                      </Button>
                      {gesBonusImage4Preview && (
                        <img 
                          src={gesBonusImage4Preview} 
                          alt="Bonus fotoğraf 4 önizleme" 
                          className="h-20 w-20 object-cover rounded border"
                        />
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button type="submit">
                    {editingGesProduct ? 'Güncelle' : 'Ekle'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetGesProductForm}>
                    İptal
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">GES Ürünleri</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {gesProducts.map((gesProduct) => (
                <div key={gesProduct.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">{gesProduct.name}</h4>
                      {gesProduct.category?.name && (
                        <div className="text-sm text-gray-500 mt-1">Kategori: {gesProduct.category.name}</div>
                      )}
                      {gesProduct.catalog?.title && (
                        <div className="text-sm text-blue-600 mt-1">Katalog: {gesProduct.catalog.title}</div>
                      )}
                      {gesProduct.technicalSpecs && gesProduct.technicalSpecs.length > 0 && (
                        <div className="text-sm text-gray-500 mt-1">
                          Teknik Özellikler: {gesProduct.technicalSpecs.length} adet
                        </div>
                      )}
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          gesProduct.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {gesProduct.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                        {gesProduct.mainImageUrl && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Ana Fotoğraf
                          </span>
                        )}
                        {gesProduct.image1Url && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Ek Fotoğraf 1
                          </span>
                        )}
                        {gesProduct.image2Url && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Ek Fotoğraf 2
                          </span>
                        )}
                        {gesProduct.image3Url && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Ek Fotoğraf 3
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGesProductEdit(gesProduct)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGesProductDelete(gesProduct.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {gesProduct.mainImageUrl && (
                    <div className="mt-4">
                      <img
                        src={gesProduct.mainImageUrl}
                        alt={gesProduct.name}
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
