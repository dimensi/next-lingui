import App, { Container } from 'next/app'
import React from 'react'
import Head from 'next/head'
import getCatalog from '@catalogs'

import { AlternateLinkGenerator } from '../lib/react/AlternateLinkGenerator'
import { LinguiProvider } from '../lib/react/LinguiProvider'

const catalogs = {
  ru: () =>
    import(/* webpackMode: "lazy", webpackChunkName: "i18n-ru" */
      '../locales/ru/messages.js'),
  en: () =>
    import(/* webpackMode: "lazy", webpackChunkName: "i18n-en" */
      '../locales/en/messages.js'),
}

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    const { req } = ctx

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    const { lingui } = req || window.__NEXT_DATA__.props
    return { pageProps, lingui }
  }

  render () {
    const {
      Component,
      pageProps,
      lingui: { locale, locales, defaultLocale, url },
    } = this.props

    const catalog = { [locale]: getCatalog(locale) }
    return (
      <Container>
        <Head>
          <AlternateLinkGenerator defaultLocale={defaultLocale} locales={locales} {...url} />
        </Head>
        <LinguiProvider
          catalogs={catalogs}
          defaultLocale={defaultLocale}
          locale={locale}
          locales={locales}
          defaultCatalog={catalog}
        >
          <Component {...pageProps} />
        </LinguiProvider>
      </Container>
    )
  }
}

export default MyApp
