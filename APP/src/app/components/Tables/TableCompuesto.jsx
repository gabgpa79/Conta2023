import { CheckIcon, XMarkIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import Moment from 'react-moment'

const TableCompuesto = ({ data, item, handleEdit, handleTrash, handleChanges, handleSave, changeAA, indicador , handleReset }) => {          
    const itemView = (index,it) =>{
        return(
        <>
        <td className="pl-2  border text-center  text-gray-700">
          {it.id}
        </td>
        <td className="pl-2  border text-left  text-gray-700">
        <Moment format="DD-MM-YYYY HH:mm">{it.fecha}</Moment>
        </td>
        <td className="pl-2  border text-left  text-gray-700">
          {it.accion}
        </td>        
        <td className="border text-center  text-gray-700">
            <div className="flex justify-center items-center">
              <button onClick={()=> handleEdit(it,index)}
                className="w-6 h-6 rounded-md border flex items-center justify-center text-gray-100 mr-1">
                <PencilIcon className="h-4 w-4 text-gray-500" />     
              </button>                            
              <button onClick={()=>handleTrash(it.id)}
                      className="w-6 h-6 rounded-md border flex items-center justify-center text-gray-100">
                <TrashIcon className="h-4 w-4 text-gray-500" />     
              </button>
            </div>                       
          </td>
    
        </>)
      }

      const itemEdit = () =>{        
        return(
        <>
        <td className="pl-2  border text-center  text-gray-700">
            {item.id}  
        </td>
        <td className="pl-2  border text-center  text-gray-700">
            <Moment format="DD-MM-YYYY HH:mm">{item.fecha}</Moment> 
        </td>
        <td className="pl-2  border text-left  text-gray-700">
            <label htmlFor="accion"></label>
            <input                              
                type="text"
                onChange={(e) => handleChanges(e.target.value)}
                value={item.accion || ""}
                name="accion"
                className="h-7 pt-2 pl-2 block border border-gray-300 w-full rounded text-[10px] focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
            /> 
        </td>
        
        <td className="border text-center  text-gray-700">
            <div className="flex justify-center items-center">
              <button onClick={()=> handleSave()}
                className="w-6 h-6 mr-1 rounded-md bg-white flex items-center justify-center text-gray-100">
                <CheckIcon className="h-4 w-4 text-green-600" />    
              </button>                            
              <button onClick={()=> handleReset(-1)}
                      className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-gray-100">
                <XMarkIcon className="h-4 w-4 text-red-600" />     
              </button>
            </div>                       
          </td>
    
        </>)
    }

    


    return (
        <>
        <div className="flex-1 mx-auto  rounded">
          <table className="border-collapse w-full text-[10px]">
            <thead>
                <tr className="h-7 bg-gray-100 border">
                    <th className="w-1/12 text-stone-600"></th>           
                    <th className="w-2/12 text-stone-600">Fecha</th>           
                    <th className="w-7/12 text-stone-600">Acción</th>                               
                    <th className="w-2/12 text-stone-600"></th>           
                </tr>
            </thead>   
            <tbody>                
                  { data.map((ite,index)=> (
                  <tr key={index} className={indicador === ite.id ? "bg-gray-200":"hover:bg-sky-50"}>                    
                    { indicador === ite.id ?
                    itemEdit() :
                    itemView(index,ite) 
                    }
                  </tr>                                                          
                  ))}  
            </tbody>           
          </table>
          </div>  
                    
        </>
    );
}

export default TableCompuesto;
