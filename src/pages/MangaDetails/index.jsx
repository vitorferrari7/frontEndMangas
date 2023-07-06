import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';
import { useParams } from 'react-router-dom';
import './index.css'

function MangaDetails() {
  const [loading, setLoading] = useState(true);
  const [manga, setManga] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/mangas/${id}`);
        setManga(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching manga details:', error);
      }
    };

    fetchManga();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2>{manga.nome}</h2>
          <p>Capítulos: {manga.capitulos}</p>
          <p>Páginas: {manga.paginas}</p>
          <img src={manga.imagem_capa} alt='imagesrc'/>
        </>
      )}
    </>
  );
}

export default MangaDetails;
