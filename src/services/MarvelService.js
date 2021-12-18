const API_KEY = 'eaed9dd0375f1dc25ae8305ebfeffc43'

class MarvelService {
  getResource = async (url) => {
    let res = await fetch(url);

    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  }

  getAllCharacters = () => {
    return this.getResource(`https://gateway.marvel.com:443/v1/public/characters?apikey=${API_KEY}`);
  }
}

export default MarvelService;