// Hooks
import { useState, useEffect } from 'react';
// Components.
import Error from './Error';

const Form = ({ paciente, setPaciente, editarPaciente, setEditarPaciente }) => {
  // El primer elemento es la variable (client), el segundo es el modifier o función (setClient) que modifica unicamente esa variable de client.
  // Las llaves dentro del useState() significan que el valor inicial del state es un objeto vacío.
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [alta, setAlta] = useState('');
  const [sintomas, setSintomas] = useState('');

  // State para mostrar alerta.
  const [errorMsg, setErrorMesg] = useState(false);

  // Use effect.
  useEffect(() => {
    // Validar que el objeto editarPaciente no esté vacío antes de ejecutar.
    if(Object.keys(editarPaciente).length > 0) {
      const { name, owner, email, alta, sintomas } = editarPaciente
      // Setear formulario 
      setName(name);
      setOwner(owner);
      setEmail(email);
      setAlta(alta);
      setSintomas(sintomas);
    }

  }, [editarPaciente]);

  // Generador de ID únicos.
  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return fecha + random;
  };

  // Form submit.
  const handleSubmit = e => {
    e.preventDefault();
    // Validar Form.
    // Se utiliza un array con todas las variables del state y se valida que no tengan un valor vacío.
    if([name, owner, email, alta, sintomas].includes('')) {
      // console.log('Faltan completar campos.');
      // Cambiar estado del mensaje de alerta.
      setErrorMesg(true);
    } else {
      // console.log('Enviando formulario...');
      setErrorMesg(false);
      // Tomando en cuenta que el hook de App.jsx es un array, se debe crear el objeto antes de guardarlo.
      // Gracias a las nuevas actualizaciones de TypeScript si la propiedad del objeto es igual al nombre de la variable no es necesario repetirlo (name: name) solo colocándolo una vez TypeScript lo asocia.
      const objetoPaciente = {
        name,
        owner,
        email,
        alta,
        sintomas,
        // id: generarId() Esta propiedad ya no se usa porque este objeto se aplica a un paciente nuevo y a un existente. Si el paciente es nuevo se tiene que crear el ID al objeto.
      };

      // Validar si estamos agregando un nuevo registro o editándolo.
      if (editarPaciente.id) {
        // console.log('Editando...');
        // El primer paso es igualar el ID del objeto editado con el nuevo objeto que se actualizará.
        objetoPaciente.id = editarPaciente.id

        // objetoPaciente es el objeto acutalizado, mientras editarPaciente es el original.
        // paciente.map es el arreglo con todos los objetos.
        const pacienteActualizado = paciente.map(pacienteOriginal => pacienteOriginal.id === editarPaciente.id ? objetoPaciente : pacienteOriginal);
        
        // Luego de validar y devolver el paciente actualizado se lo debe setar.
        setPaciente(pacienteActualizado);
        // También se limpia el objeto para que no quede trabado.
        setEditarPaciente({});
      } else {
        // console.log('Nuevo registro...');
        // Se genera un nuevo ID y luego se lo crea.
        // Pasar datos del formulario al props. Como se espera que sea un array de objetos, con el fin de evitar rescribir los valores anteriores, se debe tomar la base actual del array e ir añadiendo los nuevos valores.
        // Entonces, se enviará los valores del paciente como un nuevo prop desde App.jsx y se agregará al array.
        objetoPaciente.id = generarId();
        setPaciente([...paciente, objetoPaciente]);
      }

      // Limpiar formulario. SIEMPRE USANDO LOS HOOKS.
      setName('');
      setOwner('');
      setEmail('');
      setAlta('');
      setSintomas('');
    }
  }

  return(
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento de Pacientes</h2>
      <p className="mt-5 mb-5 text-center">Añadir Pacientes / <span className="text-indigo-600 font-bold">Administrar</span></p>

      {/* Formulario */}
      <form className="bg-slate-300 shadow-md rounded py-10 px-5 mb-10 mx-5" onSubmit={handleSubmit}>

        {/* Mensaje de alerta */}
        {/* {errorMsg && <Error message='Todos los campos son obligatorios.' />} */}
        {/* En lugar de pasarle un prop envolvemos el texto entre los tags del componente. */}
        {errorMsg && <Error><p className='text-center text-white'>Todos los campos son obligatorios.</p></Error>}

        <div className="mb-3">
          <label htmlFor="mascota" className="block text-gray-600 font-bold uppercase">Mascota</label>
          <input id="mascota" type="text" placeholder="Nombre de la mascota" className="my-2 w-full border-2 placeholder-indigo-400 rounded" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="propietario" className="block text-gray-600 font-bold uppercase">Propietario</label>
          <input id="propietario" type="text" placeholder="Nombre del propietario" className="my-2 w-full border-2 placeholder-indigo-400 rounded" value={owner} onChange={e => setOwner(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="block text-gray-600 font-bold uppercase">Email</label>
          <input id="email" type="email" placeholder="E-mail" className="my-2 w-full border-2 placeholder-indigo-400 rounded" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="alta" className="block text-gray-600 font-bold uppercase">Fecha de alta</label>
          <input id="alta" type="date" placeholder="Fecha de alta" className="my-2 w-full border-2 placeholder-indigo-400 rounded" value={alta} onChange={e => setAlta(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="sintomas" className="block text-gray-600 font-bold uppercase">Síntomas</label>
          <textarea id="sintomas" placeholder="Especificar síntomas" className="my-2 w-full border-2 placeholder-indigo-400 rounded" rows="5" value={sintomas} onChange={e => setSintomas(e.target.value)} />
        </div>

        <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" value={editarPaciente.id ? 'Editar paciente' : 'Agregar paciente'} />
      </form>
    </div>
  )
}

export default Form;