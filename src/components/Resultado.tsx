type DataResponse = {
    id: number;
    name: string;
}

type PropsResultado = {
    data: DataResponse[]
}

const Resultado = ({data} : PropsResultado) => {
    console.log(data);
  return (
    <div>
        {data.map(el => (
            <p>{el.name}</p>)
        )}
    </div>
  )
}

export default Resultado