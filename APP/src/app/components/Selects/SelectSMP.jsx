import React,{useState} from 'react';
import { ChevronDownIcon} from "@heroicons/react/20/solid";

const SelectSMP = ({options,option,handleChange,name}) => {  
    const [view, setview] = useState(false);           
    
    const handleChanges = (e) => {                
        const { value, label} = e       
        handleChange(name,value,label)
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
          className="h-7 w-full flex">
                <div className="h-7 border-gray-300 border-l border-t border-b w-full items-center flex pl-2 text-[10px] text-gray-500 bg-white rounded-l">
                {option} 
                </div>
                <div className="h-7 w-8 flex">              
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
                onClick={()=>handleChanges(it)}>
                    {it.label}</li>                
            ))}         
            </ul>   
            }
     
      </div>                
    );
}

export default SelectSMP;
