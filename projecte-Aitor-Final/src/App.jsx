import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from "react";
import Inici from './components/Inici'
import Forum from './components/Forum'
import Ranking from './components/Ranking'
import Garatje from './components/Garatje'
import Perfil from './components/Perfil'
import IniciarSessio from './components/Iniciar_Sessio/IniciarSessio'
import Registrat from './components/Registrat/Registrat'
import Navbar from './components/Nav_Bar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
    const [isLogged, setIsLogged] = useState(false);

    const checkLoginStatus = () => {
      fetch("http://localhost/Projecte_Backend/check.php", {
        method: "GET",
        credentials: "include"
      })
      .then(res => res.json())
      .then(data => {
        setIsLogged(data.logeado);
      })
      .catch(err => console.error(err));
    };

    useEffect(() => {
      checkLoginStatus();
    }, []);

  return (
    <>
      <Navbar logged={isLogged}/>

      <Routes>
        <Route path="/" element={<Inici />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/garatje" element={<Garatje />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/iniciar_sessio" element={<IniciarSessio onLoginSuccess={checkLoginStatus} />} />
        <Route path="/registrat" element={<Registrat />} />
        <Route path="*" element={<h1>404 - Página no encontrada 💀</h1>} />
      </Routes>

      <Footer />
    </>
  )
}

export default App