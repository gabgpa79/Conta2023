import { useRef, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useSelector } from 'react-redux'
import Moment from 'react-moment'
import { PrinterIcon,  XMarkIcon } from "@heroicons/react/24/outline";

const ComponentToPrint = forwardRef((props,ref)=>{
    const fechaHoy = new Date()    
    const us   = JSON.parse(localStorage.getItem('@usuarioConta23'))  
  

    
    return(
        <div ref={ref} className="p-4 text-[9px] text-gray-600">

            <div className="h-10 text-center mt-14">
                <h6 className="font-bold">Plan de Cuentas</h6>
                <h6 className='text-center'>Fecha :<Moment format="ll">{fechaHoy}</Moment></h6>            
            </div>

          
            <div className='border w-full mt-2 p-1'>
                <table className='border-collapse w-full'>
                    <thead>
                        <tr className='h-6 border bg-gray-100 '>                    
                            <th className='w-1/12 border'>ID</th>
                            <th className='w-3/12 border'>Código</th>                               
                            <th className='w-5/12 border'>Nombre</th>                               
                            <th className='w-2/12 border'>Tipo</th>                                                                                                                                         
                            <th className='w-1/12 border'>Nivel</th>                                                
                        </tr>
                    </thead>
                    <tbody>
                        { props.pdata.map((it,index)=>(
                            <tr key={index} >
                                <td className='border text-center'>{it.id}</td>                                               
                                <td className='border text-left pl-1'>{it.codigo}</td>
                                <td className='border text-left pl-1'>{it.descripcion}</td>
                                <td className='border text-left pl-1'>{it.tipo}</td>
                                <td className='border text-left pl-1'>{it.nivel}</td>                                
                            </tr>
                        ))}        
                    </tbody>
                </table>    
            </div>
            
            <div className='flex mt-2'>
                <h5 className="w-1/2 text-left pl-1 italic">fecha emisión : <Moment format="DD/MM/YYYY - HH:mm">{ fechaHoy }</Moment></h5>   
                <h5 className="w-1/2 text-right pr-1 italic">user : { us.nombres }</h5>            
            </div>            
            {/* end content */}

        </div>
    )
})



const ModalPlan = ({viewc,setviewc}) => {
    const { data } = useSelector((state) => state.pucs)            
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })


  return (
    <>
    { viewc ?
        <>
        <div className="justify-center items-center flex-1 fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="p-1 relative w-auto my-3 mx-auto max-w-lg flex-row justify-between">
                <div className="h-620 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="ml-1 fixed h-10 w-500 border rounded shadow-md flex p-1 justify-between bg-white">                        
                        <button 
                            onClick={() =>handlePrint()}
                            className="w-16 rounded bg-sky-500 text-xs hover:text-gray-200 flex justify-center items-center text-white">                           
                           <PrinterIcon className="h-5 w-5 text-gray-50" />
                        </button>
                        <button 
                            onClick={() => setviewc(false)}
                            className="w-7 h-7 rounded-full bg-red-400 text-xs flex items-center justify-center text-white font-bold mr-4">                            
                            <XMarkIcon className="h-5 w-5 text-gray-50" />
                        </button>
                    </div>
                    
                    <div className="overflow-y-scroll">
                        <ComponentToPrint
                            ref={componentRef}    
                            pdata={data}       

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

export default ModalPlan;
