import { useState } from "react";
import coracaoVazio from '../../assets/images/coracao-vazio.png';
import coracaoVermelho from '../../assets/images/coracao-vermelho.png';
import { Link } from "react-router-dom";

function ListItem({nome, id, capitulos, paginas, setMangaList, imagem_capa }) {

  const [isFavorit, setIsFavorit] = useState(false);

  const handleClick = () => {
    setIsFavorit(!isFavorit);
  }

  return (
    <>
      <li key={id}><Link to={`/mangas/details/${id}`}>{nome} -{capitulos} - {paginas}</Link>
      <img src={imagem_capa} />
        <button type="button" onClick={handleClick}>{isFavorit ? 'Desfavoritar' : 'Favoritar'}</button>
        <img src={isFavorit ? coracaoVermelho : coracaoVazio} width={'30px'}></img>
      </li>
    </>
  )
}

export default ListItem;