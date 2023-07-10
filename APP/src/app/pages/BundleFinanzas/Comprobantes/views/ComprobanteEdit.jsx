import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setItems, comprobantesUpdate, setItem  } from '@reducers/contabilidad/comprobantesSlice'
import SelectData from '@components/Selects/SelectDataValue'
import ListaAsientos  from '../includes/ListaAsientos'
import { useNavigate } from "react-router-dom"
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Loading from '@components/Navigators/Loading'
import { _validateConfig, _itemComprobante  } from '@data/models'
import Moment from 'react-moment'
import 'moment/locale/es-mx'



const ComprobantesEdit = () => {
    const dispatch = useDispatch()      
    const { item, vitems, loading } = useSelector((state) => state.comprobantes)    
    const  {ba_items}  = useSelector((state) => state.bancos)
    const navigate = useNavigate()        
    const [errors, seterrors] = useState({
        total:"",
        nCheque:""
    });
  
    const handleSubmit = event =>{
        event.preventDefault();
        let nItems = [...vitems]                
        const newArr = nItems.map((obj, key) => {                        
                return {...obj, glosaAsiento:item.glosa };                
        });            
        dispatch(setItems(newArr))                
        let dato ={       
            id   : item.id,     
            item : item,
            items: newArr
        }        
        dispatch(comprobantesUpdate(dato))
   
    }

    useEffect(() => {        
    }, []);
    
    
    const handleDelete = () =>{        
        let iok = item
        iok = {
         ...iok,
         "bancoId": null,
         "nBanco": null         
        }
        dispatch(setItem(iok))
    }


    const handleChanges = (e) =>{
        const { value, name } = e.target                       
        let iok = item
        iok = {
         ...iok,
         [name]: name === 'tota' ? parseFloat(value): value
        }
        dispatch(setItem(iok))
        let found = _itemComprobante.find(it => it.label === name);   
        if(found){
            let nn = _validateConfig(found.type,value)
            seterrors({
                ...errors,
                [found.label]:nn
            })
        } 
    }

    const handleChanged = (prp,val,label) =>{                                   
        let iok = item
        iok = {
         ...iok,
         [prp]: val,
         nBanco: label
        }
        dispatch(setItem(iok))
    }

    
   return (
    <div className="h-full w-full">
    <div className="flex w-full bg-gradient-to-b border from-gray-200 to-gray-50">        
        <div className="flex w-6/12 flex-row items-center pt-1"> 
            <div className="h-5 flex bg-gray-400 border border-gray-300 rounded-t-md "> 
              <button 
              onClick={() =>navigate("/admin/contabilidad/comprobantes")}
              className="h-5 w-24 text-[10px] text-transform: uppercase items-center flex justify-center text-gray-50 font-bold">
                lista
              </button>
              <button className="h-5 w-5 text-xs items-center flex justify-center text-gray-400 font-bold rounded-r-md">
                <ChevronRightIcon className="h-4 w-4 text-gray-50" />
              </button>                                   
            </div>
            <div className="h-5 flex bg-sky-400 rounded-t-md">   
                <button className="h-5 w-24 text-[10px] text-transform: uppercase items-center flex justify-center text-gray-50 font-bold">
                editar
                </button>
                <button className="h-5 w-5 text-[10px] items-center flex justify-center text-sky-500 font-bold mr-1">
                <ChevronDownIcon className="h-4 w-4 text-gray-50" />
                </button>                  
            </div>
        </div>
        <div className="flex w-4/12">                                
        </div>
        <div className="flex w-5/12 justify-center items-end">   
            <div className="h-7 flex w-72 border border-gray-200 bg-white rounded justify-center">                       
            
                <div className="h-6 w-1/2 text-[10px] text-transform: items-center flex justify-center text-gray-500 font-bold">
                Fecha :  <Moment format="ll">{item.createdAt}</Moment>
                </div>                                                          
            </div>                
        </div>
    </div>

    <div className="h-full ml-1 mr-1 p-1 border-2 flex">
       <div className='h-550 border w-3/12 flex-col mr-1 rounded-md p-2'>
         <h1 className='pl-1 text-[11px] font-bold text-gray-500'>Datos Comprobante</h1>
         
         <form onSubmit={handleSubmit} className='w-full border rounded-md flex-col mt-1 text-[11px]'>                        
            <div className="w-full flex-col h-14 p-1">
                <label htmlFor="total" className="p-1 font-bold text-gray-500">Total :</label>
                <input
                    type="text"
                    onChange={handleChanges}                                    
                    value={item.total || null}                    
                    name="total"                    
                    className="h-7 pt-2 pl-2 block w-full border text-[10px] text-gray-600 bg-white border-gray-300 rounded"/>
                    {errors.total && <p className="pl-2 text-[10px] italic text-red-400">{errors.total}</p>}                        
            </div> 

            <div className="w-full flex-col h-24 p-1">
                <label htmlFor="label" className="p-1 font-bold text-gray-500">{ item.tipo === "ingreso" ? "Recibimos de :":"Pagamos a :" } </label>
                <textarea
                    type="text"
                    onChange={handleChanges}                                    
                    value={item.label || ""}
                    name="label"                    
                    className="h-14 pt-1 pl-2 block w-full border text-[10px] text-gray-600 bg-white border-gray-300 rounded"/>                
            
            </div>
           
            <div className="w-full flex-col h-24 p-1">
                <label htmlFor="glosa" className="p-1 font-bold text-gray-500">Glosa :</label>
                <textarea
                    type="text"
                    onChange={handleChanges}                                    
                    value={item.glosa || ""}
                    name="glosa"                    
                    className="h-14 pt-1 pl-2 block w-full border text-[10px] text-gray-600 bg-white border-gray-300 rounded"/>                
            
            </div>

            <div className="w-full flex-col h-14 p-1">
                <label htmlFor="bancoId" className="p-1 font-bold text-gray-500">Banco :</label>
                <SelectData
                    options={ba_items|| []}
                    option={item.bancoId}
                    handleChange={handleChanged} 
                    name={"bancoId"}
                    handleDelete={handleDelete}
                />                 
            </div>

            <div className="w-full flex-col h-14 p-1">
                <label htmlFor="nCheque" className="p-1 font-bold text-gray-500">Nº Cheque :</label>
                <input
                    type="text"
                    onChange={handleChanges}                                    
                    value={item.nCheque || 0}                    
                    name="nCheque"                    
                    className="h-7 pt-2 pl-2 block w-full border text-[10px] text-gray-600 bg-white border-gray-300 rounded"/>
            </div>

           
            
            <div className="w-full flex h-10 p-1 items-center">
                <button
                    className="bg-green-500 font-bold h-7 w-full rounded text-white text-xs border-2"
                    type="submit">
                    Actualizar
                </button>
            </div> 


         </form>
       </div>                                    
       <div className='ml-2 h-550 border w-9/12 flex rounded-md p-2 justify-center overflow-y-scroll'>
       <ListaAsientos/>
       </div>                                    
    </div>
       
    <Loading loading={loading}/>     

    </div>
   );
}

export default ComprobantesEdit;
