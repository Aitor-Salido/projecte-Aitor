import { Link, useNavigate } from "react-router-dom"
import styles from "./Navbar.module.css"

export default function Navbar(props) {
  const isLogged = props.logged
  const navigate = useNavigate()

  return (
    <nav className={styles.navbar}>
      <div className={styles.contenidorLogo} onClick={() => navigate("/")}>
        <img src="./img/logo_Box.png" className={styles.imatgeLogo}></img>
        <p>BoxSphere</p>
      </div>
      <div>
        <Link className={styles.link} to="/">Inici</Link>
        {isLogged ? (
          <>
            <Link className={styles.link} to="/forum">Forum</Link>
            <Link className={styles.link} to="/ranking">Ranking</Link>
            <Link className={styles.link} to="/garatje">Garatje</Link>
            <Link className={styles.link} to="/perfil">Perfil</Link>
          </>
        ) : (
          <>
            <Link className={styles.link} to="/iniciar_sessio">Iniciar Sessió</Link>
            <Link className={styles.link} to="/registrat">Registrat</Link>
          </>
        )}
      </div>
    </nav>
  )
}
