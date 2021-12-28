import { useEffect, useState } from 'react';
import './singleComicPage.scss';
import xMen from '../../../resources/img/x-men.png';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../../services/MarvelService';
import Page404  from '../404';
import Spinner from '../../spinner/Spinner';

const SingleComicPage = () => {
  const [comic, setComic] = useState({})
  let { id } = useParams();
  const { loading, error, getOneComic, clearError } = useMarvelService();

  const updateComic = () => {
    
    clearError();
    getOneComic(id)
        .then(onComicLoaded)
    
    
}
const onComicLoaded = (comicObj) => {
  setComic(comicObj)
}

  useEffect(() => {
    updateComic(id)
        
  }, [id])

  const errorMessage = error ? <Page404 /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || Object.keys(comic).length === 0) ? <View comic={comic} /> : null;

    return (
      <div className="single-comic">
          {errorMessage}
          {spinner}
          {content}
      </div>
    )
}

const View = ({comic}) => {
  const { title,  description, pages, src, price, language } = comic;
  return (
      <>
          <img src={src} alt={title} className="single-comic__img"/>
          <div className="single-comic__info">
              <h2 className="single-comic__name">{title}</h2>
              <p className="single-comic__descr">{description}</p>
              <p className="single-comic__descr">{pages} pages</p>
              <p className="single-comic__descr">Language: {language}</p>
              <div className="single-comic__price">{price} $</div>
          </div>
          <Link to="/comics" className="single-comic__back">Back to all</Link>
      </>
          
      
  )
}

export default SingleComicPage;