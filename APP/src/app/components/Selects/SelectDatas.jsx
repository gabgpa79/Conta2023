import React,{useState} from 'react';
import { defaultVals  } from '@helpers/functions'
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

const SelectDatas = ({options,option,handleChange,name,handleDelete}) => {  
    const [view, setview] = useState(false);         
    const sample = defaultVals(options,option)
    
    
    const handleChanges = (value,label) => {       
      /*console.log(value)     */
      handleChange(name,value,label)        
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
      <div className="relative w-full text-[10px] border border-gray-300 rounded hover:border-gray-400">
        <div className="h-7 w-full flex">
          <div className="h-7 rounded w-full items-center flex pl-2 text-[10px] text-gray-500 bg-white">
          {sample} 
          </div>
          
          <div className='flex'>
            <button
              onClick={() => handleDeletes(name)}
              type="button"
              className="h-7 w-6 font-bold flex  items-center justify-center">
              <XMarkIcon className={sample ? "h-5 text-red-300":"h-5 text-white"} />
            </button>
            <button
              onClick={() => setview(!view)}
              type="button"
              className="h-7 w-6 flex items-center justify-center">
              <ChevronDownIcon className="h-5 text-gray-600" />
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

export default SelectDatas;

