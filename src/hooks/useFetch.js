import { useEffect, useState } from 'react';

function useFetch(pagenumber, genreid){
  const [trendingoftheday, settrendingoftheday] = useState(null)
  const [trendingoftheweek, settrendingoftheweek] = useState(null)

  const [upcomingmovies, setupcomingmovies] = useState(null)
  const [nowshowingmovies, setnowshowingmovies] = useState(null)

  const [popularmovies, setpopularmovies] = useState(null)

  const [genreslist, setgenreslist] = useState(null)

  const [topratedmovies, settopratedmovies] = useState(null)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_MOVIES_ACCESS_TOKEN_AUTH}`
    }
  }

  console.log(pagenumber)

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
    .then(response => response.json())
    .then(response => settrendingoftheday(response.results))
    .catch(err => console.error(err))

    fetch('https://api.themoviedb.org/3/trending/movie/week?language=en-US', options)
    .then(response => response.json())
    .then(response => settrendingoftheweek(response.results))
    .catch(err => console.error(err))

    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then(response => response.json())
      .then(response => setgenreslist(response.genres))
      .catch(err => console.error(err))


      if(genreid){
        fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pagenumber}&with_genres=${genreid}`, options)
        .then(response => response.json())
        .then(response => setupcomingmovies(response))
        .catch(err => console.error(err))

        fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pagenumber}&with_genres=${genreid}`, options)
        .then(response => response.json())
        .then(response => setnowshowingmovies(response))
        .catch(err => console.error(err))
  
        fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pagenumber}&with_genres=${genreid}`, options)
        .then(response => response.json())
        .then(response => setpopularmovies(response))
        .catch(err => console.error(err))

        fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&${pagenumber}&with_genres=${genreid}`, options)
        .then(response => response.json())
        .then(response => settopratedmovies(response))
        .catch(err => console.error(err))
      }else{
        fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pagenumber === undefined ? 1 : pagenumber}`, options)
        .then(response => response.json())
        .then(response => setupcomingmovies(response))
        .catch(err => console.error(err))

        fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pagenumber}`, options)
        .then(response => response.json())
        .then(response => setnowshowingmovies(response))
        .catch(err => console.error(err))

        fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pagenumber}`, options)
        .then(response => response.json())
        .then(response => setpopularmovies(response))
        .catch(err => console.error(err))

        fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&${pagenumber}`, options)
        .then(response => response.json())
        .then(response => settopratedmovies(response))
        .catch(err => console.error(err))
      }
  }, [pagenumber, genreid])

  return { trendingoftheday, trendingoftheweek, upcomingmovies, nowshowingmovies, popularmovies, genreslist, topratedmovies }
}

export default useFetch