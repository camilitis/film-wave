import { useNavigate, useParams } from 'react-router-dom'
import { Button, Link, Image, Chip, Card, Tooltip } from '@nextui-org/react';
import useFetchMovie from '../hooks/useFetchMovie';
import SpinnerDiv from '../components/spinner';
import { useState } from 'react';

function MoviePage(){
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id

  const { moviedata } = useFetchMovie(id)

  const [showall, setshowall] = useState(false)

  //!!!SHOWALL

  return(
    <section>
      {moviedata ? 
        <section className="movie-grid">
          <div className="movie-grid-header-buttons">
            <Link>
              <Button
                size="sm"
                variant="bordered"
                color="primary"
                style={{fontWeight: "600"}}
                onPress={() => window.history.back()}
              >
                ← Go back
              </Button>
            </Link>

            <Link href='/'>
              <Button variant="bordered" color="primary" size="sm" style={{fontWeight: "600"}}>
                Home
              </Button>
            </Link>
          </div>

          <h2 className="movie-grid-header-title">
            <span>{moviedata.title} {moviedata.original_title === moviedata.title ? '' : `(${moviedata.original_title})`}</span>
          </h2>


          <div className="p-3 flex flex-row">
            <div>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${moviedata.poster_path}`}
                alt={moviedata.title}
                width={500}
              />
            </div>

            <div className="flex flex-col w-full px-6">
              <div className="flex flex-row w-full justify-center items-center">
              <Chip color="warning" variant="flat" size="lg">
                ★{moviedata.vote_average.toFixed(1)}
              </Chip>
                <h3 className="font-semibold px-3">{moviedata.release_date.substring(0, 4)}</h3>
                <h3>Directed by <Link size="md"><span className="font-semibold">{moviedata.credits.crew.filter(({job})=> job ==='Director')[0].name}</span></Link></h3>
              </div>

              {moviedata.tagline ? <h4 className="py-2 font-semibold text-xl text-center">{moviedata.tagline}</h4> : null}

              <p>Runtime: {moviedata.runtime} minutes</p>

              <p>{moviedata.overview}</p>

              <div className="flex flex-row justify-center py-3 flex-wrap">
                {moviedata.genres.map((genre) => 
                  <Chip variant='bordered' key={genre.id} className="mx-1">
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

          <section className="mb-3">
            <h3>Cast</h3>

              <div className="flex flex-row flex-wrap">
                {moviedata.credits.cast.filter((item, index) => index < (showall ? 100 : 10)).map((cast) =>
                  <Link href={`/actor/${cast.id}`} key={cast.id}>
                    <Tooltip content={cast.character}>
                      <Chip style={{margin: "2px"}} key={'cast' + cast.id}>{cast.name}</Chip>
                    </Tooltip>
                  </Link>
                )}
                  {!showall && <Chip onClick={() => setshowall(!showall)} style={{margin: "2px", cursor: "pointer"}}>Show All...</Chip>}
              </div>
          </section>

        {moviedata.recommendations.results.length !== 0 ? 
          <section className="mb-2">
            <h3>Recommended Movies</h3>

              <div className="flex flex-row overflow-x-scroll container-margin">
                {moviedata.recommendations.results.map((movie) =>
                  <div 
                    key={'recommended' + movie.id}
                    className="flex"
                  >
                    <Link 
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                    >
                      <Chip color="warning" variant="shadow" className="absolute z-40 top-0 -left-3">
                        ★{movie.vote_average.toFixed(1)}
                      </Chip>
                      <div key={movie.id} className="p-5 card-container">
                        <Card isPressable isHoverable>
                          <Image
                            classNames="m-5 dashboard-movie-img"
                            isBlurred
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            width={190}
                          />
                        </Card>
                        <p>{movie.title}</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
          </section>
        : null}

        </section>
      : <SpinnerDiv/>}
    </section>
  )
}

export default MoviePage