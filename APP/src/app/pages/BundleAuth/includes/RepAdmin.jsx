import React,{ useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useReactToPrint } from 'react-to-print';
import { PrinterIcon } from "@heroicons/react/24/outline";
import Moment from 'react-moment';
import { usuariosConsolidado  } from '@reducers/config/usuariosSlice'
const fHoy = new Date()


const ComponentToPrint = React.forwardRef((props,ref)=>{    
    const fechaHoy = new Date();
    let us  = JSON.parse(localStorage.getItem('@usuarioConta23'))  
    let ep  = JSON.parse(localStorage.getItem('@empresaConta23'))
    return ( 
        <div ref={ref} className="pl-8 pr-8 pt-2 text-[9px] text-gray-500 w-full">     
          
        <div className='h-auto w-full flex justify-center'>                  
            <div className='mr-1 w-1/2 flex-col border'>
                <div className='h-5 flex w-1/3 border'>
                    <div className='text-white bg-gray-500 font-bold uppercase w-4/6 flex items-center pl-2'>
                        <span> Clientes </span>
                    </div>
                    <div className='text-white bg-gray-400 font-bold uppercase w-2/6 flex items-center justify-center'>
                        <span>{props.cltotal} </span>
                    </div>
                </div>
                <HighchartsReact highcharts={Highcharts} options={props.pclientes} />                
            </div>
            <div className='ml-1 w-1/2 flex-col border'>
                <div className='h-5 flex w-1/3 border'>
                    <div className='text-white bg-gray-500 font-bold uppercase w-4/6 flex items-center pl-2'>
                        <span> Existencias </span>
                    </div>
                    <div className='text-white bg-gray-400 font-bold uppercase w-2/6 flex items-center justify-center'>
                        <span>{props.stotal} </span>
                    </div>
                </div>
                <HighchartsReact highcharts={Highcharts} options={props.pexistencias} />               
            </div>
        </div>




        <div className='mt-1 border-t border-l border-r  text-gray-50  w-36 flex'>
            <div className='h-5 bg-gray-500 font-bold uppercase w-2/3 flex items-center pl-2'>
              <span>  Compras </span>
            </div>
            <div className='h-5 bg-gray-400 font-bold uppercase w-1/3 flex items-center justify-center'>
             <span>{props.ctotal} </span>
            </div>
        </div>
        <div className='h-auto border w-full flex justify-center'>                    
            <HighchartsReact highcharts={Highcharts} options={props.pcompras} />
        </div>

        <div className='mt-1 border-t border-l border-r  text-gray-50  w-36 flex'>
            <div className='h-5 bg-gray-500 font-bold uppercase w-2/3 flex items-center pl-2'>
              <span>  Ventas </span>
            </div>
            <div className='h-5 bg-gray-400 font-bold uppercase w-1/3 flex items-center justify-center'>
             <span>{props.vtotal} </span>
            </div>
        </div>
        <div className='h-auto border w-full flex justify-center'>                    
            <HighchartsReact highcharts={Highcharts} options={props.pventas} />
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

const RepAdmin = () => {   
    const dispatch = useDispatch() 
    const { cl_items,cl_total,c_items,c_total,s_items,s_total,v_items,v_total,reorden } = useSelector((state) => state.usuarios)
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    useEffect(() => {
        let iok={
            "tipo": "administrador",        
            "gestion": fHoy.getFullYear(),
            "usuarioId":1
        }
        dispatch(usuariosConsolidado(iok))
    }, []);
    const clientes = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 200
        },
        title: {
            text: '',
            align: 'left'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Clientes',
            colorByPoint: true,
            data: cl_items
        }]
    }
    const ventas = {
        
        chart: {
            type: 'column',
            height: 200
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                'Ene',
                'Feb',
                'Mar',
                'Abr',
                'May',
                'Jun',
                'Jul',
                'Ago',
                'Sep',
                'Oct',
                'Nov',
                'Dic'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'ventas',
            data: v_items
    
        }]
    }  
    const compras = {        
        chart: {
            type: 'column',
            height: 200
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                'Ene',
                'Feb',
                'Mar',
                'Abr',
                'May',
                'Jun',
                'Jul',
                'Ago',
                'Sep',
                'Oct',
                'Nov',
                'Dic'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'compras',
            data: c_items
    
        }]
    }  
    const existencias = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 200
        },
        title: {
            text: '',
            align: 'left'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Existencias',
            colorByPoint: true,
            data: s_items
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
            <div className='h-max w-10/12 flex bg-white shadow'>
              <ComponentToPrint
                  ref={componentRef}     
                  pclientes={clientes}    
                  pventas={ventas}             
                  pcompras={compras}             
                  pexistencias={existencias}    
                  vtotal={v_total.total}
                  ctotal={c_total.total}
                  cltotal={cl_total.total}
                  stotal={s_total.total}
              />   
            </div>
          </div>

    </div>
    );
}

export default RepAdmin;
