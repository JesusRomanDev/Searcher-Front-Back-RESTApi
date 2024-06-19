import { useEffect, useState } from 'react'
import axios from 'axios';
import Error from './components/Error';
import Resultado from './components/Resultado';

function App() {

  type DataResponse = {
    id: number;
    name: string;
  }

  const [busqueda, setBusqueda] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<DataResponse[]>([]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios(`http://localhost:3000/search?q=${busqueda}`)
      .then(response => {
        //Como luce lo de abajo {data: Array(1)}
        //Entonces hay que destructurarlo para poder acceder al metodo de .map con data
        console.log(response.data)
        const {data} = response.data 
        console.log(data);
        //Despues de destructurarlo queda asi, entonces ya podemos usar los metodos de array
        // [{…}]
        setData(data);
        setError('');
      })
      .catch(response => setError(response.response.data))
  }

  useEffect(()=>{
    const newPathName = busqueda === '' ? window.location.pathname : `?q=${busqueda}`;

    //Agregame en el historial el ?q=${search}
    window.history.pushState({}, '', newPathName);
    // if(search === ''){
    //     window.history.pushState({}, '', window.location.pathname);
    //     return;
    // }
    // window.history.pushState({}, '', `?q=${search}`);
}, [busqueda]);
  return (
    <>
      {error && (
        <Error error={error} />
      )
      }
      <form onSubmit={handleSubmit} className='mt-5'>
        <input onChange={e => setBusqueda(e.target.value)} type="search" className='rounded border-2 border-gray-400' placeholder='Ingresa tu busqueda...'/>
        <button type='submit'>Buscar</button>
      </form>

      <div>
        {data && (
          <Resultado data={data} />
        )}
      </div>
    </>
  )
}

export default App
