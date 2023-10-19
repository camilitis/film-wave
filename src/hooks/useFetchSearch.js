import { useEffect, useState } from 'react';

function useFetchSearch(searchquery, pagenumber){
  const [searchresults, setsearchresults] = useState(null)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_MOVIES_ACCESS_TOKEN_AUTH}`
    }
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchquery}&language=en-US&page=${pagenumber}`, options)
    .then(response => response.json())
    .then(response => setsearchresults(response))
    .catch(err => console.error(err))
  }, [searchquery, pagenumber])

  return { searchresults }
}

export default useFetchSearch