
import { verifiDBNull } from '../../functions/env';
import { _deleteBanco, itemsBancos, dataBancos, mostrarBanco, actualizarBanco, registrarBanco } from "../services/bancoService.js";

const  b_data =(req,res)=>{ 
    const { nombre,pagina, num } = req.body             
    let inombre = verifiDBNull(nombre)     
    dataBancos(pagina,num,inombre)
        .then((rows)=>{                                              
            res.status(200).send({result: rows })                         
        })
        .catch((reason)=>{            
            res.status(400).send({message: reason})
        })     
}

const b_mostrar = (req,res) =>{        
    mostrarBanco(req.params.id)
    .then((row)=>{
        res.status(200).send({result: row})                
    })    
    .catch((reason)=>{           
        res.status(400).send({message: reason})
    })        
}

const b_actualizar = (req,res) =>{     
    const { pagina } = req.body       
    actualizarBanco(req.body,req.params.id,pagina,12)
    .then((rows)=>{
        res.status(200).send({result: rows })                         
    })
    .catch((reason)=>{           
        res.status(400).send({message: reason})
    })        
}

const b_registrar = (req,res) =>{      
    const { pagina } = req.body      
    registrarBanco(req.body,pagina,12)
    .then((rows)=>{
        res.status(200).send({result: rows })                         
    })
    .catch((reason)=>{        
        res.status(400).send({message: reason})
    })
}

const b_items = (_req,res) =>{    
    itemsBancos()
    .then((rows)=>{
        res.status(200).send({result:rows})
    })
    .catch((reason)=>{        
        res.status(400).send({message: reason})
    })    
}

const b_borrar = (req,res) =>{    
    const { pagina, bancoId } = req.body        
    _deleteBanco(bancoId,pagina,12)
    .then((rows)=>{
        res.status(200).send({result:rows})
    })
    .catch((reason)=>{        
        res.status(400).send({message: reason})
    })    
}

module.exports={
    b_data,
    b_mostrar,
    b_actualizar,
    b_registrar,
    b_items,
    b_borrar    
}