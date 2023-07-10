import axios from 'axios'
import { apiUrl } from '@helpers'

  const login = async (username, password) => {
    const response = await axios
      .post(apiUrl + "usuarios/login/usuario", {
        username,
        password,
      });
    let resUser = response.data.result.usuario;
    let resToken = response.data.result.token;
    let resEmpresa = response.data.result.empresa;
    let authOp = {
      procesos: response.data.result.procesos,
      tareas: response.data.result.tareas,
      message: response.data.result.message,
      auth: response.data.result.auth
    };
    if (resUser) {
      localStorage.setItem("@usuarioConta23", JSON.stringify(resUser));
      localStorage.setItem("@tokenConta23", JSON.stringify(resToken));
      localStorage.setItem("@empresaConta23", JSON.stringify(resEmpresa));
    }
    return authOp;
  };

const logout = () =>{
    localStorage.removeItem("@usuarioConta23")
    localStorage.removeItem("@tokenConta23")
    localStorage.removeItem("@empresaConta23")
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("@usuarioConta23"));
  };

const AuthService = {        
    login,
    logout,
    getCurrentUser,
  };
  
export default AuthService;