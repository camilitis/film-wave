import { useParams } from 'react-router-dom'
import { Link, Card, Image, Pagination, Chip, Select, SelectItem } from '@nextui-org/react';

import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';

function DashboardPage(){
  const params = useParams()
  const id = params.id
  const [pagenumber, setpagenumber] = useState(1)

  const [moviesDashboard, setMoviesDashboard] = useState(null)

  const [title, settitle] = useState(null)
  const [totalpages, settotalpages] = useState(1)

  const [genreselected, setgenreselected] = useState(null)

  const { upcomingmovies, nowshowingmovies, popularmovies, genreslist } = useFetch(pagenumber, genreselected)


  useEffect(() => {
    if(upcomingmovies && nowshowingmovies && popularmovies){
      if(id === 'upcoming'){
        setMoviesDashboard(upcomingmovies.results)
        document.title = 'Upcoming Movies | FilmWave'
        settitle("Upcoming Movies")
        settotalpages(upcomingmovies.total_pages)
      }else if(id === 'now-showing'){
        setMoviesDashboard(nowshowingmovies.results)
        settitle("Now Showing Movies")
        document.title = 'Now Showing Movies | FilmWave'
        settotalpages(upcomingmovies.total_pages)
      }else if(id === 'popular'){
        setMoviesDashboard(popularmovies.results)
        document.title = 'Popular Movies | FilmWave'
        settitle("Popular Movies")
        settotalpages(upcomingmovies.total_pages)
      }
    }
  }, [id, upcomingmovies, nowshowingmovies, popularmovies])

  function handleSelectionChange(event){
    if(event.target.value === "0"){
      setgenreselected(null)
    }else{
      setgenreselected(event.target.value)
    }

    setpagenumber(1)
  }

  return(
    <>
      <section className="py-2">
        <div className="flex flex-row">
          <h2 className="py-3 uppercase font-extrabold w-full">{title}</h2>

          {genreslist ? 
            <div className="flex w-full justify-end">
              <Select
                label="Genre" 
                className="max-w-xs"
                aria-label="Genres"
                size="sm"
                defaultSelectedKeys={["0"]}
                onChange={handleSelectionChange}
              >
                  <SelectItem key="0" value="All"
                  aria-label="All">
                    <span style={{fontWeight: "600"}}>Any genre</span>
                  </SelectItem>

                {genreslist.map((genre) => (
                  <SelectItem key={genre.id} value={genre.name} 
                  aria-label={genre.name}>
                    {genre.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          : null}
        </div>

        {moviesDashboard ? 
          <div className="py-2 flex flex-row flex-wrap">
            {moviesDashboard.map((movie) => (
              <span key={movie.id}>
                  <Link 
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                  >
                  <Chip color="warning" variant="shadow" className="absolute z-40 top-0 -left-3">
                    ★{movie.vote_average.toFixed(1)}
                  </Chip>
                    <div key={movie.id} className="p-2 card-container">
                      <Card isPressable isHoverable>
                        <Image
                          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          alt={movie.title}
                          className="m-5"
                          width={190}
                          style={{ height: "276px"}}
                        />
                      </Card>
                      <p>{movie.title}</p>
                    </div>
                  </Link>
              </span>
            ))}

            <Pagination total={totalpages ? totalpages : 1} initialPage={1} page={pagenumber} onChange={setpagenumber} className="flex justify-center w-full py-4 my-1"/>
          </div>
        : "Loading..." }
      </section>
    </>
  )
}

export default DashboardPage