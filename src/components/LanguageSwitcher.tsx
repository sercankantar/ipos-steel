"use client"

import { useEffect, useMemo, useState } from 'react'
import 'country-flag-icons/react/3x2'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu'
import { buttonVariants } from './ui/button'

type LanguageCode = 'tr' | 'en' | 'ar' | 'de'

const LANGUAGES: { code: LanguageCode; label: string; country: string }[] = [
  { code: 'tr', label: 'Türkçe', country: 'TR' },
  { code: 'en', label: 'English', country: 'GB' },
  { code: 'ar', label: 'العربية', country: 'SA' },
  { code: 'de', label: 'Deutsch', country: 'DE' },
]

function getCookie(name: string) {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()!.split(';').shift() || null
  return null
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value}; ${expires}; path=/`
}

export default function LanguageSwitcher() {
  const [current, setCurrent] = useState<LanguageCode>('tr')

  useEffect(() => {
    const fromCookie = (getCookie('lang') as LanguageCode | null)
    if (fromCookie && LANGUAGES.some((l) => l.code === fromCookie)) {
      setCurrent(fromCookie)
    }
  }, [])

  const currentLang = useMemo(() => {
    return (
      LANGUAGES.find((l) => l.code === current) || LANGUAGES[0]
    )
  }, [current])

  const onSelect = (code: LanguageCode) => {
    setCookie('lang', code)
    setCurrent(code)
    // Basit yaklaşım: sayfayı yenileyerek UI'nın güncellenmesini sağla
    if (typeof window !== 'undefined') window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({ variant: 'ghost' })}
        aria-label="Dil seçici"
      >
        <span className='inline-flex items-center gap-2'>
          <img
            alt={currentLang.label}
            src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${currentLang.country.toLowerCase()}.svg`}
            className='h-4 w-6 rounded-sm shadow-sm'
          />
          <span className='hidden sm:inline'>{currentLang.label}</span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuLabel>Dil</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LANGUAGES.map(({ code, label, country }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => onSelect(code)}
            className={code === current ? 'font-semibold' : ''}
          >
            <span className='inline-flex items-center gap-2'>
              <img
                alt={label}
                src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${country.toLowerCase()}.svg`}
                className='h-4 w-6 rounded-sm shadow-sm'
              />
              <span>{label}</span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


