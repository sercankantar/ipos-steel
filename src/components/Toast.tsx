'use client'

import toast from 'react-hot-toast'
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

export const showToast = ({ message, type = 'success', duration = 3000 }: ToastProps) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />
    }
  }

  const getStyle = () => {
    switch (type) {
      case 'success':
        return {
          background: '#10b981',
          color: '#fff',
          fontWeight: '500',
          border: '1px solid #059669',
        }
      case 'error':
        return {
          background: '#ef4444',
          color: '#fff',
          fontWeight: '500',
          border: '1px solid #dc2626',
        }
      case 'warning':
        return {
          background: '#f59e0b',
          color: '#fff',
          fontWeight: '500',
          border: '1px solid #d97706',
        }
      case 'info':
        return {
          background: '#3b82f6',
          color: '#fff',
          fontWeight: '500',
          border: '1px solid #2563eb',
        }
      default:
        return {
          background: '#10b981',
          color: '#fff',
          fontWeight: '500',
          border: '1px solid #059669',
        }
    }
  }

  return toast.success(message, {
    duration,
    style: getStyle(),
    icon: getIcon(),
  })
}

export default showToast
