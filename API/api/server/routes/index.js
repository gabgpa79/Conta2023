import KeyToken from '../../functions/keyToken'
import usuarios from './usuarioRoute'
import empresa from './empresaRoute'
import files from './fileRoute' 
import bancos from './bancoRoute'
import puc from './pucRoute'
import tareas from './tareaRoute'
import contabilidad from './contabilidadRoute'
import comprobante from './comprobanteRoute'

export default(app) =>{    
    app.use('/api/usuarios',usuarios) 
    app.use('/api/empresas',KeyToken,empresa)   
    app.use('/api/files',files) 
    app.use('/api/bancos',KeyToken,bancos)    
    app.use('/api/pucs',KeyToken,puc)
    app.use('/api/tareas',KeyToken,tareas)
    app.use('/api/contabilidad',KeyToken,contabilidad)
    app.use('/api/comprobantes',KeyToken,comprobante)
    
  }
