'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Download, FileText, Eye, X } from 'lucide-react'
import Link from 'next/link'
import { showToast } from '@/components/Toast'

function getBaseUrl() {
  return typeof window !== 'undefined' 
    ? window.location.origin 
    : 'http://localhost:3000'
}

async function getProduct(id: string) {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || getBaseUrl()
  const res = await fetch(`${base}/api/products/${id}`, { 
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  })
  if (!res.ok) return null
  return res.json()
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [subProducts, setSubProducts] = useState<any[]>([])
  const [filteredSubProducts, setFilteredSubProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('genel')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [isChannelsModalOpen, setIsChannelsModalOpen] = useState(false)
  const [selectedSubProduct, setSelectedSubProduct] = useState<any>(null)
  const [channels, setChannels] = useState<any[]>([])
  const [filteredChannels, setFilteredChannels] = useState<any[]>([])
  const [channelsLoading, setChannelsLoading] = useState(false)
  const [modules, setModules] = useState<any[]>([])
  const [filteredModules, setFilteredModules] = useState<any[]>([])
  const [modulesLoading, setModulesLoading] = useState(false)
  const [accessories, setAccessories] = useState<any[]>([])
  const [filteredAccessories, setFilteredAccessories] = useState<any[]>([])
  const [accessoriesLoading, setAccessoriesLoading] = useState(false)
  const [covers, setCovers] = useState<any[]>([])
  const [filteredCovers, setFilteredCovers] = useState<any[]>([])
  const [coversLoading, setCoversLoading] = useState(false)
  const [activeModalTab, setActiveModalTab] = useState<'channels' | 'modules' | 'accessories' | 'covers'>('channels')
  const [quoteForm, setQuoteForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    email: '',
    description: ''
  })
  const [filters, setFilters] = useState({
    heights: [] as string[],
    widths: [] as string[]
  })
  const [channelFilters, setChannelFilters] = useState({
    search: '',
    widths: [] as string[],
    coatingTypes: [] as string[],
    sheetThicknesses: [] as string[]
  })
  const [moduleFilters, setModuleFilters] = useState({
    search: '',
    widths: [] as string[],
    coatingTypes: [] as string[],
    sheetThicknesses: [] as string[]
  })
  const [accessoryFilters, setAccessoryFilters] = useState({
    search: '',
    widths: [] as string[],
    coatingTypes: [] as string[],
    sheetThicknesses: [] as string[]
  })
  const [coverFilters, setCoverFilters] = useState({
    search: '',
    widths: [] as string[],
    coatingTypes: [] as string[],
    sheetThicknesses: [] as string[]
  })
  
  // Dropdown açık/kapalı durumları
  const [channelDropdowns, setChannelDropdowns] = useState({
    width: false,
    coating: false,
    thickness: false
  })
  
  const [moduleDropdowns, setModuleDropdowns] = useState({
    width: false,
    coating: false,
    thickness: false
  })
  
  const [accessoryDropdowns, setAccessoryDropdowns] = useState({
    width: false,
    coating: false,
    thickness: false
  })
  
  const [coverDropdowns, setCoverDropdowns] = useState({
    width: false,
    coating: false,
    thickness: false
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ana ürün ve alt ürünleri paralel olarak yükle
        const [productData, subProductsResponse] = await Promise.all([
          getProduct(params.id),
          fetch(`/api/sub-products?productId=${params.id}`, {
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          })
        ])
        
        setProduct(productData)
        
        if (subProductsResponse.ok) {
          const subProductsData = await subProductsResponse.json()
          setSubProducts(subProductsData)
          setFilteredSubProducts(subProductsData)
        }
      } catch (error) {
        console.error('Veri yüklenirken hata:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [params.id])

  // Filtreleme mantığı
  useEffect(() => {
    let filtered = subProducts

    if (filters.heights.length > 0) {
      filtered = filtered.filter(subProduct => 
        subProduct.height && filters.heights.includes(subProduct.height)
      )
    }

    if (filters.widths.length > 0) {
      filtered = filtered.filter(subProduct => 
        subProduct.width && filters.widths.includes(subProduct.width)
      )
    }

    setFilteredSubProducts(filtered)
  }, [subProducts, filters])

  // Kanallar filtreleme mantığı
  useEffect(() => {
    let filtered = channels

    // Arama filtresi
    if (channelFilters.search) {
      filtered = filtered.filter(channel => 
        channel.name.toLowerCase().includes(channelFilters.search.toLowerCase()) ||
        channel.code.toLowerCase().includes(channelFilters.search.toLowerCase())
      )
    }

    // Genişlik filtresi
    if (channelFilters.widths.length > 0) {
      filtered = filtered.filter(channel => 
        channel.width && channelFilters.widths.includes(channel.width)
      )
    }

    // Kaplama cinsi filtresi
    if (channelFilters.coatingTypes.length > 0) {
      filtered = filtered.filter(channel => 
        channel.coatingType && channelFilters.coatingTypes.includes(channel.coatingType)
      )
    }

    // Sac kalınlığı filtresi
    if (channelFilters.sheetThicknesses.length > 0) {
      filtered = filtered.filter(channel => 
        channel.sheetThickness && channelFilters.sheetThicknesses.includes(channel.sheetThickness)
      )
    }

    setFilteredChannels(filtered)
  }, [channels, channelFilters])

  // Modüller filtreleme mantığı
  useEffect(() => {
    let filtered = modules

    if (moduleFilters.search) {
      filtered = filtered.filter(module => 
        module.name.toLowerCase().includes(moduleFilters.search.toLowerCase()) ||
        module.code.toLowerCase().includes(moduleFilters.search.toLowerCase())
      )
    }

    if (moduleFilters.widths.length > 0) {
      filtered = filtered.filter(module => 
        module.width && moduleFilters.widths.includes(module.width)
      )
    }

    if (moduleFilters.coatingTypes.length > 0) {
      filtered = filtered.filter(module => 
        module.coatingType && moduleFilters.coatingTypes.includes(module.coatingType)
      )
    }

    if (moduleFilters.sheetThicknesses.length > 0) {
      filtered = filtered.filter(module => 
        module.sheetThickness && moduleFilters.sheetThicknesses.includes(module.sheetThickness)
      )
    }

    setFilteredModules(filtered)
  }, [modules, moduleFilters])

  // Aksesuarlar filtreleme mantığı
  useEffect(() => {
    let filtered = accessories

    if (accessoryFilters.search) {
      filtered = filtered.filter(accessory => 
        accessory.name.toLowerCase().includes(accessoryFilters.search.toLowerCase()) ||
        accessory.code.toLowerCase().includes(accessoryFilters.search.toLowerCase())
      )
    }

    if (accessoryFilters.widths.length > 0) {
      filtered = filtered.filter(accessory => 
        accessory.width && accessoryFilters.widths.includes(accessory.width)
      )
    }

    if (accessoryFilters.coatingTypes.length > 0) {
      filtered = filtered.filter(accessory => 
        accessory.coatingType && accessoryFilters.coatingTypes.includes(accessory.coatingType)
      )
    }

    if (accessoryFilters.sheetThicknesses.length > 0) {
      filtered = filtered.filter(accessory => 
        accessory.sheetThickness && accessoryFilters.sheetThicknesses.includes(accessory.sheetThickness)
      )
    }

    setFilteredAccessories(filtered)
  }, [accessories, accessoryFilters])

  // Kapaklar filtreleme mantığı
  useEffect(() => {
    let filtered = covers

    if (coverFilters.search) {
      filtered = filtered.filter(cover => 
        cover.name.toLowerCase().includes(coverFilters.search.toLowerCase()) ||
        cover.code.toLowerCase().includes(coverFilters.search.toLowerCase())
      )
    }

    if (coverFilters.widths.length > 0) {
      filtered = filtered.filter(cover => 
        cover.width && coverFilters.widths.includes(cover.width)
      )
    }

    if (coverFilters.coatingTypes.length > 0) {
      filtered = filtered.filter(cover => 
        cover.coatingType && coverFilters.coatingTypes.includes(cover.coatingType)
      )
    }

    if (coverFilters.sheetThicknesses.length > 0) {
      filtered = filtered.filter(cover => 
        cover.sheetThickness && coverFilters.sheetThicknesses.includes(cover.sheetThickness)
      )
    }

    setFilteredCovers(filtered)
  }, [covers, coverFilters])

  // Dropdown dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      
      // Channel dropdown kontrolü
      if (channelDropdowns.width || channelDropdowns.coating || channelDropdowns.thickness) {
        if (!target.closest('.dropdown-container')) {
          setChannelDropdowns({ width: false, coating: false, thickness: false })
        }
      }
      
      // Module dropdown kontrolü
      if (moduleDropdowns.width || moduleDropdowns.coating || moduleDropdowns.thickness) {
        if (!target.closest('.dropdown-container')) {
          setModuleDropdowns({ width: false, coating: false, thickness: false })
        }
      }
      
      // Accessory dropdown kontrolü
      if (accessoryDropdowns.width || accessoryDropdowns.coating || accessoryDropdowns.thickness) {
        if (!target.closest('.dropdown-container')) {
          setAccessoryDropdowns({ width: false, coating: false, thickness: false })
        }
      }
      
      // Cover dropdown kontrolü
      if (coverDropdowns.width || coverDropdowns.coating || coverDropdowns.thickness) {
        if (!target.closest('.dropdown-container')) {
          setCoverDropdowns({ width: false, coating: false, thickness: false })
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [channelDropdowns, moduleDropdowns, accessoryDropdowns, coverDropdowns])

  // ESC tuşu ile modal'ları kapatma
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isModalOpen) {
          setIsModalOpen(false)
        } else if (isQuoteModalOpen) {
          setIsQuoteModalOpen(false)
        } else if (isChannelsModalOpen) {
          setIsChannelsModalOpen(false)
        }
      }
    }

    if (isModalOpen || isQuoteModalOpen || isChannelsModalOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Sayfa kaydırmayı engelle
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen, isQuoteModalOpen, isChannelsModalOpen])

  const handleQuoteFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setQuoteForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: product?.name,
          productId: product?.id,
          productType: 'Product',
          firstName: quoteForm.firstName,
          lastName: quoteForm.lastName,
          phone: quoteForm.phone,
          city: quoteForm.city,
          email: quoteForm.email,
          description: quoteForm.description
        })
      })

      if (response.ok) {
        showToast('Teklif talebiniz başarıyla gönderildi!', 'success')
        setIsQuoteModalOpen(false)
        setQuoteForm({
          firstName: '',
          lastName: '',
          phone: '',
          city: '',
          email: '',
          description: ''
        })
      } else {
        showToast('Teklif talebi gönderilemedi. Lütfen tekrar deneyin.', 'error')
      }
    } catch (error) {
      console.error('Teklif talebi gönderme hatası:', error)
      showToast('Teklif talebi gönderilemedi. Lütfen tekrar deneyin.', 'error')
    }
  }

  // Filtre fonksiyonları
  const toggleHeightFilter = (height: string) => {
    setFilters(prev => ({
      ...prev,
      heights: prev.heights.includes(height)
        ? prev.heights.filter(h => h !== height)
        : [...prev.heights, height]
    }))
  }

  const toggleWidthFilter = (width: string) => {
    setFilters(prev => ({
      ...prev,
      widths: prev.widths.includes(width)
        ? prev.widths.filter(w => w !== width)
        : [...prev.widths, width]
    }))
  }

  // Benzersiz yükseklik ve genişlik değerlerini al
  const uniqueHeights = Array.from(new Set(subProducts.map(sp => sp.height).filter(Boolean))).sort()
  const uniqueWidths = Array.from(new Set(subProducts.map(sp => sp.width).filter(Boolean))).sort()

  // Modal fonksiyonları
  const openChannelsModal = async (subProduct: any) => {
    setSelectedSubProduct(subProduct)
    setIsChannelsModalOpen(true)
    setActiveModalTab('channels')
    
    // Sadece aktif tab'ın verilerini yükle
    await fetchChannels(subProduct.id)
  }

  const fetchChannels = async (subProductId: string) => {
    setChannelsLoading(true)
    try {
      const response = await fetch(`/api/channels?subProductId=${subProductId}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setChannels(data)
        setFilteredChannels(data)
      }
    } catch (error) {
      console.error('Kanallar yüklenirken hata:', error)
    } finally {
      setChannelsLoading(false)
    }
  }

  const fetchModules = async (subProductId: string) => {
    setModulesLoading(true)
    try {
      const response = await fetch(`/api/modules?subProductId=${subProductId}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setModules(data)
        setFilteredModules(data)
      }
    } catch (error) {
      console.error('Modüller yüklenirken hata:', error)
    } finally {
      setModulesLoading(false)
    }
  }

  const fetchAccessories = async (subProductId: string) => {
    setAccessoriesLoading(true)
    try {
      const response = await fetch(`/api/accessories?subProductId=${subProductId}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setAccessories(data)
        setFilteredAccessories(data)
      }
    } catch (error) {
      console.error('Aksesuarlar yüklenirken hata:', error)
    } finally {
      setAccessoriesLoading(false)
    }
  }

  const fetchCovers = async (subProductId: string) => {
    setCoversLoading(true)
    try {
      const response = await fetch(`/api/covers?subProductId=${subProductId}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      if (response.ok) {
        const data = await response.json()
        setCovers(data)
        setFilteredCovers(data)
      }
    } catch (error) {
      console.error('Kapaklar yüklenirken hata:', error)
    } finally {
      setCoversLoading(false)
    }
  }

  const closeChannelsModal = () => {
    setIsChannelsModalOpen(false)
    setSelectedSubProduct(null)
    setActiveModalTab('channels')
    setChannels([])
    setFilteredChannels([])
    setModules([])
    setFilteredModules([])
    setAccessories([])
    setFilteredAccessories([])
    setCovers([])
    setFilteredCovers([])
    setChannelFilters({
      search: '',
      widths: [],
      coatingTypes: [],
      sheetThicknesses: []
    })
    setModuleFilters({
      search: '',
      widths: [],
      coatingTypes: [],
      sheetThicknesses: []
    })
    setAccessoryFilters({
      search: '',
      widths: [],
      coatingTypes: [],
      sheetThicknesses: []
    })
    setCoverFilters({
      search: '',
      widths: [],
      coatingTypes: [],
      sheetThicknesses: []
    })
  }

  // Tab değiştiğinde veri yükle
  const handleTabChange = async (tab: 'channels' | 'modules' | 'accessories' | 'covers') => {
    setActiveModalTab(tab)
    
    if (!selectedSubProduct) return
    
    // Sadece henüz yüklenmemiş verileri yükle
    switch (tab) {
      case 'channels':
        if (channels.length === 0) {
          await fetchChannels(selectedSubProduct.id)
        }
        break
      case 'modules':
        if (modules.length === 0) {
          await fetchModules(selectedSubProduct.id)
        }
        break
      case 'accessories':
        if (accessories.length === 0) {
          await fetchAccessories(selectedSubProduct.id)
        }
        break
      case 'covers':
        if (covers.length === 0) {
          await fetchCovers(selectedSubProduct.id)
        }
        break
    }
  }

  // Kanallar filtre fonksiyonları
  const toggleChannelWidthFilter = (width: string) => {
    setChannelFilters(prev => ({
      ...prev,
      widths: prev.widths.includes(width)
        ? prev.widths.filter(w => w !== width)
        : [...prev.widths, width]
    }))
  }

  const toggleChannelCoatingFilter = (coatingType: string) => {
    setChannelFilters(prev => ({
      ...prev,
      coatingTypes: prev.coatingTypes.includes(coatingType)
        ? prev.coatingTypes.filter(c => c !== coatingType)
        : [...prev.coatingTypes, coatingType]
    }))
  }

  const toggleChannelThicknessFilter = (thickness: string) => {
    setChannelFilters(prev => ({
      ...prev,
      sheetThicknesses: prev.sheetThicknesses.includes(thickness)
        ? prev.sheetThicknesses.filter(t => t !== thickness)
        : [...prev.sheetThicknesses, thickness]
    }))
  }

  // Modüller filtre fonksiyonları
  const toggleModuleWidthFilter = (width: string) => {
    setModuleFilters(prev => ({
      ...prev,
      widths: prev.widths.includes(width)
        ? prev.widths.filter(w => w !== width)
        : [...prev.widths, width]
    }))
  }

  const toggleModuleCoatingFilter = (coatingType: string) => {
    setModuleFilters(prev => ({
      ...prev,
      coatingTypes: prev.coatingTypes.includes(coatingType)
        ? prev.coatingTypes.filter(c => c !== coatingType)
        : [...prev.coatingTypes, coatingType]
    }))
  }

  const toggleModuleThicknessFilter = (thickness: string) => {
    setModuleFilters(prev => ({
      ...prev,
      sheetThicknesses: prev.sheetThicknesses.includes(thickness)
        ? prev.sheetThicknesses.filter(t => t !== thickness)
        : [...prev.sheetThicknesses, thickness]
    }))
  }

  // Aksesuarlar filtre fonksiyonları
  const toggleAccessoryWidthFilter = (width: string) => {
    setAccessoryFilters(prev => ({
      ...prev,
      widths: prev.widths.includes(width)
        ? prev.widths.filter(w => w !== width)
        : [...prev.widths, width]
    }))
  }

  const toggleAccessoryCoatingFilter = (coatingType: string) => {
    setAccessoryFilters(prev => ({
      ...prev,
      coatingTypes: prev.coatingTypes.includes(coatingType)
        ? prev.coatingTypes.filter(c => c !== coatingType)
        : [...prev.coatingTypes, coatingType]
    }))
  }

  const toggleAccessoryThicknessFilter = (thickness: string) => {
    setAccessoryFilters(prev => ({
      ...prev,
      sheetThicknesses: prev.sheetThicknesses.includes(thickness)
        ? prev.sheetThicknesses.filter(t => t !== thickness)
        : [...prev.sheetThicknesses, thickness]
    }))
  }

  // Kapaklar filtre fonksiyonları
  const toggleCoverWidthFilter = (width: string) => {
    setCoverFilters(prev => ({
      ...prev,
      widths: prev.widths.includes(width)
        ? prev.widths.filter(w => w !== width)
        : [...prev.widths, width]
    }))
  }

  const toggleCoverCoatingFilter = (coatingType: string) => {
    setCoverFilters(prev => ({
      ...prev,
      coatingTypes: prev.coatingTypes.includes(coatingType)
        ? prev.coatingTypes.filter(c => c !== coatingType)
        : [...prev.coatingTypes, coatingType]
    }))
  }

  const toggleCoverThicknessFilter = (thickness: string) => {
    setCoverFilters(prev => ({
      ...prev,
      sheetThicknesses: prev.sheetThicknesses.includes(thickness)
        ? prev.sheetThicknesses.filter(t => t !== thickness)
        : [...prev.sheetThicknesses, thickness]
    }))
  }

  // Benzersiz filtre değerlerini al
  const getUniqueValues = (items: any[], field: string) => {
    return Array.from(new Set(items.map(item => item[field]).filter(Boolean))).sort()
  }

  // İstek listesi yönetimi
  const addToRequestList = (item: any, type: 'channel' | 'module' | 'accessory' | 'cover') => {
    const requestItem = {
      id: `${type}-${item.id}`,
      name: item.name,
      code: item.code,
      imageUrl: item.imageUrl,
      type,
      quantity: 1,
      unit: type === 'channel' ? 'metre' : 'adet',
      subProductName: selectedSubProduct?.name,
      productName: product?.name
    }

    // LocalStorage'dan mevcut listeyi al
    const existingItems = JSON.parse(localStorage.getItem('requestList') || '[]')
    
    // Aynı item zaten varsa miktarını artır
    const existingItemIndex = existingItems.findIndex((existing: any) => existing.id === requestItem.id)
    if (existingItemIndex !== -1) {
      existingItems[existingItemIndex].quantity += 1
    } else {
      existingItems.push(requestItem)
    }

    // LocalStorage'a kaydet
    localStorage.setItem('requestList', JSON.stringify(existingItems))
    
    // Navbar'ı güncellemek için custom event gönder
    window.dispatchEvent(new CustomEvent('requestListUpdated'))

    // Başarı toast'u göster
    showToast({
      message: `${item.name} istek listesine eklendi!`,
      type: 'success',
      duration: 3000
    })
  }

  const uniqueChannelWidths = getUniqueValues(channels, 'width')
  const uniqueChannelCoatingTypes = getUniqueValues(channels, 'coatingType')
  const uniqueChannelThicknesses = getUniqueValues(channels, 'sheetThickness')

  const uniqueModuleWidths = getUniqueValues(modules, 'width')
  const uniqueModuleCoatingTypes = getUniqueValues(modules, 'coatingType')
  const uniqueModuleThicknesses = getUniqueValues(modules, 'sheetThickness')

  const uniqueAccessoryWidths = getUniqueValues(accessories, 'width')
  const uniqueAccessoryCoatingTypes = getUniqueValues(accessories, 'coatingType')
  const uniqueAccessoryThicknesses = getUniqueValues(accessories, 'sheetThickness')

  const uniqueCoverWidths = getUniqueValues(covers, 'width')
  const uniqueCoverCoatingTypes = getUniqueValues(covers, 'coatingType')
  const uniqueCoverThicknesses = getUniqueValues(covers, 'sheetThickness')

  const handleQuoteCancel = () => {
    setIsQuoteModalOpen(false)
    setQuoteForm({
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
      email: '',
      description: ''
    })
  }

  const handleCatalogDownload = async (catalogId: string) => {
    try {
      const response = await fetch(`/api/catalogs/${catalogId}/download`, {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${product.catalog?.title || 'katalog'}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        console.error('Katalog indirilemedi')
      }
    } catch (error) {
      console.error('Katalog indirme hatası:', error)
    }
  }

  if (loading) {
    return (
      <MaxWidthWrapper>
        <div className="py-12">
          <div className="animate-pulse">
            {/* Breadcrumb skeleton */}
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Sol taraf - Görsel skeleton */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <div className="flex space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
              
              {/* Sağ taraf - Bilgi skeleton */}
              <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
            
            {/* Tab skeleton */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex space-x-1 bg-gray-50 p-1 rounded-lg mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex-1 h-12 bg-gray-200 rounded-md"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    )
  }

  if (!product) {
    return (
      <MaxWidthWrapper>
        <div className="py-12 text-gray-600">Ürün bulunamadı.</div>
      </MaxWidthWrapper>
    )
  }

  // Ürün görselleri - önce çoklu görseller, sonra tek görsel, son olarak placeholder
  const productImages = product.images && product.images.length > 0 
    ? product.images.map((img: any) => img.imageUrl)
    : product.imageUrl 
    ? [product.imageUrl]
    : ['/placeholder-product-1.jpg']

  const tabs = [
    ...(subProducts.length > 0 ? [{ id: 'urunler', label: 'Ürünler' }] : []),
    { id: 'genel', label: 'Genel Bilgi' },
    { id: 'teknik', label: 'Teknik Bilgi' },
    { id: 'dokumanlar', label: 'Dökümanlar' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'genel':
  return (
          <div className="space-y-6">
            {product.generalInfo ? (
              <div className="prose max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: product.generalInfo }}
                />
              </div>
            ) : (
              <div className="space-y-6">
        <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Genel Özellikleri</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    TÜV sertifikalı, IEC standart kablolar ve terminaller ile donatılmış ürünlerimiz iki üretim yöntemi ile ayrılmaktadır.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Modüler tip prizler ile donatılmış hazır standart ürünler
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      İhtiyaçlara ve isteğe bağlı olarak her marka ve sayıda modüler tip prizler ile donatılabilen özel ürünler
                    </li>
                  </ul>
        </div>
                
        <div>
                  <h3 className="text-xl font-bold text-red-600 mb-4">E-Line Smart Masaüstü Priz</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      SM-STD-I Standart Serbest Tip
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      SM-LUX-II Lüks Sabitlenebilir Tip (masaya sabitleme ayakları ile birlikte)
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      SM-IN-I Masaya Gömme Dikdörtgen Tip
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      SM-K Kolon Tip
                    </li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    8 farklı yapı ve istenen içerikte üretilen ürünlerimiz ile EAE, gelecekteki ihtiyaçlarınız için esnek, sağlam, modüler, estetik ve güvenli çözümler sunmaktadır.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-red-600 mb-4">Kullanım Alanları</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Bankalar
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Oteller
                      </li>
                    </ul>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Ofis ve iş yerleri, yönetim binaları
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Hastaneler
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      
      case 'teknik':
        return (
          <div className="space-y-6">
            {product.technicalInfo ? (
              <div className="prose max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: product.technicalInfo }}
                />
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Teknik Özellikler</h3>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">E-Line Smart</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Gövde Malzemesi:</strong> Alüminyum, beyaz ve siyah renk alternatifleri ile anodik oksidasyon veya elektrostatik toz boya kaplama</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Yan Kapaklar:</strong> Polikarbonat (PC), "halogen free", IEC 60965 (960 °C glow wire test) ve UL94 "V0" alev direnci uyumlu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Standart Ürünler (Serbest Tip):</strong> Entegre ayaklar ile masaya sabitlenebilir veya yan kapaklardaki vida delikleri ile masaya vida ile sabitlenebilir</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Gömme Tip Ürünler:</strong> Push-open/push-close kapak sistemi, kırılmayı önlemek için maksimum 90 derece açılır</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Silindirik Tip Ürünler:</strong> "Push-open" sistemi, tam açıkken düşmeyi önleyen fren mekanizması</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>İç Bağlantılar:</strong> Her iletken için vidasız push-in terminaller ile terminal bloğu bağlantı aparatı</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Güç Çıkışları:</strong> 2.5 mm² veya isteğe bağlı 1.5 mm² H07Z1-K tipi kablolar ile bağlı, en az 16A yük kapasitesi için vidasız push-in terminaller</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Topraklama:</strong> Alüminyum gövdeye sabitlenmiş topraklama bağlantı vidası ve terminali, 2.5 mm² H07Z1-K tipi kablo ile gövde koruması için bağlı</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )
      
      case 'urunler':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Alt Ürünler</h3>
            {subProducts.length > 0 ? (
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Sol taraf - Filtreler */}
                <div className="w-full lg:w-1/4 lg:min-w-[250px]">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-4">Filtreler</h4>
                    
                    {/* Yükseklik Filtresi */}
                    {uniqueHeights.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-sm font-medium text-gray-700">Yükseklik (mm)</h5>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        <div className="space-y-2">
                          {uniqueHeights.map((height) => (
                            <label key={height} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={filters.heights.includes(height)}
                                onChange={() => toggleHeightFilter(height)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span className="ml-2 text-sm text-gray-700">{height}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Genişlik Filtresi */}
                    {uniqueWidths.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-sm font-medium text-gray-700">Genişlik (mm)</h5>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        <div className="space-y-2">
                          {uniqueWidths.map((width) => (
                            <label key={width} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={filters.widths.includes(width)}
                                onChange={() => toggleWidthFilter(width)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span className="ml-2 text-sm text-gray-700">{width}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sağ taraf - Alt Ürünler Grid */}
                <div className="flex-1 w-full">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredSubProducts.map((subProduct) => (
                      <div 
                        key={subProduct.id}
                        onClick={() => openChannelsModal(subProduct)}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-center cursor-pointer"
                      >
                        <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                          {subProduct.imageUrl ? (
                            <img
                              src={subProduct.imageUrl}
                              alt={subProduct.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <span className="text-gray-400 text-sm font-medium">
                                {subProduct.name}
                              </span>
                            </div>
                          )}
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm mb-2">
                          {subProduct.name}
                        </h4>
                      </div>
                    ))}
                  </div>
                  
                  {filteredSubProducts.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Filtreye Uygun Ürün Bulunamadı</h4>
                      <p className="text-gray-500">Seçtiğiniz filtre kriterlerine uygun alt ürün bulunmuyor.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Alt Ürün Bulunamadı</h4>
                <p className="text-gray-500">Bu ürün için henüz alt ürün tanımlanmamış.</p>
              </div>
            )}
          </div>
        )
      
      case 'dokumanlar':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Kataloglar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.catalog ? (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    {product.catalog.imageUrl ? (
                      <img 
                        src={product.catalog.imageUrl} 
                        alt={product.catalog.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileText className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{product.catalog.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{product.catalog.description}</p>
                    <div className="flex justify-between">
                      <button className="text-gray-600 hover:text-gray-800 flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        Görüntüle
                      </button>
                      <button 
                        onClick={() => product.catalog?.id && handleCatalogDownload(product.catalog.id)}
                        className="flex items-center transition-colors" 
                        style={{color: '#1a3056'}} 
                        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = '#0f1f3a'} 
                        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = '#1a3056'}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        İndir
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">E-LINE SMART</h4>
                    <p className="text-sm text-gray-600 mb-4">Ürün kataloğu ve teknik dokümanlar</p>
                    <div className="flex justify-between">
                      <button className="text-gray-600 hover:text-gray-800 flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        Görüntüle
                      </button>
                      <button className="flex items-center transition-colors" style={{color: '#1a3056'}} onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = '#0f1f3a'} onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = '#1a3056'}>
                        <Download className="w-4 h-4 mr-1" />
                        İndir
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <MaxWidthWrapper>
      {/* Breadcrumb */}
      <nav className="py-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Link href="/" className="hover:text-gray-800">Ana Sayfa</Link>
          <ChevronRight className="w-4 h-4" />
          <span>Masaüstü Priz Kutusu Çözümleri</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800">{product.name}</span>
        </div>
      </nav>

      <div className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sol taraf - Ürün görselleri */}
          <div className="space-y-4">
            {/* Ana görsel */}
            <div 
              className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src={productImages[selectedImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Küçük görseller */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {productImages.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index 
                      ? 'border-red-500 ring-2 ring-red-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Ürün görseli ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            
          </div>

          {/* Sağ taraf - Ürün bilgileri */}
          <div className="space-y-6">
            {/* Ürün adı */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            
            {/* Kategori */}
            <p className="text-gray-600">{product.category?.name || 'Masaüstü Priz - Bürotik Priz Blokları'}</p>
            
            {/* Açıklama */}
            <p className="text-gray-700 leading-relaxed">
              {product.description || 'Enerji (şebeke/UPS), veri, telefon ve multimedya prizleri ile donatılmış modüler, esnek, sağlam, ergonomik, güvenli ve estetik tasarım özelliklerine sahip masaüstü priz çözümleri.'}
            </p>
            
            {/* Teklif Al butonu */}
            <button 
              onClick={() => setIsQuoteModalOpen(true)}
              className="w-full text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors" 
              style={{backgroundColor: '#1a3056'}} 
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#0f1f3a'} 
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#1a3056'}
            >
              <FileText className="w-5 h-5 mr-2" />
              Teklif Al
            </button>
            
            {/* Ayırıcı çizgi */}
            <div className="border-t border-gray-200 my-6"></div>
            
            {/* Katalog */}
            {product.catalog && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Katalog</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{product.catalog.title}</h4>
                      <p className="text-sm text-gray-600">Ürün kataloğu</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleCatalogDownload(product.catalog.id)}
                        className="text-sm transition-colors" 
                        style={{color: '#1a3056'}} 
                        onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = '#0f1f3a'} 
                        onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = '#1a3056'}
                      >
                        İndir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab sistemi */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-wrap gap-1 bg-gray-50 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-0 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                }`}
                style={activeTab === tab.id ? {backgroundColor: '#1a3056'} : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Tab içeriği */}
          <div className="py-8">
            <div className="animate-in fade-in-50 duration-200">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Tam ekran görsel modal'ı */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full w-full h-full flex items-center justify-center">
            {/* Kapatma butonu */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Ana görsel */}
            <img
              src={productImages[selectedImageIndex]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Sol ok */}
            {selectedImageIndex > 0 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            
            {/* Sağ ok */}
            {selectedImageIndex < productImages.length - 1 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
            
            {/* Alt küçük görseller */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {productImages.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index 
                      ? 'border-white' 
                      : 'border-gray-400 hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Ürün görseli ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Teklif Al Modal'ı */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Teklif Al</h2>
              <button
                onClick={handleQuoteCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
              {/* Seçilen Ürün */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seçtiğiniz Ürün
                </label>
                <input
                  type="text"
                  value={product?.name || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>

              {/* Ad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ad *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={quoteForm.firstName}
                  onChange={handleQuoteFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Adınızı girin"
                />
              </div>

              {/* Soyad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Soyad *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={quoteForm.lastName}
                  onChange={handleQuoteFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Soyadınızı girin"
                />
              </div>

              {/* Telefon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon No *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={quoteForm.phone}
                  onChange={handleQuoteFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0555 123 45 67"
                />
              </div>

              {/* Şehir */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şehir *
                </label>
                <input
                  type="text"
                  name="city"
                  value={quoteForm.city}
                  onChange={handleQuoteFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Şehrinizi girin"
                />
              </div>

              {/* E-posta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta *
                </label>
                <input
                  type="email"
                  name="email"
                  value={quoteForm.email}
                  onChange={handleQuoteFormChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ornek@email.com"
                />
              </div>

              {/* Açıklama */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  name="description"
                  value={quoteForm.description}
                  onChange={handleQuoteFormChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Ürün hakkında detaylı bilgi veya özel isteklerinizi yazabilirsiniz..."
                />
              </div>

              {/* Butonlar */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleQuoteCancel}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 text-white rounded-md transition-colors"
                  style={{backgroundColor: '#1a3056'}}
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#0f1f3a'}
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#1a3056'}
                >
                  Teklif Al
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Kanallar Modal */}
      {isChannelsModalOpen && selectedSubProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Ürün Detayları</h2>
                <p className="text-gray-600 mt-1">{selectedSubProduct.name} için mevcut ürünler</p>
              </div>
              <button
                onClick={closeChannelsModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => handleTabChange('channels')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeModalTab === 'channels'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Kanallar
                </button>
                <button
                  onClick={() => handleTabChange('modules')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeModalTab === 'modules'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Modüller
                </button>
                <button
                  onClick={() => handleTabChange('accessories')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeModalTab === 'accessories'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Aksesuarlar
                </button>
                <button
                  onClick={() => handleTabChange('covers')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeModalTab === 'covers'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Kapaklar
                </button>
              </nav>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Tab Content */}
              {activeModalTab === 'channels' && (
                <div>
                  {/* Arama ve Filtreler */}
                  <div className="mb-6">
                    {/* Arama Çubuğu */}
                    <div className="mb-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Tüm kanallarda ara..."
                          value={channelFilters.search}
                          onChange={(e) => setChannelFilters(prev => ({ ...prev, search: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>


                {/* Aktif Filtreler */}
                {(channelFilters.widths.length > 0 || channelFilters.coatingTypes.length > 0 || channelFilters.sheetThicknesses.length > 0) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {channelFilters.widths.map(width => (
                      <span key={width} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                        Genişlik: {width}
                        <button
                          onClick={() => toggleChannelWidthFilter(width)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {channelFilters.coatingTypes.map(coating => (
                      <span key={coating} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                        Kaplama: {coating}
                        <button
                          onClick={() => toggleChannelCoatingFilter(coating)}
                          className="ml-2 text-purple-600 hover:text-purple-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {channelFilters.sheetThicknesses.map(thickness => (
                      <span key={thickness} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                        Kalınlık: {thickness}
                        <button
                          onClick={() => toggleChannelThicknessFilter(thickness)}
                          className="ml-2 text-orange-600 hover:text-orange-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Kanallar Tablosu */}
              {channelsLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Kanallar yükleniyor...</p>
                </div>
              ) : filteredChannels.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Ürün Tipi</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Kod</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Yükseklik</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          <div className="relative dropdown-container">
                            <button
                              onClick={() => setChannelDropdowns(prev => ({ ...prev, width: !prev.width }))}
                              className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                            >
                              <span>Genişlik</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {channelDropdowns.width && uniqueChannelWidths.length > 0 && (
                              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                {uniqueChannelWidths.map(width => (
                                  <button
                                    key={width}
                                    onClick={() => {
                                      toggleChannelWidthFilter(width)
                                      setChannelDropdowns(prev => ({ ...prev, width: false }))
                                    }}
                                    className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                                      channelFilters.widths.includes(width) ? 'bg-blue-50 font-medium' : ''
                                    }`}
                                  >
                                    {width}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          <div className="relative dropdown-container">
                            <button
                              onClick={() => setChannelDropdowns(prev => ({ ...prev, coating: !prev.coating }))}
                              className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                            >
                              <span>Kapl. Cinsi</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {channelDropdowns.coating && uniqueChannelCoatingTypes.length > 0 && (
                              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                {uniqueChannelCoatingTypes.map(coating => (
                                  <button
                                    key={coating}
                                    onClick={() => {
                                      toggleChannelCoatingFilter(coating)
                                      setChannelDropdowns(prev => ({ ...prev, coating: false }))
                                    }}
                                    className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                                      channelFilters.coatingTypes.includes(coating) ? 'bg-blue-50 font-medium' : ''
                                    }`}
                                  >
                                    {coating}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          <div className="relative dropdown-container">
                            <button
                              onClick={() => setChannelDropdowns(prev => ({ ...prev, thickness: !prev.thickness }))}
                              className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                            >
                              <span>Sac Kalınl.</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {channelDropdowns.thickness && uniqueChannelThicknesses.length > 0 && (
                              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                {uniqueChannelThicknesses.map(thickness => (
                                  <button
                                    key={thickness}
                                    onClick={() => {
                                      toggleChannelThicknessFilter(thickness)
                                      setChannelDropdowns(prev => ({ ...prev, thickness: false }))
                                    }}
                                    className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                                      channelFilters.sheetThicknesses.includes(thickness) ? 'bg-blue-50 font-medium' : ''
                                    }`}
                                  >
                                    {thickness}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredChannels.map((channel) => (
                        <tr key={channel.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gray-200 rounded mr-3 flex items-center justify-center">
                                {channel.imageUrl ? (
                                  <img src={channel.imageUrl} alt={channel.name} className="w-6 h-6 object-cover rounded" />
                                ) : (
                                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{channel.name}</div>
                                <div className="text-sm text-gray-500">({channel.height}x{channel.width}x{channel.sheetThickness})</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-900">{channel.code}</td>
                          <td className="py-4 px-4 text-gray-900">{channel.height || '-'}</td>
                          <td className="py-4 px-4 text-gray-900">{channel.width || '-'}</td>
                          <td className="py-4 px-4 text-gray-900">{channel.coatingType || '-'}</td>
                          <td className="py-4 px-4 text-gray-900">{channel.sheetThickness || '-'}</td>
                          <td className="py-4 px-4">
                            <button 
                              onClick={() => addToRequestList(channel, 'channel')}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              Listeye Ekle
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Kanal Bulunamadı</h4>
                  <p className="text-gray-500">Bu alt ürün için henüz kanal tanımlanmamış.</p>
                </div>
              )}
                </div>
              )}

              {/* Modüller Tab */}
              {activeModalTab === 'modules' && (
                <div>
                  {/* Arama ve Filtreler */}
                  <div className="mb-6">
                    <div className="mb-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Tüm modüllerde ara..."
                          value={moduleFilters.search}
                          onChange={(e) => setModuleFilters(prev => ({ ...prev, search: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Modüller Tablosu */}
                  {modulesLoading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-4 text-gray-600">Modüller yükleniyor...</p>
                    </div>
                  ) : filteredModules.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Ürün Tipi</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Kod</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Yükseklik</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                              <div className="relative dropdown-container">
                                <button
                                  onClick={() => setModuleDropdowns(prev => ({ ...prev, width: !prev.width }))}
                                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                                >
                                  <span>Genişlik</span>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                {moduleDropdowns.width && uniqueModuleWidths.length > 0 && (
                                  <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                    {uniqueModuleWidths.map(width => (
                                      <button
                                        key={width}
                                        onClick={() => {
                                          toggleModuleWidthFilter(width)
                                          setModuleDropdowns(prev => ({ ...prev, width: false }))
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                                          moduleFilters.widths.includes(width) ? 'bg-blue-50 font-medium' : ''
                                        }`}
                                      >
                                        {width}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                              <div className="relative dropdown-container">
                                <button
                                  onClick={() => setModuleDropdowns(prev => ({ ...prev, coating: !prev.coating }))}
                                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                                >
                                  <span>Kapl. Cinsi</span>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                {moduleDropdowns.coating && uniqueModuleCoatingTypes.length > 0 && (
                                  <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                    {uniqueModuleCoatingTypes.map(coating => (
                                      <button
                                        key={coating}
                                        onClick={() => {
                                          toggleModuleCoatingFilter(coating)
                                          setModuleDropdowns(prev => ({ ...prev, coating: false }))
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                                          moduleFilters.coatingTypes.includes(coating) ? 'bg-blue-50 font-medium' : ''
                                        }`}
                                      >
                                        {coating}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                              <div className="relative dropdown-container">
                                <button
                                  onClick={() => setModuleDropdowns(prev => ({ ...prev, thickness: !prev.thickness }))}
                                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                                >
                                  <span>Sac Kalınl.</span>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                {moduleDropdowns.thickness && uniqueModuleThicknesses.length > 0 && (
                                  <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                    {uniqueModuleThicknesses.map(thickness => (
                                      <button
                                        key={thickness}
                                        onClick={() => {
                                          toggleModuleThicknessFilter(thickness)
                                          setModuleDropdowns(prev => ({ ...prev, thickness: false }))
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                                          moduleFilters.sheetThicknesses.includes(thickness) ? 'bg-blue-50 font-medium' : ''
                                        }`}
                                      >
                                        {thickness}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">İşlem</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredModules.map((module) => (
                            <tr key={module.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-gray-200 rounded mr-3 flex items-center justify-center">
                                    {module.imageUrl ? (
                                      <img src={module.imageUrl} alt={module.name} className="w-6 h-6 object-cover rounded" />
                                    ) : (
                                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{module.name}</div>
                                    <div className="text-sm text-gray-500">({module.height}x{module.width}x{module.sheetThickness})</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-gray-900">{module.code}</td>
                              <td className="py-4 px-4 text-gray-900">{module.height || '-'}</td>
                              <td className="py-4 px-4 text-gray-900">{module.width || '-'}</td>
                              <td className="py-4 px-4 text-gray-900">{module.coatingType || '-'}</td>
                              <td className="py-4 px-4 text-gray-900">{module.sheetThickness || '-'}</td>
                              <td className="py-4 px-4">
                                <button 
                                  onClick={() => addToRequestList(module, 'module')}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                  Listeye Ekle
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Modül Bulunamadı</h4>
                      <p className="text-gray-500">Bu alt ürün için henüz modül tanımlanmamış.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Aksesuarlar Tab */}
              {activeModalTab === 'accessories' && (
                <div>
                  <div className="mb-6">
                    <div className="mb-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Tüm aksesuarlarda ara..."
                          value={accessoryFilters.search}
                          onChange={(e) => setAccessoryFilters(prev => ({ ...prev, search: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {accessoriesLoading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-4 text-gray-600">Aksesuarlar yükleniyor...</p>
                    </div>
                  ) : filteredAccessories.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Ürün Tipi</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Kod</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Yükseklik</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                              <div className="relative dropdown-container">
                                <button
                                  onClick={() => setAccessoryDropdowns(prev => ({ ...prev, width: !prev.width }))}
                                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                                >
                                  <span>Genişlik</span>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                {accessoryDropdowns.width && uniqueAccessoryWidths.length > 0 && (
                                  <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                    {uniqueAccessoryWidths.map(width => (
                                      <button
                                        key={width}
                                        onClick={() => {
                                          toggleAccessoryWidthFilter(width)
                                          setAccessoryDropdowns(prev => ({ ...prev, width: false }))
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                                          accessoryFilters.widths.includes(width) ? 'bg-blue-50 font-medium' : ''
                                        }`}
                                      >
                                        {width}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                              <div className="relative dropdown-container">
                                <button
                                  onClick={() => setAccessoryDropdowns(prev => ({ ...prev, coating: !prev.coating }))}
                                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                                >
                                  <span>Kapl. Cinsi</span>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                {accessoryDropdowns.coating && uniqueAccessoryCoatingTypes.length > 0 && (
                                  <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                    {uniqueAccessoryCoatingTypes.map(coating => (
                                      <button
                                        key={coating}
                                        onClick={() => {
                                          toggleAccessoryCoatingFilter(coating)
                                          setAccessoryDropdowns(prev => ({ ...prev, coating: false }))
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                                          accessoryFilters.coatingTypes.includes(coating) ? 'bg-blue-50 font-medium' : ''
                                        }`}
                                      >
                                        {coating}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                              <div className="relative dropdown-container">
                                <button
                                  onClick={() => setAccessoryDropdowns(prev => ({ ...prev, thickness: !prev.thickness }))}
                                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                                >
                                  <span>Sac Kalınl.</span>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                {accessoryDropdowns.thickness && uniqueAccessoryThicknesses.length > 0 && (
                                  <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                    {uniqueAccessoryThicknesses.map(thickness => (
                                      <button
                                        key={thickness}
                                        onClick={() => {
                                          toggleAccessoryThicknessFilter(thickness)
                                          setAccessoryDropdowns(prev => ({ ...prev, thickness: false }))
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                                          accessoryFilters.sheetThicknesses.includes(thickness) ? 'bg-blue-50 font-medium' : ''
                                        }`}
                                      >
                                        {thickness}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">İşlem</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAccessories.map((accessory) => (
                            <tr key={accessory.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-gray-200 rounded mr-3 flex items-center justify-center">
                                    {accessory.imageUrl ? (
                                      <img src={accessory.imageUrl} alt={accessory.name} className="w-6 h-6 object-cover rounded" />
                                    ) : (
                                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{accessory.name}</div>
                                    <div className="text-sm text-gray-500">({accessory.height}x{accessory.width}x{accessory.sheetThickness})</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-gray-900">{accessory.code}</td>
                              <td className="py-4 px-4 text-gray-900">{accessory.height || '-'}</td>
                              <td className="py-4 px-4 text-gray-900">{accessory.width || '-'}</td>
                              <td className="py-4 px-4 text-gray-900">{accessory.coatingType || '-'}</td>
                              <td className="py-4 px-4 text-gray-900">{accessory.sheetThickness || '-'}</td>
                              <td className="py-4 px-4">
                                <button 
                                  onClick={() => addToRequestList(accessory, 'accessory')}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                  Listeye Ekle
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Aksesuar Bulunamadı</h4>
                      <p className="text-gray-500">Bu alt ürün için henüz aksesuar tanımlanmamış.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Kapaklar Tab */}
              {activeModalTab === 'covers' && (
                <div>
                  <div className="mb-6">
                    <div className="mb-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Tüm kapaklarda ara..."
                          value={coverFilters.search}
                          onChange={(e) => setCoverFilters(prev => ({ ...prev, search: e.target.value }))}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {coversLoading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-4 text-gray-600">Kapaklar yükleniyor...</p>
                    </div>
                  ) : filteredCovers.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Ürün Tipi</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Kod</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Yükseklik</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                              <div className="relative dropdown-container">
                                <button
                                  onClick={() => setCoverDropdowns(prev => ({ ...prev, width: !prev.width }))}
                                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                                >
                                  <span>Genişlik</span>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                {coverDropdowns.width && uniqueCoverWidths.length > 0 && (
                                  <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                    {uniqueCoverWidths.map(width => (
                                      <button
                                        key={width}
                                        onClick={() => {
                                          toggleCoverWidthFilter(width)
                                          setCoverDropdowns(prev => ({ ...prev, width: false }))
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                                          coverFilters.widths.includes(width) ? 'bg-blue-50 font-medium' : ''
                                        }`}
                                      >
                                        {width}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                              <div className="relative dropdown-container">
                                <button
                                  onClick={() => setCoverDropdowns(prev => ({ ...prev, coating: !prev.coating }))}
                                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                                >
                                  <span>Kapl. Cinsi</span>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                {coverDropdowns.coating && uniqueCoverCoatingTypes.length > 0 && (
                                  <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                    {uniqueCoverCoatingTypes.map(coating => (
                                      <button
                                        key={coating}
                                        onClick={() => {
                                          toggleCoverCoatingFilter(coating)
                                          setCoverDropdowns(prev => ({ ...prev, coating: false }))
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                                          coverFilters.coatingTypes.includes(coating) ? 'bg-blue-50 font-medium' : ''
                                        }`}
                                      >
                                        {coating}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">
                              <div className="relative dropdown-container">
                                <button
                                  onClick={() => setCoverDropdowns(prev => ({ ...prev, thickness: !prev.thickness }))}
                                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                                >
                                  <span>Sac Kalınl.</span>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                {coverDropdowns.thickness && uniqueCoverThicknesses.length > 0 && (
                                  <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                    {uniqueCoverThicknesses.map(thickness => (
                                      <button
                                        key={thickness}
                                        onClick={() => {
                                          toggleCoverThicknessFilter(thickness)
                                          setCoverDropdowns(prev => ({ ...prev, thickness: false }))
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors ${
                                          coverFilters.sheetThicknesses.includes(thickness) ? 'bg-blue-50 font-medium' : ''
                                        }`}
                                      >
                                        {thickness}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">İşlem</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCovers.map((cover) => (
                            <tr key={cover.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-gray-200 rounded mr-3 flex items-center justify-center">
                                    {cover.imageUrl ? (
                                      <img src={cover.imageUrl} alt={cover.name} className="w-6 h-6 object-cover rounded" />
                                    ) : (
                                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{cover.name}</div>
                                    <div className="text-sm text-gray-500">({cover.height}x{cover.width}x{cover.sheetThickness})</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-gray-900">{cover.code}</td>
                              <td className="py-4 px-4 text-gray-900">{cover.height || '-'}</td>
                              <td className="py-4 px-4 text-gray-900">{cover.width || '-'}</td>
                              <td className="py-4 px-4 text-gray-900">{cover.coatingType || '-'}</td>
                              <td className="py-4 px-4 text-gray-900">{cover.sheetThickness || '-'}</td>
                              <td className="py-4 px-4">
                                <button 
                                  onClick={() => addToRequestList(cover, 'cover')}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                  Listeye Ekle
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Kapak Bulunamadı</h4>
                      <p className="text-gray-500">Bu alt ürün için henüz kapak tanımlanmamış.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  )
}


