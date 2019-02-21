/* eslint-disable import/no-webpack-loader-syntax */
import en from '@lingui/loader!./en/messages.json'
import ru from '@lingui/loader!./ru/messages.json'

const catalogs = { en, ru }
export default function getCatalog (locale) {
  return catalogs[locale] || catalogs.ru
}
