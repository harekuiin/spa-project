import { useEffect } from "react"

function App() {
    const [planes, setPlanes] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch("http://localhost:8080/api/planes").then(resp=>{  //consume la api, luego se le pasan datos, luego se cargan los datos
            if(!resp.ok) throw new Error("Error al obtener planes")
            return resp.json()
        }).then(data=>{
            setPlanes(data) //carga los datos guardados en "data", en la variable "planes"
            setLoading(false)
        }).catch(err=>{ //manejo de errores
            setError(err.message)
            setLoading(false)
        })
    }, [])  

    //despues del return, {}=> las llaves () se tienen que poner como ()

    return ( //renderizado de los planes
        <div>
            <h1>SPA relax</h1>
            {loading && <p>Cargando planes...</p>}
            {error && <p>Error: {error}</p>}

            <ul>
                {planes.map(plan=>(
                    <li key = {plan.id}>
                        <h3>{plan.nombre}</h3>
                        <p>{plan.descripcion}</p>
                        <strong>{plan.precio}</strong>
                    </li>
                ))} 
            </ul>
        </div>
    )
}

export default App