import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const {
      req: {
        lingui: { locale },
      },
    } = ctx
    const linguiCatalog = await import(`!!raw-loader!../locales/${locale}/messages.js`).then(
      mod => mod.default
    )
    return {
      locale,
      linguiCatalog: linguiCatalog
        .replace('/* eslint-disable */', '')
        .replace('module.exports', 'window.LINGUI_CATALOG'),
      ...initialProps,
    }
  }

  render () {
    return (
      <html lang={this.props.locale}>
        <Head />
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: this.props.linguiCatalog }} />
          <NextScript />
        </body>
      </html>
    )
  }
}
