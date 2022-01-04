import './singleCharacterPage.scss';
import AppBanner from '../../appBanner/AppBanner';
import { Helmet, HelmetData } from 'react-helmet-async';

const SingleCharacterPage = ({data}) => {
    const helmetData = new HelmetData({});

    const storage = data || JSON.parse(localStorage.getItem('charData'));

    const {name, description, thumbnail} = storage[0];

    return (
        <>
            <Helmet helmetData={helmetData}>
                <meta
                name="description"
                content={`${name}'s page`}
                />
                <title>{name}'s page</title>
            </Helmet>
            <AppBanner />
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