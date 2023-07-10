export const verifiDBEmpty = (params) =>{
    if(params === "" || params === 0 || params === '0' || params === "0" || params === undefined )
    {
        return 0
    }else{
        return params
    }
}
export const verifiDBNull = (params) =>{
    if(params === '--todos--' || params === null || params === '' || params === 0 || params === '0' || params === undefined )
    {
        return '%'
    }else{
        return '%'+params+'%'
    }
}

export const verifiDBNulld = (params) =>{
    if(params === '--todos--' || params === null || params === '' || params === 0 || params === '0' || params === undefined )
    {
        return '%'
    }else{
        return params
    }
}

export const verifiDBNulls = (params) =>{
    if(params === '--todos--' || params === null || params === '' || params === 0 || params === '0' || params === undefined )
    {
        return '0'
    }else{
        return '%'+params+'%'
    }
}

export const verifiEmpty = (params) =>{
    if(params === '--todos--' || params === null || params === '' || params === 0 || params === '0' || params === undefined )
    {
        return '*'
    }else{
        return '%'+params+'%'
    }
}

export const isNUll = (dato) =>{
    if(dato){
        return dato
    }else{
        return 0
    }
}
export const isNUllArray = (data) =>{
    if(data){
        return data
    }else{
        return []
    } 
}

export const formatearInteger = (data) =>{
    let newData = []

    data.map((itt)=>{
        let iok={
            nombre: itt.nombre,            
            precioVenta: parseFloat(itt.precioVenta),
            filename: itt.filename,
            tipoId: parseInt(itt.tipoId),
            volumenId: parseInt(itt.volumenId),
            origenId: parseInt(itt.origenId),
            categoriaId: parseInt(itt.categoriaId),
            marcaId: parseInt(itt.marcaId),
            unidadId: parseInt(itt.unidadId),
            modeloId: parseInt(itt.modeloId),
            industriaId: parseInt(itt.industriaId)
        }
        newData.push(iok)
    })
    return newData
}


export const formatearMes = (data) =>{
    let asistencia = [0,0,0,0,0,0,0,0,0,0,0,0]
    let consulta   = [0,0,0,0,0,0,0,0,0,0,0,0]
    let reclamo    = [0,0,0,0,0,0,0,0,0,0,0,0]
    let soporte    = [0,0,0,0,0,0,0,0,0,0,0,0]

    data.map((itt,index)=>{
        switch(itt.tipo){
            case 'asistencia':
              asistencia[itt.mes-1]= Number(itt.total)
            break;
            case 'consulta':
              consulta[itt.mes-1]= Number(itt.total)
            break;
            case 'reclamo':
              reclamo[itt.mes-1]= Number(itt.total)
            break;
            case 'soporte':
              soporte[itt.mes-1]= Number(itt.total)
            break;
            default:              
            break;    
        }
    })  

    return { asistencia, consulta, reclamo, soporte }    
}

export function getFechaAnterior() 
{
   let  d = new Date()
   var dd = String(d.getDate()-1).padStart(2, '0');
   var mm = String(d.getMonth()+1).padStart(2, '0'); //January is 0!
   var yyyy = d.getFullYear();
   var tt = yyyy + '-' + mm + '-' + dd;    
   return tt
} 
