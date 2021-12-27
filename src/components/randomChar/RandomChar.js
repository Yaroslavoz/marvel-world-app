import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = () => {
   const [stateObj, setState] = useState({
    char: {},
    loading: true,
    error: false
})
    

    const onError = () => {
        setState(state => ({...state, error: true, loading: false}))
    }

    const marvelService = new MarvelService();

    const onCharLoaded = (char) => {
        setState(state => ({...state, char, loading: false}))
    }

    const onCharLoading = () => {
        setState(state => ({
            ...state,
            loading: true
        }))
    }

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        onCharLoading();
        marvelService
            .getOneCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    useEffect(() => {
        updateChar();
        // const timerId = setInterval(updateChar, 3000)
        return () => {
            // clearInterval(timerId)
        }
    }, [])
    
    

    
        const { char, loading, error} = stateObj;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <RandomView char={char} /> : null;
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button 
                        onClick={updateChar}
                        className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
function RandomView({char}) {
    const { name, description, thumbnail, homepage, wiki } = char;
    return (
    <div className="randomchar__block">
        <img src={thumbnail} alt="Random character" className="randomchar__img"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">Homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
    
}

export default RandomChar;