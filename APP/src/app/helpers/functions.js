export const defaultVals = (options, valor) =>{
    let iok = ""
    // eslint-disable-next-line array-callback-return
    options.map(item =>{
        if(item.value === valor){
          iok = item.label
        } 
      })  
    return iok    
  }

  export function getFechas() 
{ 
   let today = new Date()
   var dd = String(today.getDate()).padStart(2, '0');
   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
   var yyyy = today.getFullYear();
   var tt = yyyy + '-' + mm + '-' + dd;    

  

   return tt
} 

function getDay (day){       
  let nday = '01';
  switch(day)
  {
    case 1:      
      nday = '01'
    break;
    case 2:      
      nday = '02'
    break;
    case 3:      
      nday = '03'
    break;
    case 4:      
      nday = '04'
    break;
    case 5:      
      nday = '05'
    break;
    case 6:      
      nday = '06'
    break;
    case 7:      
      nday = '07'
    break;
    case 8:      
      nday = '08'
    break; 
    case 9:      
      nday = '09'
      break;
    case 10:      
      nday = '10'
      break;
    case 11:      
      nday = '11'
      break;
    case 12:      
      nday = '12'      
      break;            
    default:
    break;

  }    
  return nday

}
export function getMes(){
  let mesHoy = new Date()  
  let m = getDay(mesHoy.getMonth()+1)
  let y = mesHoy.getFullYear()
  
  let fecha ={}
  fecha.desde = `${y}-${m}-01`
  fecha.hasta = '0'  
  
  switch(m)
  {
    case '01':      
      fecha.hasta = `${y}-${m}-31`
    break;  
    case '02':
      fecha.hasta = `${y}-${m}-28`          
    break;  
    case '03':      
      fecha.hasta = `${y}-${m}-31`
      break;
    case '04':      
      fecha.hasta = `${y}-${m}-30`      
      break;
    case '05':      
      fecha.hasta = `${y}-${m}-31`
      break;
    case '06':      
      fecha.hasta = `${y}-${m}-30`
      break;
    case '07':      
      fecha.hasta = `${y}-${m}-31`
      break;
    case '08':      
      fecha.hasta = `${y}-${m}-31`
      break;
    case '09':      
      fecha.hasta = `${y}-${m}-30`
      break;
    case '10':      
      fecha.hasta = `${y}-${m}-31`
      break;
    case '11':      
      fecha.hasta = `${y}-${m}-30`
      break;        
    case '12':      
      fecha.hasta = `${y}-${m}-31`
      break;  
    default:
    break;
  
  }
  return fecha
  
  }