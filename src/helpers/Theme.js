import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#375a7f',
    secondary: '#444',
    success: '#00bc8c',
    info: '#3498DB',
    warning: '#F39C12',
    darnger: '#E74C3C',
    link: '#00bc8c'
  }
}

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Theme
