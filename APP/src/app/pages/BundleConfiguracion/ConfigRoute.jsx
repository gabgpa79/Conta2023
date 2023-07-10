import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import EmpresaIndex from './Empresa/Inicio'
import UsuarioIndex from './Usuario/views/UsuarioIndex'
import UsuarioEdit from './Usuario/views/UsuarioEdit'
import Bancos from './Bancos/views/BancoIndex'
import Plan from './Plan/views/PlanIndex'
import { getSubModulos } from '@core/routes'

const ConfigRoute = () => {
  const [modulos, setmodulos] = useState([]); 
  const [setu, setsetu] = useState(0);
  

  useEffect(() => {
    let kk = getSubModulos(2)
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
                  <Route path="/" element={<EmpresaIndex />}/>  
                  <Route path="/usuarios" element={<UsuarioIndex />}/>
                  <Route path="/usuarios/new" element={<UsuarioEdit />}/>
                  <Route path="/bancos" element={<Bancos />}/>                      
                  <Route path="/plan" element={<Plan />}/>
              </Routes> 
          </div>

        </div>          
      </div> 
  );
}

export default ConfigRoute;
