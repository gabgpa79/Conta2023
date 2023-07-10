import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Pagination from '@components/Navigators/Pagination'
import Search from '@components/Inputs/Searchs'
import { bancosData, bancosCreate, bancosUpdate, bancosDelete  } from '@reducers/contabilidad/bancosSlice'
import Loading from '@components/Navigators/Loading'
import SelectLocal from '@components/Selects/SelectUnit'
import Table from "@components/Tables/TableEdit"
import Switch from "react-switch";
import { ChevronRightIcon,CloudArrowDownIcon, BookOpenIcon, PrinterIcon  } from "@heroicons/react/24/outline";
import { CSVLink } from "react-csv";
import { getFechas } from "@helpers/functions"
import { _pag } from '@data/dataLoad'
const fHoy = "_"+getFechas()

const BancoIndex = () => {
    const dispatch = useDispatch()      
    const { data, total, pagina, paginas, loading } = useSelector((state) => state.bancos)
    const { pBusqueda } = useSelector((state) => state.parametro)    
    const [indicador, setindicador] = useState(0); 
    const [page, setpage] = useState(12);  
    const [viewc, setviewc] = useState(false);
    const [nitem, setnitem] = useState({});    
    const [nitems, setnitems] = useState({});    
   

    const submitHandles = event => {
      event.preventDefault();
      let iok = {
        pagina :1,
        num:page,
        nombre: pBusqueda
      }                
      dispatch(bancosData(iok))              
  }  

  const getData = (pagina) => {
    if(pagina > 0){          
      let iok = {
        pagina : pagina,
        num:page,
        nombre: pBusqueda                
      }
      dispatch(bancosData(iok))                
    }  
  }
  
const getDatas = useCallback((pagina) => {
    if(pagina > 0){          
      let iok = {
        pagina : 1,
        num:12,
        nombre: ""
      }
      dispatch(bancosData(iok))                
}
},[dispatch])
  
  useEffect(() => {            
      getDatas(1)         
    return () => {            
    };
  }, [getDatas]);  


  const handleEdit = (itd) =>{   
    setindicador(itd.id)
    setnitem(itd)
  }

  const handleTrash = (pky) =>{
    let iok ={
      id: pky,
      pagina: pagina,
      bancoId: pky
    }
    dispatch(bancosDelete(iok))
   
  }

  const handleChanges = (e) =>{
    const { value, name } = e.target          
        setnitem({
            ...nitem,
            [name]: value
        })
  }

  const handlesChanges = (e) =>{
    const { value, name } = e.target          
        setnitems({
            ...nitems,
            [name]: value
        })
  }

  const changeAA = (checked) => {               
    setnitem({
      ...nitem,
      "enabled": checked
  })
  }

  const changesAA = (checked) => {               
    setnitems({
      ...nitems,
      "enabled": checked
  })
  }

  const handleSave = () =>{
    let iok={}
    if(nitem.id){
      iok ={     
        id: nitem.id,   
        pagina: pagina,
        nombre: nitem.nombre,
        abreviacion: nitem.abreviacion,
        enabled: nitem.enabled
      } 
      dispatch(bancosUpdate(iok));   
    }else{
      iok ={        
        pagina: pagina,
        nombre: nitems.nombre,
        abreviacion: nitems.abreviacion,
        enabled: nitems.enabled
      }       
      dispatch(bancosCreate(iok));   
    }    
      handleReset()
      
  }

  const handleReset = () =>{
    setnitem({
      pagina: pagina,
      nombre: "",
      abreviacion: "",
      enabled: false
    })
    setnitems({
      pagina: pagina,
      nombre: "",
      abreviacion: "",
      enabled: false
    })
    setindicador(-1)    
      let iok = {
        pagina : 1,
        num:12,
        nombre: ""
      }
      dispatch(bancosData(iok))                    
  }

  const handlePage = (sap,vale) =>{      
    setpage(vale)          
    let iok = {
      pagina : 1,
      num:vale,
      nombre: ""
    }
    dispatch(bancosData(iok))                    
  }
 

return (
  <>
    <div className="h-full w-full">
        <div className="h-500 p-1">   
            <div className='h-9 border-b flex items-center bg-gray-100'>                                          
              <div className='h-8 w-10/12 flex items-center pl-1 pr-2'>
                <Search 
                    submitHandles={submitHandles}
                    handleReset={handleReset}
                  />
              </div> 
              <div className='h-8 w-2/12 flex items-center justify-around'>
                <button className='h-7 w-8  border border-gray-300 flex items-center rounded justify-center hover:bg-gray-50'>
                  <BookOpenIcon className="h-5 w-5 text-gray-500" />
                </button>
                <button className='h-7 w-8 border border-gray-300 flex items-center rounded justify-center hover:bg-gray-50'>
                  <CSVLink 
                    data={data}                   
                    filename={"bancos.csv"+fHoy}>
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
                <div className='h-52 border'>
                  <div className='h-7 border-b w-full bg-gray-100 font-bold pl-2 text-[10px] pt-2 text-gray-600'>
                     Datos de registro 
                  </div>
                  <div className='h-9 flex items-center pr-1 mt-1'>
                      <label htmlFor="nombre" className='w-1/3 pl-2 text-[11px] text-gray-500 font-bold'>Nombre :</label>
                      <input                              
                        type="text"
                        onChange={handlesChanges}                              
                        value={nitems.nombre}                
                        name="nombre"
                        className="h-7 w-2/3 text-[11px] pt-2 pl-2 block border border-gray-300  rounded  focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
                      />
                  </div>
                  <div className='h-9 flex items-center pr-1'>
                    <label htmlFor="abreviacion" className='w-1/3 pl-2 text-[11px] text-gray-500 font-bold'>Abreviación :</label>
                    <input                              
                      type="text"
                      onChange={handlesChanges}                              
                      value={nitems.abreviacion}                
                      name="abreviacion"
                      className="h-7 w-2/3 text-[11px] pt-2 pl-2 block border border-gray-300  rounded  focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
                    />
                  </div>
                  <div className='h-9 flex items-center pr-1'>
                    <label htmlFor="enabled" className='w-1/3 pl-2 text-[11px] text-gray-500 font-bold'>Habilitado :</label>
                    <div className='w-2/3 flex items-center'>
                      <Switch                         
                        onChange={ changesAA }  
                        checked={nitems.enabled || false} 
                        offColor="#ef4444"      
                        height={18}       
                        width={40}
                        onHandleColor="#c1c1c1"
                        offHandleColor="#c1c1c1"                                  
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
                  <div className="flex w-full">              
                      <Table
                              data={data}            
                              item={nitem}                            
                              handleEdit={handleEdit}
                              handleTrash={handleTrash}
                              handleChanges={handleChanges}
                              handleSave={handleSave}
                              changeAA ={changeAA}
                              indicador={indicador}
                              setindicador={setindicador}
                              handleReset={handleReset}/>      
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
     
    <Loading
      loading={loading}
    />
  </>
   );
}

export default BancoIndex;
