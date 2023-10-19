import { useParams } from 'react-router-dom'
import SpinnerDiv from '../components/spinner';

function ActorPage(){
  const params = useParams()
  const id = params.id

  return(
    <section>
      {id}
    </section>
  )
}

export default ActorPage