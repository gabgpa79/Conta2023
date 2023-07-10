import { CheckIcon, XMarkIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import SelectLocal from '@components/Selects/SelectMultiple'
import { _ctipos } from '@data/dataLoad'



const TableEdits = ({ data, item, handleEdit, handleTrash, handleChanges, handleSave, indicador , handleReset,handleChanged }) => {          

  
  const itemView = (it) =>{
        return(
        <>
        <td className="border text-center  text-gray-700">
          {it.id}
        </td>
        <td className="pl-2  border text-left  text-gray-700">
          {it.codigo}
        </td>
        <td className="pl-2 border text-left  text-gray-700">
          {it.descripcion}
        </td>
        <td className="border text-center  text-gray-700">
          {it.tipo}
        </td>
        <td className="pl-2 border text-center  text-gray-700">
          {it.nivel}
        </td>
        
        <td className="border text-center  text-gray-700">
            <div className="flex justify-center items-center">
              <button onClick={()=> handleEdit(it)}
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

      const itemEdit = (it) =>{
        return(
        <>
        <td className="pl-2  border text-center  text-gray-700">
            {it.id}  
        </td>
        <td className="pl-2  border text-left  text-gray-700">
            <label htmlFor="codigo"></label>
            <input                              
                type="text"
                onChange={handleChanges}                              
                value={item.codigo || ""}
                name="codigo"
                className="h-7 pt-2 pl-2 block border border-gray-300 w-full rounded text-[9px] focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
            /> 
        </td>
        <td className="border text-center  text-gray-700">
            <label htmlFor="descripcion"></label>
            <input                              
                type="text"
                onChange={handleChanges}                              
                value={item.descripcion || ""}
                name="descripcion"
                className="h-7 pt-2 pl-2 block border border-gray-300 w-full rounded text-[9px] focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
            />
        </td>
        <td className="border text-center  text-gray-700">
            <label htmlFor="tipo"></label>
              <SelectLocal
                  options={_ctipos}
                  option={item.tipo || ""}                                    
                  handleChange={handleChanged} 
                  name={"tipo"}
              />
        </td>
        <td className="border text-center  text-gray-700">
            <label htmlFor="nivel"></label>
            <input                              
                type="text"
                onChange={handleChanges}                              
                value={item.nivel || ""}
                name="nivel"
                readOnly={true}
                className="h-7 pt-2 pl-2 block border border-gray-300 w-full rounded text-[9px] focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
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
          <div className="flex-1 mx-auto rounded">
          <table className="border-collapse w-full text-[9px]">
            <thead>
                <tr className="h-7 bg-gray-100 border">
                    <th className="w-1/12 text-stone-600"></th>           
                    <th className="w-3/12 text-stone-600">Código</th>           
                    <th className="w-4/12 text-stone-600">Descripción</th>           
                    <th className="w-2/12 text-stone-600">Tipo</th>
                    <th className="w-1/12 text-stone-600">Nivel</th>           
                    <th className="w-1/12 text-stone-600"></th>           
                </tr>
            </thead>   
            <tbody>                
                  { data.map((ite,index)=> (
                  <tr key={index} className={indicador === ite.id ? "bg-gray-200":"hover:bg-gray-100"}>                    
                    { indicador === ite.id ?
                    itemEdit(ite) :
                    itemView(ite) 
                    }
                  </tr>                                                          
                  ))}  
            </tbody>           
          </table>
          </div>  
                    
        </>
    );
}

export default TableEdits;
