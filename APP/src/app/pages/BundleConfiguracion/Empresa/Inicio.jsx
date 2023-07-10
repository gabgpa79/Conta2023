import { useState, useEffect} from 'react';
import SelectLocal from '@components/Selects/SelectLocal'
import { useDispatch, useSelector } from "react-redux";
import { _paises, getMoneda, getCiudades } from '@data/dataLoad'
import { empresasItem, empresasUpdate  } from '@reducers/config/empresasSlice'
import FormImg from '@components/Forms/FormImg'
import { useCallback } from 'react';
import Loading from '@components/Navigators/Loading'
import { _validateConfig, _itemConfig  } from '@data/models'

const Inicio = () => {
    const dispatch = useDispatch()      
    const { item, loading } = useSelector((state) => state.empresas)     
    const [ciudades, setciudades] = useState([]);   
    const [errors, seterrors] = useState({
        nombre:"",
        nit:"",
        email:""
    });
    const [nitem, setnitem] = useState({});     
    
    const handleChanged = (prp,val,ii) =>{                           
        let iok = getMoneda(ii)          
        let ook = getCiudades(ii)
        setciudades(ook)
        setnitem({
            ...nitem,
            [prp]: val,
            moneda: iok.value,
            labelMoneda: `${iok.label} (${iok.value})`,
            ciudad:""
        })   

    }

    const handleChangec = (prp,val,ii) =>{                                   
        setnitem({
            ...nitem,
            [prp]: val
        })   

    }

    const disparador = useCallback(() => {
        let iok={
            id: 1,
            tipo:'unit'
        }
        dispatch(empresasItem(iok))
    },[dispatch])

    useEffect(() => {
        disparador();
        return () => {    
            
        };
    }, [disparador]);


    const disparadors = useCallback(() => {
        if(item.id){
            setnitem(item)        
        }
    },[item])

    useEffect(() => {
         disparadors()                
        return () => {    
            /*dispatch(resetItem())*/
        };
    }, [loading, disparadors]);

    const actualizarMoneda = (pky) =>{        
       localStorage.setItem("@empresaConta23", JSON.stringify(pky));
    }

    const handleChanges = (e) =>{        
        const { value, name } = e.target                          
        setnitem({
            ...nitem,
            [name]: value
        })     
        let found = _itemConfig.find(it => it.label === name);   
        if(found){
            let nn = _validateConfig(found.type,value)
            seterrors({
                ...errors,
                [found.label]:nn
            })
        }              
    }

   const handleSubmit = event =>{    
        event.preventDefault();     
        dispatch(empresasUpdate(nitem));
        actualizarMoneda(nitem);        
    }


 return (
    <div className="h-full w-full">
        <div className="h-500 p-2">                        
            <div className="h-430 flex">
                <div className="w-1/3 border ">
                    <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                        <span className='font-bold ml-1 text-gray-500 text-[11px]'>  
                            Imagen
                        </span>
                    </div>
                    <FormImg
                        item={nitem}
                        payload={"empresa"}
                        payloads={"empresas"}/>                  
                </div>
                <div className="w-2/3 border ml-1">  
                    <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                        <span className='font-bold ml-1 text-gray-500 text-[11px]'>  
                            Datos de empresa
                        </span>
                    </div>                  
                    <form onSubmit={handleSubmit} className="p-3 flex-col text-[10px]">    
                        <div className='w-full flex p-2 rounded-md'>
                            <div className="w-2/3 flex-col mr-1">
                                <label htmlFor="nombre" className="p-1 font-bold text-gray-500">Nombre</label>
                                <input
                                    type="text"
                                    onChange={handleChanges}                                                                    
                                    value={nitem.nombre || ""}
                                    name="nombre"
                                    className="h-7 pt-2 pl-2 border block w-full rounded border-gray-300 hover:border-gray-400 text-[10px] text-gray-600"/>
                                    {errors.nombre && <p className="pl-2 text-[10px] italic text-red-400">{errors.nombre}</p>}                                                        
                            </div> 
                           
                            <div className="w-1/3 flex-col pl-1">
                                <label htmlFor="nit" className="p-1 font-bold text-gray-500">Nit</label>
                                <input
                                    type="text"
                                    onChange={handleChanges}                                    
                                    value={nitem.nit || ""}
                                    name="nit"
                                    className="h-7 pt-2 pl-2 border block w-full rounded border-gray-300 hover:border-gray-400 text-[10px] text-gray-600"/>
                                {errors.nit && <p className="italic text-red-400">{errors.nit}</p>} 
                            </div>                             
                        </div> 

                        <div className='w-full flex p-2 rounded-md'>
                            <div className="w-2/3 flex-col">
                                <label htmlFor="direccion" className="p-1 font-bold text-gray-500">Dirección</label>
                                <input
                                    type="text"
                                    onChange={handleChanges}                                                                    
                                    value={nitem.direccion || ""}
                                    name="direccion"
                                    className="h-7 pt-2 pl-2 border block w-full rounded border-gray-300 hover:border-gray-400 text-[10px] text-gray-600"/>
                                    {errors.direccion && <p className="pl-2 text-[10px] italic text-red-400">{errors.direccion}</p>}                        
                            </div> 
                            <div className="w-1/3 flex-col pl-1">
                                <label htmlFor="telefono" className="p-1 font-bold text-gray-500">Teléfono</label>
                                <input
                                    type="text"
                                    onChange={handleChanges}                                    
                                    value={nitem.telefono || ""}
                                    name="telefono"
                                    className="h-7 pt-2 pl-2 border block w-full rounded border-gray-300 hover:border-gray-400 text-[10px] text-gray-600"/>
                                {errors.telefono && <p className="italic text-red-400">{errors.telefono}</p>} 
                            </div>                             
                        </div>  

                        <div className='w-full flex p-2 rounded-md'>
                            <div className="w-4/12 flex-col">
                                <label htmlFor="pais" className="p-1 font-bold text-gray-500">País</label>
                                <SelectLocal
                                    options={_paises}
                                    option={nitem.pais || ""}                                    
                                    handleChange={handleChanged} 
                                    name={"pais"}
                                /> 
                            </div> 
                            <div className="w-3/12 flex-col pl-1">
                                <label htmlFor="ciudad" className="p-1 font-bold text-gray-500">Ciudad</label>
                                <SelectLocal
                                    options={ciudades}
                                    option={nitem.ciudad || ""}                                    
                                    handleChange={handleChangec} 
                                    name={"ciudad"}
                                /> 
                            </div> 
                            <div className="w-2/12 flex-col pl-1">
                                <label htmlFor="moneda" className="p-1 font-bold text-gray-500">Moneda</label>
                                <input
                                    type="text"
                                    onChange={handleChanges}                                    
                                    value={nitem.moneda || ""}
                                    readOnly={true}
                                    name="moneda"
                                    className="h-7 pt-2 pl-2 border block w-full bg-gray-100 rounded border-gray-300 hover:border-gray-400 text-[10px] text-gray-600"/>
                            </div>                             
                            <div className="w-3/12 flex-col pl-1">
                                <label htmlFor="labelMoneda" className="p-1 font-bold text-gray-500">Nombre Moneda</label>
                                <input
                                    type="text"
                                    onChange={handleChanges}                                    
                                    value={nitem.labelMoneda || ""}
                                    name="labelMoneda"
                                    readOnly={true}
                                    className="h-7 pt-2 pl-2 border block w-full bg-gray-100  rounded border-gray-300 hover:border-gray-400 text-[10px] text-gray-600"/> 
                            </div>                             
                        </div> 

                         <div className='w-full flex p-2 rounded-md'>
                            <div className="w-1/3 flex-col">
                                <label htmlFor="web" className="p-1 font-bold text-gray-500">Web</label>
                                <input
                                    type="text"
                                    onChange={handleChanges}                                                                    
                                    value={nitem.web || ""}
                                    name="web"
                                    className="h-7 pt-2 pl-2 border block w-full rounded border-gray-300 hover:border-gray-400 text-[10px] text-gray-600"/>                        
                                    {errors.web && <p className="pl-2 text-[10px] italic text-red-400">{errors.web}</p>}                        
                            </div>                            
                            <div className="w-1/3 flex-col pl-1">
                                <label htmlFor="email" className="p-1 font-bold text-gray-500">Email</label>
                                <input
                                    type="email"
                                    onChange={handleChanges}                                    
                                    value={nitem.email || ""}
                                    name="email"
                                    className="h-7 pt-2 pl-2 border block w-full rounded border-gray-300 hover:border-gray-400 text-[10px] text-gray-600"/>
                                {errors.email && <p className="italic text-red-400">{errors.email}</p>} 
                            </div>
                            <div className="w-1/3 flex-col pl-1">
                                <label htmlFor="registro" className="p-1 font-bold text-gray-500">Registro</label>
                                <input
                                    type="text"
                                    onChange={handleChanges}                                                                    
                                    value={nitem.registro || ""}
                                    name="registro"
                                    className="h-7 pt-2 pl-2 border block w-full rounded border-gray-300 hover:border-gray-400 text-[10px] text-gray-600"/>                                                            
                            </div>                              
                        </div>  
                        <div className='h-8 mt-4 w-full flex'>
                            <div className="w-1/3 flex-col ">
                                <button
                                    type="submit"
                                    className={errors.nombre === "" && errors.nit === "" && errors.email === "" ? 'h-7 w-full border bg-orange-300  hover:bg-sky-200 rounded-md':'h-7 w-20 border bg-orange-300 cursor-not-allowed hover:bg-orange-300 rounded-md'}>                                    
                                    <span className='font-bold  text-gray-50'>Actualizar</span>
                                </button>
                            </div>                                                       
                        </div>                                                 
                    </form>                        
                </div>                    
            </div>          
        </div>     
      <Loading
        loading={loading}
        />
    </div>
    );
}

export default Inicio;
