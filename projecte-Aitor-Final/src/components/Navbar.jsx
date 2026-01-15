import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '15px', padding: '15px' }}>
      <Link to="/">Inici</Link>
      <Link to="/forum">Forum</Link>
      <Link to="/ranking">Ranking</Link>
      <Link to="/garatje">Garatje</Link>
      <Link to="/perfil">Perfil</Link>
      <Link to="/iniciar_sesio">Iniciar Sesió</Link>
      <Link to="/registrat">Registrat</Link>
    </nav>
  )
}
