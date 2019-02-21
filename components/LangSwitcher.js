import React from 'react'
import { useLinguiContext } from '../lib/react/useLinguiContext'

export function LangSwitcher () {
  const { changeLocale, locale, locales } = useLinguiContext()
  return (
    <ul
    >
      {locales.map((lang) => (
        <li style={{ fontWeight: lang === locale && 'bold' }} key={lang}>
          <button onClick={() => changeLocale(lang)}>
            {lang}
          </button>
        </li>
      ))}
    </ul>
  )
}
