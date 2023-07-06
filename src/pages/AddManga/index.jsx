import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'

const MangasCrud = () => {
  const [mangas, setMangas] = useState([]);
  const [manga, setManga] = useState({
    nome: '',
    capitulos: '',
    paginas: '',
    imagem_capa: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');

  const fetchMangas = async () => {
    const response = await axios.get('http://localhost:3001/mangas');
    setMangas(response.data);
  };

  useEffect(() => {
    fetchMangas();
  }, []);

  const handleChange = (e) => {
    setManga({ ...manga, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:3001/mangas/${editId}`, manga);
        setEditMode(false);
        setEditId('');
      } else {
        await axios.post('http://localhost:3001/mangas', manga);
      }
      fetchMangas();
      setManga({ nome: '', capitulos: '', paginas: '', imagem_capa: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id, nome, capitulos, paginas, imagem_capa) => {
    setEditMode(true);
    setEditId(id);
    setManga({ nome, capitulos, paginas, imagem_capa });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/mangas/${id}`);
      fetchMangas();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <h1>Mangás</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={manga.nome}
          onChange={handleChange}
        />
        <label>Capítulos</label>
        <input
          type="text"
          name="capitulos"
          value={manga.capitulos}
          onChange={handleChange}
        />
        <label>Páginas</label>
        <input
          type="text"
          name="paginas"
          value={manga.paginas}
          onChange={handleChange}
        />
        <label>Imagem Capa</label>
        <input
          type="text"
          name="imagem_capa"
          value={manga.imagem_capa}
          onChange={handleChange}
        />
        <button type="submit">
          {editMode ? 'Atualizar Mangá' : 'Adicionar Mangá'}
        </button>
      </form>
      <ul>
        {mangas.map((manga) => (
          <li key={manga.id}>
            <h3>{manga.nome}</h3>
            <p>Capítulos: {manga.capitulos}</p>
            <p>Páginas: {manga.paginas}</p>
            <img className='imagemcapa' src={manga.imagem_capa} />
           
            <button onClick={() => handleEdit(manga.id, manga.nome, manga.capitulos, manga.paginas, manga.imagem_capa)}>
              Editar
            </button>
            <button onClick={() => handleDelete(manga.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MangasCrud;
