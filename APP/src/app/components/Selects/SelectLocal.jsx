import React,{useState} from 'react';
import { ChevronDownIcon} from "@heroicons/react/20/solid";


const SelectLocal = ({options,option,handleChange,name}) => {  
  const [view, setview] = useState(false);     
    
  const handleChanges = (e,ii) => {             
    const { textContent} = e.target        
    handleChange(name,textContent,ii)
    setview(false)
  }     
       
  const handleExit = () =>{
    if(view){
      setview(false)         
    }      
  } 
    
    
    return (  
      <div className="relative inline-block w-full text-[10px]">     
      <div         
        className="h-7 w-full flex">
          <div className="h-7 border-l border-gray-300 border-t border-b w-11/12 items-center flex pl-2  text-gray-500 bg-white rounded-l">
          {option}  
          </div>              
              <button
                onClick={() => setview(!view)}
                type="button"
                className="h-7 w-6 flex border border-gray-300 items-center justify-center rounded-r hover:bg-gray-200">
              <ChevronDownIcon className="h-5 text-gray-400" />
              </button>
            
        </div> 

        {view &&  
        <ul 
        onMouseLeave={() => handleExit()}
        className="absolute z-10  w-40 border bg-gray-50 rounded shadow-lg p-3">      
          { options.map((it, index) => (
              <li                      
              key={index}
              className="h-6 items-center flex text-gray-700 hover:bg-gray-100"
              onClick={(e)=>handleChanges(e,it.indice)}>
                  {it.label}</li>                
          ))}         
          </ul>   
          }
   
    </div>                  
    );
}

export default SelectLocal;

