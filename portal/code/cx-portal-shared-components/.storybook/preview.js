import React from 'react'
import { SharedThemeProvider } from '../src/components/SharedThemeProvider'
import '../src/index.scss'

export const decorators = [
  (Story) => (
    <SharedThemeProvider>
      <Story />
    </SharedThemeProvider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
