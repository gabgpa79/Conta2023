import React,{useState} from 'react';
import { defaultVals  } from '@helpers/functions'
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
const SelectDataValue = ({options,option,handleChange,name,handleDelete}) => {  
    const [view, setview] = useState(false);         
    const sample = defaultVals(options,option)
    
    
    const handleChanges = (value,ll) => {             
      handleChange(name,value,ll)        
      setview(false)
    }     
    const handleDeletes = (value) => {               
      handleDelete(name)        
      setview(false)
  }    
  const handleExit = () =>{
    if(view){
      setview(false)         
    }      
}
    
    
    return (  
      <div className="relative inline-block w-full">     
      <div         
        className="w-full flex">
          <div className="h-7 border-gray-300 border-l border-t border-b w-11/12 items-center flex pl-2 text-[10px] text-gray-500 bg-white rounded-l">
          {sample} 
          </div>
          <div className="h-7 w-14 flex">
            <button
              onClick={() => handleDeletes(name)}
              type="button"
              className="h-7 w-6 border-gray-300 font-bold flex  items-center justify-center border-t border-b ">
              <XMarkIcon className={sample ? "h-5 text-red-400":"h-5 text-white"} />
            </button>
            <button
              onClick={() => setview(!view)}
              type="button"
              className="h-7 w-6 flex border-t border-r border-b border-gray-300 items-center justify-center rounded-r hover:bg-gray-200">
              <ChevronDownIcon className="h-5 text-gray-400" />
            </button>
          </div>          
        </div> 

        {view &&  
        <ul 
        onMouseLeave={() => handleExit()}
        className="absolute z-10 -mt-2 w-40 border bg-gray-50 rounded shadow-lg p-3">      
          { options.map((it, index) => (
              <li                      
              key={index}
              className="text-[10px] h-6 items-center flex text-gray-700 hover:bg-gray-100"
              onClick={()=>handleChanges(it.value,it.label)}>
                  {it.label}</li>                
          ))}         
          </ul>   
          }
   
    </div>                  
    );
}

export default SelectDataValue;

