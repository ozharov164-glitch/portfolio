import { hydrateRoot, createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './styles/globals.css'

document.documentElement.classList.add('js')

const root = document.getElementById('root')
if (!root) throw new Error('Missing #root')

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (root.childElementCount > 0) hydrateRoot(root, app)
else createRoot(root).render(app)
