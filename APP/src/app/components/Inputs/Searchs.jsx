import { useDispatch, useSelector } from "react-redux";
import { setParametro } from '@reducers/gral/parametrosSlice';
import { XCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Searchs = ({submitHandles, handleReset }) => {
    const dispatch = useDispatch()
    const { pBusqueda } = useSelector((state) => state.parametro)   
    
    const hReset = () =>{
      dispatch(setParametro(""))
      handleReset()      
    }

  return (    
    <div className="h-7 border rounded bg-white flex text-[10px] w-full items-center pl-1 pr-1">           
        <form onSubmit={submitHandles} className="h-7 flex w-full items-center">                              
            <input
              type="text"
              name="parametro"
              value={pBusqueda}
              placeholder={"...buscar"}
              className="h-6 border-none rounded hover:border-gray-300 text-[11px] pl-6 w-full text-gray-500"
              onChange={(e)=> dispatch(setParametro(e.target.value))}
            />
            <button                   
              className="h-5 w-6 border z-10 -ml-14 border-transparent text-[11px] font-medium rounded-full text-gray-700"
              type="button"
              onClick={()=>hReset()}>                    
              <XCircleIcon className={pBusqueda ? "h-5 w-5 text-red-400":"h-5 w-5 text-white" }/>         
            </button> 
            <button                   
              className="h-5 w-6 z-10 border-transparent text-[11px] font-medium rounded-full text-gray-700">                    
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />          
            </button>
        </form>        
    </div>        
  )
}

export default Searchs