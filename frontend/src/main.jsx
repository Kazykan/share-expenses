import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './components/screens/home/Home.jsx'
import {QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Home />
    </QueryClientProvider>
  </React.StrictMode>,
)
