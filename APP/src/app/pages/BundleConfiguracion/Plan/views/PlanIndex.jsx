import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Pagination from '@components/Navigators/Pagination'
import {toastr} from 'react-redux-toastr'
import Search from '@components/Inputs/Searchs'
import SelectLocal from '@components/Selects/SelectUnit'
import SelectLocals from '@components/Selects/SelectSimple'
import { pucsData, pucsCreate, pucsUpdate, pucsDelete } from '@reducers/contabilidad/pucsSlice'
import Table from "@components/Tables/TableEdits"
import Loading from '@components/Navigators/Loading'
import ModalPlan from '../includes/ModalPlan'
import { ChevronRightIcon,CloudArrowDownIcon, BookOpenIcon, PrinterIcon  } from "@heroicons/react/24/outline";
import { CSVLink } from "react-csv";
import { _pag, _nivel } from '@data/dataLoad'
import { _ctipos } from '@data/dataLoad'
import { getFechas } from "@helpers/functions"
const fHoy = "_"+getFechas()

const PlanIndex = () => {
    const dispatch = useDispatch()      
    const { data, total, pagina, paginas, loading } = useSelector((state) => state.pucs)
    const { pBusqueda } = useSelector((state) => state.parametro)
    const [indicador, setindicador] = useState(0);   
    const [viewc, setviewc] = useState(false); 
    const [tip, settip] = useState("");
    const [nitem, setnitem] = useState({});       
    const [page, setpage] = useState(12); 
    const [nivel, setnivel] = useState("");


  
    const submitHandles = event => {
      event.preventDefault();
      let iok = {
        pagina :1,
        num:page,
        parametro: pBusqueda,
        tipo:"",
        codigo:"",
        nivel:0
      }                
      dispatch(pucsData(iok))              
  }  

  const getData = (pagina) =>{   
      if(pagina > 0){          
            let iok = {
              pagina : pagina,
              num: page,
              parametro: pBusqueda,
              tipo:"",
              codigo:"",
              nivel:0               
            }

            dispatch(pucsData(iok))                
      }           
  }   

  const handlePage = (sap,vale) =>{      
    setpage(vale)          
      let iok = {
        pagina : pagina,
        num:vale,
        codigo: "",
        descripcion: "",
        tipo: "",
        nivel:0
      }
      dispatch(pucsData(iok))                     
  }

  
  useEffect(() => {            
      getData(1)   
     
    return () => {      
      /*dispatch(resetData()) */
                
    };
  }, []);  


  const handleEdit = (itd) =>{   
    setindicador(itd.id)
    setnitem(itd)
  }

  const handleTrash = (pky) =>{
    let iok ={
      pucId: pky,
      pagina: pagina
    }
    dispatch(pucsDelete(iok))
  }

  const handleChanges = (e) =>{
    const { value, name } = e.target      
   
        setnitem({
            ...nitem,
            [name]: value
        })
  }

  const handleSave = () =>{
    let iok={}
    if(nitem.id){      
        iok ={     
          id: nitem.id,   
          pagina: pagina,
          codigo: nitem.codigo,
          descripcion: nitem.descripcion,
          tipo: nitem.tipo,
          nivel: nitem.nivel
        }
        dispatch(pucsUpdate(iok));         
    }else{      
      if(nitem.codigo !== "" && nitem.descripcion !== "" && nitem.tipo !== ""){
      iok ={        
        pagina: pagina,
        codigo: nitem.codigo,
        descripcion: nitem.descripcion,
        tipo: nitem.tipo,
        nivel: nitem.nivel
      }       
      dispatch(pucsCreate(iok));         
      }else{
        toastr.error('Error', 'Datos faltantes')    
      }
    }    
      handleReset()
      
  }

  const handleReset = () =>{
    setnitem({
      pagina: pagina,
      codigo: "",
      descripcion: "",
      tipo: "",
      nivel:0
    })   
    setindicador(-1)
    let iok = {
      pagina : 1,
      num:12,
      codigo: "",
      descripcion: "",
      tipo: "",
      nivel:0
    }
    dispatch(pucsData(iok))
  }



const handleChanged = (prp,val) =>{                
  setnitem({
    ...nitem,
    [prp]: val
  })  
}

const handleSet = (pky) =>{ 
  settip(pky)
  let iok = {
    pagina : pagina,
    num: page,
    parametro: pBusqueda,
    tipo:pky,
    codigo:"",
    nivel:0               
  }  
  dispatch(pucsData(iok)) 
}

const handleNivel = (sap,pky) =>{
  setnivel(pky)
  let iok = {
    pagina : pagina,
    num: page,
    parametro: pBusqueda,
    tipo:tip,
    codigo:"",
    nivel:pky === "Todos" ? 0 : pky              
  }    
  dispatch(pucsData(iok)) 
}


return (
  <>
   <div className="h-full w-full">
        <div className="h-500 p-1">   
            <div className='h-9 border-b flex items-center bg-gray-100'>                                          
              <div className='h-8 w-3/12 flex items-center pl-1 pr-2'>
                  <Search 
                    submitHandles={submitHandles}
                    handleReset={handleReset}
                  />
              </div>  

              <div className='h-8 w-6/12 flex items-center justify-around pl-1 pr-2 border-2 text-[10px]'>                
                <button 
                onClick={() => handleSet("")}
                className={tip==="" ? 'h-6 pl-4 pr-4  border border-gray-300  bg-sky-200 rounded text-gray-600':'h-6 pl-4 pr-4  border border-gray-300 bg-gray-200 rounded text-gray-600' }>
                  Todos
                </button>

                <button 
                onClick={() => handleSet("Activo")}
                className={tip==="Activo" ? 'h-6 pl-4 pr-4  border border-gray-300  bg-sky-200 rounded text-gray-600':'h-6 pl-4 pr-4  border border-gray-300 bg-gray-200 rounded text-gray-600' }>
                  Activo
                </button>

                <button 
                onClick={() => handleSet("Pasivo")}
                className={tip==="Pasivo" ? 'h-6 pl-4 pr-4  border border-gray-300  bg-sky-200 rounded text-gray-600':'h-6 pl-4 pr-4  border border-gray-300 bg-gray-200 rounded text-gray-600' }>
                  Pasivo
                </button>

                <button 
                onClick={() => handleSet("Ingresos")}
                className={tip==="Ingresos" ? 'h-6 pl-4 pr-4  border border-gray-300  bg-sky-200 rounded text-gray-600':'h-6 pl-4 pr-4  border border-gray-300 bg-gray-200 rounded text-gray-600' }>
                  Ingresos
                </button>             
                <button 
                onClick={() => handleSet("Gastos")}
                className={tip==="Gastos" ? 'h-6 pl-4 pr-4  border border-gray-300  bg-sky-200 rounded text-gray-600':'h-6 pl-4 pr-4  border border-gray-300 bg-gray-200 rounded text-gray-600' }>
                  Gastos
                </button>
                <button 
                onClick={() => handleSet("Costos")}
                className={tip==="Costos" ? 'h-6 pl-4 pr-4  border border-gray-300  bg-sky-200 rounded text-gray-600':'h-6 pl-4 pr-4  border border-gray-300 bg-gray-200 rounded text-gray-600' }>
                  Costos
                </button>                 
              </div> 
              <div className='h-8 w-1/12 flex'>
                  <div className='w-24 flex justify-center items-center pt-1'>
                      <SelectLocal
                            options={_nivel}
                            option={nivel}                                    
                            handleChange={handleNivel} 
                            name={"nivel"}
                        />
                  </div>      
              </div> 

              <div className='h-8 w-2/12 flex items-center justify-around'>
                <button className='h-7 w-8  border border-gray-300 flex items-center rounded justify-center hover:bg-gray-50'>
                  <BookOpenIcon className="h-5 w-5 text-gray-500" />
                </button>
                <button className='h-7 w-8 border border-gray-300 flex items-center rounded justify-center hover:bg-gray-50'>
                  <CSVLink 
                    data={data}                   
                    filename={"plan.csv"+fHoy}>
                    <CloudArrowDownIcon className="h-5 w-5 text-gray-500" />
                  </CSVLink>
                </button>
                <button      
                onClick={() => setviewc(true)}       
                className='h-7 w-8 border border-gray-300 flex items-center rounded justify-center hover:bg-gray-50'>
                  <PrinterIcon className="h-5 w-5 text-gray-500" />
                </button>        
              </div>
            </div>     

            <div className="h-430 mt-1 flex w-full">                     
              <div className='w-1/4 flex-col'>
                <div className='h-52 border '>
                  <div className='h-7 border-b w-full bg-gray-100 font-bold pl-2 text-[10px] pt-2 text-gray-600'>
                     Datos de registro 
                  </div>
                  <div className='h-9 flex items-center pr-2 mt-1'>
                      <label htmlFor="codigo" className='w-1/3 pl-2 text-[10px] text-gray-500 font-bold'>Código :</label>
                      <input                              
                        type="text"
                        onChange={handleChanges}                              
                        value={nitem.codigo || ""}                
                        name="codigo"
                        className="h-7 w-2/3 text-[10px] pt-2 pl-2 block border border-gray-300  rounded  focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
                      />
                  </div>
                  <div className='h-9 flex items-center pr-2'>
                    <label htmlFor="abreviacion" className='w-1/3 pl-2 text-[10px] text-gray-500 font-bold'>Descripción :</label>
                    <input                              
                      type="text"
                      onChange={handleChanges}                              
                      value={nitem.descripcion ||""}                
                      name="descripcion"
                      className="h-7 w-2/3 text-[10px] pt-2 pl-2 block border border-gray-300  rounded  focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
                    />
                  </div>
                  <div className='h-9 flex items-center pr-2'>
                    <label htmlFor="tipo" className='w-1/3 pl-2 text-[10px] text-gray-500 font-bold'>Tipo :</label>
                    <div className='w-2/3 flex items-center'>
                        <SelectLocals
                          options={_ctipos}
                          option={nitem.tipo || ""}                                    
                          handleChange={handleChanged} 
                          name={"tipo"}
                      />
                    </div>
                  </div> 
                  <div className='h-9 flex items-center mt-2 pr-1 pl-1'>
                      <button onClick={()=> handleSave()}
                        className="w-full h-6 rounded-md bg-sky-400 flex items-center justify-center text-gray-100">
                        <ChevronRightIcon  className="h-5 w- text-gray-50" />                          
                      </button>
                  </div> 
                </div>                                 
              </div>    
              <div className='w-3/4 flex-col ml-2 mr-1'>
                  <div className="h-9 flex border-t border-r border-l">                    
                        <div className='w-1/3 flex justify-start items-center pr-1 pt-1 bg-gray-100'>
                            <label className='w-32 text-[10px] text-gray-600 pl-2'>Mostrar {page} de {total} items </label>  
                            <div className='w-24'>
                            <SelectLocal
                                options={_pag}
                                option={page}                                    
                                handleChange={handlePage} 
                                name={"pagina"}
                            />
                            </div>
                                                    
                        </div>    
                        <div className='w-2/3 flex justify-end items-center pr-1  bg-gray-100'>
                          <Pagination           
                            getData={getData}
                            total={total}
                            paginas={paginas}
                            current={pagina}/> 
                        </div>                             
                      </div>
                  <div className="flex w-full">              
                      <Table
                        data={data}            
                        item={nitem}                            
                        handleEdit={handleEdit}
                        handleTrash={handleTrash}
                        handleChanges={handleChanges}
                        handleSave={handleSave}           
                        indicador={indicador}
                        setindicador={setindicador}
                        handleReset={handleReset}
                        handleChanged={handleChanged}/>      
                  </div>
                  <div className="h-9 flex border-b border-l border-r">                    
                    <div className='w-1/3 flex justify-start items-center pr-1 pt-1 bg-gray-100'>
                        <label className='w-32 text-[10px] text-gray-600 pl-2'>Mostrar {page} de {total} items </label>  
                        <div className='w-24'>
                        <SelectLocal
                            options={_pag}
                            option={page}                                    
                            handleChange={handlePage} 
                            name={"pagina"}
                        />
                        </div>
                                                
                    </div>    
                    <div className='w-2/3 flex justify-end items-center pr-1  bg-gray-100'>
                      <Pagination           
                        getData={getData}
                        total={total}
                        paginas={paginas}
                        current={pagina}/> 
                    </div>                             
                  </div>
              </div>    
            </div>    
        </div>    
    </div>  
    <ModalPlan
         viewc={viewc}
         setviewc={setviewc}
     />  
    <Loading
      loading={loading}
    />
         
  </>
    );
}

export default PlanIndex;
