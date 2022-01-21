// const Error = ({message}) => {
const Error = ({ children }) => {
  return(
    <div className='px-1 py-2 mb-2 uppercase font-bold rounded bg-red-600'>
      {/* <p className='text-center text-white'>{message}</p> */}
      {children}
    </div>
  );
}
export default Error;