import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import Table from '@components/Tables/TableAccion'
import Search from '@components/Inputs/Searchs'
import Pagination from '@components/Navigators/Pagination'
import SelectLocal from '@components/Selects/SelectMultiple'
import SelectLocals from '@components/Selects/SelectUnit'
import MenuActions from '@components/Menus/MenuComprobante'
import { comprobantesData, comprobantesCreate, comprobantesItem, comprobantesAprobar, comprobantesDelete, resetItem, resetData } from '@reducers/contabilidad/comprobantesSlice'
import { bancosItems  } from '@reducers/contabilidad/bancosSlice'
import ModalComprobante from '../includes/ModalComprobante'
import {  _pag, } from '@data/dataLoad'
import { _modelTipoComprobante, _columndComprobantes } from '@data/dataModels'
import { CalendarDaysIcon, XMarkIcon, CloudArrowDownIcon, PrinterIcon } from "@heroicons/react/24/outline";
import Loading from '@components/Navigators/Loading'
import { CSVLink } from "react-csv";
import { getFechas } from "@helpers/functions"
import DatePicker,{ registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)
const fHoy = "_"+getFechas()
const fec = new Date()
const gest = fec.getFullYear()




const ComprobanteIndex = () => {
    const dispatch = useDispatch()  
    const navigate = useNavigate()
    const { data, total, pagina, paginas, loading } = useSelector((state) => state.comprobantes)
    const { pBusqueda } = useSelector((state) => state.parametro)
    const [prop, setprop] = useState("glosa");
    const [value1, onChange1] = useState();    
    const [value2, onChange2] = useState(); 
    const [indicador, setindicador] = useState(0);
    const [view, setview] = useState(false);     
    const [estado, setestado] = useState('pendiente');
    const [eview, seteview] = useState(false);
    const [tipo, settipo] = useState('ingreso');    
    const user = JSON.parse(localStorage.getItem('@usuarioConta23'))        
    const [nactive, setnactive] = useState(1);

    const [page, setpage] = useState(12); 

    const getData = (pagina) =>{   
      if(pagina > 0){            
            let iok = {
              pagina : pagina,
              num:12,
              gestion: gest,
              prop:  prop,
              parametro:  pBusqueda,
              desde:value1 ? value1: 0,
              hasta:value2 ? value2: 0               
            }
      
            dispatch(comprobantesData(iok))                  
      }             
    }

    const handlePage = (sap,vale) =>{      
      setpage(vale)
      if(pagina > 0){            
        let iok = {
            pagina : pagina,
            num:vale,
            gestion: gest,
            prop:  prop,
            parametro:  pBusqueda,
            desde:value1 ? value1: 0,
            hasta:value2 ? value2: 0           
        }
        dispatch(comprobantesData(iok))                 
      }
    }

    const handleReset = () =>{                     
      let iok = {
        pagina : 1,
        num:page,        
        parametro: "",        
        gestion: gest,
        prop: prop,
        desde:value1 ? value1: 0,
        hasta:value2 ? value2: 0        
      }
      dispatch(comprobantesData(iok))                        
}





    const handleNew = () =>{
      seteview(!eview)
    }
   

    const setIndicador = (key,est) =>{ 
   
      if(key === indicador){
        setindicador(0)                 
        setestado('aprobado')
      }else{
        setindicador(key)                 
        setestado(est)
      }     
    }

    const submitHandles = event => {
        event.preventDefault();
        let iok = {
          pagina   : 1,
          num      : 12,          
          gestion  : gest,
          prop     : prop,
          parametro    : pBusqueda,
          desde:value1 ? value1: 0,
          hasta:value2 ? value2: 0 
        }        
        dispatch(comprobantesData(iok))  
      
    }

   const handleNews = () =>{        
        dispatch(resetItem())    
        let iok={
          usuarioId: user.id,
          tipo     : tipo,
          ciudad   : user.sciudad
        }
        dispatch(comprobantesCreate(iok)) 
        seteview(!eview)
      }
      
      const handleEdit = () =>{        
        if(indicador){
          let iok={
            id: indicador,
            tipo: 'unit'
          }
          dispatch(comprobantesItem(iok))
          navigate('/admin/contabilidad/comprobantes/new');        
        }
        
      }
      
      
      const handleShow = () =>{
        if(indicador){
          let iok={
            id: indicador,
            tipo: 'unit'
          }
        dispatch(comprobantesItem(iok))
        setview(true)
        }
      }
      
      const handleTrash = () =>{
        if(indicador){
          let iok = {
            pagina :1,
            num:12,            
            [prop]: pBusqueda,
            comprobanteId: indicador
          }          
          dispatch(comprobantesDelete(iok))          
          }
          setindicador(0)
      }

    
    
    useEffect(() => {      
        getData(1)    
        dispatch(bancosItems())        
      return () => {      
        dispatch(resetData())      
      };
    }, []);  


    

    const handleDetail = () =>{
      let iok = {
        id: indicador,
        estado:'aprobado'
      }                     
      dispatch(comprobantesAprobar(iok))
      setindicador(0)
    }   
    
    const handleChanged = (prp,val) =>{
        settipo(val)
    }

    const handleTipo = (pky,ti) =>{      
          setnactive(ti)
          let iok = {
            pagina  : pagina,
            num     : 12,
            gestion : gest,
            prop    : 'tipo',
            parametro   : pky,
            desde:value1 ? value1: 0,
            hasta:value2 ? value2: 0
          }            
          dispatch(comprobantesData(iok))    
    }

    const handlePay = () =>{

    }

return (

  <>
  <div className="h-full w-full">
      <div className="h-500 p-1">   
          <div className='h-9 border flex items-center bg-gray-100'>                                          
            <div className='h-8 w-2/12 flex items-center pr-2'>
                <MenuActions
                  indicador={indicador}
                  handleNew={handleNew} 
                  handleEdit={handleEdit} 
                  handleDetail={handleDetail}
                  handleShow={handleShow}
                  handleTrash={handleTrash}     
                  handlePay={handlePay} 
                  estado={estado}
                />  
            </div>     
            <div className='h-8 w-4/12 flex items-center justify-end pr-2'>
                <div className='h-8 w-14 flex pl-1 pr-1 text-[9px] items-center justify-center'>
                  <button 
                  onClick={() => handleTipo('%',1)}
                  className={nactive === 1 ? 'h-6 w-full flex bg-sky-300 text-gray-50 font-bold items-center justify-center border border-sky-300' : 'border border-gray-300 h-6 w-full text-gray-600 bg-stone-50  flex items-center justify-center '}>
                      Todos
                  </button>
                </div>
                <div className='h-8 w-14 flex pl-1 pr-1 text-[9px] items-center justify-center'>                
                  <button 
                  onClick={() => handleTipo('ingreso',2)}
                  className={nactive === 2 ? 'h-6 w-full flex bg-sky-300 text-gray-50 font-bold items-center justify-center border border-sky-300' : 'border border-gray-300 h-6 w-full text-gray-600 bg-stone-50  flex items-center justify-center '}>
                      Ingresos
                  </button>
                </div>
                <div className='h-8 w-14 flex pl-1 pr-1 text-[9px] items-center justify-center'>                
                  <button 
                  onClick={() => handleTipo('egreso',3)}
                  className={nactive === 3 ? 'h-6 w-full flex bg-sky-300 text-gray-50 font-bold items-center justify-center border border-sky-300' : 'border border-gray-300 h-6 w-full text-gray-600 bg-stone-50  flex items-center justify-center '}>
                      Egresos   
                  </button> 
                </div>
                <div className='h-8 w-14 flex pl-1 pr-1 text-[9px] items-center justify-center'>                
                  <button 
                  onClick={() => handleTipo('diario',4)}
                  className={nactive === 4 ? 'h-6 w-full flex bg-sky-300 text-gray-50 font-bold items-center justify-center border border-sky-300' : 'border border-gray-300 h-6 w-full text-gray-600 bg-stone-50  flex items-center justify-center '}>
                      Diarios
                  </button> 
                </div>
            </div>
            <div className='h-8 w-3/12 flex items-center pl-1 pr-1'>                                  
              <div className='h-7 w-1/2 flex'>
                  <div className='w-2/4 flex items-center justify-end'>
                  <div className='h-7 w-8  border border-gray-300 flex items-center rounded justify-center hover:bg-gray-100'>
                    <CalendarDaysIcon className="h-5 w-5 text-gray-500 border-gray-300"/>
                  </div>
                    <button className='w-7 h-7' onClick={()=>onChange1("")} >
                      <XMarkIcon className={value1 ? "h-5 w-5 text-red-300":"h-5 w-5 text-gray-100" } />
                    </button>
                  </div>
                  <div className='w-2/4 flex'>
                    <DatePicker 
                      className="text-center p-1 h-7 w-full text-gray-500 rounded border-gray-200 hover:bg-gray-100 hover:border-sky-200 text-[10px]"
                      locale="es"
                      selected={value1} 
                      onChange={(date) => onChange1(date)}
                      dateFormat="PP"
                    />
                  </div>
              </div>
              <div className='h-7 w-1/2 flex justify-end'>
                <div className='w-2/4 flex items-center justify-end'>
                  <div className='h-7 w-8  border border-gray-300 flex items-center rounded justify-center hover:bg-gray-100'>
                    <CalendarDaysIcon className="h-5 w-5 text-gray-500 border-gray-300"/>
                  </div>  
                  <button className='w-7 h-7' onClick={()=>onChange2("")} >
                    <XMarkIcon className={value2 ? "h-5 w-5 text-red-300":"h-5 w-5 text-gray-100" } />
                  </button>
                </div>
                <div className='w-2/4 flex justify-center'>
                  <DatePicker 
                    className="text-center p-1 h-7 w-full text-gray-500 rounded border-gray-200 hover:bg-gray-100 hover:border-sky-200 text-[10px]"
                    locale="es"
                    selected={value2} 
                    onChange={(date) => onChange2(date)}
                    dateFormat="PP"
                  />
                </div>
              </div> 
            </div> 

            <div className='h-8 w-2/12 flex items-center pl-1'>                                  
                <Search 
                    submitHandles={submitHandles}
                    handleReset={handleReset}                    
                />
            </div> 

            <div className='h-8 w-1/12 flex items-center justify-around ml-2 mr-2'>                            
              <button className='h-7 w-8 border border-gray-300 flex items-center rounded justify-center hover:bg-gray-50'>
                <CSVLink 
                  data={data}                   
                  filename={"comprobantes.csv"+fHoy}>
                  <CloudArrowDownIcon className="h-5 w-5 text-gray-500" />
                </CSVLink>
              </button>
              <button                                    
              className='h-7 w-8 border border-gray-300 flex items-center rounded justify-center hover:bg-gray-50'>
                <PrinterIcon className="h-5 w-5 text-gray-500" />
              </button>        
            </div>

          </div>     

          <div className="h-430 mt-1 flex w-full">                                   
            <div className='w-full flex-col'>
                <div className="h-9 flex border-t border-l border-r">    

                  <div className='w-1/3 flex justify-start items-center pr-1 pt-1 bg-gray-100'>
                      <label className='w-32 text-[10px] text-gray-600 pl-2'>Mostrar {page} de {total} items </label>  
                      <div className='w-24'>
                      <SelectLocals
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
                      columnDefs={_columndComprobantes}
                      indicador={indicador}
                      setIndicador={setIndicador}                               
                    />
                </div>
                <div className="h-9 flex border-b border-l border-r">                    
                  <div className='w-1/3 flex justify-start items-center pr-1 pt-1 bg-gray-100'>
                      <label className='w-32 text-[10px] text-gray-600 pl-2'>Mostrar {page} de {total} items </label>  
                      <div className='w-24'>
                      <SelectLocals
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
  <ModalComprobante view={view} setview={setview}/>

  { eview ?
          <>
          <div className="justify-center items-center flex-1 fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="p-1 relative w-60 my-3 mx-auto flex-row justify-between">
                  <div className="h-40 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="ml-1 h-10 w-56 flex justify-end bg-white">
                          <button 
                              onClick={() => seteview(false)}
                              className="w-7 h-7 rounded-full bg-red-400 text-xs flex items-center justify-center text-white font-bold">                            
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                          </button>
                      </div>
                      <div className="ml-1 w-56 flex-col p-1  bg-white">
                        <label htmlFor="tipo" className="p-1 font-bold text-gray-500 text-xs">Tipo de comprobante</label>
                          <SelectLocal
                          options={_modelTipoComprobante}
                          option={tipo}
                          handleChange={handleChanged} 
                          name={"tipo"}
                          />                                        
                      </div>
                      <div className="ml-1 mt-1 h-10 w-56 flex p-1 bg-white">
                      <button 
                        onClick={() => handleNews() }
                        className="w-full h-7 rounded-md bg-blue-400 text-xs flex items-center justify-center text-white font-bold mr-4">                                                    
                        Registrar
                      </button>
                      </div>
                  </div>    
              </div>
          </div>    
          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
          </>
          : null  } 
  <Loading loading={loading}/>  
  </> 
     
 );
}

export default ComprobanteIndex;
