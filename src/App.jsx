import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddManga from './pages/AddManga'
import Header from './components/Header'
import MangaDetails from './pages/MangaDetails'
import Mangas from './pages/Mangas'



function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/"  element={<Home />}/>
      <Route path="/mangas" element={<Mangas />} />
      <Route path="/mangas/add" element={<AddManga />} />
      <Route path="/mangas/details/:id" element={<MangaDetails />} />
      <Route path="/*" element={<Home />} />
    </Routes>
    </>
  )
}

export default App