import { useEffect, useState } from 'react';

function useFetchMovie(movieid){
  const [moviedata, setmoviedata] = useState(null)
  const [director, setDirector] = useState(null)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_MOVIES_ACCESS_TOKEN_AUTH}`
    }
  }

  const trailerUrl = `https://api.themoviedb.org/3/movie/${movieid}/videos?language=en-US`
  const recommendationsUrl = `https://api.themoviedb.org/3/movie/${movieid}/recommendations?language=en-US&page=1`
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieid}/credits?language=en-US`
  const providersUrl = `https://api.themoviedb.org/3/movie/${movieid}/watch/providers`

  const getmoviedata = async() => {
    try{
      const moviefetch = await fetch(`https://api.themoviedb.org/3/movie/${movieid}?language=en-US`, options)
      const trailerfetch = await fetch(trailerUrl, options)
      const recommendationsfetch = await fetch(recommendationsUrl, options)
      const creditsfetch = await fetch(creditsUrl, options)
      const providersfetch = await fetch (providersUrl, options)
      const keywordsfetch = await fetch(`https://api.themoviedb.org/3/movie/${movieid}/keywords`, options)

      const movieData = await moviefetch.json()
      const trailerData = await trailerfetch.json()
      const recommendationsData = await recommendationsfetch.json()
      const creditsData = await creditsfetch.json()
      const providersData = await providersfetch.json()
      const keywordsData = await keywordsfetch.json()


      setmoviedata(movieData)
      setmoviedata({...movieData, trailer: trailerData, credits: creditsData, recommendations: recommendationsData, keywords: keywordsData, providers: providersData})

    }catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    getmoviedata()
  },[])

  return { moviedata }
}

export default useFetchMovie