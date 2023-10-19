import { Card, Image, Skeleton, CardFooter, Link } from '@nextui-org/react';

function HomeTrending({trendingTitle, trendingInfo}){
  return (
    <section className="flex">
      {trendingInfo ?
        <Link 
          href={`/movie/${trendingInfo[0].id}`}>
          <Card
            isFooterBlurred isPressable isHoverable
            radius="lg"
            className="mx-1 no-select"
          >
            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full object-cover"
              src={`https://image.tmdb.org/t/p/w500/${trendingInfo[0].backdrop_path}`}
            />
              <CardFooter className="flex flex-col justify-between overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-medium z-10 my-1 mx-1">
                <p className="uppercase font-extrabold glow-text-shadow">{trendingTitle}</p>
                <h4 className="font-medium text-xl glow-text-shadow">{trendingInfo[0].original_title}</h4>
              </CardFooter>
          </Card>
        </Link>
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

export default HomeTrending