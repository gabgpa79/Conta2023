import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Auth, NoMatch}  from '@layouts'
import { AuthProvider, Protected } from '@auth';
import ReduxToastr from 'react-redux-toastr'
import './assets/core/main.css';
import './assets/daygrid/main.css';
import './assets/timegrid/main.css'

const App = () => {  
  return (
    <AuthProvider> 
      <ReduxToastr
      timeOut={1500}
      newestOnTop={false}
      preventDuplicates
      position="top-center"
      getState={(state) => state.toastr} 
      transitionIn= 'bounceIn'
      transitionOut= 'bounceOut'
      progressBar= {false}
      closeOnToastrClick/> 
      <Routes>        
        <Route index element={<Auth />} /> 
        <Route path="/" element={<Auth/> } />   
        <Route 
        path="admin/*" 
        element={
        <Protected>
          <Layout />
        </Protected>          
      }        
      />                        
        <Route path="*" element={<NoMatch />} />                        
      </Routes>      
    </AuthProvider>
  );
};

export default App;