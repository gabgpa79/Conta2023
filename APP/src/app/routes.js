import { ChartBarSquareIcon, PresentationChartBarIcon , UsersIcon, DocumentTextIcon, WrenchIcon, WrenchScrewdriverIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";



export const modulos = [
    {
        key:1,
        path:"/inicio",
        name: "Inicio",        
        layout: "/admin", 
        rolId:"administrador"         

    },        
   {
       key:2,
       path:"/configuracion",
       name: "Configuraciones",        
       layout: "/admin",         
       rolId:"administrador"         

   },     
    {
        key:7,
        path:"/contabilidad",
        name: "Contabilidad",        
        layout: "/admin",         
        rolId:"administrador"         

    },                
   
]

export const submodulos = [    
    
    {
        key:9,
        path:"/",
        name: "Datos Empresa",  
        layout: "/admin/configuracion",              
        moduloId: 2,
        icon:<WrenchScrewdriverIcon className="h-5 w-5 text-gray-600" />          
    },
    
    
    {
        key:19,
        path:"/",
        name: "Dashboard",  
        layout: "/admin/contabilidad",              
        moduloId: 7,
        icon:<PresentationChartBarIcon className="h-5 w-5 text-gray-600" />
    },
    {
        key:20,
        path:"/",
        name: "Comprobantes",  
        layout: "/admin/contabilidad/comprobantes",              
        moduloId: 7,
        icon:<DocumentTextIcon className="h-5 w-5 text-gray-600" />
    },
    {
        key:21,
        path:"/",
        name: "Diarios",  
        layout: "/admin/contabilidad/diarios",              
        moduloId: 7,
        icon:<ChartBarSquareIcon className="h-5 w-5 text-gray-600" />
    },
    {
        key:22,
        path:"/",
        name: "Mayores",  
        layout: "/admin/contabilidad/mayores",              
        moduloId: 7,
        icon:<ChartBarSquareIcon className="h-5 w-5 text-gray-600" />
    },
    {
        key:29,
        path:"/",
        name: "Saldos",  
        layout: "/admin/contabilidad/saldos",              
        moduloId: 7,
        icon:<ChartBarSquareIcon className="h-5 w-5 text-gray-600" />
    },
    {
        key:30,
        path:"/",
        name: "Bancos",  
        layout: "/admin/configuracion/bancos",              
        moduloId: 2,
        icon:<CurrencyDollarIcon className="h-5 w-5 text-gray-500" />        
    },
    {
        key:23,
        path:"/",
        name: "Usuarios",  
        layout: "/admin/configuracion/usuarios",              
        moduloId: 2,
        icon:<UsersIcon className="h-5 w-5 text-gray-500" />       
    }, 
 
    {
        key:36,
        path:"/",
        name: "Plan de Cuentas",  
        layout: "/admin/configuracion/plan",              
        moduloId: 2,
        icon:<WrenchIcon className="h-5 w-5 text-gray-500" />        
    },
     
]

export const getSubModulos = (moduloId) =>{
    return submodulos.filter(item => 
        item.moduloId === moduloId
)}


export const getModulos = (rolId) =>{
    return modulos.filter(item => 
        item.rolId === rolId
)}