/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components'

import dark from '@/styles/dark'

export type Theme = typeof dark

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
