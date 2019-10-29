// app global style variables configuration
// Took the color names from http://chir.ag/projects/name-that-color

const themeUtils = {
  color: {
    white: '#fff',
    black: '#000'
  },
  font: {
    small: '1.2rem',
    base: '1.6rem',
    medium: '2rem',
    large: '3rem'
  },
  fontFamily: {
    primary: '"HelveticaNeue", "Helvetica", "Arial", sans-serif',
    secondary: '"HelveticaNeue", "Helvetica", "Arial", sans-serif'
  },
  // in ems
  breakpoints: {
    desktop: 90
  },
  transition: '400ms ease'
} as const

export default themeUtils
