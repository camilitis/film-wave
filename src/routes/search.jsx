import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { Link, Card, Image, Pagination, Chip } from '@nextui-org/react';
import SpinnerDiv from '../components/spinner';
import useFetchSearch from '../hooks/useFetchSearch';

function SearchPage(){
  const navigate = useNavigate()
  const params = useParams()
  const searchquery = params.id
  const [pagenumber, setpagenumber] = useState(1)

  const [moviesDashboard, setMoviesDashboard] = useState(null)

  const { searchresults } = useFetchSearch(searchquery, pagenumber)

  useEffect(() => {
    document.title = `Search Results for ${searchquery} | FilmWave`

    if(searchresults){
      setMoviesDashboard(searchresults.results)
    }
  }, [searchquery, searchresults])

  useEffect(() => {
    setpagenumber(1)
  }, [searchquery])

  function handleLink(id){
    navigate(`/movie/${id}`)
  }

  return(
    <>
      <section className="py-2">
        <p className="py-3 uppercase font-extrabold">FOUND {searchresults ? searchresults.total_results : 0} RESULTS FILMS MATCHING <span style={{ fontWeight: "600"}}>{searchquery}</span></p>

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

          {searchresults.total_pages > 1 && 
            <Pagination total={searchresults.total_pages} initialPage={1} page={pagenumber} onChange={setpagenumber} className="flex justify-center py-4 my-1 w-full"/>}
          </div>
        : 
          <SpinnerDiv/>
        }
      </section>
    </>
  )
}

export default SearchPage