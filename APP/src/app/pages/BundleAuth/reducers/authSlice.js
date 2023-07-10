import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import AuthService from "@services/auth.service"
import {toastr} from 'react-redux-toastr'

export const login = createAsyncThunk(
    "auth/login",
    async({username, password},thunkAPI)=>{
        try{      
            const data = await AuthService.login(username, password);   
            if(!data.auth){
              toastr.warning('Auth', data.message) 
            }                        
        }catch(error){                  
            return thunkAPI.rejectWithValue();           
        }   
    }
)



export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();    
  });


const initialState = {
  user: null,
  loading:false, 
  auth:false,
  message:null  
};  


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    setUsername:(state,action)=>{
      state.username = action.payload
    },
    setPassword:(state,action)=>{
      state.password = action.payload
    },
  },
  extraReducers(builder) { 
    builder
      .addCase(login.pending,(state) =>{
          state.loading = true  
          state.auth = false                  
      })
      .addCase(login.fulfilled,(state,action)=>{
          state.loading  = true          
          state.auth     = true     
      })
      .addCase(login.rejected,(state,action)=>{
        state.loading = false
        state.auth = false 
        state.error = action.error.message        
      })
      .addCase(logout.fulfilled,(state) => {
        state.loading = false;        
        state.auth = false;
      })  
  }    
});

export const { setUsername, setPassword } = authSlice.actions
const { reducer } = authSlice;
export default reducer;  
