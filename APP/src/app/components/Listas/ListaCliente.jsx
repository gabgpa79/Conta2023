import { apiUrl } from '@helpers'
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";


  const ListaCliente = ({data }) => {

    return (
        <>
          <div className="h-430 w-full flex-1  p-1 border justify-center">                            
            { data.map((item,index)=>(
                <div key={index} className="w-56 m-1 float-left rounded border-2 shadow-md">
                    <div className="h-7 text-[10px] text-gray-700 flex">   
                        <div className='w-5/6 flex items-center pl-2 text-ellipsis truncate ...'>
                           {item.cliente} 
                        </div>    
                        <div className='w-1/6 flex items-center justify-center'>
                        { item.estado === "cerrado" ? <CheckCircleIcon className="h-6 w-6 text-gray-500" />:
                          <XCircleIcon className="h-6 w-6 text-red-500" />                              
                        }
                        
                        </div>    
                    </div> 
                    <div className="flex flex-row border">   
                        <div className="w-2/6 bg-gray-200 flex justify-center items-center">   
                            <img alt=".."
                             className="h-10 w-10"          
                             src={`${apiUrl}static/images/clientes/sm/` + item.filename}
                            /> 
                        </div>
                        <div className="w-4/6 text-[10px]  text-gray-600">                            
                            <p className="h-5 p-1 border-b">Tipo : {item.tipo}</p>
                            <p className="h-5 p-1   ">Fecha : {item.fecha}</p>                            
                        </div>
                    </div>
                    <div className="h-7 bg-gray-50 p-2 text-[10px] text-gray-700 text-ellipsis truncate ...">   
                        {item.detalle}
                    </div>   
                </div>                                                             
            ))}    
          </div>  
                    
        </>
    );
}

export default ListaCliente;
