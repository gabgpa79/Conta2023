import React,{ useEffect, useState,useRef } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useDispatch, useSelector } from "react-redux";
import { saldoData } from '@reducers/contabilidad/contabilidadSlice'
import { useReactToPrint } from 'react-to-print';
import { PrinterIcon } from "@heroicons/react/24/outline";
import Moment from 'react-moment';
let ep  = JSON.parse(localStorage.getItem('@empresaConta23'))

const ComponentToPrint = React.forwardRef((props,ref)=>{    
  const fechaHoy = new Date();
  let us  = JSON.parse(localStorage.getItem('@usuarioConta23'))    
  return ( 
    <div ref={ref} className="pl-8 pr-8 pt-2 text-[9px] text-gray-500 w-full">     
      
      <div className='h-52 w-full flex justify-center'>                       
        <div className='border w-1/2 ml-1 mr-1 flex rounded'>
            <HighchartsReact highcharts={Highcharts} options={props.psumas} />
        </div>      
        <div className='border w-1/2 ml-1 mr-1 flex rounded'>
            <HighchartsReact highcharts={Highcharts} options={props.psaldos} />
        </div>   
      </div>

      <div className='h-72 w-full flex justify-center mt-1'>                       
        <div className='border w-1/2 ml-1 mr-1 flex rounded'>
            <HighchartsReact highcharts={Highcharts} options={props.pestados} />
        </div>      
        <div className='border w-1/2 ml-1 mr-1 flex rounded'>
            <HighchartsReact highcharts={Highcharts} options={props.pbalance} />
        </div>
      </div>

      <div className='flex mt-6 mb-6'>
          <h5 className="w-1/2 text-left pl-1 italic">fecha emisión : <Moment format="DD/MM/YYYY - HH:mm">{ fechaHoy }</Moment></h5>   
          <h5 className="w-1/2 text-right pr-1 italic">user : { us.nombres }</h5>            
      </div>            
      {/* end content */}

  </div>
   );
  }
)

const Inicio = () => {
  const dispatch = useDispatch()          
  const { tDebe, tHaber, tDeudor, tAcreedor,tGastos, tIngresos, tPerdidas, tGanancias,tActivos, tPasivos, tPatrimonio } = useSelector((state) => state.contabilidad)    
  const [value1, onChange1] = useState(new Date());    
  const [value2, onChange2] = useState(new Date());

  
  useEffect(() => {    
      let iok ={
        desde: value1,
        hasta: value2        
      }
      dispatch(saldoData(iok))    
    return () => {
      /*dispatch(resetItems())*/
    };
  }, []);

  const componentRef = useRef()
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });


const sumas = {
  chart: {
    type: 'column',
    height: 200,
    
},
title: {
    text: 'Sumas',
    style:{
      color:"#57534e",
      fontWeight:"bold",
      fontSize:"12px"
    }
},


yAxis: {
    min: 0,
    title: {
        text: 'Bs.'
    }
},

plotOptions: {
    column: {
        pointPadding: 0.2,
        borderWidth: 0
    }
},
series: [{
    name: 'Sumas:'+new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(tDebe),
    data: [tDebe],
    color:"#bae6fd"

}, {
    name: 'Saldos'+new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(tHaber),
    data: [tHaber],
    color:"#94a3b8"
}]
} 
const saldos = {
  chart: {
    type: 'column',
    height: 200,
  
},
title: {
    text: 'Saldos',
    style:{
      color:"#57534e",
      fontWeight:"bold",
      fontSize:"12px"
    }
},


yAxis: {
    min: 0,
    title: {
        text: 'Bs.'
    }
},


series: [{
    name: 'Deudor: '+new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(tDeudor),
    data: [tDeudor],
    color:"#7dd3fc"

}, {
    name: 'Acreedor: '+new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(tAcreedor),
    data: [tAcreedor],
    color:"#cbd5e1"
}]
} 

const estados = {

  chart: {
    type: 'bar',
    height: 300
},
title: {
    text: 'Estado de Resultados',
    align: 'center',
    style:{
      color:"#57534e",
      fontWeight:"bold",
      fontSize:"12px"
    }
},

xAxis: {
    categories: ['Ingresos', 'Gastos', 'Perdidas', 'Utilidades'],
    title: {
        text: null
    },
    gridLineWidth: 1,
    lineWidth: 0
},

plotOptions: {
    bar: {
        borderRadius: '0%',
        dataLabels: {
            enabled: true
        },
        groupPadding: 0.1
    }
},

credits: {
    enabled: false
},
series: [{
    name: 'Utilidades : '+ new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(tGanancias)+'______ Perdidas :'+new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(tPerdidas),    
    color: "#fff",
    data: [{
      x: 0,
      y: tIngresos,
      name: "Point1",
      color: "#7dd3fc"
    }, {
      x: 1,
      y: tGastos,
      name: "Point2",
      color: "#fda4af"
    }, {      
    x: 2,
    y: tPerdidas,
    name: "Point3",
    color: "#f87171"
    }
    , {      
      x: 3,
      y: tGanancias,
      name: "Point4",
      color: "#4ade80"
    }
]
}]

} 

const balance = {
chart: {
  type: 'column',
  height: 300,  
},
title: {
  text: 'Balance de Situación',
  style:{
    color:"#57534e",
    fontWeight:"bold",
    fontSize:"12px"
  }
},
xAxis: {
  categories: ['Activos', 'Pasivos', 'Patrimonio']
},
credits: {
  enabled: false
},
plotOptions: {
  column: {
      borderRadius: '0%'
  }
},
  
series: [{
  name: 'Activos : '+ new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(tActivos)+'___ Pasivos :'+new Intl.NumberFormat('es-'+ep.moneda,{minimumFractionDigits: 2}).format(tPasivos),    
  color: "#fff",  
  
  data: [{
    x: 0,
    y: tActivos,
    name: "Point1",
    color: "#7dd3fc"
  }, {
    x: 1,
    y: tPasivos,
    name: "Point2",
    color: "#fda4af"
  }, {      
  x: 2,
  y: parseFloat(tPatrimonio.toFixed(2)),
  name: "Point3",
  color: "#f87171"
  }  
]
  }]
}

  return (
    <div className="h-550 w-full flex-col border bg-gray-200">
    <div className='h-9 border-b flex w-full bg-gray-50 justify-end pr-4 items-center'>                
            <button 
                onClick={() =>handlePrint()}
                className="ml-2 h-6 w-10 bg-gray-50 hover:bg-gray-100 rounded border-2 hover:text-gray-200 flex justify-center items-center text-white">                                           
                <PrinterIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            </button> 
    </div>
    <div className='h-510 w-full flex bg-gray-300 justify-center overflow-y-scroll'>
        <div className='h-max w-9/12 flex bg-white shadow'>
          <ComponentToPrint
              ref={componentRef}  
              psumas={sumas}   
              psaldos={saldos}  
              pestados={estados}  
              pbalance={balance}  
          />   
        </div>
      </div>
  </div>    
  );
}

export default Inicio;
