import { useState, useCallback } from 'react';

const useHttp = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'} ) => {
    setLoading(true);

    try {
      const res = await fetch(url, {method, body, headers});
      if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }

      const data = await res.json();
      setLoading(false);
      return data;

    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  }, [])

  const clearError = useCallback(()=> setError(null),[])


  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(json => {
  //       setLoading(false)
  //       setData(json)})
  //     .catch(err => {
  //       setLoading(false);
  //       setError(true)
  //     })
  // }, [url])

return { request, loading, error, clearError }

}

export default useHttp;