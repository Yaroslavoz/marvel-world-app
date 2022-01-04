import useHttp from "../hooks/http.hook";



const useMarvelService = () => {
  const { request, loading, error, clearError } = useHttp()
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  const _apiKey= 'apikey=eaed9dd0375f1dc25ae8305ebfeffc43';
  const _baseCharOffset = 210;
  // const _baseComicsLimit = 8;
  const _baseComicsOffset = 0;
  
  const getAllComics = async (offset = _baseComicsOffset) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComics)
  }

  const getAllCharacters =async (offset = _baseCharOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter)
  }
  const getOneComic = async (id) => {
    try {
      const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
      return _transformComics(res.data.results[0]);
    } catch (error) {
      return;
    }
    
    
  }

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
}

  const getOneCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }

  const _transformComics = (item) => {
    let descr = (item.description || item.description === "") ? `We don't have description for ${item.title}` : item.description;
    return {
      id: item.id,
      title: item.title,
      description: descr,
      pages: item.pageCount,
      language: item.textObjects.language ? item.textObjects.language : 'en-us',
      src: `${item.thumbnail.path}.${item.thumbnail.extension}`,
      price: item.prices[0].price
    }
  }
  const _transformCharacter = (item) => {
    let descr = item.description.length > 101 ? `${item.description.slice(0, 100)}...` : item.description.length === 0 ? `We don't have description for ${item.name}` : item.description;
    return {
        id: item.id,
        name: item.name,
        description: descr,
        homepage: item.urls[0].url,
        thumbnail: `${item.thumbnail.path}.${item.thumbnail.extension}`,
        wiki: item.urls[1].url,
        comics: item.comics.items.slice(0, 11)

    }
}

  return {loading, error, getAllCharacters, getOneCharacter, getAllComics,getCharacterByName,   getOneComic, clearError}
}

export default useMarvelService;