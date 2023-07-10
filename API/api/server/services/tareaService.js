import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';

const { Tarea } = db;

const tareasTotal = (pky) =>{
    return new Promise((resolve, reject)=>{
        Tarea.findOne({
            raw:true,
            nest: true,
            attributes: [[fn('count', col('id')), 'num']],
              where: {
                 [_Op.and]: [
                 { usuarioId: { [_Op.eq]: pky}},                 
                 { estado: true }]
            },
        })    
    .then((row)=>resolve(row))
    .catch((reason)=>reject({message:reason.message}))
    })
}

const dataTareas = (usuarioId,inicio,end) =>{
    return new Promise((resolve,reject)=>{
        Tarea.findAll({
            order: [['start','DESC']],
            attributes: ["id","title","start","end","backgroundColor","selectable","usuarioId","classNames","detalle"],        
            where: {
              [_Op.and]: [{ usuarioId: { [_Op.eq]: usuarioId }},                    
                         { start: {[_Op.between]: [inicio, end]}}]
            },
        })
        .then((rows)=> resolve(rows))
        .catch((reason)=>reject({message:reason}))
    })
}
const registrarTarea = (dato) =>{
    return new Promise((resolve,reject)=>{
        const { usuarioId , gstart, gend } = dato 
        Tarea.create(dato)
        .then((row)=>{
            Tarea.findAll({
                order: [['start','DESC']],
                attributes: ["id","title","start","end","backgroundColor","selectable","usuarioId","classNames","detalle"],        
                where: {
                  [_Op.and]: [{ usuarioId: { [_Op.eq]: usuarioId }},                    
                             { start: {[_Op.between]: [gstart, gend]}}]
                },
            })
            .then((rows)=>resolve(rows))
            .catch((reason)=>reject({message:reason}))
        })
        .catch((reason)=>reject({message:reason.message}))
    })
}
const actualizarTarea = (dato,datoId) =>{
    return new Promise((resolve,reject)=>{            
        const { usuarioId , gstart, gend }  = dato  
        Tarea.update(dato,{
            where: { id: Number(datoId) }
        })
        .then((row)=> {
            Tarea.findAll({
                order: [['start','DESC']],
                attributes: ["id","title","start","end","backgroundColor","selectable","usuarioId","classNames","detalle"],        
                where: {
                  [_Op.and]: [{ usuarioId: { [_Op.eq]: usuarioId }},                    
                             { start: {[_Op.between]: [gstart, gend]}}]
                },
            })
            .then((rows)=> resolve(rows))
            .catch((reason)=>reject({message:reason}))
        })
        .catch((reason)=> reject({message: reason.message}))
    })
}
module.exports = {
    tareasTotal,
    dataTareas,
    registrarTarea,
    actualizarTarea
}