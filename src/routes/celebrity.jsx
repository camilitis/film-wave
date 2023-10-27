import { useNavigate, useParams } from 'react-router-dom'
import { Image, Link, Card, Button, Select, SelectItem } from '@nextui-org/react';
import useFetchCelebrity from '../hooks/useFetchCelebrity';
import SpinnerDiv from '../components/spinner';
import { useEffect, useState } from 'react';

function CelebrityPage(){
  const navigate = useNavigate()
  const params = useParams()
  const id = params.id

  const { actordata } = useFetchCelebrity(id)

  const [selecteddepartment, setselecteddepartment] = useState("0")
  const [showallbiography, setshowallbiography] = useState(false)

  const [actdepartment, setactdepartment] = useState(null)
  const [crewdepartment, setcrewdepartment] = useState(null)

  const [filtereddata, setfiltereddata] = useState(null)

  function joindepartments(){
    const joined = actordata.moviecredits.cast.concat(actordata.moviecredits.crew)
    const identicalremoved = joined.filter((item, index, self) => {
      const isUnique = self.findIndex((obj) => obj.id === item.id) === index
      return isUnique
    })

    return identicalremoved
  }

  useEffect(() => {
    if(actordata && actordata.moviecredits){
      setfiltereddata(joindepartments())
    }
  }, [selecteddepartment === "0", actordata])

  function countdepartment(type){
    const departmentCounts = {}

    type.forEach((project) => {
      const job = project.job
      if (departmentCounts[job]) {
        departmentCounts[job]++
      } else {
        departmentCounts[job] = 1
      }
    })

    const departmentCountArray = Object.entries(departmentCounts).map(([job, count]) => ({
      job,
      count,
    }))

    if(type === actordata.moviecredits.cast){
      setactdepartment(departmentCountArray)
    }else{
      setcrewdepartment(departmentCountArray)
    }
  }

  useEffect(() => {
    if(actordata && actordata.moviecredits){
      if(selecteddepartment === "0"){
        setfiltereddata(joindepartments())
      }else if(selecteddepartment === "Actor"){
        setfiltereddata(actordata.moviecredits.cast)
      }else{
        const filtered = actordata.moviecredits.crew.filter((department) => department.job === selecteddepartment)
        setfiltereddata(filtered)
      }
    }
  }, [selecteddepartment])

  useEffect(() => {
    if(actordata && actordata.moviecredits && actordata.actordetails){
      document.title = actordata.actordetails.name +  " | FilmWave"
      countdepartment(actordata.moviecredits.crew)
      countdepartment(actordata.moviecredits.cast)
    }
  }, [actordata])


  function handleDepartmentChange(event){
    setselecteddepartment(event.target.value)
  }

  useEffect(() => {
    setselecteddepartment("0")
  }, [selecteddepartment === ""])

  return(
    <>
      <div className="movie-grid-header-buttons flex space-around justify-around mr-0 ml-auto w-[200px] w-[200px] max-[600px]:hidden">
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

      <Select
        label="Department"
        className="w-[310px] py-4 max-[600px]:py-2 max-[600px]:w-full"
        aria-label="Department"
        size="sm"
        selectionMode="single"
        value={selecteddepartment}
        onChange={handleDepartmentChange}
        defaultSelectedKeys="0"
      >
        <SelectItem key="0" value="All" aria-label="All">
          All
        </SelectItem>
        {actdepartment && 
          <SelectItem key="Actor" value="Actor" aria-label="Actor">
            Actor - {actdepartment[0].count}
          </SelectItem>
        }
        {crewdepartment && crewdepartment.map((project) => (
          <SelectItem key={project.job} value={project.job}  aria-label={project.job}>
            {project.job} - {project.count}
          </SelectItem>
        ))}
      </Select>

    {actordata && actordata.actordetails && actordata.moviecredits ? 
      <section className="flex flex-col">
        <div className="flex flex-row max-[751px]:flex-col max-[600px]:justify-center">
          <article className="flex flex-row flex-wrap h-full max-[1000px]:justify-center" style={{flexBasis: "74%"}}>
            {filtereddata && filtereddata.map((movie) => (
              <Link 
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="p-1"
              >
                <div className="h-full cursor-pointer w-[160px]" style={{margin: "5px"}}>
                  <Card isPressable isHoverable>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      className="celebrity h-54 max-[930px]:w-40 max-[930px]:h-54 max-[600px]:w-38 max-[600px]:h-30"
                      onClick={() => navigate(`/movie/${movie.id}`)}
                    />
                  </Card>
                  <p>{movie.title}</p>
                  <p style={{color: "grey"}}>{movie.job === undefined ? "Actor" : movie.job}</p>
                </div>
              </Link>
            ))}
          </article>

          <article className="flex flex-col px-2" style={{flexBasis: "26%"}}>
            <Image src={`https://image.tmdb.org/t/p/w200/${actordata.actordetails.profile_path}`} alt={actordata.actordetails.name} className="mb-2 w-[230px]"/>
            <div>
              <h3 className="font-bold" style={{marginBottom: "13px"}}>
                {actordata.actordetails.name}
              </h3>
              <p>
                {showallbiography ? actordata.actordetails.biography : actordata.actordetails.biography.split(' ').slice(0, 40).join(' ')}
                  <span>{showallbiography ? " " : "..."}</span>
                  <Link className="cursor-pointer" onClick={() => setshowallbiography(!showallbiography)}>{showallbiography ? "less" : "more"}</Link>
              </p>
            </div>
          </article>
        </div>
      </section> 
    : <SpinnerDiv/>}
    </>
  )
}

export default CelebrityPage