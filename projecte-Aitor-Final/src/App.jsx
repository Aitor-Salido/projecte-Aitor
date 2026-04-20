import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from "react";
import Inici from './components/Inici/Inici'
import Forum from './components/Forum/Forum'
import Ranking from './components/Ranking/Ranking'
import Garatge from './components/Garatge/Garatge'
import Perfil from './components/Perfil/Perfil'
import IniciarSessio from './components/Iniciar_Sessio/IniciarSessio'
import Registrat from './components/Registrat/Registrat'
import VerifyUser from './components/Registrat/VerifyUser'
import Navbar from './components/Nav_Bar/Navbar'
import Footer from './components/Footer/Footer'
import Olvidar from './components/Iniciar_Sessio/Olvidar'
import ReiniciarContra from './components/Iniciar_Sessio/ReiniciarContra'
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
      <Navbar logged={isLogged} />
      <div>
        <Routes>

          <Route path="/" element={<Inici />} />
          <Route element={<ProtectedRoute isAllowed={!isLogged} />}>
            <Route path="/verify_user" element={<VerifyUser />} />
            <Route path="/iniciar_sessio" element={<IniciarSessio onLoginSuccess={checkLoginStatus} />} />
            <Route path="/registrat" element={<Registrat />} />
            <Route path="/olvidar" element={<Olvidar />} />
            <Route path="/reset_password" element={<ReiniciarContra />} />
          </Route>

          <Route element={<ProtectedRoute isAllowed={!!isLogged} />}>
            <Route path="/forum" element={<Forum />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/garatge" element={<Garatge />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>

          <Route path="*" element={<h1>404 - Página no encontrada 💀</h1>} />
        </Routes>
      </div>
      {(location != '/iniciar_sessio' && location != '/registrat' && location != '/verify_user' && location != '/olvidar' && location != '/reset_password') && <Footer />}
    </>
  )
}

export default App