import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AL_MainPage from './AfterLogin/MainPage/AL_MainPage'
import C_NavBar from './AfterLogin/NavBar/C_NavBar'
//import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <C_NavBar>
      <AL_MainPage/>
    </C_NavBar>
  </StrictMode>,
)
