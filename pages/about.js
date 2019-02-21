import React from 'react'
import { RouterLink } from '../lib/react/RouterLink'
import { Trans } from '@lingui/macro'

export default () => (
  <div>
    <Trans>About us</Trans>
    <RouterLink href='/' passHref>
      <a>
        <Trans>
          Home
        </Trans>
      </a>
    </RouterLink>
  </div>
)
