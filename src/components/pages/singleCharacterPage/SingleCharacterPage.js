import './singleCharacterPage.scss';
import { Helmet, HelmetData } from 'react-helmet-async';

const SingleCharacterPage = ({data}) => {
    const helmetData = new HelmetData({});

    const {name, description, thumbnail} = data;

    return (
        <>
            <Helmet helmetData={helmetData}>
                <meta
                name="description"
                content={`${name}'s page`}
                />
                <title>{name}'s page</title>
            </Helmet>
            <div className="single-char">
                <img src={thumbnail} alt={name} className="single-char__char-img"/>
                <div className="single-char__info">
                    <h2 className="single-char__name">{name}</h2>
                    <p className="single-char__descr">{description}</p>
                </div>
            </div>
        </>
        
    )
}

export default SingleCharacterPage;