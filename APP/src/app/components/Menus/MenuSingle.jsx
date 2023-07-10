import React from 'react';
import { QrCodeIcon, PlusIcon, PencilIcon, DocumentTextIcon, TrashIcon } from "@heroicons/react/24/outline";


const MenuSingle = ({indicador,handleNew, handleEdit, handleDetail, handleShow,handleTrash,estado}) => {      

    return (       
        <div className="w-full justify-start items-center flex">
            <div className="w-48 flex justify-between flex-row pl-1">
                <button 
                    className={indicador === 0 ? "h-7 w-12 items-center bg-sky-400 text-white justify-center flex  rounded-l": "h-7 w-12 items-center justify-center flex bg-gray-400 text-gray-100 rounded-l cursor-not-allowed"} 
                    onClick={()=>handleNew()}>                    
                    <PlusIcon className="h-4" />
                </button>
                <button 
                    className={indicador > 0 ? "h-7 w-12 items-center bg-sky-400 border-r text-white justify-center flex ": "h-7 w-12 items-center bg-gray-300 border-r text-gray-100 justify-center flex cursor-not-allowed"} 
                    onClick={()=>handleEdit()}>
                    <PencilIcon className="h-4" />
                </button>
                
                <button 
                    className={indicador > 0 ? "h-7 w-12 items-center bg-sky-400 text-white justify-center border-r flex": "h-7 w-12 items-center bg-gray-300 border-r text-gray-100 justify-center flex cursor-not-allowed"} 
                    onClick={()=>handleShow()}>
                    <DocumentTextIcon className="h-4" />                    
                </button>                             

                <button 
                    className={indicador > 0 ? "h-7 w-12 items-center bg-sky-400 text-white justify-center border-r flex": "h-7 w-12 items-center bg-gray-300 border-r text-gray-100 justify-center flex cursor-not-allowed"} 
                    onClick={()=>handleDetail()}>
                    <QrCodeIcon className="h-4" />                    
                </button>                             
                <button 
                    className={indicador > 0 ? "h-7 w-12 items-center bg-sky-400 text-white justify-center flex rounded-r": "h-7 w-12 items-center bg-gray-300 border-r text-gray-100 justify-center flex rounded-r cursor-not-allowed"} 
                    onClick={()=>handleTrash()}>
                    <TrashIcon className="h-4" />
                </button>
            </div>     
        </div>
        
    );
}

export default MenuSingle;
