import { Routes, Route } from 'react-router-dom'
import Inici from './pages/Inici'
import Forum from './pages/Forum'
import Ranking from './pages/Ranking'
import Garatje from './pages/Garatje'
import Perfil from './pages/Perfil'
import IniciarSesio from './pages/IniciarSesio'
import Registrat from './pages/Registrat'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Inici />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/garatje" element={<Garatje />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/iniciar_sesio" element={<IniciarSesio />} />
        <Route path="/registrat" element={<Registrat />} />

        {/* 404 */}
        <Route path="*" element={<h1>404 - Página no encontrada 💀</h1>} />
      </Routes>
    </>
  )
}

export default App
