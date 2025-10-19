'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

// React Quill'i dinamik olarak import et (SSR sorununu çözer)
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div className="border border-gray-300 rounded-md h-[242px] flex items-center justify-center bg-gray-50">Editör yükleniyor...</div>
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

  return (
    <div className="border border-gray-300 rounded-md">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height: `${height + 42}px` }}
      />
    </div>
  )
}
