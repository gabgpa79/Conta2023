import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import Table from '@components/Tables/Table'
import Pagination from '@components/Navigators/Pagination'
import Search from '@components/Inputs/Searchs'
import SelectLocal from '@components/Selects/SelectUnit'
import MenuActions from '@components/Menus/Menus'
import { usuariosData, usuariosItem, resetUsuario, resetUsuarios  } from '@reducers/config/usuariosSlice'
import Loading from '@components/Navigators/Loading'
import { _columndUsuarios } from '@data/dataModels'
import { _pag } from '@data/dataLoad'
import { CloudArrowDownIcon, BookOpenIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { CSVLink } from "react-csv";
import { getFechas } from "@helpers/functions"

const fHoy = "_"+getFechas()

const ClienteIndex = () => {
    const dispatch = useDispatch()  
    const navigate = useNavigate()
    const { data, total, pagina, paginas, loading} = useSelector((state) => state.usuarios)
    const { pBusqueda } = useSelector((state) => state.parametro)    
    const [indicador, setindicador] = useState(0);        
    const [page, setpage] = useState(12);
    const [viewc, setviewc] = useState(false);   
 
    const setIndicador = (key) =>{ 
      if(key === indicador){
        setindicador(0) 
      }else{
        setindicador(key) 
      }      
    }

    const submitHandles = event => {
        event.preventDefault();
        let iok = {
          pagina :1,
          num:page,
          parametro: pBusqueda,
          prop: "nombres"
        }               
        dispatch(usuariosData(iok))        
    }

   
  
    const getData = (pagina) =>{   
        if(pagina > 0){            
              let iok = {
                pagina : pagina,
                num:page,
                parametro: pBusqueda,        
                prop: "nombres"            
              }
              
              dispatch(usuariosData(iok))                  
       }
    }

      const handleNew = () =>{
        dispatch(resetUsuario())
        navigate('/admin/configuracion/usuarios/new');
      } 
      
      const handleEdit = () =>{        
        if(indicador){
          let iok={
            id: indicador,
            tipo: 'unit'
          }
          dispatch(usuariosItem(iok))
          navigate('/admin/configuracion/usuarios/new');        
        }
        
      }
      
          
    useEffect(() => {      
        getData(1)            
      return () => {      
        dispatch(resetUsuarios())      
      };
    }, []);  


        

    const handleReset = () =>{         
            let iok = {
              pagina : 1,
              num:page,
              parametro: "",        
              prop:"nombres"  
            }
            dispatch(usuariosData(iok))    
    }

    const handlePage = (sap,vale) =>{      
      setpage(vale)
      if(pagina > 0){            
        let iok = {
          pagina : pagina,
          num:vale,
          parametro: pBusqueda,        
          prop: "nombres"            
        }
        dispatch(usuariosData(iok))                  
      }
    }

 
    return (

      <>
    <div className="h-full w-full">
        <div className="h-500 p-1">   
            <div className='h-9 border-b flex items-center bg-gray-100'>                                          
              <div className='h-8 w-5/12 flex items-center pl-1 pr-2'>
                <MenuActions
                indicador={indicador}
                handleNew={handleNew} 
                handleEdit={handleEdit}/>  
              </div>            
              <div className='h-8 w-5/12 flex items-center pl-1'>
              <Search 
                    submitHandles={submitHandles}
                    handleReset={handleReset}
                  />
              </div> 
              <div className='h-8 w-2/12 flex items-center justify-around ml-2'>
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
              <div className='w-full flex-col'>
                  <div className="flex w-full">              
                      <Table
                        data={data}
                        columnDefs={_columndUsuarios}
                        indicador={indicador}
                        setIndicador={setIndicador}                               
                      />
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

export default ClienteIndex;
