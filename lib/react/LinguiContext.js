import React from 'react'

export const LinguiContext = React.createContext({
  locale: '',
  locales: [],
  defaultLocale: '',
  changeLocale: () => {},
})
