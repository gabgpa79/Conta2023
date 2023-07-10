import React,{useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print';
import Moment from 'react-moment';
import { PrinterIcon, CloudArrowDownIcon } from "@heroicons/react/24/outline";
import { CSVLink } from "react-csv";
import { getFechas } from "@helpers/functions"

const ComponentToPrint = React.forwardRef((props,ref)=>{    
    const fechaHoy = new Date();    
    let us  = JSON.parse(localStorage.getItem('@usuarioConta23'))  
    let ep  = JSON.parse(localStorage.getItem('@empresaConta23'))

    return ( 
        <div ref={ref} className="pl-8 pr-8 pt-2 text-[9px] text-gray-500 w-full">
            
        <div className="border-b mt-4 flex">
            <div className="w-1/2">                          
            </div>
            <div className="w-1/2">                    
                <p className="text-right pl-2 text-gray-500 font-bold ">{ ep.nombre}</p>
                <p className="text-right pl-2 text-gray-500 ">Nit: { ep.nit}</p>
                <p className="text-right pl-2 text-gray-500 ">Dirección: { ep.direccion}</p>
            </div>
        </div>

        <h6 className="font-bold text-center mt-2">Diarios</h6> 
        <h6 className='text-center'>Desde : <Moment format="ll">{props.pdesde}</Moment>  - Hasta : <Moment format="ll">{props.phasta}</Moment></h6>    
        <h6 className='text-center'>Expresado en : {ep.labelMoneda}</h6>
        
        

        <div className='border w-full mt-2 p-1'>
            <table className='border-collapse w-full'>  
                    <thead>
                        <tr className='h-7 border bg-gray-100'>
                            <th className='w-2/12 border'>Código</th>                              
                            <th className='w-5/12 border'>Cuenta</th>
                            <th className='w-1/12 border'>FM</th>
                            <th className='w-2/12 border'>Debe</th>                                                                                                             
                            <th className='w-2/12 border'>Haber</th>                    
                        </tr>
                    </thead>
                </table>    
            { props.pitems.map((it,index)=>(               
                <div key={index} >
                  <table className='border-collapse w-full text-[10px]'>
                    <tbody>
                            <tr className='bg-gray-100 border-t border-gray-300 h-6 text-[9px]'>
                              <td className='w-3/12 text-center italic font-bold'>
                                <Moment format="LL">{it.fecha}</Moment>
                              </td>
                              <td className='w-4/12 text-center pl-1 text-gray-400'>
                                ---------------------------
                                <span className='ml-4 mr-4 italic text-gray-600'>{it.id}</span>---------------------------
                              </td>
                              <td className='w-1/12'></td>                              
                              <td className='w-2/12'></td>                              
                              <td className='w-2/12'></td>                              
                            </tr>                                                
                        { it.items.map((itt,ind)=>(
                            <tr key={itt.id} className="h-6 text-[9px]">                                
                                <td className='border text-left pl-1'>{itt.codigo}</td>                                                                       
                                <td className='border text-left pl-1'>{itt.cuenta}</td>
                                <td className='border text-center'>{itt.fm}</td>
                                <td className='border text-center'>
                                    {itt.debe !== "0" ? new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(itt.debe):"" }
                                </td>
                                <td className='border text-center'>
                                    {itt.haber !== "0" ? new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(itt.haber):"" }
                                </td>
                            </tr>
                        ))}                             
                        <tr className="h-6 bg-gray-100 text-[9px]">                        
                            <td className='border text-left pl-2' colSpan={3}>
                            ---{it.glosa}---
                            </td>
                            <td className='border text-center pl-2 font-bold text-gray-600 italic'>
                                {new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(it.iDebe)}
                            </td>                                                
                            <td className='border text-center pl-2 font-bold text-gray-600 italic'>
                                {new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(it.iHaber)}
                            </td>                                                
                        </tr>
                                
                    </tbody>
                </table>
                </div>
                           
            ))}   
            <div>
                <table className='border-collapse w-full'>   
                    <tbody>                        
                        <tr className="h-6 font-bold bg-gray-100 border">                        
                            <td className='text-left pl-2' colSpan={3}>Total</td>
                            <td className='text-center pl-2 w-2/12'>
                                {new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pdebe)}
                            </td>                                                
                            <td className='text-center pl-2 w-2/12'>
                                {new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.phaber)}
                            </td>                                                
                        </tr>
                                
                    </tbody>
                </table>         
            </div> 
        </div>






    
        
        <div className='flex mt-6 mb-6'>
            <h5 className="w-1/2 text-left pl-1 italic">fecha emisión : <Moment format="DD/MM/YYYY - HH:mm">{ fechaHoy }</Moment></h5>   
            <h5 className="w-1/2 text-right pr-1 italic">user : { us.nombres }</h5>            
        </div>            
        {/* end content */}

    </div>
     );
    }
)

const Diario = ({desde,hasta}) => {        
    const { vitems , tDebe, tHaber } = useSelector((state) => state.contabilidad) 
    const fHoy = "_"+getFechas()     
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    
     useEffect(() =>{        
         return () =>{                       
         
        };
      }, []);


    return(
        <div className="h-auto w-full flex-col justify-center">
            <div className='h-10 border-b flex w-full bg-gray-50 justify-end pr-4 items-center'>
                    <button
                    className="h-6 w-10 bg-gray-50 hover:bg-gray-100 rounded border-2 hover:text-gray-200 flex justify-center items-center text-white">                                           
                    <CSVLink 
                    data={vitems}                    
                    filename={"informeCajas.csv"+fHoy}>                 
                    <CloudArrowDownIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    </CSVLink>
                    </button> 
                    <button 
                        onClick={() =>handlePrint()}
                        className="ml-2 h-6 w-10 bg-gray-50 hover:bg-gray-100 rounded border-2 hover:text-gray-200 flex justify-center items-center text-white">                                           
                        <PrinterIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    </button> 
            </div>

            <div className='h-500 flex w-full overflow-y-scroll p-1 justify-center'>
                <div className='h-max border flex w-9/12 bg-white'>
                <ComponentToPrint
                    ref={componentRef}    
                    pitems={vitems}                
                    pdebe={tDebe}   
                    phaber={tHaber}   
                    pdesde={desde}
                    phasta={hasta}                       
                />                          
                </div>                                                              
            </div>
    </div>      
     )
    }

export default Diario;