// Importar Hooks.
import { useState, useEffect } from 'react';
// Importar componentes.
import Header from './components/Header';
import Form from './components/Form';
import ListadoPacientes from './components/ListadoPacientes';

function App() {
  // Este hook recibirá los datos del paciente enviados desde el formulario (Form.jsx).
  const [paciente, setPaciente] = useState([]);

  // Hook para editar paciente.
  const [editarPaciente, setEditarPaciente] = useState({});

  // Cuando no se pasa dependencias al useEffect se ejecuta una única vez. Solo cargará cuando el componente está listo.
  useEffect(() => {
    // Se obtendrá lo que existe en local storage.
    const obtenerPacientesLS = () => {
      // El ternario ?? significa el valor por defecto si la condición no devuelve nada.
      // También se debe convertir el valor a un array para manipularlo y mostrarlo en la app. No olvidar que local storage solo maneja strings.
      const pacientesLocalStorage = JSON.parse(localStorage.getItem('pacientes')) ?? [];

      // Colocar dentro del state los valores del storage.
      setPaciente(pacientesLocalStorage);
    }

    obtenerPacientesLS();
  }, []);

  // LocalStorage
  useEffect(() => {
    // Este código se ejecutará al tener listo el componente y cada vez que cambie su dependencia.
    localStorage.setItem('pacientes', JSON.stringify(paciente));
  }, [paciente])

  const imprimir2mas2 = () => {
    console.log(2 + 2);
  };

  const eliminarPaciente = id => {
    // console.log(`Eliminando paciente ${id}`);
    // No olvidar de utilizar filter() para quitar el item. Es inmutable.
    // En la validación devuelvo el nuevo array con todos los items con id diferente.
    const pacientesActualizados = paciente.filter(pacienteOriginal => pacienteOriginal.id !== id);
    setPaciente(pacientesActualizados);
  }

  return (
    <div className="container mx-auto mt-20">
      {/* Mostrar componente. */}
      {/* Enviar Props en el header */}
      <Header 
        numeros={1}
        isAdmin={false}
        fn={imprimir2mas2}
      />

      <div className="mt-12 md:flex">
        {/* Una buena práctica es definir los props en el mismo orden que se los declara. */}
        <Form 
          paciente={paciente}
          setPaciente={setPaciente}
          editarPaciente={editarPaciente}
          setEditarPaciente={setEditarPaciente}
        />

        <ListadoPacientes paciente={paciente} setEditarPaciente={setEditarPaciente} eliminarPaciente={eliminarPaciente} />
      </div>
    </div>
  )
}

export default App
