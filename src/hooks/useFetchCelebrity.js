import { useEffect, useState } from 'react';

function useFetchCelebrity(actorid){
  const [actordetails, setactordetails] = useState(null)
  const [moviecredits, setmoviecredits] = useState(null)

  const [actordata, setactordata] = useState(null)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_MOVIES_ACCESS_TOKEN_AUTH}`
    }
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/${actorid}?language=en-US`, options)
      .then(response => response.json())
      .then(response => setactordetails(response))
      .catch(err => console.error(err))

    fetch(`https://api.themoviedb.org/3/person/${actorid}/movie_credits?language=en-US`, options)
      .then(response => response.json())
      .then(response => setmoviecredits(response))
      .catch(err => console.error(err))
  }, [actorid])

  useEffect(() => {
    setactordata({actordetails: actordetails, moviecredits: moviecredits})
  }, [actordetails, moviecredits])

  return { actordata }
}

export default useFetchCelebrity