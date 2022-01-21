const Pacientes = ({ paciente, setEditarPaciente, eliminarPaciente }) => {
  
  // En vez de usar la codificación de punto, se debe utilizar destructuring.
  const {name, owner, email, alta, sintomas, id} = paciente;

  // Función para animar un poco la eliminación utilizada en el botón Eliminar.
  const handlerEliminar = () => {
    const confirmation = confirm('¿Eliminar paciente?');
    if (confirmation) {
      eliminarPaciente(id);
    }
  }

  return(
    <>
      <div className="bg-slate-300 shadow-md px-5 py-10 rounded m-2">
        <p className="font-bold mb-3 text-gray-700 uppercase">Nombre: <span className="font-normal normal-case">{name}</span></p>

        <p className="font-bold mb-3 text-gray-700 uppercase">Propietario: <span className="font-normal normal-case">{owner}</span></p>

        <p className="font-bold mb-3 text-gray-700 uppercase">Email: <span className="font-normal normal-case">{email}</span></p>

        <p className="font-bold mb-3 text-gray-700 uppercase">Fecha de alta: <span className="font-normal normal-case">{alta}</span></p>

        <p className="font-bold mb-3 text-gray-700 uppercase">Síntomas: <span className="font-normal normal-case">{sintomas}</span></p>

        <div className="flex justify-between mt-10">
          <button type="button" className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded" onClick={() => setEditarPaciente(paciente)}>Editar</button>

          <button type="button" className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded" onClick={handlerEliminar}>Eliminar</button>
        </div>
      </div>
    </>
  );
};

export default Pacientes;