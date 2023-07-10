import React,{useState} from 'react';
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const SelectUnit = ({options,option,handleChange,name}) => {  
    const [view, setview] = useState(false);           
    const handleChanges = (e) => {        
        const { textContent} = e.target        
        handleChange(name,textContent)
        setview(false)
    } 
    const handleExit = () =>{
        if(view){
          setview(false)         
        }      
      } 
    return (  
    <div className="h-7 inline-block items-center w-7/12 text-[10px]">
       <button 
        type="button"
        onClick={() => setview(!view)}
        className="h-7 w-full flex border items-center justify-center rounded">
            <div className="h-6 w-11/12 items-center flex pl-2 text-gray-500 bg-white">
                {option} 
            </div>     
            <div className="h-6 w-7 flex bg-gray-50 items-center justify-center hover:bg-gray-200">
                <ChevronDownIcon className="h-5 text-gray-600" />
            </div> 
       </button>
       {view &&
            <ul 
            onMouseLeave={() => handleExit()}
            className="absolute z-10 -mt-1 w-10 border bg-gray-50 rounded shadow-lg p-2">
                { options.map((it, index) => (
                    <li                      
                    key={index}
                    className="h-6 items-center flex text-gray-700 hover:bg-gray-100"
                    onClick={(e)=>handleChanges(e)}>
                    {it.value}</li>                
                ))}         
            </ul>    
        }
    </div>                  
    );
}

export default SelectUnit;

