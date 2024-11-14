import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1920,
      },
    },
    palette: {
      primary: {
        main: 'rgba(0, 108, 121, 1)',
        light: 'rgba(0, 108, 121, 0.5)',
      },
    },
    components: {
      
    },
  })
  
  export default theme