import { useEffect } from "react";
import Pacientes from "./Pacientes";

const ListadoPacientes = ({ paciente, setEditarPaciente, eliminarPaciente }) => {

  useEffect(() => {
    // Solo se mostrará el console log cuando se agregan los nuevos pacientes.
    if (paciente.length > 0) console.log('Nuevo paciente agregado!');
  }, [paciente]);

  return(
    <div className="md:w-1/2 lg:w-3/5">
      {/* Mostrar texto en base a contenido de datos guardados. */}
      {paciente && paciente.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
          <p className="text-xl mt-5 mb-4 text-center">Administrar <span className="text-indigo-600">Pacientes & Citas</span></p>

          <div className="md:h-screen overflow-y-scroll">

            {paciente.map(valor => (
              // Mediante props le enviamos cada valor iterado de los pacientes. Cuando se itera y lista items es imperativo enviar un key único.
              // No se considera buena práctica hacerlo creando un prop key adicional porque impacta en el performance.
              // Una sugerencia es usar el Date.now()
              <Pacientes paciente={valor} key={valor.id} setEditarPaciente={setEditarPaciente} eliminarPaciente={eliminarPaciente} />
            ))}

          </div>
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">Sin Pacientes</h2>
            <p className="text-xl mt-5 mb-4 text-center">Agrega paciente para <span className="text-indigo-600">mostrarlos aquí</span>.</p>
        </>
      )}
    </div>
  )
}

export default ListadoPacientes;