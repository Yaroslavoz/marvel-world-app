import { useState, useEffect, useRef, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './charList.scss';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


const setContent = (process, Component, newListLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return newListLoading ? <Component  /> : <Spinner />;
        case 'confirmed':
            return <Component  />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process')
    }
  }

const CharList = (props) => {
    const { getAllCharacters, process, setProcess } = useMarvelService();

    const [stateObj, setState] = useState({
        list: [],
        newListLoading: false,
        charsOffset: 210,
        charEnded: false
    })

    const onRequest = (offset, initial) => {
        // const offset = this.state.charsOffset + 9;
        // this.myRef.className = 'char__item_selected'
        initial ? 
        setState(state => ({...state,
            newListLoading: false
        }))
        : setState(state => ({...state,
            newListLoading: true
        }));
        getAllCharacters(offset)
            .then(onListLoaded)
            .then(() => setProcess('confirmed'))
    }
    
    const onListLoaded = (list) => {
        let ended = false;
        if (list.length < 9){
            ended = true;
        }
        
        setState((prev) => ({...prev,
            list: [...prev.list, ...list], 
            newListLoading: false,
            charsOffset: prev.charsOffset + 9,
            charEnded: ended
        }))
    }

    
    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        // В теории можно оставить только фокус, и его в стилях использовать вместо класса
        // На самом деле, решение с css-классом можно сделать, вынеся персонажа
        // в отдельный компонент. Но кода будет больше, появится новое состояние
        // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        // this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        // this.itemRefs[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    useEffect(() => {
        onRequest(stateObj.charsOffset, true);
    }, [])
    const { list, newListLoading, charsOffset, charEnded} = stateObj;

    
    const elements = useMemo(() => {
        return setContent(process, () => {
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {list && list.map(({ name, thumbnail, id }, i) => {
                        const objStyle = thumbnail.slice(-17) === 'not_available.jpg' ? {objectFit: 'contain'} : null;
                        return (
                            <CSSTransition key={id} timeout={500} classNames="char__item">
                                <li 
                                    key={id}
                                    ref={elem => itemRefs.current[i] = elem}
                                    tabIndex={0}
                                    className="char__item"
                                    onClick={(e) => {
                                            focusOnItem(i);
                                            props.onSelectedChar(id)}}
                                    onKeyPress={(e) => {
                                        if (e.key === ' ' || e.key === "Enter") {
                                            props.onSelectedChar(id);
                                            focusOnItem(i);
                                        }}}
                                >
                                    <img src={thumbnail} alt={thumbnail} style={objStyle}/>
                                    <div className="char__name">{name}</div>
                                </li> 
                            </CSSTransition>
                    )})}
                </TransitionGroup> 
            </ul>
        );
    }, newListLoading)}, [process])
    

        return (
            <div className="char__list">
                {elements}
                
                <button
                    disabled={newListLoading}
                    style={{ 'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(charsOffset)}
                    className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
                
            </div>
        )
    }
    

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired
}

export default CharList;