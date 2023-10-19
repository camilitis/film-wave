import { useState, useEffect } from 'react';
import { Card, Image, Skeleton, CardFooter, Link, Pagination } from '@nextui-org/react';

function HomeCarousel({trendingTitle, trendingInfo}){
  const [trendingPag, setTrendingPag] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingPag((prevCount) => (prevCount === 5 ? 0 : prevCount + 1));
    }, 3000)

    return () => clearInterval(interval)
  })

  return (
    <section className="flex">
      {trendingInfo ?
        <>
          <Link 
            href={`/movie/${trendingInfo[trendingPag].id}`}>
            <Card
              isFooterBlurred isPressable isHoverable
              radius="lg"
              className="mx-1 no-select"
            >
              <Image
              
                removeWrapper
                alt="Relaxing app background"
                className="z-0 w-full object-cover"
                src={`https://image.tmdb.org/t/p/w500/${trendingInfo[trendingPag].backdrop_path}`}
              />
                <CardFooter className="flex flex-col justify-between overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-medium z-10 my-1 mx-1">
                  <p className="uppercase font-extrabold glow-text-shadow">{trendingTitle}</p>
                  <h4 className="font-medium text-xl glow-text-shadow">{trendingInfo[trendingPag].original_title}</h4>
                </CardFooter>
            </Card>
          </Link>
          {/* <Pagination total={5} initialPage={trendingPag} onChange={setTrendingPag}/> */}
        </>
          :
          <Card radius="lg" className="mx-1 flex justify-center justify-self-center">
            <Skeleton>
              <div className='example'></div>
            </Skeleton>
          </Card>
      }
    </section>
  )
}

export default HomeCarousel