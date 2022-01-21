// Para utilizar props solo se adicionar a la función principal del componente.
// function Header(props) {
// Otra forma de obtener los props es mediante el destructuring de variables.
function Header({numeros, isAdmin, fn}) {
  // console.log(props);
  console.log(numeros, isAdmin);
  fn();
  return(
    <>
      <h1 className="font-black text-4xl text-center md:w-2/3 mx-auto">Seguimiento de Pacientes {''}<span className="text-indigo-600">Veterinaria</span></h1>
    </>
  )
}

export default Header;