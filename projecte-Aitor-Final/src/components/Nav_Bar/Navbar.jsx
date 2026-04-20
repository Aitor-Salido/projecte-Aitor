import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import styles from "./Navbar.module.css"

export default function Navbar(props) {
  const isLogged = props.logged
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.contenidorLogo} onClick={() => { navigate("/"); closeMenu(); }}>
        <img src="./img/logo_Box.png" className={styles.imatgeLogo} alt="Logo" />
        <p>BoxSphere</p>
      </div>

      <div className={`${styles.hamburger} ${isOpen ? styles.open : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`${styles.menu} ${isOpen ? styles.active : ""}`}>
        <Link className={styles.link} to="/" onClick={closeMenu}>Inici</Link>
        {isLogged ? (
          <>
            <Link className={styles.link} to="/forum" onClick={closeMenu}>Forum</Link>
            <Link className={styles.link} to="/ranking" onClick={closeMenu}>Ranking</Link>
            <Link className={styles.link} to="/garatge" onClick={closeMenu}>Garatge</Link>
            <Link className={styles.link} to="/perfil" onClick={closeMenu}>Perfil</Link>
          </>
        ) : (
          <>
            <Link className={styles.link} to="/iniciar_sessio" onClick={closeMenu}>Iniciar Sessió</Link>
            <Link className={styles.link} to="/registrat" onClick={closeMenu}>Registrat</Link>
          </>
        )}
      </div>
    </nav>
  )
}