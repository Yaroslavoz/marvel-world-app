import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import { useState, useEffect } from 'react';

const CharInfo = (props) => {
    const [stateObj, setState] = useState({
        char: {},
        loading: false,
        error: false
    });

    const onError = () => {
        setState(state => ({...state, error: true, loading: false}))
    }

    const marvelService = new MarvelService();
        
    useEffect(() => {
        updateChar();
    }, [props.charId])

    

    const updateChar = () => {
        const {charId} = props;
        if(!charId) {
            return;
        }
        onCharLoading();
        marvelService
            .getOneCharacter(charId)
            .then(onCharLoaded)
            .catch(onError);
        
        
    }
    const onCharLoaded = (char) => {
        setState(state => ({...state, char, loading: false}))
    }

    const onCharLoading = () => {
        setState(state => ({
            ...state,
            loading: true
        }))
    }

        const { char, loading, error} = stateObj;
        const skeleton = Object.keys(char).length !== 0 || loading || error ? null : <Skeleton />; 
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || Object.keys(char).length === 0) ? <View char={char} /> : null;
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
    

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
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
                {/* In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda. */}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 ? (<h6>We haven't found any comics :(</h6>) : (comics.map(({name, resourceURI}) => {
                    return (
                        <li 
                            key={resourceURI}
                            className="char__comics-item">
                            {name}
                        </li>
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