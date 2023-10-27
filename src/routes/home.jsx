import { Link } from '@nextui-org/react';

import useFetch from '../hooks/useFetch';

import HomeTrending from '../components/home-trending';
import HomeCarousel from '../components/home-carousel';
import HomeSection from '../components/home-section';
import SpinnerDiv from '../components/spinner';

function HomePage() {

  const { trendingoftheday, trendingoftheweek, upcomingmovies, nowshowingmovies, popularmovies, topratedmovies } = useFetch()

  return (
    <>
      <section className="flex flex-row max-[650px]:flex-col max-[650px]:place-items-center">
        {trendingoftheday && trendingoftheweek ? 
        <>
          <HomeTrending
            trendingTitle={'Trending of the day'}
            trendingInfo={trendingoftheday}
          />

          <HomeCarousel
            trendingTitle={'Trending of the week'}
            trendingInfo={trendingoftheweek}
          />
        </>
        : <SpinnerDiv/>}
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

      <section>
        <div className="flex flex-row justify-between py-2">
          <h3 className="uppercase font-semibold">Top Rated Movies</h3>
          <Link href={`/movies/toprated`} className="underline">View all</Link>
        </div>
          <HomeSection moviesData={topratedmovies}/>
      </section>
    </>
  )
}

export default HomePage