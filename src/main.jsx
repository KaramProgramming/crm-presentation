import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Always start at the top on every load / refresh
history.scrollRestoration = 'manual'
window.scrollTo({ top: 0, behavior: 'instant' })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
