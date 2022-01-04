import './singleComicPage.scss';
import { Helmet, HelmetData } from 'react-helmet-async';
import { Link } from 'react-router-dom';



const SingleComicPage = ({data}) => {
  const helmetData = new HelmetData({});
  const { title,  description, pages, src, price, language } = data;
  return (
    <>
      <Helmet helmetData={helmetData}>
        <meta
        name="description"
        content={`${title} comics book`}
        />
        <title>{`${title} comics book`}</title>
      </Helmet>
      <div className="single-comic">
          <img src={src} alt={title} className="single-comic__img"/>
          <div className="single-comic__info">
              <h2 className="single-comic__name">{title}</h2>
              <p className="single-comic__descr">{description}</p>
              <p className="single-comic__descr">{pages} pages</p>
              <p className="single-comic__descr">Language: {language}</p>
              <div className="single-comic__price">{price} $</div>
          </div>
          <Link to="/comics" className="single-comic__back">Back to all</Link>
      </div>
    </>
      
          
      
  )
}

export default SingleComicPage;