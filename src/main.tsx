import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from './context'
import './styles/global.css'
import { AppRoutes } from './routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ChakraProvider>
  </React.StrictMode>
)
