import React,{useEffect,useState} from "react";
import { Outlet, Routes, Route, Link  } from 'react-router-dom'
import Configuracion from '@pages/BundleConfiguracion/ConfigRoute'
import Contabilidad from '@pages/BundleFinanzas/FinancieroRoute'
import NoMatch from '@layouts/NoMatch'
import { AuthContext } from '@auth';
import { getModulos } from '@core/routes'
import { UserCircleIcon, ArrowRightOnRectangleIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";


function Layout(){  
  const { onLogout } = React.useContext(AuthContext)    
  const [modulos, setmodulos] = useState([]); 
  const [setu, setsetu] = useState(0);      
  let us  = JSON.parse(localStorage.getItem('@usuarioConta23')) 
  let ep  = JSON.parse(localStorage.getItem('@empresaConta23'))

  
  useEffect(() => {
    let kk = getModulos(us.rol)
    setmodulos(kk)
}, []);



  return(
    <div className="flex-1 mx-auto h-3/4">
      <div className="h-8 flex">
        <div className="w-2/12 bg-gray-400 flex pl-3 text-md text-gray-50 font-bold items-central pt-1">
          UNITY 3.1
        </div>

        <div className="w-7/12 flex text-[10px] text-gray-500 font-bold items-central">
            <div className="w-1/12 items-center justify-center flex">
              <UserCircleIcon className="h-6 w-6 text-gray-500 font-bold" />         
            </div>
            <div className="w-3/12 items-center flex pl-2">
              Username : {us.username}
            </div>
            <div className="w-3/12 items-center flex pl-2">
              Rol: {us.rol}
            </div>          
            <div className="w-4/12 items-center flex pl-2">
              Sucursal : {us.snombre}
            </div>
        </div>

            

        <div className="w-1/12 flex justify-center items-center">
            <button
              onClick={() => onLogout()}
              className="shadow-base w-10 h-6 bg-rose-400 rounded-md text-sm font-bold flex pt-1 pl-3">
              <ArrowRightOnRectangleIcon className="h-4 w-4 text-gray-50" />        
            </button>
        </div>
      </div>

      <nav className="h-10 flex bg-gray-500 items-center shadow-md">        
        <div className="h-9 w-10/12 flex items-center pl-1 uppercase">
        { modulos.map((prop,index)=>(
              <Link 
               onClick={() => setsetu(index)}
                to={prop.layout+prop.path}
                className={index === setu ? "bg-sky-400 flex items-center justify-center pl-3 pr-3 h-6":"h-6  bg-gray-500 pl-3 pr-3  hover:bg-sky-400 flex items-center justify-center"}        
                key={prop.key}>                                                 
                  <span className={index === setu ? "text-[10px] text-gray-50 font-bold":"text-[10px]  text-white"}>{prop.name}</span>  
              </Link>              
          ))}
        </div>        
        <div className="h-10 w-2/12 flex items-center bg-gray-500 justify-center">
            <CurrencyDollarIcon className="h-6 w-8 text-gray-50" />
            <p className="text-[10px] text-gray-50"> Moneda : {ep.labelMoneda}   </p>
        </div>
      </nav>   
      <Outlet/>   

    <Routes>
      <Route path="inicio" element={<Contabilidad />}/>
      <Route path="configuracion/*" element={<Configuracion/>}/>
      <Route path="contabilidad/*" element={<Contabilidad/>}/>      
      <Route path="*" element={<NoMatch />} /> 
    </Routes>   
         
    </div>  
    )
}
export default Layout;

