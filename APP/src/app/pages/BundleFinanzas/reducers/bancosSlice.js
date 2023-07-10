import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import CrudService from "@services/crud.service"

export const bancosItems = createAsyncThunk(
    "banco/items",
    async(thunkAPI)=>{
        try{                    
          const data = await CrudService.items('bancos');                                                
            return { response: data }
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
)

export const bancosData = createAsyncThunk(
  "banco/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await CrudService.data(dato,'bancos');                                                  
          return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const bancosItem = createAsyncThunk(
  "banco/item",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await CrudService.item(pky,'bancos');                                       
          return { response: item }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const bancosUpdate = createAsyncThunk(
  "banco/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await CrudService.update(dato,'bancos');  
          toastr.success('Banco', 'Actualizada')                                       
          return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const bancosCreate = createAsyncThunk(
  "banco/create",
  async(dato,thunkAPI)=>{
      try{      
          const data = await CrudService.create(dato,'bancos');                                      
          toastr.success('Banco', 'Dato creado') 
          return { response: data }
      }catch(error){                
          toastr.error('Banco', 'Código existente')           
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const bancosDelete = createAsyncThunk(
  "banco/delete",
  async(dato,thunkAPI)=>{
      try{      
          const data = await CrudService._delete(dato,'bancos');    
          toastr.warning('Banco', 'banco eliminado')                                  
          return { response: data }
      }catch(error){            
        let rr = error.response.data.message        
        toastr.error('Banco', rr.message) 
        return thunkAPI.rejectWithValue();           
      }   
  }
)

const initialState = { 
  loading:false,
  data:[],
  ba_items:[],
  total:0,
  pagina:0,
  paginas:0,
  item:{}
};  


const bancosSlice = createSlice({
  name: "banco",
  initialState,  
  reducers:{
    resetItem:(state)=>{
      state.item ={}
    },
    setBancos:(state,action)=>{
      state.ba_items = action.payload
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
      .addCase(bancosItems.pending,(state) =>{
          state.loading = true            
      })
      .addCase(bancosItems.fulfilled,(state,action)=>{
          state.loading = false
          state.ba_items   = action.payload.response
      })
      .addCase(bancosItems.rejected,(state)=>{
        state.loading = false
       
      })   
      .addCase(bancosData.pending,(state) =>{
        state.loading = true            
      })
      .addCase(bancosData.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(bancosData.rejected,(state)=>{
        state.loading = false
      
      }) 
      .addCase(bancosItem.pending,(state) =>{
        state.loading = true            
        state.item    = {}
      })
      .addCase(bancosItem.fulfilled,(state,action)=>{
          state.loading = false
          state.item    = action.payload.response              
      })
      .addCase(bancosItem.rejected,(state)=>{
        state.loading = false
        state.item    = {}
      })
      .addCase(bancosCreate.pending,(state) =>{
        state.loading = true            
        state.item    = {}
      })
      .addCase(bancosCreate.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas            
      })
      .addCase(bancosCreate.rejected,(state)=>{
        state.loading = false
        state.item    = {}
      })
      /** update */
      .addCase(bancosUpdate.pending,(state) =>{
        state.loading = true            
        state.item    = {}
      })
      .addCase(bancosUpdate.fulfilled,(state,action)=>{
        state.loading = false
        state.data  = action.payload.response.data    
        state.total = action.payload.response.total          
        state.pagina = action.payload.response.pagina          
        state.paginas = action.payload.response.paginas              
      })
      .addCase(bancosUpdate.rejected,(state)=>{
        state.loading = false
        state.item    = {}
      })
    
      .addCase(bancosDelete.pending,(state) =>{
        state.loading = true            
      })
      .addCase(bancosDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(bancosDelete.rejected,(state)=>{
        state.loading = false        
      }) 
  }    
});
export const { resetItem, resetData, setBancos } = bancosSlice.actions
const { reducer } = bancosSlice;
export default reducer;  
