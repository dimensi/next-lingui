import React from 'react'

export function AlternateLinkGenerator ({ origin, defaultLocale, locales, pathname }) {
  return locales.map(lang => (
    <link
      rel='alternate'
      hrefLang={lang}
      href={[origin, lang === defaultLocale ? '' : `/${lang}`, pathname].join('')}
      key={lang}
    />
  ))
}
