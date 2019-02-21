const path = require('path')

module.exports = {
  webpack: (config, { isServer }) => {
    config.resolve.alias = config.resolve.alias || {}
    config.resolve.alias['@catalogs$'] = path.resolve(
      __dirname,
      isServer ? './locales/catalogs.server.js' : './locales/catalogs.client.js'
    )
    return config
  },
}
