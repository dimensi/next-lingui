import React from 'react'
import { I18nProvider } from '@lingui/react'
import PropTypes from 'prop-types'

// const catalogs = {
//   ru: () =>
//     import(/* webpackMode: "lazy", webpackChunkName: "i18n-ru" */
//       'src/locales/ru/messages'),
//   en: () =>
//     import(/* webpackMode: "lazy", webpackChunkName: "i18n-en" */
//       'src/locales/en/messages'),
// }

export class LinguiProvider extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
    language: PropTypes.string.isRequired,
    catalogs: PropTypes.array,
    defaultCatalog: PropTypes.object.isRequired,
  }

  state = {
    catalogs: this.props.defaultCatalog,
    language: this.props.language,
  }

  loadCatalog = async language => {
    try {
      await this.props.catalogs[language]()

      this.setState(state => ({
        catalogs: {
          ...state.catalogs,
          [language]: window.LINGUI_CATALOG,
          language,
        },
      }))
    } catch (err) {
      console.log(err)
    }
  }

  static getDerivedStateFromProps ({ language }, { catalogs }) {
    return catalogs[language] ? { language } : null
  }

  componentDidUpdate () {
    const {
      props: { language },
      state: { catalogs },
    } = this

    if (!catalogs[language]) {
      this.loadCatalog(language)
    }
  }

  render () {
    const { children } = this.props
    const { catalogs, language } = this.state

    return (
      <I18nProvider language={language} catalogs={catalogs}>
        {children}
      </I18nProvider>
    )
  }
}
