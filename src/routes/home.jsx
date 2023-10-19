import { Link } from '@nextui-org/react';

import useFetch from '../hooks/useFetch';

import HomeTrending from '../components/home-trending';
import HomeCarousel from '../components/home-carousel';
import HomeSection from '../components/home-section';

function HomePage() {

  const { trendingoftheday, trendingoftheweek, upcomingmovies, nowshowingmovies, popularmovies, topratedmovies } = useFetch()

  return (
    <>
      <section className="flex">
        <HomeTrending
          trendingTitle={'Trending of the day'}
          trendingInfo={trendingoftheday}
        />

        <HomeCarousel
          trendingTitle={'Trending of the week'}
          trendingInfo={trendingoftheweek}
        />
      </section>

      <section className="py-3">
        <div className="flex flex-row justify-between py-2">
          <h3 className="uppercase">Upcoming in theaters</h3>
          <Link href={`/movies/upcoming`} className="underline">View all</Link>
        </div>
          <HomeSection moviesData={upcomingmovies}/>
      </section>

      <section>
        <div className="flex flex-row justify-between py-2">
          <h3 className="uppercase">Now showing</h3>
          <Link href={`/movies/now-showing`} className="underline">View all</Link>
        </div>
          <HomeSection moviesData={nowshowingmovies}/>
      </section>

      <section>
        <div className="flex flex-row justify-between py-2">
          <h3 className="uppercase">Popular</h3>
          <Link href={`/movies/popular`} className="underline">View all</Link>
        </div>
          <HomeSection moviesData={popularmovies}/>
      </section>

      <section className="flex flex-row justify-between">
        <div className="flex flex-col justify-between py-2">
          <h4 className="uppercase">Top Rated Movies</h4>
            <div className="container-margin flex flex-col">
              {topratedmovies ? 
                topratedmovies.map((movie) => (
                  <Link href={`/movie/${movie.id}`} underline="hover" key={movie.id} color="foreground">{movie.vote_average.toFixed(1)}★{movie.title}</Link>
                ))
              : "Loading..."}
            </div>
        </div>
      </section>
    </>
  )
}

export default HomePage