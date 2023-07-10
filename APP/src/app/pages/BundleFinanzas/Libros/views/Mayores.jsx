import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { registerLocale } from  "react-datepicker";
import Mayor from '../includes/Mayor'
import Loading from '@components/Navigators/Loading'
import SearchInput from '@components/Inputs/SearchPuc'
import { resetItems, mayoresData } from '@reducers/contabilidad/contabilidadSlice'
import { pucsItems } from '@reducers/contabilidad/pucsSlice'
import es from 'date-fns/locale/es';
registerLocale('es', es)


const Mayores = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.contabilidad)  
  const { items } = useSelector((state) => state.pucs)    
  const [pucsi, setpucsi] = useState("");
  const [pucId, setPucId] = useState(0); 
   
  
useEffect(() => {    
    return () => {
      dispatch(resetItems())
    };
  }, []);

  const handleSearch = () =>{
    let iok = {
        parametro: pucsi
      }        
      dispatch(pucsItems(iok)) 
  }

  const handleSumbit = () =>{
    let iok ={        
        pucId :pucId
    }
    dispatch(mayoresData(iok))  
  }

  const handleChanged = (itt) =>{
    let iko = '('+ itt.codigo +') '+ itt.descripcion
    setpucsi(iko)
    setPucId(itt.id)    
  }
   

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
                  <form  className="h-auto w-full">               
                    <div className='h-14 flex-col items-center w-full'>                            
                        <SearchInput
                            handleSearch={handleSearch}                
                            name={"Cuenta"}
                            items={items}
                            parametro={pucsi}
                            setparametro={setpucsi}                                
                            setparametroId={setPucId}   
                            compuesto={handleChanged}             
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
        <Mayor parametro={pucsi} />
        </div>                            
      </div>    
    </div>
    <Loading
    loading={loading}
    /> 
    </>
  );
}

export default Mayores;
