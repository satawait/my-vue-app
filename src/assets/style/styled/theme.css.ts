import { createTheme, createThemeContract } from '@vanilla-extract/css'

const colors = createThemeContract({
  color: null,
  backgroundColor: null
})

export const lightTheme = createTheme(colors, {
  color: '#000000',
  backgroundColor: '#ffffff'
})

export const darkTheme = createTheme(colors, {
  color: '#ffffff',
  backgroundColor: '#000000'
})
export const vars = { colors }
