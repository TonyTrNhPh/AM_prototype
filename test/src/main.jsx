import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Base from './pages/Base.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Base/>
  </StrictMode>,
)
