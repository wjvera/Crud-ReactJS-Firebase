import React, {useEffect, useState} from 'react'
import {firebase} from './Firebase'


function App() {

  //hook para recibir la data de la bd
  const [task, setTask] = useState([])

  //hook para poder manejar el input internamente
  const [newtask, setNewtask] = useState('')

  //hook para cambiar el estado del formulario
  const [editar, setEditar] = useState(false)

  const [stateid, setStateid] = useState('')

  useEffect(()=>{

    const peticionFirebase = async() =>{

        try {

          const db = firebase.firestore()
          const data = await db.collection('tareas').get()
          const guaradarData = data.docs.map(devolver =>(
            {id: devolver.id, ...devolver.data()}
          ))
          console.log(guaradarData) 
          setTask(guaradarData)

        } catch (error) {
          console.log(error)
        }
    }

    peticionFirebase()
}, [])


const agregar = async(e) =>{

  e.preventDefault()
  if(newtask.trim().length > 3 || !newtask.trim()){
    console.log(newtask)
  }else{
    alert('ingrese una tarea correcta')
  }

  try {
      const db = firebase.firestore()
      const nuevaTarea = {
        nombre : newtask,
        fecha: Date.now()
      }
      const data = await db.collection('tareas').add(nuevaTarea)
      setTask([
        ...task, 
        {...nuevaTarea, id:data.id}
      ])
      setNewtask('')
  } catch (error) {
    console.log(error)
  }
  
}


const eliminar = async(id) =>{
  try {
    const db = firebase.firestore()
    await db.collection('tareas').doc(id).delete()

    const arrayFiltrado = task.filter(filtrar => filtrar.id !== id)
    setTask(arrayFiltrado)
    
  } catch (error) {
    console.log(error)
  }
}



const activarTareaTrue = (recibir)=>{
  setEditar(true) //poner el true el formulario
  setNewtask(recibir.nombre) //mandar el nombre al input del formulario
  setStateid(recibir.id)//guardar el id en un nuevo state
}

const editarTarea = async(e) =>{

  e.preventDefault()
  if(newtask.trim().length > 3 || !newtask.trim()){
    console.log(newtask)
  }else{
    alert('edite algo que sea coherente')
  }

  try {
    const db = firebase.firestore()
    await db.collection('tareas').doc(stateid).update({
      nombre: newtask
    })

    const arrayEditado = task.map(devolver => (
      devolver.id === stateid ? {stateid: devolver.id, fecha: devolver.fecha, nombre: newtask} : devolver
    ))

    setTask(arrayEditado) //cuando esto ya este limpiando

    //vamos a limpiar los siguientes campos
    setEditar(false) 
    setNewtask('') 
    setStateid('')
    
  } catch (error) {
    console.log(error)
  }


}

  return (
    <div className="container mt-5 ">
      <h1 className="text-center">Crud en React y FireBase</h1>
      <hr />
      <div className="row">

        <div className="col-md-6">
          <ul className="list-group">
            {
              task.map( devolver=>(
                <li key = {devolver.id} className = "list-group-item">
                  {devolver.nombre} → {devolver.fecha}

                  <button className="btn btn-danger btn-sn float-end"
                  onClick = {()=>eliminar(devolver.id)}
                  >
                    Eliminar
                  </button>

                  <button className="btn btn-warning btn-sn float-end mx-2"
                   onClick = {()=> activarTareaTrue(devolver)}
                  >
                    Editar
                  </button>
                </li>
              ))
            }
          </ul>
        </div>

        <div className="col-md-6">
          <h3>
            {
              editar ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h3>
          <form onSubmit={ editar ? editarTarea : agregar}>
              <input 
                  type="text"
                  placeholder = "Escriba su tarea"
                  className = "form-control mb-2"
                  onChange = {(e)=> setNewtask(e.target.value)}
                  value = {newtask} 
              />
              
                <button
                      className={
                        editar ? 'btn btn-warning btn-block':'btn btn-dark btn-block'
                      }
                      type="submit"
                >
                {
                  editar ? 'Editar':'Agregar'
                }
              </button>
              
          </form>
        </div>


      </div>
    </div>
  );
}

export default App;
