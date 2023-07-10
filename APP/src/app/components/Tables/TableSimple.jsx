import Moment from "react-moment"
import { apiUrl } from '@helpers'   

const TableSimple = ({ data,columnDefs,bandera}) => {
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
                if(columnDefs[index]){                                                                               
                    let tdr= ""
                    switch(columnDefs[index].rts)
                    {
                        case 'txt':
                            tdr = <td key={index} className={`truncate pl-1 border h-7 ${columnDefs[index].est} text-gray-700`}>{ite}</td>
                        break;
                        case 'num':
                            tdr = <td key={index} className={`truncate pl-1 border h-7 ${columnDefs[index].est} text-center text-gray-700`}>{ite}</td>
                        break;
                        case 'fecha':
                            tdr = <td key={index} className={`truncate pl-1 border h-7 ${columnDefs[index].est} text-center text-gray-700`}>
                                <Moment format="DD-MM-YYYY" >{ite}</Moment>
                            </td>
                        break;
                        case 'fechaHora':
                            tdr = <td key={index} className={`truncate pl-1 border h-7 ${columnDefs[index].est} text-center text-gray-700`}>
                                <Moment format="DD-MM-YYYY HH:mm" >{ite}</Moment>
                            </td>
                        break;   
                        case 'moneda':
                            tdr = <td key={index} className={`truncate pl-1 border h-7 ${columnDefs[index].est} text-center text-gray-700`}>
                                {new Intl.NumberFormat('es-'+ep.pais,{minimumFractionDigits: 2}).format(ite)}
                                </td>
                        break;
                        case 'imagen':
                            tdr = <td key={index} className={`truncate pl-1 h-7 ${columnDefs[index].est} text-center text-gray-700`}>
                                <img alt="cliente"
                                className="h-20 w-32 border rounded"          
                                src={`${apiUrl}static/images/${bandera}/sm/` + ite}
                               /></td>
                        break; 
                        default:
                            break;                            
                    }
                    return tdr
                   /* return <td key={index} className={`truncate pl-1 border h-7 ${columnDefs[index].est} text-xs text-gray-700`}>{ite}</td>                    */
                }
            return null
        })               
        return tds
    }

    const tdata = <tbody>
    { 
        data.map((ite,index)=> (
            <tr 
            className={`w-${ite.width} border h-8 hover:bg-sky-50`}
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

export default TableSimple;
