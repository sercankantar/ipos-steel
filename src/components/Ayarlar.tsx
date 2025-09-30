'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Save, User, Lock, Globe, Image, Trash2, Edit, Check, X } from 'lucide-react'
import { useEffect } from 'react'

export default function Ayarlar() {
  const [settings, setSettings] = useState({
    siteTitle: 'İPOS Steel',
    siteDescription: 'Çelik ürünleri ve hizmetleri',
    adminEmail: 'admin@ipossteel.com',
    cloudinaryCloudName: '',
    supabaseUrl: '',
    supabaseAnonKey: ''
  })

  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<{ id: string; username: string; createdAt: string }[]>([])
  const [newUser, setNewUser] = useState({ username: '', password: '' })
  const [editing, setEditing] = useState<{ id: string; username: string; password: string } | null>(null)

  useEffect(() => { fetchUsers() }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      if (!res.ok) return
      const data = await res.json()
      setUsers(data)
    } catch {}
  }

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUser.username || !newUser.password) return
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
    if (res.ok) {
      setNewUser({ username: '', password: '' })
      await fetchUsers()
    }
  }

  const deleteUser = async (id: string) => {
    if (!confirm('Bu kullanıcıyı silmek istiyor musunuz?')) return
    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
    if (res.ok) await fetchUsers()
  }

  const startEdit = (u: { id: string; username: string }) => {
    setEditing({ id: u.id, username: u.username, password: '' })
  }

  const cancelEdit = () => setEditing(null)

  const saveEdit = async () => {
    if (!editing) return
    const body: any = { username: editing.username }
    if (editing.password) body.password = editing.password
    const res = await fetch(`/api/admin/users/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (res.ok) {
      setEditing(null)
      await fetchUsers()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Bu örnek için mock işlem
      // Gerçek uygulamada API'ye gönderilecek
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Ayarlar başarıyla kaydedildi!')
    } catch (error) {
      console.error('Ayarlar kaydedilirken hata:', error)
      alert('Ayarlar kaydedilirken bir hata oluştu!')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Ayarlar
        </h1>
        <p className="text-gray-600">
          Site ayarlarını yönetin
        </p>
      </div>

      <div className="space-y-8">
        {/* Genel Ayarlar */}
        

        {/* Güvenlik Ayarları */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Lock className="w-6 h-6 mr-2 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">Güvenlik Ayarları</h2>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                <strong>Uyarı:</strong> Admin şifresini değiştirmek için veritabanını doğrudan güncellemeniz gerekmektedir.
              </p>
            </div>

            {/* Kullanıcı Yönetimi */}
            <div>
              <div className="flex items-center mb-3">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                <h3 className="font-medium text-gray-900">Kullanıcı Yönetimi</h3>
              </div>
              <form onSubmit={addUser} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <Input placeholder="Kullanıcı adı" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
                <Input placeholder="Şifre" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                <Button type="submit">Ekle</Button>
              </form>
              <div className="divide-y border rounded">
                {users.map((u) => (
                  <div key={u.id} className="p-3 flex items-center justify-between gap-3">
                    {editing?.id === u.id ? (
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input value={editing.username} onChange={(e) => setEditing({ ...editing, username: e.target.value })} />
                        <Input type="password" placeholder="Yeni şifre (opsiyonel)" value={editing.password} onChange={(e) => setEditing({ ...editing, password: e.target.value })} />
                        <div className="flex items-center gap-2">
                          <Button size="sm" onClick={saveEdit}><Check className="w-4 h-4" /></Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit}><X className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{u.username}</div>
                          <div className="text-xs text-gray-500">{new Date(u.createdAt).toLocaleString('tr-TR')}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => startEdit(u)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteUser(u.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {users.length === 0 && <div className="p-3 text-sm text-gray-500">Kayıtlı kullanıcı yok</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Kaydet Butonu */}
        <div className="flex justify-end">
          
        </div>
      </div>
    </div>
  )
}
