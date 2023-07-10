import { _empresa } from '../services/fileService'
import { actualizarEmpresa } from '../services/empresaService'

const  e_file=(req,res)=>{
    _empresa(req)        
    .then((file)=>{
        const art = {
            filename: file.filename
        }
        actualizarEmpresa(art,req.params.id)
        .then((result)=>{
            res.status(200).send({result})
        })
        .catch((reason)=> {
            res.status(400).send({message: reason})
        })                
    })
    .catch(reason =>{
        console.log(reason)
        res.status(400).send({message: reason})
    })   
}

module.exports={
    e_file
}