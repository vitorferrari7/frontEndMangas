import { useState, useEffect } from 'react';
import axios from 'axios';
import ListItem from '../../components/ListItem';
import Loading from '../../components/Loading';
import './index.css';

function Mangas() {
  const [originalMangaList, setOriginalMangaList] = useState([]);
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMangaList = async () => {
      try {
        const response = await axios.get('http://localhost:3001/mangas');
        setOriginalMangaList(response.data);
        setMangaList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching manga list:', error);
      }
    };

    fetchMangaList();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {

      setMangaList(originalMangaList);
    } else {
      const filteredMangaList = originalMangaList.filter((manga) =>
        manga.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setMangaList(filteredMangaList);
    }
  };

  return (
    <div className="container">
      <h1>Mangás</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Pesquisar
        </button>
      </div>
      <ul>
        {loading ? (
          <Loading />
        ) : (
          mangaList.map((manga) => (
            <ListItem
              key={manga.id}
              nome={manga.nome}
              capitulos={manga.capitulos}
              paginas={manga.paginas}
              setMangaList={setMangaList}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default Mangas;
