import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setParametro } from '@reducers/gral/parametrosSlice';
import { ChevronDownIcon, XCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Search = ({submitHandles, handleReset, option, options, handleChanges }) => {

  const dispatch = useDispatch()
    const { pBusqueda } = useSelector((state) => state.parametro)
    const [view, setview] = useState(false);
    
    const hReset = () =>{
      dispatch(setParametro(""))
      handleReset()      
    }

    const handleExits = () =>{
      setview(false)        
    }
    const handleChange = (it) =>{
      setview(false)  
      handleChanges(it)      
    }

      
  return (    
    <div className="h-7 border rounded bg-white flex text-[10px] w-full items-center pl-1 pr-1">
      <div className="w-2/6 ">
        <button 
        type="button"
        onClick={() => setview(!view)}
        className="w-full flex border-r">
          <div className="h-7 w-11/12 text-gray-700 items-center flex pl-2 ">
          {option} 
          </div>
          <div className="h-7 w-6 flex items-center justify-center">
            <ChevronDownIcon className="h-4 w-4 text-gray-600"/>
          </div>     
        </button>
        {view &&
          <ul 
          onMouseLeave={() => handleExits()}
          className="absolute z-10 w-20 border bg-gray-50 rounded shadow-lg p-2">
          { options.map((it, index) => (
              <li                      
              key={index}
              className="h-6 items-center flex text-gray-700 hover:bg-gray-100 hover:border-b"
              onClick={(e)=>handleChange(it)}
              >{it.label}</li>                
          ))}         
          </ul>    
        }
      </div>
      <div className="w-4/6 pl-1">
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
    </div>        
  )
}

export default Search