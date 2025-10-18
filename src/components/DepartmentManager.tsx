'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import { toast } from 'sonner'

interface Department {
  id: string
  name: string
  color: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const colorOptions = [
  { value: 'bg-blue-100 text-blue-800', label: 'Mavi' },
  { value: 'bg-green-100 text-green-800', label: 'Yeşil' },
  { value: 'bg-purple-100 text-purple-800', label: 'Mor' },
  { value: 'bg-orange-100 text-orange-800', label: 'Turuncu' },
  { value: 'bg-pink-100 text-pink-800', label: 'Pembe' },
  { value: 'bg-indigo-100 text-indigo-800', label: 'İndigo' },
  { value: 'bg-cyan-100 text-cyan-800', label: 'Cyan' },
  { value: 'bg-yellow-100 text-yellow-800', label: 'Sarı' },
  { value: 'bg-red-100 text-red-800', label: 'Kırmızı' },
  { value: 'bg-teal-100 text-teal-800', label: 'Teal' },
  { value: 'bg-gray-100 text-gray-800', label: 'Gri' }
]

export default function DepartmentManager() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    color: 'bg-gray-100 text-gray-800',
    isActive: true
  })

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/admin/departments')
      const data = await response.json()
      setDepartments(data)
    } catch (error) {
      console.error('Departmanlar yüklenirken hata:', error)
      toast.error('Veri yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingDepartment 
        ? `/api/admin/departments/${editingDepartment.id}`
        : '/api/admin/departments'
      
      const method = editingDepartment ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchDepartments()
        resetForm()
        toast.success(editingDepartment ? 'Departman güncellendi' : 'Departman oluşturuldu')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Bir hata oluştu')
      }
    } catch (error) {
      console.error('Departman kaydedilirken hata:', error)
      toast.error('Veri kaydedilirken hata oluştu')
    }
  }

  const handleEdit = (department: Department) => {
    setEditingDepartment(department)
    setFormData({
      name: department.name,
      color: department.color,
      isActive: department.isActive
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu departmanı silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch(`/api/admin/departments/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchDepartments()
        toast.success('Departman silindi')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Departman silinemedi')
      }
    } catch (error) {
      console.error('Departman silinirken hata:', error)
      toast.error('Veri silinirken hata oluştu')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      color: 'bg-gray-100 text-gray-800',
      isActive: true
    })
    setEditingDepartment(null)
    setShowForm(false)
  }

  if (loading) {
    return <div className="p-8"><div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" /><div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" /><div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" /></div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Departman Yönetimi</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Departman
        </Button>
      </div>

      {/* Departmanlar Listesi */}
      <div className="space-y-4">
        {departments.map((department) => (
          <div key={department.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium px-2 py-1 rounded ${department.color}`}>
                  {department.name}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  department.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {department.isActive ? 'Aktif' : 'Pasif'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(department)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(department.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editingDepartment ? 'Departmanı Düzenle' : 'Yeni Departman'}
              </h3>
              <Button variant="outline" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Departman Adı *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="color">Renk</Label>
                <select
                  id="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {colorOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="mt-2">
                  <span className="text-xs text-gray-500">Önizleme: </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${formData.color}`}>
                    {formData.name || 'Departman Adı'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <Label htmlFor="isActive">Aktif</Label>
              </div>

              <div className="flex gap-3">
                <Button type="submit">
                  {editingDepartment ? 'Güncelle' : 'Oluştur'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  İptal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
