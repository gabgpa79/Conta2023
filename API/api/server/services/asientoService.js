import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';
import { _fsaldo, _fDiarios, _fMayores, _fSaldos } from '../../formats/asientos/_datas'

const { Asiento, Puc } = db;
const fechaHoy = new Date();
const gestion = fechaHoy.getFullYear()
const mes = fechaHoy.getMonth() + 1
const fechaAsiento  = (new Date(fechaHoy + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0]      
const fechaGestion = gestion+"-01-01"
const finGestion = gestion+"-12-31"

const dataAsientos = () =>{
    return new Promise((resolve, reject)=>{        
        Asiento.findAll({
            raw:true,
            nest:true,                        
            order: [['pucId','asc']],
            where: { fechaAsiento: {[_Op.between]: [fechaGestion, finGestion]}},
            attributes:['id','pucId','fm'],                  
        })        
        .then((rows)=> resolve(rows))
        .catch((reason)=> reject({message: reason.message}))
    })
}
const registrarAsientos = (data,datoId) =>{
    return new Promise((resolve,reject)=>{
        let newPlan = data.map((it)=>{
            let iok= it
            iok.fechaAsiento  = fechaAsiento
            iok.comprobanteId = datoId            
            return iok
        }) 
        Asiento.bulkCreate(newPlan,{individualHooks: true})
          .then((rows) => {
            Asiento.findAll({
                raw:true,
                nest:true,                        
                order: [['id','asc']],
                where : { comprobanteId: {[_Op.eq]: datoId }},
                attributes:['id','fechaAsiento','glosaAsiento','debe','haber','descripcion','cc','referencia','fm','parcial','codigo','pucId']                     
                })        
                .then((rows)=> resolve(rows))
                .catch((reason)=> reject({message: reason.message}))
          })            
          .catch((reason)  => reject({ message: reason.message })) 
    })
}

const saldo = () =>{
    return new Promise((resolve,reject)=>{          
        Asiento.findAll({
          raw:true,
          nest:true,                    
          attributes:["id","fechaAsiento","debe","haber","fm","glosaAsiento","comprobanteId","pucId"],    
          order: [['fechaAsiento','asc'],['fm','asc']],                
          where: {
            [_Op.and]: [                  
              { fechaAsiento: {[_Op.between]: [fechaGestion, fechaAsiento]}}
            ]
          },
          include:[{ 
            model:Puc,
            as:"puc",
            attributes:["id","tipo","descripcion"],            
          }]
        })        
        .then((rows)=> {   
              let newData = _fsaldo(rows)                   
              resolve(newData)
           })                
          .catch((reason)=> reject({message: reason.message}))
        })     
}

const listarAsientos = (pky) =>{
  return new Promise((resolve,reject)=>{        
    Asiento.findAll({
      raw:true,
      nest:true,                        
      order: [['id','asc']],
      where : { comprobanteId: {[_Op.eq]: pky }},              
    })
    .then((rows)=> {                    
      resolve(rows)
    })                
    .catch((reason)=> reject({message: reason.message}))
    })     
}
const _deleteAsientos = (datoId) =>{
  return new Promise((resolve, reject) => {
      Asiento.destroy({ where: { comprobanteId: Number(datoId) } })
        .then((rows) => {
          Asiento.findAll({
              raw:true,
              nest:true,                        
              order: [['id','asc']],
              where : { comprobanteId: {[_Op.eq]: datoId }},
              attributes:['id','fechaAsiento','glosaAsiento','debe','haber','descripcion','cc','referencia','fm','parcial','codigo','pucId']                     
              })        
              .then((rows)=> resolve(rows))
              .catch((reason)=> reject({message: reason.message}))
        })
        .catch((reason)  => reject({ message: reason.message }))      
    });
}

const _delAsientos = (datoId) =>{
  return new Promise((resolve, reject) => {
      Asiento.destroy({ where: { comprobanteId: Number(datoId) } })
        .then((rows) => {
            resolve(rows)              
        })
        .catch((reason)  => reject({ message: reason.message }))      
    });
}

const diarios = (desde,hasta) =>{
  return new Promise((resolve,reject)=>{          
      Asiento.findAll({
        raw:true,
        nest:true,                    
        attributes:["id","fechaAsiento","debe","haber","fm","glosaAsiento","comprobanteId"],    
        order: [['fechaAsiento','asc'],['id','asc']],      
        where: { fechaAsiento: {[_Op.between]: [desde, hasta]}},                    
        include:[{ 
          model:Puc,
          as:"puc",
          attributes:["id","codigo","descripcion","nivel","tipo"],            
        }]
      })        
      .then((rows)=> {             
            let newData = _fDiarios(rows)
             resolve({
              data  : newData.data,
              tDebe : newData.tDebe,
              tHaber: newData.tHaber
             })               
         })                
        .catch((reason)=> reject({message: reason.message}))
      })     
}

const mayores = (pucId) =>{
  return new Promise((resolve,reject)=>{          
      Asiento.findAll({
        raw:true,
        nest:true,                    
        attributes:["id","fechaAsiento","debe","haber","fm","glosaAsiento","comprobanteId"],    
        order: [['fechaAsiento','asc'],['id','asc']],                
        where: {
          [_Op.and]: [            
            { pucId: pucId },     
            /*{ fechaAsiento: {[Op.between]: [desde, hasta]}}*/
          ]
        },
        include:[{ 
          model:Puc,
          as:"puc",
          attributes:["id","tipo"],            
        }]
      })        
      .then((rows)=> {   
            let newData = _fMayores(rows)
             resolve({
              data  : newData.data,
              tDebe : newData.tDebe,
              tHaber: newData.tHaber,
              tDeudor: newData.tDeudor,
              tAcreedor: newData.tAcreedor 
             })              
         })                
        .catch((reason)=> reject({message: reason.message}))
      })     
}

const _saldos = (desde,hasta) =>{
  return new Promise((resolve,reject)=>{          
      Asiento.findAll({
        raw:true,
        nest:true,                    
        attributes:["id","fechaAsiento","debe","haber","fm","glosaAsiento","comprobanteId","pucId"],    
        order: [['fechaAsiento','asc'],['fm','asc']],                
        where: {
          [_Op.and]: [    
            /*{ pucId: 2 },                         */
            { fechaAsiento: {[_Op.between]: [fechaGestion, hasta]}}
          ]
        },
        include:[{ 
          model:Puc,
          as:"puc",
          attributes:["id","tipo","descripcion"],            
        }]
      })        
      .then((rows)=> {   
            let newData = _fSaldos(rows)
      
             resolve(newData)
         })                
        .catch((reason)=> reject({message: reason.message}))
      })     
}

module.exports = {    
    dataAsientos,
    registrarAsientos,
    saldo,
    listarAsientos,
    _deleteAsientos,
    _delAsientos,
    diarios,
    mayores,
    _saldos
}  