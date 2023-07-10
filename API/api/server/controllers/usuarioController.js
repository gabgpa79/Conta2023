import { loginUsuario, listarUsuarios, mostrarUsuario, actualizarUsuario, createUsuario, itemsUsuarios } from "../services/usuarioService"
import { verifiDBNull } from '../../functions/env'
const bcrypt = require("bcrypt");

const  u_login = (req,res)=>{         
    loginUsuario(req.body)
    .then((row)=>{                   
        res.status(200).send({result: row })         
        })       
    .catch((reason)=>{       
        console.log(reason)      
        res.status(400).send({message: reason})
    })  
}

const  u_data = (req,res)=>{            
    const { parametro, pagina, num } = req.body    
    let inombres    = verifiDBNull(parametro)                 
    listarUsuarios(pagina,num,inombres)
    .then((rows)=>{                
        res.status(200).send({result: rows})
    })
    .catch((reason)=>{             
        res.status(400).send({message: reason})
    })  
}
const  u_mostrar = (req,res)=>{         
    mostrarUsuario(req.params.id,req.params.tipo)
    .then((rows)=>{
        res.status(200).send({result: rows})
    })
    .catch((reason)=>{               
        res.status(400).send({message: reason})
    })  
}
const  u_actualizar = (req,res)=>{   
    const { tipo, nombres, apellidos, username, password,  sucursalId, rol } = req.body   
    let newIok={}
    if(tipo === 'single'){      
        newIok = {            
            nombres   : nombres,
            apellidos : apellidos,
            username  : username,                     
            sucursalId: sucursalId,
            rol       : rol
        }    
    }else{     
        newIok = {                        
            password  : bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),                        
        }
    }
    actualizarUsuario(newIok,req.params.id)
        .then((rows)=>{
            res.status(200).send({result: rows})
        })
        .catch((reason)=>{                 
            res.status(400).send({message: reason})
        })
} 

const  u_registrar = (req,res)=>{         
        createUsuario(req.body)
        .then((row)=>{                
        res.status(200).send({result: row })         
        })
        .catch((reason)=>{             
            res.status(400).send({message: reason})
        }) 
} 
const  u_borrar = (req,res)=>{} 

const  u_items = (req,res)=>{         
    const { parametro } = req.body
    let inombres  = verifiDBNull(parametro)      
    itemsUsuarios(inombres)
      .then((rows)=>{
            res.status(200).send({result: rows})
        })
      .catch((reason)=>{               
            res.status(400).send({message: reason})
        }) 
}

module.exports={    
    u_login,    
    u_data,
    u_mostrar,
    u_actualizar,
    u_registrar,
    u_borrar,
    u_items
}