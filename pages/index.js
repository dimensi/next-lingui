import React from 'react'
import { RouterLink } from '../lib/react/RouterLink'
import { Trans } from '@lingui/macro'
import { LangSwitcher } from '../components/LangSwitcher'

export default () => (
  <div>
    <Trans>Hello World.</Trans>{' '}
    <RouterLink href='/about' passHref>
      <a>
        <Trans>
          About
        </Trans>
      </a>
    </RouterLink>
    <LangSwitcher />
  </div>
)
