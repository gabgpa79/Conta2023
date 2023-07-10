import { dataTareas, registrarTarea, actualizarTarea } from '../services/tareaService'

const  t_data = (req,res)=>{   
    const {usuarioId, gstart, gend } = req.body
    dataTareas(usuarioId, gstart, gend)
    .then((row)=>{
        res.status(200).send({result: row})
    })  
    .catch((reason)=>{                      
        res.status(400).send({message: reason.message.message})
    })  
}

const  t_registrar = (req,res)=>{    
    registrarTarea(req.body)
    .then((row)=>{
        res.status(200).send({result: row})
    })  
    .catch((reason)=>{                       
        res.status(400).send({message: reason.message.message})
    })  
}

const  t_actualizar = (req,res)=>{    
    actualizarTarea(req.body,req.params.id)
    .then((row)=>{        
        res.status(200).send({result: row })        
    })  
    .catch((reason)=>{             
        res.status(400).send({message: reason.message.message})
    })  
}

module.exports={    
    t_data,
    t_registrar,
    t_actualizar
}
