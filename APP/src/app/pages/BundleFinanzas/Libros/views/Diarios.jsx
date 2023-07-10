import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import Diario from '../includes/Diario'
import Loading from '@components/Navigators/Loading'
import { diariosData, resetItems } from '@reducers/contabilidad/contabilidadSlice'
import es from 'date-fns/locale/es';
registerLocale('es', es)


const Diarios = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.contabilidad)  
  const [value1, onChange1] = useState(new Date());    
  const [value2, onChange2] = useState(new Date());          
  
  const handleSumbit = () =>{
    let iok ={
        desde: value1,
        hasta: value2
    }
    dispatch(diariosData(iok))    
  }

  useEffect(() => {    
    return () => {
      dispatch(resetItems())
    };
  }, []);
   
  return (
    <>
    <div className="h-full flex-1 p-1">
      <div className="h-550 flex flex-row justify-between ">
        
        <div className="w-1/5 border-l border-t border-b flex-col text-[10px] text-gray-600">
          <div className="h-10 bg-gray-50 p-1 border-b flex items-center">
            <span className='pl-2'>Parametros</span>
          </div>
  
          <div className='mt-1 flex-col p-2'>          
              <div className="flex-col flex">            
                  <form  className="w-full">               
                  <div className="flex-col rounded p-1 flex">    
                      <label htmlFor="desde" className="h-4 pl-1 font-bold text-gray-500 text-[10px]">Desde</label>        
                      <DatePicker 
                              className="text-center p-1 h-7 w-full text-gray-500 rounded border-gray-300 hover:bg-gray-100 hover:border-sky-200 text-[10px]"
                              locale="es"
                              selected={value1} 
                              onChange={(date) => onChange1(date)}
                              dateFormat="PP"
                      />                        
                  </div>
  
                  <div className="flex-col rounded p-1 flex">   
                      <label htmlFor="hasta" className="h-4 pl-1 font-bold text-gray-500 text-[10px]">Hasta</label>         
                      <DatePicker 
                              className="text-center p-1 h-7 w-full text-gray-500 rounded border-gray-300 hover:bg-gray-100 hover:border-sky-200 text-[10px]"
                              locale="es"
                              selected={value2} 
                              onChange={(date) => onChange2(date)}
                              dateFormat="PP"
                      />                        
                  </div>     
                
                  <div className="flex-col rounded p-1 flex">    
                      <button
                          onClick={()=>handleSumbit()}
                          className="h-7 w-full text-center bg-sky-300 rounded text-[10px] text-gray-50 font-bold hover:bg-green-400"
                          type="button"> Generar
                      </button>                        
                  </div>
                  </form>
              </div>
          </div>
        </div>
  
        <div className="w-4/5  bg-gray-100 border">        
            <Diario desde={value1} hasta={value2} />
        </div>                            
      </div>    
    </div>
    <Loading
    loading={loading}
    /> 
    </>
  );
}

export default Diarios;
