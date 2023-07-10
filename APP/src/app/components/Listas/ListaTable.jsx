import { apiUrl } from '@helpers'

  const ListaTable = ({data }) => {

    return (
        <>
          <div className="h-430 w-full flex-1  p-1 border justify-center">                            
            { data.map((item,index)=>(
                <div key={index} className="h-32 w-56 m-1 float-left rounded border shadow-md">
                    <div className="h-24 flex flex-row">   
                        <div className="w-2/5">   
                            <img alt="cliente"
                             className="h-24 w-20 border rounded m-1"          
                             src={`${apiUrl}static/images/productos/sm/` + item.filename}
                            /> 
                        </div>
                        <div className="w-3/5 border  text-[10px] p-2">                               
                            <p className="h-6 bg-gray-100 p-1">Cod: {item.codigo}</p>                            
                            <p className="h-6 bg-gray-50 p-1 mt-1">{item.categoria}</p>                            
                            <p className="h-6 bg-gray-100 p-1 mt-1">{item.industria}</p>
                        </div>
                    </div>
                    <div className="h-7 bg-gray-50 p-2 text-[10px]">   
                        {item.nombre}
                    </div>   
                </div>                                                             
            ))}    
          </div>  
                    
        </>
    );
}

export default ListaTable;
