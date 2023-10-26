import { useNavigate, useParams } from 'react-router-dom'
import { Button, Link, Image, Chip, Card, Tooltip } from '@nextui-org/react';
import useFetchMovie from '../hooks/useFetchMovie';
import SpinnerDiv from '../components/spinner';
import { useEffect, useState } from 'react';

function MoviePage(){
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id

  const { moviedata } = useFetchMovie(id)

  const [showall, setshowall] = useState(false)

  useEffect(() => {
    if(moviedata && moviedata.title){
      document.title = moviedata.title + " | FilmWave"
    }
  }, [moviedata])

  return(
    <>
      {moviedata ? 
        <section>
          <div className="flex space-around justify-around mr-0 ml-auto w-[200px] max-[600px]:hidden">
            <Link>
              <Button
                size="sm"
                variant="bordered"
                color="primary"
                className="font-semibold"
                onPress={() => window.history.back()}
              >
                ← Go back
              </Button>
            </Link>

            <Link href='/'>
              <Button variant="bordered" color="primary" size="sm" className="font-semibold">
                Home
              </Button>
            </Link>
          </div>

          <h2 className="font-semibold text-3xl my-1 max-[600px]:flex max-[600px]:flex-col">
            <span>{moviedata.title} </span>
            <span>{moviedata.original_title === moviedata.title ? '' : ` (${moviedata.original_title})`}</span>
          </h2>


          <div className="p-3 flex flex-row max-[600px]:flex-col">
            <div className="max-[600px]:m-auto max-[600px]:mb-4">
              <Image
                src={`https://image.tmdb.org/t/p/w500/${moviedata.poster_path}`}
                alt={moviedata.title}
                // width={500}
                className="w-[500px] max-[740px]:w-[300px]"
              />
            </div>

            <div className="flex flex-col w-full px-6">
              <div className="flex flex-row w-full justify-center items-center max-[600px]:flex-col max-[600px]:mb-1">
                <div className="flex flex-row justify-center items-center self-center">
                  <Chip color="warning" variant="flat" size="lg">
                    ★{moviedata.vote_average.toFixed(1)}
                  </Chip>
                  <h3 className="font-semibold px-3">{moviedata.release_date.substring(0, 4)}</h3>
                </div>

                {moviedata.credits.crew.filter(({job})=> job ==='Director')[0] && 
                  <h3>Directed by <Link className="cursor-pointer" onClick={() => navigate(`/celebrity/${moviedata.credits.crew.filter(({job})=> job ==='Director')[0].id}`)} size="md"><span className="font-semibold">{moviedata.credits.crew.filter(({job})=> job ==='Director')[0].name}</span></Link></h3>
                }
              </div>

              {moviedata.tagline ? <h4 className="py-2 font-semibold text-xl text-center">{moviedata.tagline}</h4> : null}

              <p><span className="italic">Runtime:</span> {moviedata.runtime} minutes</p>

              <p>{moviedata.overview}</p>

              <div className="flex flex-row justify-center py-3 flex-wrap">
                {moviedata.genres.map((genre) => 
                  <Chip variant='bordered' key={genre.id} className="m-0.5">
                    {genre.name}
                  </Chip>
                )}
              </div>

              {(moviedata.trailer.results && moviedata.trailer.results.length !== 0) &&
                <div className="flex justify-center">
                  <Button
                    href={`https://www.youtube.com/watch?v=${moviedata.trailer.results[0].key}`}
                    as={Link}
                    color="primary"
                    showAnchorIcon
                    variant="solid"
                  >
                    Watch Trailer
                  </Button>
                </div>
              }

            </div>
          </div>

          <section className="mb-2">
            <h3>Cast</h3>

              <div className="flex flex-row flex-wrap max-[600px]:justify-center">
                {moviedata.credits.cast.filter((item, index) => index < (showall ? 100 : 10)).map((cast) =>
                  <Link href={`/celebrity/${cast.id}`} key={cast.id}>
                    <Tooltip content={cast.character}>
                      <Chip className="m-0.5" key={'cast' + cast.id}>{cast.name}</Chip>
                    </Tooltip>
                  </Link>
                )}
                  {!showall && moviedata.credits.cast.length > 10  && <Link><Chip className="cursor-pointer" onClick={() => setshowall(!showall)} style={{margin: "2px"}}>Show All...</Chip></Link>}
              </div>
          </section>

        {moviedata.recommendations.results.length !== 0 && 
          <section className="mb-2">
            <h3>Recommended Movies</h3>

              <div className="flex flex-row overflow-x-scroll container-margin px-4">
                {moviedata.recommendations.results.map((movie) =>
                  <div 
                    key={'recommended' + movie.id}
                    className="flex"
                  >
                    <Link 
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                    >
                      <Chip color="warning" variant="shadow" className="absolute z-40 top-0.5 -left-1.5">
                        ★{movie.vote_average.toFixed(1)}
                      </Chip>
                      <div key={movie.id} className="p-3 w-[200px] h-full max-[740px]:p-2 max-[740px]:px-0 max-[740px]:w-[170px] max-[600px]:mt-0">
                        <Card isPressable isHoverable>
                          <Image
                            isBlurred
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            // width={170}
                            className="w-[170px] h-[246px] max-[740px]:w-[145px] max-[740px]:h-[216px]"
                          />
                        </Card>
                        <p className="max-[740px]:w-[145px]">{movie.title}</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
          </section>
        }
        </section>
      : <SpinnerDiv/>}
    </>
  )
}

export default MoviePage