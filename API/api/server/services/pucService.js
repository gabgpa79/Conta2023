import db from '../../src/models';
import { Op as _Op, fn, col } from 'sequelize';

const { Puc } = db;

const itemsPucs = (des,prop) =>{
    return new Promise((resolve,reject)=>{
       Puc.findAll({
        raw:true,
        nest:true,
        order: [['codigo','asc']],
        limit:10,
        attributes:['id','codigo','descripcion','tipo'],
        where: {
            [_Op.and]: [            
                { [prop]: { [_Op.iLike]: des } },                            
            ]
       }})
       .then((rows)=>{ resolve(rows)}) 
       .catch((reason)=> reject({message: reason.message}))
    })
}

const dataPucs =(pag,num,prop,nombres,tipo,nivel) =>{      	
    return new Promise((resolve, reject) => {        
      let page = parseInt(pag);
      let der = num * page - num;
      Puc.findAndCountAll({
        raw: true,
        nest: true,
        offset: der,
        limit: num,
        order: [['codigo', 'ASC']],    
        where: {
          [_Op.and]: [            
            { [prop]: {[_Op.iLike]: nombres } },                        
            { tipo: { [_Op.iLike]: tipo } },
            { nivel: {[nivel === 0 ? _Op.gt:_Op.eq ]: nivel } }            
          ]
        },                    
      })
        .then((Pucs) =>
          resolve({
            paginas: Math.ceil(Pucs.count / num),
            pagina: page,
            total: Pucs.count,
            data: Pucs.rows,
          })
        )
        .catch((reason) => reject(reason));
    });
  }

  const registrarPuc = (dato,pagina) =>{
    return new Promise((resolve,reject)=>{
        Puc.create(dato)
        .then((row)=> {
            let page = parseInt(pagina);
            let der = 12 * page - 12;
            Puc.findAndCountAll({
                raw: true,
                nest: true,
                offset: der,
                limit: 12,
                order: [['codigo', 'ASC']],    
                where: {
                [_Op.and]: [            
                    { descripcion: {[_Op.iLike]: '%' } },                               
                    { tipo: {[_Op.iLike]: '%' } },
                    { nivel: {[_Op.gt]: 0 } }            
                ]
                },                            
            })
                .then((Pucs) =>
                resolve({
                    paginas: Math.ceil(Pucs.count / 12),
                    pagina: page,
                    total: Pucs.count,
                    data: Pucs.rows,
                })
                )
                .catch((reason) => reject(reason));
        })
        .catch((reason)=> reject({message: reason}))
    })
}  

const _deletePuc = (datoId,pagina) =>{
  return new Promise((resolve, reject)=>{
      Puc.destroy({
          where: { id: Number(datoId) }
      })
      .then((rr)=>{
          let page = parseInt(pagina);
          let der = 12 * page - 12;
          Puc.findAndCountAll({
              raw: true,
              nest: true,
              offset: der,
              limit: 12,
              order: [['codigo', 'ASC']],    
              where: {
              [_Op.and]: [            
                  { descripcion: { [_Op.iLike]: '%' } },                             
                  { tipo: { [_Op.iLike]: '%' } },
                  { nivel: {[_Op.gt]: 0 } }            
              ]
              },                          
          })
              .then((Pucs) =>
              resolve({
                  paginas: Math.ceil(Pucs.count / 12),
                  pagina: page,
                  total: Pucs.count,
                  data: Pucs.rows,
              })
              )
              .catch((reason) => reject(reason));
      })
      .catch((reason)=> reject({message: reason.message}))
  })
}


const actualizarPuc = (dato,datoId,pagina) =>{
  return new Promise((resolve,reject)=>{        
      Puc.update(dato,{
          where: { id: Number(datoId) }
      })
      .then((row)=>{
          let page = parseInt(pagina);
          let der = 12 * page - 12;
          Puc.findAndCountAll({
              raw: true,
              nest: true,
              offset: der,
              limit: 12,
              order: [['codigo', 'ASC']],    
              where: {
              [_Op.and]: [            
                  { descripcion: { [_Op.iLike]: '%' } },                             
                  { tipo: { [_Op.iLike]: '%' } },
                  { nivel: {[_Op.gt]: 0 } }            
              ]
              },                          
          })
              .then((Pucs) =>
              resolve({
                  paginas: Math.ceil(Pucs.count / 12),
                  pagina: page,
                  total: Pucs.count,
                  data: Pucs.rows,
              })
              )
              .catch((reason) => reject(reason));
      })
      .catch((reason)=> reject({message: reason.message}))
  })
}

module.exports = {    
    itemsPucs,
    dataPucs,
    registrarPuc,
    _deletePuc,
    actualizarPuc
}   
