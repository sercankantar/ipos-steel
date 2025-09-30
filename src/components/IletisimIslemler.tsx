'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, Mail, Phone, MapPin, Inbox, CheckCircle2 } from 'lucide-react'

interface ContactInfo {
  id: string
  type: 'email' | 'phone' | 'address' | 'social'
  title: string
  value: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function IletisimIslemler() {
  const [contacts, setContacts] = useState<ContactInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'info' | 'inbox'>('inbox')
  const [showForm, setShowForm] = useState(false)
  const [editingContact, setEditingContact] = useState<ContactInfo | null>(null)
  const [formData, setFormData] = useState({
    type: 'email' as 'email' | 'phone' | 'address' | 'social',
    title: '',
    value: ''
  })

  useEffect(() => {
    fetchContacts()
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchContacts = async () => {
    try {
      // Bu örnek için mock data kullanıyoruz
      // Gerçek uygulamada API'den veri çekilecek
      const mockContacts: ContactInfo[] = [
        {
          id: '1',
          type: 'email',
          title: 'E-posta',
          value: 'info@ipossteel.com',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          type: 'phone',
          title: 'Telefon',
          value: '+90 212 555 0123',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          type: 'address',
          title: 'Adres',
          value: 'İstanbul, Türkiye',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
      setContacts(mockContacts)
    } catch (error) {
      console.error('İletişim bilgileri yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages')
      if (!res.ok) return
      const data = await res.json()
      setMessages(data)
    } catch (e) {
      console.error(e)
    }
  }

  const markAsRead = async (id: string, isRead: boolean) => {
    const res = await fetch(`/api/admin/messages/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isRead }) })
    if (res.ok) await fetchMessages()
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Mesajı silmek istiyor musunuz?')) return
    const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
    if (res.ok) await fetchMessages()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Bu örnek için mock işlem
      // Gerçek uygulamada API'ye gönderilecek
      const newContact: ContactInfo = {
        id: editingContact ? editingContact.id : Date.now().toString(),
        type: formData.type,
        title: formData.title,
        value: formData.value,
        isActive: true,
        createdAt: editingContact ? editingContact.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      if (editingContact) {
        setContacts(contacts.map(c => c.id === editingContact.id ? newContact : c))
      } else {
        setContacts([...contacts, newContact])
      }

      resetForm()
    } catch (error) {
      console.error('İletişim bilgisi kaydedilirken hata:', error)
    }
  }

  const handleEdit = (contact: ContactInfo) => {
    setEditingContact(contact)
    setFormData({
      type: contact.type,
      title: contact.title,
      value: contact.value
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bu iletişim bilgisini silmek istediğinizden emin misiniz?')) {
      setContacts(contacts.filter(c => c.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      type: 'email',
      title: '',
      value: ''
    })
    setEditingContact(null)
    setShowForm(false)
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-5 h-5" />
      case 'phone': return <Phone className="w-5 h-5" />
      case 'address': return <MapPin className="w-5 h-5" />
      default: return <Mail className="w-5 h-5" />
    }
  }

  if (loading) {
    return <div className="p-8">Yükleniyor...</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          İletişim İşlemleri
        </h1>
        <p className="text-gray-600">
          İletişim bilgilerini ve gelen mesajları yönetin
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex items-center gap-2">
        <button onClick={() => setActiveTab('inbox')} className={`px-4 py-2 rounded-md text-sm font-medium border ${activeTab === 'inbox' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}>
          Gelen Kutusu
        </button>
        <button onClick={() => setActiveTab('info')} className={`px-4 py-2 rounded-md text-sm font-medium border ${activeTab === 'info' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}>
          İletişim Bilgileri
        </button>
      </div>

      {activeTab === 'info' && (
        <div className="mb-8">
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni İletişim Bilgisi Ekle
          </Button>
        </div>
      )}

      {activeTab === 'info' && showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingContact ? 'İletişim Bilgisi Düzenle' : 'Yeni İletişim Bilgisi Ekle'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="type">Tür</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="email">E-posta</option>
                <option value="phone">Telefon</option>
                <option value="address">Adres</option>
                <option value="social">Sosyal Medya</option>
              </select>
            </div>
            
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
              <Label htmlFor="value">Değer</Label>
              <Input
                id="value"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                required
              />
            </div>
            
            <div className="flex space-x-4">
              <Button type="submit">
                {editingContact ? 'Güncelle' : 'Ekle'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                İptal
              </Button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'info' && (
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">İletişim Bilgileri</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {contacts.map((contact) => (
            <div key={contact.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getIcon(contact.type)}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{contact.title}</h4>
                    <p className="text-sm text-gray-500">{contact.value}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    contact.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {contact.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(contact)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(contact.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {activeTab === 'inbox' && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2"><Inbox className="w-4 h-4" /> Gelen Kutusu</h3>
            <button onClick={() => fetchMessages()} className="text-sm text-blue-600 hover:underline">Yenile</button>
          </div>
          <div className="divide-y divide-gray-200">
            {messages.map((m) => (
              <div key={m.id} className="px-6 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {!m.isRead && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-700">Yeni</span>}
                      <div className="font-medium text-gray-900">{m.name} {m.surname} • <span className="text-gray-500 text-sm">{m.email}{m.phone ? ` • ${m.phone}` : ''}</span></div>
                    </div>
                    <div className="text-sm text-gray-700 mt-1 whitespace-pre-line">{m.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{new Date(m.createdAt).toLocaleString('tr-TR')}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => markAsRead(m.id, !m.isRead)}>
                      <CheckCircle2 className="w-4 h-4" /> {m.isRead ? 'Okunmadı' : 'Okundu'}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deleteMessage(m.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {messages.length === 0 && <div className="px-6 py-10 text-sm text-gray-500">Henüz mesaj yok.</div>}
          </div>
        </div>
      )}
    </div>
  )
}
