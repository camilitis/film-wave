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


  return(
    <>
      <section className="py-2 max-[1200px]:py-0">
        <p className="py-3 uppercase max-[1200px]:py-0">FOUND {searchresults ? searchresults.total_results : 0} RESULTS FILMS MATCHING <span className="font-bold">{searchquery}</span></p>

        {moviesDashboard ? 
          <div 
            className="py-2 flex flex-row flex-wrap max-[1200px]"
          >
            {moviesDashboard.map((movie) => (
              <Link 
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="cursor-pointer"
              >
                <Chip color="warning" variant="shadow" className="absolute z-40 top-0 -left-1">
                  ★{movie.vote_average.toFixed(1)}
                </Chip>
                  <div className="p-2 card-container">
                    <Card isPressable isHoverable>
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        width={190}
                        style={{ height: "270px"}}
                        // className="w-190 h-200"
                        onClick={() => navigate(`/movie/${movie.id}`)}
                      />
                    </Card>
                    <p>{movie.title}</p>
                  </div>
              </Link>
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