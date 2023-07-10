import { useState, useEffect} from 'react';
import SelectLocal from '@components/Selects/SelectSMPS'
import { useDispatch, useSelector } from "react-redux";
import { _rolUsuario, } from '@data/dataLoad'
import { usuariosUpdate, usuariosCreate  } from '@reducers/config/usuariosSlice'
import { useNavigate } from "react-router-dom"
import { UserIcon, EyeIcon,EyeSlashIcon, ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {toastr} from 'react-redux-toastr'
import Loading from '@components/Navigators/Loading'
import { _validateConfig, _itemUsuario  } from '@data/models'


const UsuarioEdit = () => {
    const dispatch = useDispatch()      
    const { item, loading } = useSelector((state) => state.usuarios)
    const navigate = useNavigate()
    const [nitem, setnitem] = useState({});
    const [password, setpassword] = useState(null);
    const [password1, setpassword1] = useState(null);
    const [tip, settip] = useState('password');
    
    const [errors, seterrors] = useState({
        nombres:"",
        apellidos:"",
        username:"",
        password:"",        
        password1:""
    });

    useEffect(() => {
        if(item.id){
            setnitem(item)        
        }        
        return () => {    
            /*dispatch(resetItem())*/
        };
    }, [loading]);
    
    
    const handleChanged = (prp,val) =>{                        
        setnitem({
            ...nitem,
            [prp]: val
        })
        
    }

    const handleChanges = (e) =>{        
        const { value, name } = e.target          
        setnitem({
            ...nitem,
            [name]: value
        })
        let found = _itemUsuario.find(it => it.label === name);   
        if(found){
            let nn = _validateConfig(found.type,value)
            seterrors({
                ...errors,
                [found.label]:nn
            })
        }
        
    }    

    const handlePass = event =>{        
        event.preventDefault() 
        if(password === password1){
         
            let dato = {
                id: nitem.id,
                password: password,
                tipo: password
            }            
            dispatch(usuariosUpdate(dato));
        }else{
            toastr.error('Password', 'el password debe ser igual') 
        }
    }

    const handleSubmit = event =>{
        event.preventDefault() 
        if(nitem.id){
            let dato = nitem            
            dato.tipo = 'single'             
            dispatch(usuariosUpdate(dato));            
            }
          else{            
            dispatch(usuariosCreate(nitem))
            }  
    }
    
    return (
        <div className="h-full w-full flex-col">
            <div className="h-6 flex w-full flex-row items-center border-b">
                <div className="h-5 flex bg-gray-400 border border-gray-300 rounded-t-md mr-1">   
                    <button 
                    onClick={() =>navigate("/admin/configuracion/usuarios")}
                    className="h-5 w-24 text-[10px] items-center flex justify-center text-gray-50 font-bold">
                    Lista
                    </button>
                    <button className="h-5 w-6 text-[10px] items-center flex justify-center text-sky-500 font-bold mr-1">
                            <ChevronRightIcon className="h-4 w-4 text-gray-50" />
                    </button>                  
                </div>

                <div className="h-5 flex bg-sky-300 rounded-t-md">   
                    <button className="h-6 w-24 text-[10px] items-center flex justify-center text-gray-50 font-bold">
                    Editar
                    </button>
                    <button className="h-5 w-6 text-[10px] items-center flex justify-center text-sky-500 font-bold mr-1">
                    <ChevronDownIcon className="h-4 w-4 text-gray-50" />
                    </button>                  
                </div>
            </div>   

        <div className='h-500 w-full flex'>                                   
            <div className="h-430 flex w-full p-1">
                <div className="w-1/3 border ">
                    <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                        <span className='font-bold ml-1 text-gray-500 text-[11px]'>  
                            Imagen
                        </span>
                    </div>
                    <div className='h-72 m-4 flex justify-center items-center p-4'>
                        <div className='border-8 rounded-full p-2 border-gray-100'>
                            <UserIcon className="h-50 w-50 text-gray-100" />
                        </div>                        
                    </div>
                                    
                </div>
                <div className="w-2/3 border ml-1">  
                    <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                        <span className='font-bold ml-1 text-gray-500 text-[11px]'>  
                            Datos de usuario
                        </span>
                    </div>    
                    <form onSubmit={handleSubmit} className="p-3 flex-col text-[10px]">    
                        <div className='w-full flex p-2 rounded-md'>
                            <div className="w-1/2 flex-col mr-1">
                                <label htmlFor="nombres" className="p-1 font-bold text-gray-500">Nombre</label>
                                <input
                                    type="text"
                                    onChange={handleChanges}                                                                    
                                    value={nitem.nombres || ""}
                                    name="nombres"
                                    className="h-7 pt-2 pl-2 border block w-full rounded border-gray-300 hover:border-gray-400 text-[10px] text-gray-600"/>
                                    {errors.nombres && <p className="pl-2 text-[10px] italic text-red-400">{errors.nombres}</p>}                                                        
                            </div> 
                           
                            <div className="w-1/2 flex-col pl-1">
                                <label htmlFor="apellidos" className="p-1 font-bold text-gray-500">Apellidos</label>
                                <input
                                    type="text"
                                    onChange={handleChanges}                                    
                                    value={nitem.apellidos || ""}
                                    name="apellidos"
                                    className="h-7 pt-2 pl-2 border block w-full rounded border-gray-300 hover:border-gray-400 text-[10px] text-gray-600"/>
                                {errors.apellidos && <p className="italic text-red-400">{errors.apellidos}</p>} 
                            </div>                             
                        </div> 

                        <div className='w-full flex p-2 rounded-md'>
                            <div className="w-1/2 flex-col">
                                <label htmlFor="username" className="p-1 font-bold text-gray-500">Username</label>
                                <input
                                    type="text"
                                    onChange={handleChanges}                                                                    
                                    value={nitem.username || ""}
                                    name="username"
                                    className="h-7 pt-2 pl-2 border block w-full rounded border-gray-300 hover:border-gray-400 text-[10px] text-gray-600"/>
                                    {errors.username && <p className="pl-2 text-[10px] italic text-red-400">{errors.username}</p>}                        
                            </div> 
                            <div className="w-1/2 flex-col pl-1">
                                <label htmlFor="rol" className="p-1 font-bold text-gray-500">Rol</label>
                                <SelectLocal
                                    options={_rolUsuario}
                                    option={nitem.rol}                                    
                                    handleChange={handleChanged} 
                                    name={"rol"}
                                />
                            </div>                             
                        </div>
                        <div className='h-8 mt-2 ml-2 w-full flex'>
                            <div className="w-1/3 flex-col ">
                                <button
                                    type="submit"
                                    className={errors.nombres === "" && errors.apellidos === "" && errors.username === "" ? 'h-7 w-full border bg-orange-300  hover:bg-sky-200 rounded-md':'h-7 w-20 border bg-orange-300 cursor-not-allowed hover:bg-orange-300 rounded-md'}>                                    
                                    <span className='font-bold  text-gray-50'>Actualizar</span>
                                </button>
                            </div>                                                       
                        </div>                                                 
                    </form> 
                    { item.id ?
                    <form onSubmit={handlePass} className="p-3 flex-col text-[10px] mt-2 border-t">    
                        <div className='w-full flex p-2 rounded-md'>
                            <div className="w-5/12 flex-col mr-1">
                                <label htmlFor="password" className="p-1 font-bold text-gray-500">Password</label>
                                <input
                                    type={tip}
                                    onChange={(e)=>setpassword(e.target.value)}                            
                                    value={password}
                                    name="password"
                                    className="h-7 pt-2 pl-2 border block w-full rounded border-gray-300 hover:border-gray-400 text-[10px] text-gray-600"/>
                                    {errors.password && <p className="pl-2 text-[10px] italic text-red-400">{errors.password}</p>}                                                        
                            </div> 
                           
                            <div className="w-5/12 flex-col pl-1">
                                <label htmlFor="password1" className="p-1 font-bold text-gray-500">Re-Password</label>
                                <input
                                    type={tip}
                                    onChange={(e)=>setpassword1(e.target.value)}                            
                                    value={password1}
                                    name="password1"
                                    className="h-7 pt-2 pl-2 border block w-full rounded border-gray-300 hover:border-gray-400 text-[10px] text-gray-600"/>
                                    {errors.password1 && <p className="italic text-red-400">{errors.password1}</p>} 
                            </div>                             

                            <div className="w-1/12 flex pt-4 justify-center items-center">
                                { tip === 'text' ? 
                                    <button
                                    type='button' 
                                    onClick={() => settip('password')}>
                                        <EyeSlashIcon className="h-6 w-6 text-red-500" /> 
                                    </button>    
                                :                               
                                    <button
                                    type='button' 
                                    onClick={() => settip('text')}>
                                        <EyeIcon className="h-6 w-6 text-green-500" />
                                    </button>                                             
                                }
                            </div>                             
                        </div> 

                     
                        <div className='h-8 mt-2 w-full'>
                            <div className="w-1/3 flex-col ">
                                <button
                                    type="submit"
                                    className={password === password1 ? 'h-7 w-full border bg-orange-300  hover:bg-sky-200 rounded-md':'h-7 w-full border bg-orange-100 cursor-not-allowed hover:bg-orange-300 rounded-md'}>                                    
                                    <span className='font-bold  text-gray-50'>Actualizar</span>
                                </button>
                            </div>                                                       
                        </div>                                                 
                    </form>:null}
                    
                                  
                                           
                </div>                    
            </div>   
        </div>   

     <Loading
        loading={loading}
     />

    </div> 
    );
}

export default UsuarioEdit;
