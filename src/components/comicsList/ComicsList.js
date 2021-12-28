import { useState, useEffect, useRef } from 'react';
import './comicsList.scss';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
    const [comicsObj, setState] = useState({
        comics: [],
        newListLoading: false,
        offset: 0,
        comicsEnded: false
    })
    const { error, loading, getAllComics } = useMarvelService();

    const onRequest = (offset, initial) => {
        initial ? 
        setState(state => ({...state,
            newListLoading: false
        }))
        : setState(state => ({...state,
            newListLoading: true
        }));
        getAllComics(offset)
            .then(onListLoaded)
    }

    const onListLoaded = (list) => {
        let ended = false;
        if (list.length < 8){
            ended = true;
        }
        
        setState((prev) => ({...prev,
            comics: [...prev.comics, ...list], 
            newListLoading: false,
            offset: prev.offset + 8,
            comicsEnded: ended
        }))
        // comicsObj.comics.length !== 0 && console.log(comicsObj.offset);
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        // itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        // itemRefs[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }
    useEffect(() => {
        onRequest(comicsObj.offset, true)
        
    }, [])

    const { comics, newListLoading, offset, comicsEnded } = comicsObj;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {loading && !newListLoading ? <Spinner /> :
            (
                <ul className="comics__grid">
                    {comics && comics.map(({ id, title, src, price }, i) => {
                        return (
                            <li 
                                key={id+i}
                                tabIndex={0} 
                                ref={elem => itemRefs.current[i] = elem}
                                className="comics__item"
                                onClick={() => {
                                    focusOnItem(i)
                                }}
                                        // onKeyPress={(e) => {
                                        //     if (e.key === ' ' || e.key === "Enter") {
                                        //         focusOnItem(i);
                                        //     }}}
                                >
                                <Link to={`/comics/${id}`}>
                                    <img src={src} alt={title} className="comics__item-img"/>
                                    <div className="comics__item-name">{title}</div>
                                    <div className="comics__item-price">{price}$</div>
                                </Link>
                            </li> 
                        )
                    })}
                </ul>)}
            <button 
                disabled={newListLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() =>onRequest(offset)}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;