import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import CrudService from "@services/crud.service"



export const pucsItems = createAsyncThunk(
    "pucs/searchitems",
    async(dato,thunkAPI)=>{
        try{      
            const data = await CrudService.itemsList(dato,'pucs');                                                 
            return { response: data }
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
)
export const pucsData = createAsyncThunk(
  "pucs/data",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await CrudService.data(dato,'pucs');                                        
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const pucsCreate = createAsyncThunk(
"pucs/create",
async(dato,thunkAPI)=>{
    try{      
        const data = await CrudService.create(dato,'pucs');                                      
        toastr.success('Puc', 'Dato creado') 
        return { response: data }
    }catch(error){                  
        return thunkAPI.rejectWithValue();           
    }   
}
)

export const pucsUpdate = createAsyncThunk(
"pucs/update",
async(dato,thunkAPI)=>{
    try{      
        const data = await CrudService.update(dato,'pucs');  
        toastr.success('Puc', 'Actualizada')                                        
        return { response: data }
    }catch(error){                  
        return thunkAPI.rejectWithValue();           
    }   
}
)

export const pucsItem = createAsyncThunk(
"pucs/item",
async(pky,thunkAPI)=>{    
    try{      
        const item = await CrudService.item(pky,'pucs');                                                           
        return { response: item.row }
    }catch(error){                  
        return thunkAPI.rejectWithValue();           
    }   
 }
)

export const pucsDelete = createAsyncThunk(
  "pucs/delete",
  async(dato,thunkAPI)=>{
      try{      
          const data = await CrudService._delete(dato,'pucs');    
          toastr.warning('Puc', 'Puc eliminada')                                  
          return { response: data }
      }catch(error){            
        let rr = error.response.data.message        
        toastr.error('Puc', rr.message) 
        return thunkAPI.rejectWithValue();           
      }   
  }
)


  
  const initialState = { 
    loading:false,
    data:[],        
    total:0,
    pagina:0,
    paginas:0,
    item:{},
    items:[]
  };  

  const pucsSlice = createSlice({
    name: "pucs",
    initialState,  
    reducers:{     
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
      .addCase(pucsItems.pending,(state) =>{
        state.loading = true            
      })
      .addCase(pucsItems.fulfilled,(state,action)=>{
          state.loading = false
          state.items  = action.payload.response                      
      })
      .addCase(pucsItems.rejected,(state)=>{
        state.loading = false      
      })   
       /** create */
      .addCase(pucsCreate.pending,(state) =>{
        state.loading = true                    
      })
      .addCase(pucsCreate.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas           
      })
      .addCase(pucsCreate.rejected,(state)=>{
        state.loading = false        
      })     
      /** update */
      .addCase(pucsUpdate.pending,(state) =>{
        state.loading = true                    
      })
      .addCase(pucsUpdate.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas  
      })
      .addCase(pucsUpdate.rejected,(state)=>{
        state.loading = false        
      })
      /** Data */
      .addCase(pucsData.pending,(state) =>{
        state.loading = true            
      })
      .addCase(pucsData.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(pucsData.rejected,(state)=>{
        state.loading = false
      
      }) 
      /** Item */
      .addCase(pucsItem.pending,(state) =>{
        state.loading = true            
        state.item    = {}
      })
      .addCase(pucsItem.fulfilled,(state,action)=>{
          state.loading = false
          state.item      = action.payload.response.row                             
      })
      .addCase(pucsItem.rejected,(state)=>{
        state.loading = false
        state.item      = {}        
      })
      /*Delete*/
      .addCase(pucsDelete.pending,(state) =>{
        state.loading = true            
      })
      .addCase(pucsDelete.fulfilled,(state,action)=>{
          state.loading = false
          state.data  = action.payload.response.data    
          state.total = action.payload.response.total          
          state.pagina = action.payload.response.pagina          
          state.paginas = action.payload.response.paginas          
      })
      .addCase(pucsDelete.rejected,(state)=>{
        state.loading = false        
      }) 
    }    
  });
  export const { resetItem } = pucsSlice.actions
  const { reducer } = pucsSlice;
  export default reducer;  
   