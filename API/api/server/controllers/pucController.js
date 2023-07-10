import { verifiEmpty, verifiDBNull } from '../../functions/env'
import { itemsPucs, dataPucs, registrarPuc, _deletePuc, actualizarPuc } from "../services/pucService"


const  p_items = (req,res)=>{        
    const { parametro } = req.body    
    let inombres = verifiEmpty(parametro)
    let iprop    = 'descripcion'
    if (/^(\d)/.test(parametro)) {
        iprop = 'codigo'
    }     
    itemsPucs(inombres,iprop)
      .then((rows)=>{      
   
          res.status(200).send({result: rows})
      })
      .catch((reason)=>{          
          res.status(400).send({message: reason})
      })  
} 

const  p_data = (req,res)=>{    
    const { parametro, pagina, num, tipo, nivel } = req.body
    let inombres  = verifiDBNull(parametro)                
    let itipo     = verifiDBNull(tipo)
    let iprop     = "descripcion"

    if (/^(\d)/.test(parametro)) {
        iprop = 'codigo'
    }

    dataPucs(pagina, num, iprop, inombres,itipo,nivel)
    .then((row)=>{          
        res.status(200).send({result: row})
    })  
    .catch((reason)=>{                            
        res.status(400).send({message: reason.message.message})
    })  
}

const  p_registrar = (req,res)=>{        
    const { pagina, tipo, codigo, descripcion  } = req.body
    let iok = {
        codigo,
        tipo,
        descripcion,
        nivel: codigo.length
    }    
    registrarPuc(iok,pagina)
      .then((rows)=>{        
          res.status(200).send({result: rows})
      })
      .catch((reason)=>{            
          res.status(400).send({message: reason})
      })
}

const  p_borrar = (req,res)=>{   
    const { pagina, pucId } = req.body    
    _deletePuc(pucId, pagina)
      .then((rows)=>{        
          res.status(200).send({result: rows})
      })
      .catch((reason)=>{            
          res.status(400).send({message: reason})
      })
}
const  p_actualizar = (req,res)=>{        
    const { pagina, tipo, codigo, descripcion  } = req.body
    let iok = {
        codigo,
        tipo,
        descripcion,
        nivel: codigo.length
    } 
    actualizarPuc(iok,req.params.id,pagina)
    .then((row)=>{        
        res.status(200).send({result: row })        
    })  
    .catch((reason)=>{             
        res.status(400).send({message: reason.message.message})
    })  
}


module.exports={    
    p_items,
    p_data,
    p_registrar,
    p_borrar,
    p_actualizar  
}
