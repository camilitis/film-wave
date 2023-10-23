import { useNavigate, useParams } from 'react-router-dom'
import { Image, Link, Card, Button, Select, SelectItem, Chip } from '@nextui-org/react';
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
      <div className="movie-grid-header-buttons mb-2">
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

      <Select
        label="Department"
        className="max-w-xs py-4"
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
        <div className="flex flex-row">
          <article className="flex flex-row flex-wrap h-full" style={{flexBasis: "68%"}}>
            {filtereddata && filtereddata.map((movie) => (
              <Link 
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <div className="h-full cursor-pointer" style={{width: "160px", margin: "5px"}}>
                  <Card isPressable isHoverable>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      className="m-5"
                      width={145}
                      style={{height: "215px"}}
                      onClick={() => navigate(`/movie/${movie.id}`)}
                    />
                  </Card>
                  <p>{movie.title}</p>
                  <p style={{color: "grey"}}>{movie.job === undefined ? "Actor" : movie.job}</p>
                </div>
              </Link>
            ))}
          </article>

          <article className="flex flex-col px-6 mb-2" style={{flexBasis: "30%"}}>
            <Image src={`https://image.tmdb.org/t/p/w200/${actordata.actordetails.profile_path}`} alt={actordata.actordetails.name} width={300} height={300} className="mb-2"/>
            <div>
              <h3 style={{marginBottom: "13px", fontWeight: "bold"}}>
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