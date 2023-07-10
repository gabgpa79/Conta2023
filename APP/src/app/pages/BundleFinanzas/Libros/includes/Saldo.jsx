import React,{useEffect, useRef} from 'react'
import {  useSelector } from 'react-redux'
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
        <div ref={ref} className="pl-4 pr-4 pt-2 text-[9px] text-gray-500 w-full">
            
        <div className="border-b mt-6 flex">
            <div className="w-1/2">                          
            </div>
            <div className="w-1/2">                    
                <p className="text-right pl-2 text-gray-500 font-bold ">{ ep.nombre}</p>
                <p className="text-right pl-2 text-gray-500 ">Nit: { ep.nit}</p>
                <p className="text-right pl-2 text-gray-500 ">Dirección: { ep.direccion}</p>
            </div>
        </div>

        <h6 className="font-bold text-center mt-2">Hojas de Trabajo para la Preparación de Estados Financieros</h6> 
        <h6 className='text-center'>Practicado al : <Moment format="ll">{props.phasta}</Moment></h6>    
        <h6 className='text-center'>Expresado en : {ep.labelMoneda}</h6>
        
        

        <div className='w-full mt-2'>              
            <table className='border-collapse w-full text-[8px]'>
                    <thead>    
                        <tr className='h-6 border bg-gray-100'>
                            <th className='w-1/12 text-left pl-1'>Nº</th>
                            <th className='w-3/12 text-left pl-1'>Detalle</th>
                            <th className='w-1/12 border' colSpan={2}>SUMAS</th>                                                                                                             
                            <th className='w-1/12 border' colSpan={2}>SALDOS</th>                    
                            <th className='w-1/12 border' colSpan={2}>ESTADO DE RESULTADOS</th>                                                                                                             
                            <th className='w-1/12 border' colSpan={2}>BALANCE GENERAL</th>                                                
                        </tr>                    
                    
                        <tr className='h-6 border bg-gray-50'>
                            <th className='w-1/12 border'></th>
                            <th className='w-3/12 border'></th>
                            <th className='w-1/12 border'>Debe</th>                                                                                                             
                            <th className='w-1/12 border'>Haber</th>                    
                            <th className='w-1/12 border'>Deudor</th>                                                                                                             
                            <th className='w-1/12 border'>Acreedor</th>                    
                            <th className='w-1/12 border'>Perdidas</th>                                                                                                             
                            <th className='w-1/12 border'>Ganancias</th>
                            <th className='w-1/12 border'>Activo</th>
                            <th className='w-1/12 border'>Pasivo</th>
                        </tr>
                        
                    </thead>

                    <tbody>
                        { props.pitems.map((itt,ind)=>(
                            <tr key={ind} className="h-5">                                
                                <td className='border text-center pl-1'>{itt.fm}</td>                                                                       
                                <td className='border text-left pl-1'>{itt.cuenta}</td>                                
                                <td className='border text-center'>
                                    {itt.iDebe > 0 ? new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(itt.iDebe):"" }
                                </td>
                                <td className='border text-center'>
                                    {itt.iHaber > 0 ?  new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(itt.iHaber):"" }
                                </td>
                                <td className='border text-center'>
                                    {itt.iDeudor > 0 ?  new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(itt.iDeudor):"" }
                                </td>
                                <td className='border text-center'>
                                    {itt.iAcreedor > 0 ?  new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(itt.iAcreedor):"" }
                                </td>
                                <td className='border text-center'>
                                    {itt.iGastos > 0 ?  new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(itt.iGastos):"" }
                                </td>
                                <td className='border text-center'>
                                    {itt.iIngresos > 0 ?  new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(itt.iIngresos):"" }
                                </td>
                                <td className='border text-center'>
                                    {itt.iActivo > 0 ?  new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(itt.iActivo):"" }
                                </td>
                                <td className='border text-center'>
                                    {itt.iPasivo > 0 ?  new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(itt.iPasivo):"" }
                                </td>

                            </tr>                            
                        ))}   

                        <tr className='h-7 border bg-gray-50'>
                            <td className='border text-center' colSpan={2}>
                                SUMAS
                            </td>
                            <td className='border text-center'>
                            {new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pdebe)}
                            </td>
                            <td className='border text-center'>
                            {new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.phaber)}   
                            </td>
                            <td className='border text-center'>
                            {new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pdeudor)}   
                            </td>
                            <td className='border text-center'>
                            {new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pacreedor)}   
                            </td>
                            <td className='border text-center'>
                            {new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pgastos)}   
                            </td>
                            <td className='border text-center'>
                            {new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pingresos)}  
                            </td>
                            <td className='border text-center'>
                            {new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pactivos)}   
                            </td>
                            <td className='border text-center'>
                            {new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.ppasivos)}   
                            </td>
                        </tr>     

                        <tr className='h-7 border bg-gray-50'>
                            <td className='border text-center' colSpan={2}>
                            Diferencias utilidad / perdida
                            </td>
                            <td className='border text-center'>
                            
                            </td>
                            <td className='border text-center'>
                            
                            </td>
                            <td className='border text-center'>
                            
                            </td>
                            <td className='border text-center'>
                            
                            </td>
                            <td className='border text-center'>
                            { props.pgastos-props.pingresos < 0 ? new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pingresos-props.pgastos): ""}    
                            </td>
                            <td className='border text-center'>
                            { props.pgastos-props.pingresos > 0 ? new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pgastos-props.pingresos): ""}
                            </td>
                            <td className='border text-center'>
                            { props.pactivos-props.ppasivos < 0 ? new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.ppasivos-props.pactivos): ""}
                            </td>
                            <td className='border text-center'>
                            { props.pactivos-props.ppasivos > 0 ? new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pactivos-props.ppasivos): ""}   
                            </td>
                        </tr>    

                         <tr className='h-7 border bg-gray-100'>
                            <td className='border text-center' colSpan={2}>
                            SUMAS INGUALES
                            </td>
                            <td className='border text-center'>
                            
                            </td>
                            <td className='border text-center'>
                            
                            </td>
                            <td className='border text-center'>
                            
                            </td>
                            <td className='border text-center'>
                            
                            </td>
                            <td className='border text-center'>
                            { props.pgastos-props.pingresos < 0 ? new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pingresos): new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pgastos)}    
                            </td>
                            <td className='border text-center'>
                            { props.pgastos-props.pingresos > 0 ? new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pgastos): new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pingresos)}
                            </td>
                            <td className='border text-center'>
                            { props.pactivos-props.ppasivos < 0 ? new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.ppasivos) : new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pactivos)}
                            </td>
                            <td className='border text-center'>
                            { props.pactivos-props.ppasivos > 0 ? new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pactivos): new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.ppasivos)}  
                            </td>
                        </tr>               
                                                                                        
                    </tbody>
            </table>
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

const Saldo = ({desde,hasta}) => {        
    const { sitems , tDebe, tHaber, tDeudor, tAcreedor,tGastos, tIngresos, tActivos, tPasivos } = useSelector((state) => state.contabilidad)    
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
                    data={sitems}                    
                    filename={"informeSaldos.csv"+fHoy}>                 
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
                <div className='h-max border flex w-11/12 bg-white'>
                <ComponentToPrint
                    ref={componentRef}                    
                    pitems={sitems}                
                    pdebe={tDebe}   
                    phaber={tHaber}
                    pdeudor={tDeudor}
                    pacreedor={tAcreedor}   
                    pgastos={tGastos} 
                    pingresos={tIngresos} 
                    pactivos={tActivos} 
                    ppasivos={tPasivos}
                    pdesde={desde}
                    phasta={hasta}                       
                />                          
                </div>                                                              
            </div>
        </div> 
         )
    }

export default Saldo;

                