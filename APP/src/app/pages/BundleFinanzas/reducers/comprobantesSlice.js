import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import CrudService from "@services/crud.service"


export const comprobantesData = createAsyncThunk(
    "comprobantes/data",
    async(dato,thunkAPI)=>{
        try{                    
          const data = await CrudService.data(dato,'comprobantes');                                        
          return { response: data }
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
)
export const comprobantesCreate = createAsyncThunk(
  "comprobantes/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await CrudService.create(dato,'comprobantes');                                      
          toastr.success('Compra', 'Dato creado') 
          return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const comprobantesUpdate = createAsyncThunk(
  "comprobantes/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await CrudService.update(dato,'comprobantes');  
          toastr.success('Compra', 'Actualizada')                                        
          return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const comprobantesItem = createAsyncThunk(
  "comprobantes/item",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await CrudService.item(pky,'comprobantes');                                                            
          return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)


export const comprobantesDelete = createAsyncThunk(
  "comprobantes/delete",
  async(dato,thunkAPI)=>{
      try{      
          const data = await CrudService._delete(dato,'comprobantes');    
          toastr.warning('Compra', 'Compra eliminada')                                  
          return { response: data }
      }catch(error){            
        let rr = error.response.data.message        
        toastr.error('Compra', rr.message) 
        return thunkAPI.rejectWithValue();           
      }   
  }
)


export const comprobantesAprobar = createAsyncThunk(
  "comprobantes/aprobar",
  async(dato,thunkAPI)=>{
      try{      
          const data = await CrudService.aprobarUnit(dato,'comprobantes');                                      
          toastr.success('Compra', 'Dato creado')           
          return { response: data }
      }catch(error){             
        toastr.error('Compra', error.message)      
          return thunkAPI.rejectWithValue();           
      }   
  }
)

const initialState = { 
    loading:false,
    data:[],
    vitems:[],
    nota:{},
    plan:[],
    total:0,
    pagina:0,
    paginas:0,
    item:{}
  };
  
  
const comprobantesSlice = createSlice({
    name: "comprobantes",
    initialState,  
    reducers:{
      setItems:(state,action)=>{
        state.vitems = action.payload
      },
      setItem:(state,action)=>{
        state.item = action.payload
      },
      setTDebe:(state,action)=>{
        state.item.tDebe = action.payload
      },
      setTHaber:(state,action)=>{
        state.item.tHaber = action.payload
      },    
      setProveedor:(state,action)=>{
        state.item.proveedorId  = action.payload.proveedorId
        state.item.proveedors   = action.payload.proveedors
      },
      resetItem:(state)=>{
        state.item ={}
      },
      resetData:(state)=>{
        state.data    = []  
        state.total   = 0
        state.pagina  = 0
        state.paginas = 0   
      },    
    },
    extraReducers(builder) { 
      builder
        .addCase(comprobantesData.pending,(state) =>{
            state.loading = true            
        })
        .addCase(comprobantesData.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(comprobantesData.rejected,(state)=>{
          state.loading = false
         
        })   
  
        .addCase(comprobantesItem.pending,(state) =>{
          state.loading = true                    
        })
        .addCase(comprobantesItem.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response.row
            state.vitems  = action.payload.response.rows
        })
        .addCase(comprobantesItem.rejected,(state)=>{
          state.loading = false
        })
        /** create */
        .addCase(comprobantesCreate.pending,(state) =>{
          state.loading = true                    
        })
        .addCase(comprobantesCreate.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas           
        })
        .addCase(comprobantesCreate.rejected,(state)=>{
          state.loading = false        
        })
  
        /** aprobar */
        .addCase(comprobantesAprobar.pending,(state) =>{
          state.loading = true                    
        })
        .addCase(comprobantesAprobar.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas           
        })
        .addCase(comprobantesAprobar.rejected,(state)=>{
          state.loading = false        
        })
        /** update */
        .addCase(comprobantesUpdate.pending,(state) =>{
          state.loading = true                    
        })
        .addCase(comprobantesUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.item    = action.payload.response.row
            state.vitems  = action.payload.response.rows          
        })
        .addCase(comprobantesUpdate.rejected,(state)=>{
          state.loading = false        
        })
  
        .addCase(comprobantesDelete.pending,(state) =>{
          state.loading = true            
        })
        .addCase(comprobantesDelete.fulfilled,(state,action)=>{
            state.loading = false
            state.data  = action.payload.response.data    
            state.total = action.payload.response.total          
            state.pagina = action.payload.response.pagina          
            state.paginas = action.payload.response.paginas          
        })
        .addCase(comprobantesDelete.rejected,(state)=>{
          state.loading = false        
        }) 
  
      
    }    
  });
  export const { resetItem, resetData, setTotal, setCantidad, setItems, setProveedor, setTDebe, setTHaber, setItem } = comprobantesSlice.actions
  const { reducer } = comprobantesSlice;
  export default reducer;  
  
  