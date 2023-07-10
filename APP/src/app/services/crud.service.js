import axios from 'axios'
import { apiUrl } from '@helpers'
import authHeader  from './auth-header'

  const data = async (dato, endpoint) => {    
    const response = await axios
      .post(apiUrl + `${endpoint}/data/list`, dato, {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      });   
    return response.data.result
  }; 
  const repConsolidados = async (dato, endpoint) => {    
    const response = await axios
      .post(apiUrl + `${endpoint}/consolidados/general`, dato, {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      });    
  
    return response.data.result
  };
  const upImagen = async (dato,pky, endpoint) => {         
    if(endpoint === 'empresa'){
      const response = await axios
      .put(apiUrl + `files/${endpoint}/item/${pky}`, dato);    
      localStorage.setItem("@empresaConta23", JSON.stringify(response.data.result));      
      return response.data.result    
    }else{
      const response = await axios
      .put(apiUrl + `files/${endpoint}/item/${pky}`, dato);    
      return response.data.result   
    }    
  };
  const getItem = async (pky, endpoint) => {    
    const response = await axios
      .get(apiUrl + `${endpoint}/item/${pky.id}/${pky.tipo}`, {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      });    
    return response.data.result
  };
  const update = async (dato, endpoint) => {            
    const response = await axios
      .put(apiUrl + `${endpoint}/${dato.id}/unit`, dato, {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      });         
    return response.data.result    
  };

  const create = async (dato, endpoint) => {    
    const response = await axios
      .post(apiUrl + `${endpoint}/unit`, dato, {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      });    
  
    return response.data.result
  };
  const _delete = async (dato, endpoint) => {        
    const response = await axios
      .post(apiUrl + `${endpoint}/delete/item/list`, dato, {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      });
    return response.data.result
  };
  const item = async (pky, endpoint) => {    
    const response = await axios
      .get(apiUrl + `${endpoint}/item/${pky.id}/${pky.tipo}`, {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      });    
    return response.data.result
  };
  const itemsList = async (dato,endpoint) => {        
  
      const response = await axios
      .post(apiUrl + `${endpoint}/listas/items`, dato, {        
        headers: { ...authHeader(), "Content-Type": "application/json" },
      });    
    return response.data.result
  };
  const listaDetalle = async (dato, endpoint) => {    
    const response = await axios
      .post(apiUrl + `${endpoint}/lista/items`, dato, {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      });    
    return response.data.result
  };
  const searchItems = async (dato, endpoint) => {    
    const response = await axios
      .post(apiUrl + `${endpoint}/search/items`, dato, {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      });    
    return response.data.result
  };
  const items = async (endpoint) => {    
    const response = await axios
      .get(apiUrl + `${endpoint}/listas/items`, {
        headers: { ...authHeader(), "Content-Type": "application/json" },
      });    
    return response.data.result;
  };
  const aprobar = async (dato, endpoint) => {            
    const response = await axios
    .put(apiUrl + `${endpoint}/aprobar/item/${dato.item.id}`, dato, {
      headers: { ...authHeader(), "Content-Type": "application/json" },
    });               
  return response.data.result    
};
const searchStock = async (dato, endpoint) => {    
  const response = await axios
    .post(apiUrl + `${endpoint}/search/stock`, dato, {
      headers: { ...authHeader(), "Content-Type": "application/json" },
    });    
  return response.data.result
};
const contabilidad = async (dato, endpoint) => {    
  const response = await axios
    .post(apiUrl + `contabilidad/${endpoint}`, dato, {
      headers: { ...authHeader(), "Content-Type": "application/json" },
    });    

  return response.data.result
};
const aprobarUnit = async (dato, endpoint) => {            
  const response = await axios
  .put(apiUrl + `${endpoint}/aprobar/item/${dato.id}`, dato, {
    headers: { ...authHeader(), "Content-Type": "application/json" },
  });               
return response.data.result    
};
const informes = async (dato, endpoint) => {    
  const response = await axios
    .post(apiUrl + `informes/${endpoint}`, dato, {
      headers: { ...authHeader(), "Content-Type": "application/json" },
    });    

  return response.data.result
};
const searchStocks = async (dato, endpoint) => {    
  const response = await axios
    .post(apiUrl + `${endpoint}/search/stocks`, dato, {
      headers: { ...authHeader(), "Content-Type": "application/json" },
    });    
  return response.data.result
};



const CrudService = {            
    data,
    repConsolidados,
    upImagen,
    getItem,
    update,
    create,
    item,
    items,
    _delete,
    itemsList,
    listaDetalle,
    searchItems,
    aprobar,
    searchStock,
    contabilidad,
    aprobarUnit,
    informes,
    searchStocks 
};
    
export default CrudService;  