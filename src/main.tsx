import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { UserProvider } from './contexts/user-context.tsx'
import { ThemeProvider } from '@mui/material'
import theme from './utils/mui-theme.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </UserProvider>
  </StrictMode>,
)
