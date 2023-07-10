import { useRef, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useSelector } from 'react-redux'
import Moment from 'react-moment'
import writtenNumber from 'written-number'

const ComponentToPrint = forwardRef((props,ref)=>{
    let ep  = JSON.parse(localStorage.getItem('@empresaConta23'))

    return(
        <div ref={ref} >            
            <div className='mt-14 ml-2 mr-2 border rounded-md'>
                <div className="rounded-md p-1 text-gray-600">                                
                    <p className="text-left pl-2 text-gray-500 font-bold text-sm">{ ep.nombre}</p>                                                           
                </div>        

            {/* cabecera */}
            <div className="mt-1 p-1 text-[10px] rounded-sm">
                <p className="text-center pl-2  font-bold uppercase">Comprobante de {props.pitem.tipo} </p>                                                                    
            </div>
            
            <div className='h-7 flex items-center justify-end text-[10px]'>
                    <div className='w-5/6 text-left pl-2'>
                        {ep.ciudad} , <Moment format="LL" >{ props.pitem.fecha }</Moment>
                    </div>                            
                    <div className='w-1/6 font-bold'>
                        Nº {' '} { props.pitem.num }
                    </div>
            </div>
            <div className='h-6 flex items-center justify-end text-[10px]'>
                    <div className='w-4/6 text-left'>
                    </div>                            
                    
                    <div className='w-2/6 font-bold flex items-center justify-end'>
                        <label className='h-6 mt-2'>{ep.moneda}.</label>    
                        <p className="h-6 pt-1 ml-2 block w-28 text-center text-xs border-gray-300 rounded bg-gray-100">                        
                        {new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pitem.total)}
                        </p>
                    </div>  
            </div>
            {/* end cabecera */}

            <div className="mt-2 p-1 flex-col justify-center items-center border-b text-[10px]"> 
            { props.pitem.tipo !== "diario" ?
                <div className='flex border-b'>
                    <div className='w-32 h-6 flex items-center justify-start  pl-2 font-bold'>
                       { props.pitem.tipo === "ingreso" ? "Recibimos de :":"Pagamos a :" }     
                    </div>
                    <div className='w-5/6 h-6 flex ml-2 items-center justify-start'>
                        { props.pitem.label}
                    </div>
                </div>:null}

                <div className='flex border-b'>
                    <div className='w-32 h-6 flex items-center justify-start  pl-2 font-bold'>
                    { props.pitem.tipo === "diario" ? "Monto :":"La suma de :" }   
                    </div>
                    <div className='w-5/6 h-6 flex ml-2 items-center justify-start'>
                    {props.pitem.total && 
                    <>
                    {writtenNumber(props.pitem.total, {lang: 'es'})} {',    '}
                    { props.pitem.total.toString().split('.')[1]} / 100 {' '}                            
                    { ep.moneda}
                    </>
                    }
                    </div>
                </div>

                <div className='flex border-b'>
                    <div className='w-32 h-6 flex items-center justify-start pl-2 font-bold'>
                    { props.pitem.tipo === "diario" ? "Glosa :":"Por concepto de :" } 
                    </div>
                    <div className='w-5/6 h-6 flex ml-2 items-center justify-start'>
                    { props.pitem.glosa}
                    </div>
                </div>

                <div className='h-7 flex '>
                    <div className='w-1/6 h-7 flex items-center justify-start pl-2 font-bold'>
                        Nº Cheque :
                    </div>
                    <div className='w-14 h-7 flex border-b ml-2 items-center justify-start'>
                       {props.pitem.nCheque}
                    </div>                    
                    <div className='w-1/6 h-7 flex border-b ml-2 items-center justify-end font-bold'>
                    Banco : 
                    </div>                    
                    <div className='w-3/6 h-7 flex border-b ml-2 items-center justify-start'>
                        {props.pitem.nBanco}
                    </div>
                </div>
            </div>

            <div className="mt-1 flex bg-white p-1 rounded-md">
                <table className='border-collapse w-full'>
                    <thead>
                        <tr className='h-6 border bg-gray-100 text-[10px] text-gray-600'>                    
                            <th className='w-2/12 border border-gray-300'>Código</th>                                        
                            <th className='w-5/12 border border-gray-300'>Cuenta</th>                            
                            <th className='w-1/12 border border-gray-300'>FM</th>
                            <th className='w-2/12 border border-gray-300'>Debe</th>
                            <th className='w-2/12 border border-gray-300'>Haber</th>                                        
                        </tr>
                    </thead>
                    <tbody>                
                        { props.pitems.map((it,index)=>(
                            <tr 
                            key={index} 
                            className="text-[9px] text-gray-600"
                            >
                                <td className='border text-center pl-1'>{it.codigo}</td>
                                <td className={it.haber === 0  || it.haber === '0' ? 'border text-left pl-1':'border text-left pl-8' }>{it.descripcion}</td>                                                        
                                <td className='border text-center'>{it.fm}</td>
                                <td className='border text-center'>{it.debe !== 0 && it.debe !== '0'  ? new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(it.debe):""}</td>
                                <td className='border text-center'>{it.haber !== 0 && it.haber !== '0'  ? new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(it.haber):""}</td>                                                                        

                            </tr>
                        ))}
                        <tr >
                            <td colSpan={5} className="border text-[9px] pl-2 italic text-gray-600">
                                --- {props.pitem.glosa} ---
                            </td>
                        </tr>                                        
                        <tr className='border font-bold text-gray-600 text-[9px]'>
                            <td colSpan={3} className='text-center'></td>                            
                            <td
                            className='bg-gray-100 text-center border'>
                            {new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pitem.tDebe)}
                            </td>
                            <td
                            className='bg-gray-100 text-center border'>
                            {new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(props.pitem.tHaber)}
                            </td>    
                        </tr>
                    </tbody>
                </table>                    
            </div>      

            <div className='mt-1 p-1'>
                <table className='border-collapse w-full'>
                    <thead>
                        <tr className='bg-gray-100 text-[10px] text-gray-600'>                    
                            <th className='w-2/12 border border-gray-300'>Confecciono</th>                                        
                            <th className='w-2/12 border border-gray-300'>Contador</th>                            
                            <th className='w-2/12 border border-gray-300'>Gerente</th>                                        
                            <th className='w-2/12 border border-gray-300'>Beneficiario</th>                                                                  
                        </tr>
                    </thead>
                    <tbody>     
                        <tr className='h-8'>
                            <td className='border'></td>
                            <td className='border'></td>
                            <td className='border'></td>
                            <td className='border'></td>
                        </tr>                        
                    </tbody>
                </table>           
            </div> 

            </div>             
        </div>
    )
})



const ModalComprobante = ({view,setview}) => {
    const { item, vitems } = useSelector((state) => state.comprobantes) 
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })
    
    

  return (
    <>
    { view ?
        <>
        <div className="justify-center items-center flex-1 fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="p-1 relative w-auto my-3 mx-auto max-w-xl flex-row justify-between">
                <div className="h-620 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="ml-1 fixed h-10 w-550 border rounded shadow-md flex p-1 justify-between bg-white">                        
                        <button 
                            onClick={() =>handlePrint()}
                            className="w-16 rounded bg-sky-500 text-xs hover:text-gray-200 flex justify-center items-center text-white">                           
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd"></path></svg>
                        </button>
                        <button 
                            onClick={() => setview(false)}
                            className="w-7 h-7 rounded-full bg-red-400 text-xs flex items-center justify-center text-white font-bold mr-4">                            
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    
                    <div className="overflow-y-scroll">
                        <ComponentToPrint
                            ref={componentRef}    
                            pitem={item}    
                            pitems={vitems}                                
                        />                          
                    </div>                                                              
                </div>    
            </div>        
        </div>  
        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    : null  }
    </>        
    );
}

export default ModalComprobante;
