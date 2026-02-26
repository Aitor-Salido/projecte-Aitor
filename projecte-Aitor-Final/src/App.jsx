import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";
import Inici from './components/Inici/Inici'
import Forum from './components/Forum'
import Ranking from './components/Ranking'
import Garatje from './components/Garatje'
import Perfil from './components/Perfil'
import IniciarSessio from './components/Iniciar_Sessio/IniciarSessio'
import Registrat from './components/Registrat/Registrat'
import Navbar from './components/Nav_Bar/Navbar'
import Footer from './components/Footer/Footer'
import ProtectedRoute from './components/ProtectedRoute'

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

    const location = useLocation().pathname;

  return (
    <>
      <Navbar logged={isLogged}/>

      <Routes>

        <Route path="/" element={<Inici />} />
        <Route element={<ProtectedRoute isAllowed={!isLogged}/>}>
          <Route path="/iniciar_sessio" element={<IniciarSessio onLoginSuccess={checkLoginStatus} />} />
          <Route path="/registrat" element={<Registrat />} />
        </Route>
        
        <Route element={<ProtectedRoute isAllowed={!!isLogged}/>}>
          <Route path="/forum" element={<Forum />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/garatje" element={<Garatje />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        <Route path="*" element={<h1>404 - Página no encontrada 💀</h1>} />
      </Routes>

      {(location != '/iniciar_sessio' && location != '/registrat') && <Footer />}
    </>
  )
}

export default App