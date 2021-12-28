import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null)

  const onSelectedChar = (id) => {
        setSelectedChar(id)
    }

  return (
    <>
      <RandomChar/>
      <div className="char__content">
          <CharList onSelectedChar={onSelectedChar}/>
          <ErrorBoundary>
              <CharInfo charId={selectedChar}/>
          </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  )
}

export default MainPage;