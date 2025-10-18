'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, Eye, Search, Settings, X, Users } from 'lucide-react'
import { toast } from 'sonner'
import DepartmentManager from './DepartmentManager'
import JobApplicationsManager from './JobApplicationsManager'

interface Department {
  id: string
  name: string
  color: string
  isActive: boolean
}

interface JobPosition {
  id: string
  title: string
  departmentId: string
  department: Department
  location: string
  type: string
  experience: string
  publishDate: string
  description: string
  responsibilities: string[]
  qualifications: string[]
  benefits: string[]
  salary?: string
  workingHours?: string
  reportingTo?: string
  featured: boolean
  isActive: boolean
  slug?: string
  createdAt: string
  updatedAt: string
}

const jobTypes = ['Tam Zamanlı', 'Yarı Zamanlı', 'Staj', 'Proje Bazlı', 'Uzaktan Çalışma']

export default function JobPositionsManager() {
  const [jobs, setJobs] = useState<JobPosition[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('Tümü')
  const [showForm, setShowForm] = useState(false)
  const [showDepartmentManager, setShowDepartmentManager] = useState(false)
  const [showApplicationsManager, setShowApplicationsManager] = useState(false)
  const [editingJob, setEditingJob] = useState<JobPosition | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    departmentId: '',
    location: '',
    type: '',
    experience: '',
    publishDate: new Date().toISOString().split('T')[0],
    description: '',
    responsibilities: [''],
    qualifications: [''],
    benefits: [''],
    salary: '',
    workingHours: '',
    reportingTo: '',
    featured: false,
    isActive: true,
    slug: ''
  })

  useEffect(() => {
    fetchJobs()
    fetchDepartments()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/admin/job-positions')
      const data = await response.json()
      setJobs(data)
    } catch (error) {
      console.error('İş pozisyonları yüklenirken hata:', error)
      toast.error('Veri yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/admin/departments')
      const data = await response.json()
      setDepartments(data)
    } catch (error) {
      console.error('Departmanlar yüklenirken hata:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingJob 
        ? `/api/admin/job-positions/${editingJob.id}`
        : '/api/admin/job-positions'
      
      const method = editingJob ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchJobs()
        resetForm()
        toast.success(editingJob ? 'İş pozisyonu güncellendi' : 'İş pozisyonu oluşturuldu')
      }
    } catch (error) {
      console.error('İş pozisyonu kaydedilirken hata:', error)
      toast.error('Veri kaydedilirken hata oluştu')
    }
  }

  const handleEdit = (job: JobPosition) => {
    setEditingJob(job)
    setFormData({
      title: job.title,
      departmentId: job.departmentId,
      location: job.location,
      type: job.type,
      experience: job.experience,
      publishDate: job.publishDate.split('T')[0],
      description: job.description,
      responsibilities: job.responsibilities.length > 0 ? job.responsibilities : [''],
      qualifications: job.qualifications.length > 0 ? job.qualifications : [''],
      benefits: job.benefits.length > 0 ? job.benefits : [''],
      salary: job.salary || '',
      workingHours: job.workingHours || '',
      reportingTo: job.reportingTo || '',
      featured: job.featured,
      isActive: job.isActive,
      slug: job.slug || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu iş pozisyonunu silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch(`/api/admin/job-positions/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchJobs()
        toast.success('İş pozisyonu silindi')
      }
    } catch (error) {
      console.error('İş pozisyonu silinirken hata:', error)
      toast.error('Veri silinirken hata oluştu')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      departmentId: '',
      location: '',
      type: '',
      experience: '',
      publishDate: new Date().toISOString().split('T')[0],
      description: '',
      responsibilities: [''],
      qualifications: [''],
      benefits: [''],
      salary: '',
      workingHours: '',
      reportingTo: '',
      featured: false,
      isActive: true,
      slug: ''
    })
    setEditingJob(null)
    setShowForm(false)
  }

  const addArrayItem = (field: 'responsibilities' | 'qualifications' | 'benefits') => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    })
  }

  const removeArrayItem = (field: 'responsibilities' | 'qualifications' | 'benefits', index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    })
  }

  const updateArrayItem = (field: 'responsibilities' | 'qualifications' | 'benefits', index: number, value: string) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData({ ...formData, [field]: newArray })
  }

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'Tümü' || job.department.name === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  if (loading) {
    return <div className="p-8"><div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" /><div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" /><div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" /></div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Açık Pozisyonlar Yönetimi</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowApplicationsManager(true)}>
            <Users className="w-4 h-4 mr-2" />
            İş Başvuruları
          </Button>
          <Button variant="outline" onClick={() => setShowDepartmentManager(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Departman Yönetimi
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Pozisyon
          </Button>
        </div>
      </div>

      {/* Arama ve Filtreler */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Pozisyon ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['Tümü', ...departments.map(d => d.name)].map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedDepartment === dept
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* İş Pozisyonları Listesi */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                  {job.featured && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                      ÖNE ÇIKAN
                    </span>
                  )}
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    job.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {job.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
                <p className="text-blue-600 font-medium mb-2">{job.department.name}</p>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{job.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span>📍 {job.location}</span>
                  <span>⏰ {job.type}</span>
                  <span>👥 {job.experience}</span>
                  <span>📅 {new Date(job.publishDate).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(job)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(job.id)}
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
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                {editingJob ? 'İş Pozisyonunu Düzenle' : 'Yeni İş Pozisyonu'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Temel Bilgiler */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Pozisyon Başlığı *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="departmentId">Departman *</Label>
                    <select
                      id="departmentId"
                      value={formData.departmentId}
                      onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Departman Seçin</option>
                      {departments.filter(d => d.isActive).map(dept => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Lokasyon *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Çalışma Tipi *</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Tip Seçin</option>
                      {jobTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience">Deneyim *</Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="1-3 yıl"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="publishDate">Yayın Tarihi *</Label>
                    <Input
                      id="publishDate"
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Açıklama *</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    required
                  />
                </div>

                {/* Sorumluluklar */}
                <div>
                  <Label>Sorumluluklar</Label>
                  {formData.responsibilities.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={item}
                        onChange={(e) => updateArrayItem('responsibilities', index, e.target.value)}
                        placeholder="Sorumluluk açıklaması"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeArrayItem('responsibilities', index)}
                        disabled={formData.responsibilities.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem('responsibilities')}
                    className="mt-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Sorumluluk Ekle
                  </Button>
                </div>

                {/* Aranan Özellikler */}
                <div>
                  <Label>Aranan Özellikler</Label>
                  {formData.qualifications.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={item}
                        onChange={(e) => updateArrayItem('qualifications', index, e.target.value)}
                        placeholder="Aranan özellik"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeArrayItem('qualifications', index)}
                        disabled={formData.qualifications.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem('qualifications')}
                    className="mt-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Özellik Ekle
                  </Button>
                </div>

                {/* Sağlanan Haklar */}
                <div>
                  <Label>Sağlanan Haklar</Label>
                  {formData.benefits.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={item}
                        onChange={(e) => updateArrayItem('benefits', index, e.target.value)}
                        placeholder="Sağlanan hak"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeArrayItem('benefits', index)}
                        disabled={formData.benefits.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayItem('benefits')}
                    className="mt-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Hak Ekle
                  </Button>
                </div>

                {/* Ek Bilgiler */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="salary">Maaş Aralığı</Label>
                    <Input
                      id="salary"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      placeholder="25.000 - 35.000 TL"
                    />
                  </div>
                  <div>
                    <Label htmlFor="workingHours">Çalışma Saatleri</Label>
                    <Input
                      id="workingHours"
                      value={formData.workingHours}
                      onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                      placeholder="08:30 - 17:30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reportingTo">Bağlı Olduğu Pozisyon</Label>
                    <Input
                      id="reportingTo"
                      value={formData.reportingTo}
                      onChange={(e) => setFormData({ ...formData, reportingTo: e.target.value })}
                      placeholder="Proje Müdürü"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="elektrik-muhendisi"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      />
                      <span>Öne Çıkan</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      />
                      <span>Aktif</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="submit">
                    {editingJob ? 'Güncelle' : 'Oluştur'}
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

      {/* İş Başvuruları Modal */}
      {showApplicationsManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">İş Başvuruları Yönetimi</h3>
                <Button variant="outline" onClick={() => setShowApplicationsManager(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <JobApplicationsManager />
            </div>
          </div>
        </div>
      )}

      {/* Departman Yönetimi Modal */}
      {showDepartmentManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Departman Yönetimi</h3>
                <Button variant="outline" onClick={() => setShowDepartmentManager(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <DepartmentManager />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
