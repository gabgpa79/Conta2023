import React,{useState} from 'react';
import { BarsArrowDownIcon,  CheckIcon } from "@heroicons/react/24/outline";

const SelectIndex = ({options,option,handleChange}) => {  
    const [view, setview] = useState(false);           
    const handleChanges = (e) => {        
        const { textContent} = e.target            
        handleChange(textContent)
        setview(false)
      
    }  
    return (  
    <div className="h-7 inline-block items-center w-8 text-[10px] ">
        <button 
        onClick={() => setview(!view)} 
        className='h-7 w-8 border border-gray-300 flex items-center rounded justify-center hover:bg-gray-100'>
            <BarsArrowDownIcon className="h-5 w-5 text-gray-500" />
        </button>
        {view &&
      <ul className="absolute z-10 -mt-1 w-32 border bg-gray-50 rounded shadow-lg p-2">
          { options.map((it, index) => {
             if(index > 0){
              return <li                      
              key={index}
              className="text-[10px] h-6 items-center flex text-gray-700 hover:bg-gray-100 justify-between"
              onClick={(e)=>handleChanges(e)}>
                  {it.field} 
                  {
                  it.est === "visible" ?
                  <CheckIcon className="h-5 w-5 text-green-400 mr-1 " />
                  : null
                  }
              </li>                   
          }   
          return null                    
        })}         
      </ul>    
    }
    </div>                  
    );
}

export default SelectIndex;