export const _columndUsuarios = [
    { id:0,field: '', rts:'txt',width:'1/12',est:'visible' },
    { id:1,field: 'Nombres', rts:'txt',width:'5/12',est:'visible' },
    { id:2,field: 'Username', rts:'txt',width:'2/12',est:'visible' },      
    { id:3,field: 'Rol', rts:'txt',width:'1/12',est:'visible' },
    { id:4,field: 'Sucursal', rts:'txt',width:'2/12',est:'visible' }
];

export const _columndComprobantes = [
    { id:0,field: '', rts:'txt',width:'1/12',est:'visible' },
    { id:1,field: 'Número', rts:'num',width:'1/12',est:'visible' },
    { id:2,field: 'Tipo', rts:'icon',width:'1/12',est:'visible' },
    { id:3,field: 'Estado', rts:'bool',width:'1/12',est:'visible' },
    { id:4,field: 'Fecha', rts:'fecha',width:'1/12',est:'visible' },
    { id:5,field: 'Glosa', rts:'txt',width:'4/12',est:'visible' },        
    { id:6,field: 'Total', rts:'moneda',width:'1/12',est:'visible' },
    { id:7,field: 'Gestión', rts:'num',width:'1/12',est:'visible' }
];
export const _modelTipoComprobante =[
    {"label":'ingreso',"value":'ingreso'},
    {"label":'egreso',"value":'egreso'},
    {"label":'diario',"value":'diario'}        
]