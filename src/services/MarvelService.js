


class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiKey= 'apikey=eaed9dd0375f1dc25ae8305ebfeffc43';
  _baseCharOffset = 210;
  

  getResource = async (url) => {
    let res = await fetch(url);

    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  }

  getAllCharacters =async (offset = this._baseCharOffset) => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
    return res.data.results.map(this._transformCharacter)
  }
  getOneCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }

  _transformCharacter = (item) => {
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
}

export default MarvelService;