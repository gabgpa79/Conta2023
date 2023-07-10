import React,{useState} from 'react';
import { AuthContext } from '@auth';
import { UserIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


const Login = () => {  
  const { onLogin } = React.useContext(AuthContext)     
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [tip, settip] = useState("password");

  const bnd = Boolean(username) & Boolean(password)    

  const handelCh = () =>{    
    if(tip === "password")
    {
      settip("text")
    }else{
      settip("password")
    }
  }

  return (    
    <div className="h-full w-2/3 flex-col p-2">
      <div className='h-14 flex'>
        
      </div>
      <div className='h-440 flex border shadow-md'>
        <div className='flex w-1/2 bg-sky-400 items-center justify-center'>
            <span className='text-gray-50 font-bold' >DEMO - CONTA 23</span>
        </div>

        <div className='flex-col w-1/2 p-4'>
          <div className="h-20 flex items-center justify-center">
            <UserIcon className="h-10 w-10 text-gray-400" />               
          </div>
          <div className="h-10 flex items-center justify-center">
             <span className='text-gray-400 font-bold' >Login</span>   
          </div>

          <form onSubmit={onLogin} className="h-48 mt-2 w-full p-2"> 
            <div className="mt-2 flex-col border-b text-[11px] text-gray-500">
                <label htmlFor='username'>Usuario</label>
                <input
                  className="w-full h-8 border-none text-[10px] hover:border-gray-100 rounded-md"
                  id="username"
                  type="text"
                  name="username"
                  value={username}                    
                  onChange={(e)=>{setusername(e.target.value)}}
                  autoComplete="off"
                  required
                />
            </div>

            <div className="mt-2 flex-col border-b text-[11px] text-gray-500">
                <label htmlFor='password'>Password</label>
                <div className='w-full flex items-center'>
                  <input
                    className="w-11/12 h-8 flex border-none text-[10px] hover:border-gray-100 rounded-md"
                    id="password"
                    type={tip}
                    name="password"
                    value={password}                    
                    onChange={(e)=>{setpassword(e.target.value)}}
                    required
                  />
                  <button
                    type='button' 
                    onClick ={()=> handelCh()}
                    className='w-10 flex border-none bg-transparent'>
                    { tip === "password" ? <EyeIcon className="h-5 w-5 text-gray-400" />   
                    : <EyeSlashIcon className="h-5 w-5 text-red-400" />   }
                    
                  </button>
                </div>                
            </div>
            <div className="flex-col mt-4 text-[11px] text-gray-500">
                <button 
                  className={bnd === 0 ?"h-8 w-full bg-sky-300 text-gray-100 cursor-not-allowed rounded-md items-center justify-center flex hover:bg-sky-400": "h-8 w-full bg-sky-500 hover:bg-sky-300 rounded-md items-center justify-center flex text-white"}>
                  ingresar
                </button> 
            </div>
          </form>  
        </div>
      </div>
      <div className='h-14 flex items-center justify-center text-[11px] text-gray-600'>
          <h6>developed by <span className='text-sky-600 font-bold'>Beggu' Gnu</span></h6>
      </div>
      
    </div>    
    );
}

export default Login;
