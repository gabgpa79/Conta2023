import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import CrudService from "@services/crud.service"

export const usuariosItems = createAsyncThunk(
    "usuario/items",
    async(thunkAPI)=>{
        try{                    
          const data = await CrudService.items('usuarios');                                                  
            return { response: data }
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
)

export const usersItems = createAsyncThunk(
  "users/items",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await CrudService.itemsList(dato,'usuarios');                                          
          return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)


export const usuariosConsolidado = createAsyncThunk(
    "usuarios/consolidado",
    async(dato,thunkAPI)=>{
        try{      
            const data = await CrudService.repConsolidados(dato,'usuarios');              
            return { response: data }
        }catch(error){            
          let rr = error.response.data.message        
          toastr.error('Usuario', rr.message) 
          return thunkAPI.rejectWithValue();           
        }   
    }
)
export const usuariosData = createAsyncThunk(
    "usuario/data",
    async(dato,thunkAPI)=>{
        try{                    
          const data = await CrudService.data(dato,'usuarios');                                                  
            return { response: data }
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
)
export const usuariosItem = createAsyncThunk(
    "usuario/item",
    async(pky,thunkAPI)=>{    
        try{      
            const item = await CrudService.item(pky,'usuarios');                                       
            return { response: item }
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
)

export const usuariosUpdate = createAsyncThunk(
    "usuario/update",
    async(dato,thunkAPI)=>{
        try{      
            const data = await CrudService.update(dato,'usuarios');  
            toastr.success('Usuario', 'Actualizada')                                       
            return { response: data }
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
  )
  
  export const usuariosCreate = createAsyncThunk(
    "usuario/create",
    async(dato,thunkAPI)=>{
        try{      
            const data = await CrudService.create(dato,'usuarios'); 
                                           
            toastr.success('Usuario', 'Dato creado') 
            return { response: data }
        }catch(error){                
            toastr.error('Usuario', 'Código existente')           
            return thunkAPI.rejectWithValue();           
        }   
    }
  )

const initialState = {
    loading:false,    
    data:[],
    item:{},
    total:0,
    pagina:0,
    paginas:0,
    cl_items : [],
    cl_total : {},
    c_items  : [],
    c_total  : {},
    s_items  : [],
    s_total  : {},
    v_items  : [],
    v_total  : {},
    reorden: [] ,
    c_estado  :[],
    c_estados :[],
    u_items:[],
    ma_items:[],
}  

const usuariosSlice = createSlice({
    name: "usuario",
    initialState,  
    reducers:{
        resetUsuarios:(state)=>{
            state.data    = []  
            state.total   = 0
            state.pagina  = 0
            state.paginas = 0   
        },
        resetUsuario:(state)=>{
            state.item ={}
            state.cl_items = []
            state.cl_total = {}
            state.c_items  = []
            state.c_total  = {}
            state.s_items  = []
            state.s_total  = {}
            state.v_items  = []
            state.v_total  = {}
            state.reorden  = []
            state.c_estado  =[]
            state.c_estados =[]
            state.u_items = []   
               
        },      
        setUsuarios:(state,action)=>{
            state.ma_items = action.payload
        }, 
    },
    extraReducers(builder) { 
        builder
            /** Usuarios Informe */
            .addCase(usuariosConsolidado.pending,(state) =>{
                state.loading = true            
            })
            .addCase(usuariosConsolidado.fulfilled,(state,action)=>{
              state.loading = false
              state.cl_items = action.payload.response.clientes.cl_items 
              state.cl_total = action.payload.response.clientes.cl_total 
              state.c_items  = action.payload.response.compras.c_items 
              state.c_total  = action.payload.response.compras.c_total 
              state.s_items  = action.payload.response.existencias.s_items 
              state.s_total  = action.payload.response.existencias.s_total 
              state.v_items  = action.payload.response.ventas.v_items 
              state.v_total  = action.payload.response.ventas.v_total 
              state.reorden  = action.payload.response.reorden              
            })
            .addCase(usuariosConsolidado.rejected,(state)=>{
                state.loading = false        
            }) 
            /** Usuarios Data */
            .addCase(usuariosData.pending,(state) =>{
                state.loading = true            
            })
            .addCase(usuariosData.fulfilled,(state,action)=>{
                  state.loading = false
                  state.data  = action.payload.response.data    
                  state.total = action.payload.response.total          
                  state.pagina = action.payload.response.pagina          
                  state.paginas = action.payload.response.paginas          
            })
            .addCase(usuariosData.rejected,(state)=>{
                state.loading = false
              
            }) 
            /** Usuario Item */
            .addCase(usuariosItem.pending,(state) =>{
                state.loading = true            
                state.item    = {}
            })
            .addCase(usuariosItem.fulfilled,(state,action)=>{
                  state.loading = false
                  state.item    = action.payload.response              
            })
            .addCase(usuariosItem.rejected,(state)=>{
                state.loading = false
                state.item    = {}
            })
            /** Usuario Create */
            .addCase(usuariosCreate.pending,(state) =>{
                state.loading = true                    
            })
            .addCase(usuariosCreate.fulfilled,(state,action)=>{
                  state.loading = false
                  state.item  = action.payload.response
            })
            .addCase(usuariosCreate.rejected,(state)=>{
                state.loading = false        
            })

            /** Usuario Update */
            .addCase(usuariosUpdate.pending,(state) =>{
                state.loading = true            
                state.item    = {}
              })
            .addCase(usuariosUpdate.fulfilled,(state,action)=>{
                state.loading = false
                state.item  = action.payload.response             
            })
            .addCase(usuariosUpdate.rejected,(state)=>{
                state.loading = false
                state.item    = {}
            })
            .addCase(usuariosItems.pending,(state) =>{
                state.loading = true            
            })
            .addCase(usuariosItems.fulfilled,(state,action)=>{
                state.loading = false
                state.ma_items   = action.payload.response
            })
            .addCase(usuariosItems.rejected,(state)=>{
              state.loading = false
             
            })  
            
            .addCase(usersItems.pending,(state) =>{
              state.loading = true            
            })
            .addCase(usersItems.fulfilled,(state,action)=>{
                state.loading = false
                state.u_items   = action.payload.response
            })
            .addCase(usersItems.rejected,(state)=>{
              state.loading = false
            
            })

    }    

});
export const { resetUsuario, resetUsuarios } = usuariosSlice.actions
const { reducer } = usuariosSlice;
export default reducer;  
    