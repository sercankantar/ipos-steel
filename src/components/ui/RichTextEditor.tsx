'use client'

import dynamic from 'next/dynamic'
import { useMemo, useState, useEffect } from 'react'

// React Quill'i dinamik olarak import et (SSR sorununu çözer)
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false
})

// CSS'i dinamik olarak import et
import 'react-quill/dist/quill.snow.css'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: number
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "İçerik girin...",
  height = 200 
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false)
  const [editorValue, setEditorValue] = useState('')
  
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  }), [])

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align'
  ]

  // Loading component with content preview
  const LoadingComponent = () => (
    <div className="border border-gray-300 rounded-md" style={{ height: `${height + 42}px` }}>
      <div className="h-10 bg-gray-100 border-b border-gray-300 flex items-center px-3">
        <div className="flex gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="ml-4 text-sm text-gray-500">Yükleniyor...</div>
      </div>
      <div className="p-3 h-full overflow-hidden">
        {value ? (
          <div 
            className="prose prose-sm max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ) : (
          <div className="text-gray-400 italic">{placeholder}</div>
        )}
      </div>
    </div>
  )

  useEffect(() => {
    // Component mount olduğunda mounted state'ini true yap
    setMounted(true)
  }, [])

  // Value değiştiğinde editor value'sunu güncelle
  useEffect(() => {
    if (mounted && value !== editorValue) {
      setEditorValue(value || '')
    }
  }, [value, mounted, editorValue])

  // Mount olmadıysa loading component göster
  if (!mounted) {
    return <LoadingComponent />
  }

  const handleChange = (newValue: string) => {
    setEditorValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="border border-gray-300 rounded-md">
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height: `${height + 42}px` }}
        preserveWhitespace
      />
    </div>
  )
}
