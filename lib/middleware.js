const pathMatch = require('path-match')()

/**
 *
 * @param {object} options
 * @param {import('next').Server} nextApp
 * @returns {import('express').Handler[]}
 */
function createMiddleware ({ locales, defaultLocale, subPaths, ignoreRoutes }, nextApp) {
  const localesWithoutDefault = () => locales.filter(lang => lang !== defaultLocale)
  const forseTrallingSlash = (path) => localesWithoutDefault().some(lng => path === `/${lng}`) ? `${path}/` : path
  const ignoreRegex = new RegExp(`^/(?!${ignoreRoutes.map(x => x.replace('/', '')).join('|')}).*$`)
  const ignoreRoute = pathMatch(ignoreRegex)
  const isI18nRoute = req => ignoreRoute(req.url) && req.method === 'GET'
  console.log(`/:lang(${localesWithoutDefault()
    .join('|')})?/*`)
  const routeWithLang = pathMatch(`/:lang(${localesWithoutDefault()
    .join('|')})?/*`)
  const parseRoute = pathname => routeWithLang(pathname)
  /**
   * @type {import('express').Handler[]}
   */
  const middlewares = []

  middlewares.push((req, res, next) => {
    if (isI18nRoute(req)) {
      req.lingui = {
        locale: req.cookies.locale || req.acceptsLanguages(locales) || defaultLocale,
        locales,
        defaultLocale,
      }
    }
    next()
  })

  if (subPaths) {
    middlewares.push((req, res, next) => {
      if (!isI18nRoute(req)) return next()
      const pathname = forseTrallingSlash(req.path)
      const { lang, 0: otherPath } = parseRoute(pathname)
      const { lingui: { locale: userLocale } } = req
      req.url = otherPath ? `/${otherPath}` : '/'

      if (userLocale === defaultLocale && lang == null) {
        return next()
      }

      if (userLocale === lang) {
        return next()
      }

      if (userLocale === defaultLocale && lang != null) {
        return res.redirect(`/${otherPath}`)
      }

      return res.redirect(`/${userLocale}${otherPath ? `/${otherPath}` : ''}`)
    })
  }

  return middlewares
}

module.exports = createMiddleware
