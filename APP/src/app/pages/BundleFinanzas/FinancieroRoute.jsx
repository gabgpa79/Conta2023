import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Inicio from './Inicio'
import Comprobantes from './Comprobantes/views/ComprobanteIndex'
import EditComprobantes from './Comprobantes/views/ComprobanteEdit'
import Diarios from './Libros/views/Diarios'
import Mayores from './Libros/views/Mayores'
import Saldos from './Libros/views/Saldos'
import { getSubModulos } from '@core/routes'

const FinancieroRoute = () => {
  const [modulos, setmodulos] = useState([]); 
  const [setu, setsetu] = useState(0);
 
  

  useEffect(() => {
    let kk = getSubModulos(7)
    setmodulos(kk)
}, []);



  return (
    <div className="min-h-fit w-full flex-1">            
    <div className="h-550 w-full flex-1">
      <div className="h-8 items-center flex w-full border bg-gray-200"> 
        { modulos &&
            modulos.map((ti, index)=>(                
            <Link 
              to={ti.layout+ti.path}
              onClick={() => setsetu(index)}
              className={index === setu ? "w-40 h-6 items-center border border-sky-200 justify-center flex bg-sky-200 ": "h-6 w-40  bg-gray-100 hover:bg-sky-100  justify-center items-center flex  border border-gray-300"}        
              key={index}>      
              <span className="w-1/4 inline-flex justify-center items-center ml-1">
                {ti.icon}
              </span>
              <span className="w-3/4 text-gray-600 ml-1 text-[10px] tracking-wide truncate">{ti.name}</span>                                                                                                                                
            </Link>                 
        ))}                             
      </div> 
            
        <div className="flex w-full">
              <Routes>
                  <Route path="/" element={<Inicio />}/> 
                  <Route path="/comprobantes" element={<Comprobantes />}/>  
                  <Route path="/comprobantes/new" element={<EditComprobantes />}/>
                  <Route path="/diarios" element={<Diarios />}/>
                  <Route path="/mayores" element={<Mayores />}/>
                  <Route path="/saldos" element={<Saldos />}/>
              </Routes> 
            </div>

            
        </div>          
      </div> 
  );
}

export default FinancieroRoute;
