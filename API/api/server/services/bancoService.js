import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';
const { Banco } = db;

const dataBancos = (pag,num,nombre) =>{
    return new Promise((resolve, reject)=>{
        let page = parseInt(pag)
        let der = num * page - num        
        Banco.findAndCountAll({
            raw:true,
            nest:true,
            offset: der,
            limit: num,
            order: [['nombre','asc']],
            where: { nombre: { [_Op.iLike]: nombre } },                           
            attributes:['id','nombre','abreviacion','enabled']
        })        
        .then((rows)=> resolve({
            paginas : Math.ceil(rows.count / num),
            pagina  : page,
            total   : rows.count,
            data    : rows.rows
        }))
        .catch((reason)=> reject({message: reason.message}))
    })
}
const mostrarBanco = (pky) =>{
    return new Promise((resolve,reject)=>{
        Banco.findByPk(pky,{
            raw:true,
            nest:true
        })
        .then((row)=> resolve( row ))
        .catch((reason)=> reject({message: reason.message}))
    })
}

const actualizarBanco = (dato,datoId,pag,num) =>{
    return new Promise((resolve,reject)=>{
        Banco.update(dato,{
            where: { id : Number(datoId)}
        })
        .then((row)=> {
            let page = parseInt(pag)
            let der = num * page - num        
            Banco.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: num,
                order: [['nombre','asc']],
                where: { nombre: { [_Op.iLike]: '%' } },                           
                attributes:['id','nombre','abreviacion','enabled']
            })        
            .then((rows)=> resolve({
                paginas : Math.ceil(rows.count / num),
                pagina  : page,
                total   : rows.count,
                data    : rows.rows
            }))
            .catch((reason)=> reject({message: reason.message}))
        })
        .catch((reason)=> reject({message: reason.message}))
    })
}


const registrarBanco = (dato,pag,num) =>{
    return new Promise((resolve,reject)=>{  
        Banco.create(dato)
        .then((row)=> {
            let page = parseInt(pag)
            let der = num * page - num        
            Banco.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: num,
                order: [['nombre','asc']],
                where: { nombre: { [_Op.iLike]: '%' } },                           
                attributes:['id','nombre','abreviacion','enabled']
            })        
            .then((rows)=> resolve({
                paginas : Math.ceil(rows.count / num),
                pagina  : page,
                total   : rows.count,
                data    : rows.rows
            }))
            .catch((reason)=> reject({message: reason.message}))
        })
        .catch((reason)=> reject({message: reason.message}))
    })
}

const itemsBancos = () =>{
    return new Promise((resolve,reject)=>{
       Banco.findAll({
        raw:true,
        nest:true,
        order: [['nombre','asc']],
        attributes:[['nombre','label'],['id','value']],
        where: { enabled:  true },
       })
       .then((rows)=>{ resolve(rows)}) 
       .catch((reason)=> reject({message: reason.message}))
    })
}

const _deleteBanco = (datoId,pag,num) =>{
 
    return new Promise((resolve,reject)=>{
        Banco.destroy({
            where : { id: Number(datoId)}
        })
        .then((row)=> {
            let page = parseInt(pag)
            let der = num * page - num        
            Banco.findAndCountAll({
                raw:true,
                nest:true,
                offset: der,
                limit: num,
                order: [['nombre','asc']],
                where: { nombre: { [_Op.iLike]: '%' } },                           
                attributes:['id','nombre','abreviacion','enabled']
            })        
            .then((rows)=> resolve({
                paginas : Math.ceil(rows.count / num),
                pagina  : page,
                total   : rows.count,
                data    : rows.rows
            }))
            .catch((reason)=> reject({message: reason.message}))
        })
        .catch((reason)=> reject({message: reason.message}))
    })
}

module.exports = {
dataBancos,
mostrarBanco,
actualizarBanco,
registrarBanco,
itemsBancos,
_deleteBanco
}
