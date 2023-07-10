import {useRef} from 'react';
import GoogleMapReact from 'google-map-react';


const FormMapa = ({item,mapClicked}) => {
    const mapRef = useRef()
   

    const LocationPin = () =>(
        <svg className="w-8 h-8 text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
      )

    return (
        <div className="h-380 w-full rounded-md">
            { item.latitude && item.longitude ?
               <GoogleMapReact
               ref={mapRef}
               bootstrapURLKeys={{
                key: 'AIzaSyAF83DBU51q3idSspsd7f4DtTk7vNwHpR8',
                libraries:['places', 'geometry', 'drawing', 'visualization'] 
               }}
               defaultCenter={{
                lat: parseFloat(item.latitude),
                lng: parseFloat(item.longitude)
               }}
               defaultZoom={16}
               onClick={(e) => mapClicked(e)}
               >
                <LocationPin
                    lat= {parseFloat(item.latitude)}
                    lng= {parseFloat(item.longitude)}
                />      
              </GoogleMapReact>
            :null
            }

            
        </div>
    );
}

export default FormMapa;

