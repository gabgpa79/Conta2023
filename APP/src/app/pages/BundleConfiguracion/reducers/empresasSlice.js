import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {toastr} from 'react-redux-toastr'
import CrudService from "@services/crud.service"

export const empresasUpdate = createAsyncThunk(
  "empresas/update",
  async(dato,thunkAPI)=>{
      try{      
          const data = await CrudService.update(dato,'empresas');  
          toastr.success('Empresa', 'Actualizada')
          return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)

export const empresasItem = createAsyncThunk(
  "empresas/item",
  async(pky,thunkAPI)=>{    
      try{      
          const item = await CrudService.getItem(pky,'empresas');                                       
          return { response: item }
      }catch(error){  
        if(error.code === 'ERR_NETWORK')               
        {
          toastr.error('Empresa', 'No exite la conexión con el API') 
        }else{
          toastr.error('Empresa', 'Error de datos') 
        }        
        return thunkAPI.rejectWithValue();           
      }   
  }
)


const initialState = { 
  loading:false,    
  item:{}
};  


const empresasSlice = createSlice({
  name: "empresa",
  initialState,  
  reducers:{
    resetItem:(state)=>{
      state.item ={}
    },       
  },
  extraReducers(builder) { 
    builder
      .addCase(empresasItem.pending,(state) =>{
        state.loading = true                    
      })
      .addCase(empresasItem.fulfilled,(state,action)=>{
          state.loading = false
          state.item    = action.payload.response              
      })
      .addCase(empresasItem.rejected,(state)=>{
        state.loading = false        
      })
    
      /** update */
      .addCase(empresasUpdate.pending,(state) =>{
        state.loading = true            
      
      })
      .addCase(empresasUpdate.fulfilled,(state,action)=>{
          state.loading = false
          state.item    = action.payload.response              
      })
      .addCase(empresasUpdate.rejected,(state)=>{
        state.loading = false
        state.item    = {}
      })

     
  }    
});
export const { resetItem, resetData } = empresasSlice.actions
const { reducer } = empresasSlice;
export default reducer;  
