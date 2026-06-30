import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Auth from './components/Auth'
import { AuthUser } from './types'

// const onLoginSuccess= (token:string,user:AuthUser)=>{}

const el = document.getElementById("root");
if (!el) throw new Error("No element with id='root' found");
createRoot(el).render(
  <StrictMode>
    <App />
    {/* <Auth onLoginSuccess={onLoginSuccess}/> */}
  </StrictMode>,
)
