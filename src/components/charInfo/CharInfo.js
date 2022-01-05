import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import setContent from '../../utils/setContent';
// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';
// import Skeleton from '../skeleton/Skeleton';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CharInfo = (props) => {
    const [stateObj, setState] = useState({});

    

    const { getOneCharacter, clearError, process, setProcess } = useMarvelService();
        
    useEffect(() => {
        updateChar();

    }, [props.charId])

    

    const updateChar = () => {
        
        const {charId} = props;
        if(!charId) {
            return;
        }
        clearError();
        getOneCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
        
        
    }
    const onCharLoaded = (char) => {
        setState(char)
    }

    
    // const setContent = (process, char) => {
    //     switch (process) {
    //         case 'waiting':
    //             return <Skeleton />;
    //             break;
    //         case 'loading':
    //             return <Spinner />;
    //             break;
    //         case 'confirmed':
    //             return <View char={char} />;
    //             break;
    //         case 'error':
    //             return <ErrorMessage />;
    //             break;
    //         default:
    //             throw new Error('Unexpected process')
    //             break;
    //     }
    // }
        
        return (
            <div className="char__info">
                {setContent(process, View, stateObj)}
            </div>
        )
    }
    

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics, id} = data;
    const objStyle = thumbnail.slice(-17) === 'not_available.jpg' ? {objectFit: 'contain'} : null;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={objStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 ? (<h6>We haven't found any comics :(</h6>) : (comics.map(({name, resourceURI}) => {
                    const comicId = resourceURI.slice(43)
                    return (
                        <Link  
                            to={`/comics/${comicId}`}
                            key={resourceURI}
                            className="char__comics-item">
                            {name}
                        </Link>
                    )
                }))
            }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number

}

export default CharInfo;