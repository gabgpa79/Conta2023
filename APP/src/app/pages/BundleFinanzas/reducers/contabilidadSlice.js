import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import CrudService from "@services/crud.service"

export const diariosData = createAsyncThunk(
    "contabilidad/diarios",
    async(dato,thunkAPI)=>{
        try{                    
          const data = await CrudService.contabilidad(dato,'diarios');                                      
          return { response: data }
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
)
export const mayoresData = createAsyncThunk(
  "contabilidad/mayores",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await CrudService.contabilidad(dato,'mayores');                                      
     
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const saldosData = createAsyncThunk(
  "contabilidad/saldos",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await CrudService.contabilidad(dato,'saldos');    
      
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
export const saldoData = createAsyncThunk(
  "contabilidad/saldo",
  async(dato,thunkAPI)=>{
      try{                    
        const data = await CrudService.contabilidad(dato,'saldo');    
      
        return { response: data }
      }catch(error){                  
          return thunkAPI.rejectWithValue();           
      }   
  }
)
const initialState = { 
  loading:false,  
  vitems:[],  
  mitems:[],
  sitems:[],
  tDebe: 0,
  tHaber:0,
  tAcreedor:0,
  tDeudor:0,
  tGastos:0,
  tIngresos:0,
  tPerdidas:0,
  tGanancias:0,
  tActivos:0,
  tPasivos:0,
  tPatrimonio:0
};  


const contabilidadSlice = createSlice({
  name: "contabilidad",
  initialState,  
  reducers:{    
    resetItems:(state)=>{
      state.vitems    = []        
      state.mitems    = []        
      state.sitems    = []
      state.tDebe     = 0
      state.tHaber    = 0
      state.tAcreedor = 0
      state.tDeudor   = 0
      state.tGastos   = 0
      state.tIngresos = 0
      state.tActivos  = 0
      state.tPasivos  = 0
      state.tPerdidas  = 0
      state.tGanancias  = 0
      state.tPatrimonio  = 0

    },    
  },
  extraReducers(builder) { 
    builder
      .addCase(diariosData.pending,(state) =>{
          state.loading = true            
      })
      .addCase(diariosData.fulfilled,(state,action)=>{
          state.loading = false
          state.vitems  = action.payload.response.data
          state.tDebe   = action.payload.response.tDebe
          state.tHaber  = action.payload.response.tHaber
      })
      .addCase(diariosData.rejected,(state)=>{
        state.loading = false       
      })   
      .addCase(mayoresData.pending,(state) =>{
        state.loading = true            
      })
      .addCase(mayoresData.fulfilled,(state,action)=>{
          state.loading = false
          state.mitems  = action.payload.response.data
          state.tDebe   = action.payload.response.tDebe
          state.tHaber  = action.payload.response.tHaber
          state.tDeudor = action.payload.response.tDeudor          
          state.tAcreedor = action.payload.response.tAcreedor
      })
      .addCase(mayoresData.rejected,(state)=>{
        state.loading = false       
      }) 
      .addCase(saldosData.pending,(state) =>{
        state.loading = true            
      })
      .addCase(saldosData.fulfilled,(state,action)=>{
          state.loading = false
          state.sitems  = action.payload.response.data
          state.tDebe   = action.payload.response.tDebe
          state.tHaber  = action.payload.response.tHaber
          state.tDeudor = action.payload.response.tDeudor          
          state.tAcreedor = action.payload.response.tAcreedor
          state.tGastos   = action.payload.response.tGastos
          state.tIngresos = action.payload.response.tIngresos
          state.tActivos  = action.payload.response.tActivos
          state.tPasivos  = action.payload.response.tPasivos

      })
      .addCase(saldosData.rejected,(state)=>{
        state.loading = false       
      }) 
      .addCase(saldoData.pending,(state) =>{
        state.loading = true            
      })
      .addCase(saldoData.fulfilled,(state,action)=>{
          state.loading = false          
          state.tDebe   = action.payload.response.tDebe
          state.tHaber  = action.payload.response.tHaber
          state.tDeudor = action.payload.response.tDeudor          
          state.tAcreedor = action.payload.response.tAcreedor
          state.tGastos   = action.payload.response.tGastos          
          state.tIngresos = action.payload.response.tIngresos
          state.tPerdidas = action.payload.response.tPerdidas
          state.tGanancias   = action.payload.response.tGanancias
          state.tActivos  = action.payload.response.tActivos
          state.tPasivos  = action.payload.response.tPasivos
          state.tPatrimonio  = action.payload.response.tPatrimonio

      })
      .addCase(saldoData.rejected,(state)=>{
        state.loading = false       
      })
  }    
});
export const { resetItems } = contabilidadSlice.actions
const { reducer } = contabilidadSlice;
export default reducer;  
