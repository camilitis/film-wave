import { useParams, useNavigate } from 'react-router-dom'
import { Link, Card, Image, Pagination, Chip, Select, SelectItem } from '@nextui-org/react';

import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import SpinnerDiv from '../components/spinner';

function DashboardPage(){
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id
  const [pagenumber, setpagenumber] = useState(1)

  const [moviesDashboard, setMoviesDashboard] = useState(null)

  const [title, settitle] = useState(null)
  const [totalpages, settotalpages] = useState(1)

  const [genreselected, setgenreselected] = useState(null)

  const { upcomingmovies, nowshowingmovies, popularmovies, topratedmovies, genreslist } = useFetch(pagenumber, genreselected)

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
      }else if(id === 'toprated'){
        setMoviesDashboard(topratedmovies.results)
        document.title = 'Top Rated Movies | FilmWave'
        settitle("Top Rated Movies")
        settotalpages(topratedmovies.total_pages)
      }
    }
  }, [id, upcomingmovies, nowshowingmovies, popularmovies, topratedmovies])

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
      <section className="py-2 max-[600px]:p-0">
        <div className="flex flex-row max-[600px]:flex-col">
          <h2 className="py-3 max-[600px]:p-0 max-[600px]:mb-1 uppercase font-semibold w-full">{title}</h2>

          {genreslist && 
            <div className="flex w-full justify-end max-[600px]:mb-4">
              <Select
                label="Genre" 
                // className="max-w-xs"
                aria-label="Genres"
                size="sm"
                defaultSelectedKeys="0"
                onChange={handleSelectionChange}
              >
                  <SelectItem key="0" value="All"
                  aria-label="All">
                    <span style={{fontWeight: "600"}}>All</span>
                  </SelectItem>

                {genreslist.map((genre) => (
                  <SelectItem key={genre.id} value={genre.name} 
                  aria-label={genre.name}>
                    {genre.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          }
        </div>

        {moviesDashboard && moviesDashboard.length === 0 ? "No movies to show" : null}

        {moviesDashboard ? 
          <div className="py-2 flex flex-row flex-wrap w-full justify-center max-[541px]:w-11/12 max-[541px]:mx-auto">
            {moviesDashboard.map((movie) => (
              <Link 
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="cursor-pointer max-[830px]:w-40 max-[669px]:w-32 max-[541px]:bg-white"
              >
                <Chip color="warning" variant="shadow" className="absolute z-40 top-0 -left-1">
                  ★{movie.vote_average.toFixed(1)}
                </Chip>
                  <div className="py-2 w-[200px] h-full m-auto">
                    <Card isPressable isHoverable className="m-auto">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        className="photoclass max-[830px]:w-36 max-[830px]:h-52 max-[669px]:w-24 max-[669px]:h-36"
                        onClick={() => navigate(`/movie/${movie.id}`)}
                      />
                    </Card>
                    <p className="text-center">{movie.title}</p>
                  </div>
              </Link>
            ))}

            {moviesDashboard.length === 0 ? null : <Pagination total={totalpages ? totalpages : 1} initialPage={1} page={pagenumber} onChange={setpagenumber} className="flex justify-center py-4 my-1 w-full"/>}
          </div>
        : <SpinnerDiv/> }
      </section>
    </>
  )
}

export default DashboardPage