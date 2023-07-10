import React from 'react';
import { QrCodeIcon, CheckIcon, PlusIcon, PencilIcon, DocumentTextIcon, TrashIcon } from "@heroicons/react/24/outline";

const MenuAction = ({indicador,handleNew, handleEdit, handleDetail, handleShow,handleTrash,handleTicket,estado}) => {      

    return (       
        <div className="w-full justify-start items-center flex">
            <div className="w-48 flex justify-between flex-row pl-1">
                <button 
                    className={indicador === 0 ? "h-7 w-12 items-center bg-sky-400  text-white justify-center flex  rounded-l": "h-7 w-12 items-center justify-center flex bg-gray-400 text-gray-100 rounded-l cursor-not-allowed"} 
                    onClick={()=> indicador === 0 ? handleNew() : null}>                  
                    <PlusIcon className="h-4" />
                </button>
                <button 
                    className={indicador > 0 && estado === false ? "h-7 w-12 items-center bg-sky-300  hover:bg-sky-400 border-r text-white justify-center flex ": "h-7 w-12 items-center bg-gray-300 border-r text-gray-100 justify-center flex cursor-not-allowed"} 
                    onClick={() => estado === false ? handleEdit() : null }>
                    <PencilIcon className="h-4" />
                </button>
                
                <button 
                    className={indicador > 0 ? "h-7 w-12 items-center bg-sky-400 hover:bg-sky-300 text-white justify-center border-r flex": "h-7 w-12 items-center bg-gray-300 border-r text-gray-100 justify-center flex cursor-not-allowed"} 
                    onClick={()=>handleShow()}>
                    <DocumentTextIcon className="h-4" />                    
                </button>

                <button 
                    className={indicador > 0 ? "h-7 w-12 items-center bg-sky-400 text-white justify-center border-r flex": "h-7 w-12 items-center bg-gray-300 border-r text-gray-100 justify-center flex cursor-not-allowed"} 
                    onClick={()=> handleTicket()}>
                    <QrCodeIcon className="h-4" />                    
                </button>                   

                <button 
                    className={indicador > 0 && estado === false ? "h-7 w-12 items-center bg-sky-400 hover:bg-sky-300 border-r text-white justify-center flex": "h-7 w-12 items-center bg-gray-300 border-r text-gray-100 justify-center flex cursor-not-allowed"} 
                    onClick={()=> estado === false ? handleDetail() : null}>                    
                    <CheckIcon className="h-4" />
                </button>                  
                <button 
                    className={indicador > 0 && estado === false ? "h-7 w-12 items-center bg-sky-400  hover:bg-sky-300 text-white justify-center flex rounded-r": "h-7 w-12 items-center bg-gray-300 border-r text-gray-100 justify-center flex rounded-r cursor-not-allowed"} 
                    onClick={()=> estado === false ? handleTrash() : null}>                    
                    <TrashIcon className="h-4" />
                </button>
            </div>     
        </div>
        
    );
}

export default MenuAction;
