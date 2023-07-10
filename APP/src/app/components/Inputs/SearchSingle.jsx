import { useState } from 'react'
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchSingle = ({handleSearch, name, items,parametro,setparametro,setparametroId,compuesto}) => {
    const [view, setview] = useState(false);   
    
    const handleReset = () =>{
      setparametro("")
      setparametroId(0)            
      setview(false)
    }
    const handleSearchs = () =>{
        handleSearch(name)
        setview(true)
    }

    const handleExit = () =>{        
        setview(false)
    }

    const handleAsignar = (ite) =>{        
        setparametro(ite.label)
        setparametroId(ite.value)                             
        setview(false)
      }


  return (    
    <div className="flex-col rounded p-1 flex">            
        {name ? <label htmlFor="parametro" className="pl-1 font-bold text-gray-500 text-[10px]">{name}</label>: null}    
                        <div className="flex w-full">
                            <input
                            onChange={(e) => setparametro(e.target.value)}   
                            type="text"
                            name="parametro"
                            value={parametro}
                            className="w-full mr-1 h-7 border border-gray-300 rounded pt-2 pl-2 block text-[10px] focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
                            />
                            <button
                                onClick={() => handleReset()}
                                type="button"
                                className="-ml-16 h-7 w-7 rounded-md font-bold flex  items-center justify-center">
                                <XMarkIcon className={parametro ? "h-5 text-red-400":"h-5 text-white"} />
                            </button>
                            <button
                                onClick={() => handleSearchs()}
                                type="button"
                                className="h-7 w-7 ml-1 font-bold flex  items-center justify-center">
                                <MagnifyingGlassIcon className="h-4 w-4 text-gray-500"/>
                            </button>
                        </div> 
                        { view && items.length > 0 ?
                        <div onMouseLeave={() => handleExit()} className="ml-1 mt-10 absolute w-40 z-10 shadow-md border bg-gray-100 p-1">
                            <table className="border-collapse w-full">
                                <tbody>
                                    {items.map((ite,index)=>(
                                    <tr 
                                    key={index}
                                    onClick={() => handleAsignar(ite)}>                                                                            
                                        <td className="h-6 border-b border-gray-300 text-[10px] text-gray-700 hover:bg-gray-200">{ite.label || ite.razonSocial}</td>                                        
                                    </tr>
                                    ))}                                
                                </tbody>
                            </table>
                        </div>  : null                 
                    }
                  
              </div>     
  )
}

export default SearchSingle