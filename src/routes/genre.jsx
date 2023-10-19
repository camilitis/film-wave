import { useParams } from 'react-router-dom'

function GenrePage(){
  const params = useParams()
  const id = params.id

  return(
    <>
      <h2>Genre {id} page</h2>
    </>
  )
}

export default GenrePage