import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { pucsItems } from '@reducers/contabilidad/pucsSlice'
import { setItems, setTDebe, setTHaber } from '@reducers/contabilidad/comprobantesSlice'
import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import { toastr } from 'react-redux-toastr'
import { TrashIcon } from "@heroicons/react/24/outline";
import SearchInput from '@components/Inputs/SearchPuc'
import Moment from 'react-moment'
import writtenNumber from 'written-number'

const ListaAsientos = () => {
    const dispatch = useDispatch()          
    const { items } = useSelector((state) => state.pucs)
    const { item, vitems } = useSelector((state) => state.comprobantes)        
    const [ parametro, setparametro] = useState("");
    const [parametroId, setparametroId] = useState(0);    
    const [debe, setDebe] = useState(0);
    const [haber, setHaber] = useState(0);
    const [parcial, setParcial] = useState(0);
    const [codigo, setCodigo] = useState("");
    const [cuenta, setCuenta] = useState("");
    const [pucId, setPucId] = useState(0);    
    const [fm, setfm] = useState("");
    const [unit, setunit] = useState(-1);
    const [it, setit] = useState({});
  
    let ep  = JSON.parse(localStorage.getItem('@empresaConta23'))
    
    const handleSearch = () =>{
        let iok = {          
            parametro: parametro
          }       
          dispatch(pucsItems(iok))               
    }

    const asignar = (itt) =>{        
        let iko = '('+ itt.codigo +') '+ itt.descripcion
        setparametro(iko)
        setCuenta(itt.descripcion)
        setCodigo(itt.codigo)
        setfm(itt.fm)
        setPucId(itt.id)        
    }     

    const clean = () =>{     
        setparametro("")
        setDebe(0)
        setHaber(0)
        setCuenta("")
        setCodigo("")
        setfm("")
        setPucId(0)
        setParcial(0)        
    }

    const handleAsignar = () =>{
        let nItems = [...vitems]
        if (/^(\d)/.test(debe) && /^(\d)/.test(haber) ) {
            let iok = {                        
                debe: parseFloat(debe),
                haber: parseFloat(haber),
                codigo: codigo,
                glosaAsiento:item.glosa,
                fm: fm,
                parcial:parcial,
                descripcion: cuenta,                
                comprobanteId: item.id,
                pucId: pucId            
            }            
            nItems.push(iok)   
                        
            let deb = parseFloat(item.tDebe) + parseFloat(debe)
            dispatch(setTDebe(deb))
            let hab = parseFloat(item.tHaber) + parseFloat(haber)
            dispatch(setTHaber(hab))

            dispatch(setItems(nItems)) 
            clean()
        }else{
            toastr.error('Error', 'el debe o haber deben ser números')    
        }        
       
    }

       
    const handleDelete = (it,idebe, ihaber) =>{                 
        let nItems = vitems.filter(item => item.pucId !== it )           
        
        let deb = parseFloat(item.tDebe) - parseFloat(idebe)
        dispatch(setTDebe(deb))
        let hab = parseFloat(item.tHaber) - parseFloat(ihaber)
        dispatch(setTHaber(hab))     
        
        dispatch(setItems(nItems))
    }

    const handleEdit = (item,pky) =>{                
        setit(item)
        setunit(pky)
        
    }

    const handleGuardar = (pky) =>{ 
        let nItems = [...vitems]        
        
        const newArr = nItems.map((obj, key) => {            
            if (key === pky) {                
                return {...obj, fm: it.fm,  debe: it.debe, haber: it.haber };
                }          
                return obj;
            });
            
            let deb = (parseFloat(item.tDebe) - parseFloat(nItems[pky].debe)) + parseFloat(it.debe)
            dispatch(setTDebe(deb))
            let hab = (parseFloat(item.tHaber) - parseFloat(nItems[pky].haber)) + parseFloat(it.haber)
            dispatch(setTHaber(hab))
        
            dispatch(setItems(newArr)) 
            setunit(-1)
    }

    const handleChanges = (e) =>{
        const { value, name } = e.target              
        setit({
            ...it,
            [name]: value
        })
    }

    const itemView = (it) =>{
        return(
        <>        
            <td className='text-gray-600 border text-left pl-2'>{it.codigo}</td>
            <td className={(it.haber === 0 || it.haber === '0')  ? 'text-gray-600 border text-left pl-1':'text-gray-600 border text-left pl-8' }>{it.descripcion}</td>                                                
            <td className='text-gray-600 border text-center pl-1'>{it.fm}</td>                        
            <td className='text-gray-600 border text-center'>{new Intl.NumberFormat('es-'+ep.pais,{minimumFractionDigits: 2}).format(it.debe)}</td>
            <td className='text-gray-600 border text-center'>{new Intl.NumberFormat('es-'+ep.pais,{minimumFractionDigits: 2}).format(it.haber)}</td>                                                
            <td className='text-gray-600 border flex justify-center items-center'>
                <button
                onClick={() => handleDelete(it.pucId,it.debe,it.haber)}
                className='bg-red-500 hover:bg-red-400 h-6 w-6 rounded-md flex items-center justify-center'>
                <TrashIcon className="h-4 text-gray-50" />
                </button>    
            </td>
        </>)
    }

    const itemEdit = (pky) =>{       
        return(
        <>
        <td >
            <input            
            type="text"
            name="codigo"
            value={it.codigo}
            readOnly={true}
            className="ml-1 mr-1 h-7 pt-2 pl-2 block border bg-gray-100 border-gray-300 w-full rounded text-xs text-gray-500"
            />
        </td>
        <td colSpan={1}>
           <input           
            type="text"
            name="descripcion"
            value={it.descripcion}
            readOnly={true}
            className="ml-1 mr-1 h-7 pt-2 pl-2 block border border-gray-300 bg-gray-100 w-full rounded text-xs  text-gray-500"
            />        
        </td>                    
    <td>
        <input
            type="text"
            name="fm"
            onChange={(e) =>handleChanges(e)}
            value={it.fm}    
            readOnly={true}        
            className="ml-1 mr-1 h-7 pt-2 pl-2 block border-2 bg-gray-100 border-gray-300 w-full rounded text-xs focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
        />             
    </td>
    <td>
        <input
            type="text"
            name="debe"            
            onChange={(e) =>handleChanges(e)}
            value={it.debe}
            className="ml-1 mr-1 h-7 pt-2 pl-2 block border-2 text-center border-gray-300 w-11/12 rounded text-xs focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
        />            
    </td>
    <td>
        <input
            type="text"
            name="haber"
            onChange={(e) =>handleChanges(e)}
            value={it.haber}
            className="ml-1 mr-1 h-7 pt-2 pl-2 block text-center border-2 border-gray-300 w-11/12 rounded text-xs focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
        />            
    </td>
    <td className='flex justify-center items-center'>
        <button
        type="button"
        onClick={()=>handleGuardar(pky)}
        className="h-6 w-6 rounded-md bg-green-400 flex  items-center justify-center">
        <ChevronLeftIcon className="h-5 w-5 text-white"/>
        </button>
    </td>
        </>)
    }



const itemNews = () =>{
        return(
        <>
        <tr className='border'>           
           <td colSpan={6} className='bg-gray-100 h-8 pl-2 text-[10px] italic'>
            ---- {item.glosa} ----
           </td>                                
        </tr>
        <tr>        
        <td colSpan={2} className="border">
            <SearchInput
                handleSearch={handleSearch}                
                name={""}
                items={items}
                parametro={parametro}
                setparametro={setparametro}                                
                setparametroId={setparametroId}                
                compuesto={asignar}       
            /> 
        </td>                    
        <td>
            <input
                type="text"
                name="fm"
                onChange={(e) => setfm(e.target.value)}
                value={fm}
                readOnly={true} 
                className="h-7 pt-2 pl-2 bg-gray-100 block border-2 border-gray-300 text-center w-full rounded text-xs focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
            />             
        </td>
        <td>
            <input
                type="text"
                name="debe"
                onChange={(e) => setDebe(e.target.value)}
                value={debe}
                className="h-7 pt-2 pl-2 block border-2 text-center border-gray-300 w-full rounded text-xs focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
            />            
        </td>
        <td>
            <input
                type="text"
                name="haber"
                onChange={(e) => setHaber(e.target.value)}
                value={haber}
                className="h-7 pt-2 pl-2 block text-center border-2 border-gray-300 w-full rounded text-xs focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
            />            
        </td>
        <td className='flex justify-center items-center'>
            <button
            type="button"
            onClick={()=>handleAsignar()}
            className="h-6 w-6 rounded-md bg-sky-400 flex  items-center justify-center">
            <ChevronDownIcon className="h-5 w-5 text-white"/>
            </button>
        </td>
        </tr>
        </>    
        )
    }

        
 return (
    <div className="h-max w-11/12 flex-col p-2 border rounded-md bg-gray-50">
        <div className='flex-col  text-[10px] text-gray-600'>
            <div className="h-5 flex text-center mt-4">
                <div className="w-full font-bold">Comprobante de {item.tipo} # <b>{item.num}</b></div>                                                               
            </div>

            <div className="flex text-center">                
                    <div className='w-5/6 text-left pl-2'>
                        {item.ciudad} , <Moment format="LL" >{ item.fecha }</Moment>
                    </div>                            
                    <div className='w-1/6 font-bold'>
                        Nº {' '} { item.num }
                    </div>
            </div>
            <div className='h-6 flex items-center justify-end text-[10px]'>
                    <div className='w-4/6 text-left'>
                    </div>                            
                    
                    <div className='w-2/6 font-bold flex items-center justify-end'>
                        <label className='h-6 mt-2'>{ep.moneda}.</label>    
                        <p className="h-6 pt-1 ml-2 block w-28 text-center text-xs border-gray-300 rounded bg-gray-100">                        
                        {new Intl.NumberFormat('es-'+ep.pais,{minimumFractionDigits: 2}).format(item.total)}
                        </p>
                    </div>  
            </div>

            <div className="mt-2 p-1 flex-col justify-center items-center border-b text-[10px]"> 
                { item.tipo !== 'diario'?
                <div className='flex border-b'>
                    <div className='w-32 h-6 flex items-center justify-start  pl-2 font-bold'>
                       { item.tipo === "ingreso" ? "Recibimos de :":"Pagamos a :" }     
                    </div>
                    <div className='w-5/6 h-6 flex ml-2 items-center justify-start'>
                        { item.label}
                    </div>
                </div>:null
                }

                <div className='flex border-b'>
                    <div className='w-32 h-6 flex items-center justify-start  pl-2 font-bold'>
                        La suma de :    
                    </div>
                    <div className='w-5/6 h-6 flex ml-2 items-center justify-start'>
                    {item.total && 
                    <>
                    {writtenNumber(item.total, {lang: 'es'})} {',    '}
                    { item.total.toString().split('.')[1]} / 100 {' '}                            
                    { ep.moneda}
                    </>
                    }
                    </div>
                </div>

                <div className='flex border-b'>
                    <div className='w-32 h-6 flex items-center justify-start pl-2 font-bold'>
                    { item.tipo === "diario" ? "Glosa :":"Por concepto de :" }     
                    </div>
                    <div className='w-5/6 h-6 flex ml-2 items-center justify-start'>
                    { item.glosa}
                    </div>
                </div>

                <div className='h-7 flex '>
                    <div className='w-1/6 h-7 flex items-center justify-start pl-2 font-bold'>
                        Nº Cheque :
                    </div>
                    <div className='w-14 h-7 flex border-b ml-2 items-center justify-start'>
                       {item.nCheque}
                    </div>                    
                    <div className='w-1/6 h-7 flex border-b ml-2 items-center justify-end font-bold'>
                    Banco : 
                    </div>                    
                    <div className='w-3/6 h-7 flex border-b ml-2 items-center justify-start'>
                        {item.nBanco}
                    </div>
                </div>
            </div>   
        </div>
        <div className='flex-col border mt-2'>
            <h1 className='h-6 bg-gray-50 pl-2 pt-1 text-[10px] font-bold text-gray-600'>Productos</h1>           
            <table className='border-collapse w-full'>
                <thead>
                    <tr className='h-6 bg-gray-50 text-[10px] text-gray-500 border-t'>
                    <th className='w-2/12 border border-gray-300'>Código</th>                                        
                    <th className='w-4/12 border border-gray-300'>Cuenta</th>                                                            
                    <th className='w-1/12 border border-gray-300'>FM</th>                                        
                    <th className='w-2/12 border border-gray-300'>Debe</th>
                    <th className='w-2/12 border border-gray-300'>Haber</th>                        
                    <th className='w-1/12 border'></th>
                    </tr>
                </thead>
                <tbody>                
                    { vitems.map((it,index)=>(                                       
                       <tr 
                       key={index}
                       className={index === unit ? "text-[10px] bg-gray-300" : "text-[10px] bg-white hover:bg-gray-200"}
                       onDoubleClick={()=> handleEdit(it,index)}>
                       {index === unit ? itemEdit(index):itemView(it)}
                       </tr>           
                    ))}           
                    {unit < 0 ? itemNews() :null }              
                    <tr className='h-7 border bg-gray-100 font-bold text-gray-500 text-[10px]'>
                        <td colSpan={3} className='text-center'>Total</td>                    
                        <td className='text-center'>{new Intl.NumberFormat('es-'+ep.pais,{minimumFractionDigits: 2}).format(item.tDebe)}</td>
                        <td className='text-center'>{new Intl.NumberFormat('es-'+ep.pais,{minimumFractionDigits: 2}).format(item.tHaber)}</td>   
                    </tr>            
                </tbody>
            </table>                       
        </div>        
    </div>
    );
}

export default ListaAsientos;
