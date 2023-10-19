import { Card, Image, Link } from '@nextui-org/react';

function HomeSection({moviesData}) {

  return (
    <>
    {moviesData ?
      <div className="flex flex-row overflow-x-scroll container-margin">
        {moviesData.results.map((movie) => (
          <Link 
            key={movie.id}
            href={`/movie/${movie.id}`}
          >
            <div key={movie.id} className="p-2 card-container">
              <Card isPressable isHoverable>
                <Image
                  classNames="m-5 dashboard-movie-img"
                  isBlurred
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              </Card>
              <p>{movie.title}</p>
            </div>
          </Link>
        ))}
      </div>
    : "Loading..."
    }
    </>
  )
}

export default HomeSection