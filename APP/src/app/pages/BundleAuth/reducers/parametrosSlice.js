import { createSlice } from "@reduxjs/toolkit"

const initialState = { 
  loading:false,  
  pBusqueda:"" 
};  


const parametrosSlice = createSlice({
  name: "parametro",
  initialState,  
  reducers:{
    setParametro:(state,action) =>{
      state.pBusqueda = action.payload
    },
    resetParametro:(state) =>{
        state.pBusqueda = ""
    }
  }    
});
export const { setParametro, resetParametro } = parametrosSlice.actions
const { reducer } = parametrosSlice;
export default reducer;  
