import { Link } from 'react-router-dom'
import './header.css'

function Header() {
  return (
    <nav className='header-nav'> 
      <Link to="/">Home</Link>
      <Link to="/mangas">Mangas</Link>
      <Link to="/mangas/add">Adicionar Manga</Link>
    </nav>
  )
}

export default Header