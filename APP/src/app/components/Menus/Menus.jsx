import React from 'react';
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";

const Menus = ({indicador,handleNew, handleEdit}) => {      

    return (       
        <div className="w-full justify-start items-center flex">
            <div className="w-24 flex justify-start flex-row pl-1">
                <button 
                    className={indicador === 0 ? "h-6 w-8 items-center bg-sky-400 text-white justify-center flex  rounded-l": "h-6 w-8 items-center justify-center flex bg-gray-400 text-gray-100 rounded-l cursor-not-allowed"} 
                    onClick={()=>handleNew()}>                    
                    <PlusIcon className="h-4" />
                </button>
                <button 
                    className={indicador > 0 ? "h-6 w-8 rounded-r items-center bg-sky-400 border-r text-white justify-center flex ": "h-6 w-8 items-center bg-gray-300 border-r text-gray-100 justify-center flex rounded-r cursor-not-allowed"} 
                    onClick={()=>handleEdit()}>
                    <PencilIcon className="h-4" />
                </button>                
            </div>     
        </div>
        
    );
}

export default Menus;
