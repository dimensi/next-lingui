import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useLinguiContext } from './useLinguiContext'

export const RouterLink = ({ href, ...props }) => {
  const { locale, defaultLocale } = useLinguiContext()
  return (
    <Link href={href} as={locale === defaultLocale ? href : `/${locale}${href}`} {...props} />
  )
}

RouterLink.propTypes = {
  href: PropTypes.string.isRequired,
}
