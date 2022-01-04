import { useState } from "react";
import { Helmet, HelmetData } from 'react-helmet-async';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharSearchForm from "../charSearchForm/CharSearchForm";

const MainPage = () => {
  const helmetData = new HelmetData({});
  const [selectedChar, setSelectedChar] = useState(null)

  const onSelectedChar = (id) => {
        setSelectedChar(id)
    }

  return (
    <>
      <Helmet helmetData={helmetData}>
        <meta
        name="description"
        content="Marvel information portal"
        />
        <title>Marvel information portal</title>
      </Helmet>
      <RandomChar/>
      <div className="char__content">
          <CharList onSelectedChar={onSelectedChar}/>
          <div>
            <ErrorBoundary>
                <CharInfo charId={selectedChar}/>
            </ErrorBoundary>
            <ErrorBoundary>
              <CharSearchForm />
            </ErrorBoundary>
          </div>
          
      </div>
      <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  )
}

export default MainPage;