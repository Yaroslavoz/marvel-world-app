import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import setContent from '../../utils/setContent';

const RandomChar = () => {
   const [charObj, setChar] = useState({})
    

    const { getOneCharacter, clearError, process, setProcess} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char)
    }


    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getOneCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    useEffect(() => {
        updateChar();
        // const timerId = setInterval(updateChar, 3000)
        return () => {
            // clearInterval(timerId)
        }
    }, [])
    
        return (
            <div className="randomchar">
                {setContent(process, RandomView, charObj)}
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
function RandomView({data}) {
    const { name, description, thumbnail, homepage, wiki } = data;
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