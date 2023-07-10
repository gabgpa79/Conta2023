import { configureStore} from '@reduxjs/toolkit'
import { reducer as toastrReducer} from 'react-redux-toastr'
import authReducer from '@reducers/gral/authSlice'
import empresasSlice from '@reducers/config/empresasSlice'
import usuariosSlice from '@reducers/config/usuariosSlice'
import imagesSlice from '@reducers/gral/imagesSlice'
import bancosSlice from '@reducers/contabilidad/bancosSlice'
import parametrosSlice from '@reducers/gral/parametrosSlice'
import pucsSlice from '@reducers/contabilidad/pucsSlice'
import contabilidadSlice from '@reducers/contabilidad/contabilidadSlice'
import comprobantesSlice from '@reducers/contabilidad/comprobantesSlice'

const reducer ={  
    auth: authReducer,
    toastr: toastrReducer,
    parametro: parametrosSlice,
    comprobantes: comprobantesSlice,    
    empresas: empresasSlice,
    usuarios: usuariosSlice,
    imagen: imagesSlice,
    bancos: bancosSlice,    
    pucs : pucsSlice,    
    contabilidad: contabilidadSlice,    
}

export const store = configureStore({
    reducer: reducer,
    devTools: true,
})