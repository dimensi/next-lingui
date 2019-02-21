import React from 'react'
import { I18nProvider } from '@lingui/react'
import PropTypes from 'prop-types'
import { LinguiContext } from './LinguiContext'
import Cookie from 'js-cookie'
import Router from 'next/router'

export class LinguiProvider extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
    locale: PropTypes.string.isRequired,
    locales: PropTypes.arrayOf(PropTypes.string).isRequired,
    catalogs: PropTypes.object.isRequired,
    defaultLocale: PropTypes.string.isRequired,
    defaultCatalog: PropTypes.object.isRequired,
  }

  state = {
    catalogs: this.props.defaultCatalog,
    locale: this.props.locale,
    defaultLocale: this.props.defaultLocale,
  }

  changeLocale = async locale => {
    if (!this.state.catalogs[locale]) {
      await this.loadCatalog(locale)
    } else {
      this.setState({
        locale,
      })
    }

    if (process.browser) {
      document.documentElement.lang = locale
      Cookie.set('locale', locale, {
        expires: 365,
      })
      Router.replace(
        Router.pathname,
        locale === this.state.defaultLocale ? Router.pathname : `/${locale}${Router.pathname}`,
        { shallow: true }
      )
    }
  }

  loadCatalog = async locale => {
    try {
      const catalog = (await this.props.catalogs[locale]()).default
      this.setState(state => ({
        catalogs: {
          ...state.catalogs,
          [locale]: catalog,
        },
        locale,
      }))
    } catch (err) {
      console.error('Error while loading locale catalog', err)
    }
  }

  render () {
    const {
      props: { children, locales },
      state: { catalogs, locale, defaultLocale },
      changeLocale,
    } = this

    return (
      <LinguiContext.Provider value={{ locale, defaultLocale, changeLocale, locales }}>
        <I18nProvider language={locale} catalogs={catalogs}>
          {children}
        </I18nProvider>
      </LinguiContext.Provider>
    )
  }
}
