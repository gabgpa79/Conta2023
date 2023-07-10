import Moment from "react-moment"
import { apiUrl } from '@helpers'
import { DocumentArrowDownIcon, DocumentTextIcon, DocumentArrowUpIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

const TableAccion = ({  data,columnDefs,indicador,setIndicador,bandera }) => {        
    let ep  = JSON.parse(localStorage.getItem('@empresaConta23'))

    const teaders = () =>{
        const thdes = columnDefs.map((ite,index)=>(            
            <th 
               className={`w-${ite.width} ${ite.est} h-8 bg-gray-50 border text-stone-600`}
               key={index}>{ ite.field }</th>           
        ))
        return thdes
    }

    const ltd = (val) =>{       
        var result = Object.values(val);              
        const tds = result.map((ite,index)=> {              
                if(index === 0)
                {
              
                    return <td key={index} className="border text-center  text-gray-700">                                                            
                                    <input type="checkbox" 
                                    onChange={() => { setIndicador(ite,result[3]) }}   
                                    checked={ ite === indicador ? true : false}                          
                                    /> 
                           </td>
                }else if(columnDefs[index]){                                                                               
                    let tdr= ""
                    switch(columnDefs[index].rts)
                    {
                        case 'txt':
                            tdr = <td key={index} className={`truncate pl-1 border h-7 ${columnDefs[index].est}  text-gray-700`}>{ite}</td>
                        break;
                        case 'bool':
                            tdr = <td key={index} className={ite === 'aprobado' ? `truncate pl-1 h-7 ${columnDefs[index].est}   text-center font-bold bg-green-100 text-gray-500` : `truncate pl-1 h-7 ${columnDefs[index].est}   text-center  italic text-gray-500  bg-red-200`}>                                
                                {ite}
                                </td>
                        break;
                        case 'icon':
                            tdr = <td key={index} className={`truncate pl-1 h-7 ${columnDefs[index].est} text-center font-bold text-gray-400 flex items-center justify-center`}>                                
                                {ite === "diario"  ? <><DocumentTextIcon className="h-4 w-4 text-sky-300" /> <span className="w-14">{ite}</span></>: null}
                                {ite === "ingreso" ? <><DocumentArrowDownIcon className="h-4 w-4 text-green-500" /><span className="w-14">{ite}</span></>: null}
                                {ite === "egreso"  ? <><DocumentArrowUpIcon className="h-4 w-4 text-red-500" /><span className="w-14">{ite}</span></>: null}
                                </td>
                        break;
                        case 'num':
                            tdr = <td key={index} className={`truncate pl-1 border h-7 ${columnDefs[index].est}  text-center text-gray-700`}>{ite}</td>
                        break;
                        case 'fechas':
                            tdr = <td key={index} className={`truncate pl-1 border h-7 ${columnDefs[index].est}  text-center text-gray-700`}>
                                <Moment format="DD-MM-YYYY" >{ite}</Moment>
                            </td>
                        break;  
                        case 'fecha':
                            tdr = <td key={index} className={`truncate pl-1 h-7 ${columnDefs[index].est}  flex items-center justify-center text-center text-gray-700`}>
                                <CalendarDaysIcon className="h-5 w-5 text-gray-400 mr-1 " />
                                <Moment format="DD-MM-YYYY" >{ite}</Moment>
                            </td>
                        break;  
                        case 'moneda':
                            tdr = <td key={index} className={`truncate pl-1 border h-7 ${columnDefs[index].est}  text-center text-gray-700`}>
                                {new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(ite)}
                                </td>
                        break;
                        case 'imagen':
                            tdr = <td key={index} className={`truncate pl-1 h-7 ${columnDefs[index].est}  text-center text-gray-700`}>
                                <img alt="cliente"
                                className="h-20 w-32 border rounded"          
                                src={`${apiUrl}static/images/${bandera}/sm/` + ite}
                               /></td>
                        break; 
                        case 'est':
                            tdr = <td key={index} className={ite ? `truncate pl-1 h-7 ${columnDefs[index].est}  font-bold text-center text-green-500` : `truncate italic pl-1 h-7 ${columnDefs[index].est}  text-center text-red-500 font-bold`}>
                                { ite ? "cerrado":"pendiente"}
                                </td>
                        break; 
                        default:
                            break;                            
                    }
                    return tdr
                   /* return <td key={index} className={`truncate pl-1 border h-7 ${columnDefs[index].est}  text-gray-700`}>{ite}</td>                    */
                }
            return null
        })               
        return tds
    }

    const tdata = <tbody>
    { 
        data.map((ite,index)=> (
            <tr 
            className={`w-${ite.width} border  h-8 hover:bg-sky-50`}
            key={index}>
               {ltd(ite)}
            </tr>            
        ))
    }         
    </tbody>
    


    return (
        <>
          <div className="flex-1 mx-auto  p-1 rounded">
          <table className="border-collapse w-full text-[10px]">
            <thead>
                <tr>
                {teaders()}
                </tr>
            </thead>           
                { tdata }            
          </table>
          </div>  
                    
        </>
    );
}

export default TableAccion;
