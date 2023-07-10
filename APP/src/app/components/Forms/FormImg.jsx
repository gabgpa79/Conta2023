import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { InfinitySpin  } from 'react-loader-spinner'
import { apiUrl } from '@helpers'
import { image  } from '@reducers/gral/imagesSlice'
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";




const FormImg = ({item,payload,payloads}) => {
    const dispatch = useDispatch()    
    
    const [imagePreviewUrl,setImagePreviewUrl] = useState('');    
    const {loading }= useSelector(state => state.imagen)
    
    const handleChange = (e) =>{
        e.preventDefault()
        let reader = new FileReader()
        let file = e.target.files[0]
        reader.onloadend = () =>{            
            setImagePreviewUrl(reader.result)
        }
        reader.readAsDataURL(file)

        const formData = new FormData()
        formData.append("file",file)        
        let dato ={
            item: formData,
            pky: item.id,
            payload: payload
        }
        dispatch(image(dato)) 
    }


    return (        
        <div className="h-full flex-col w-full p-1 text-[10px]">
            {/**Begin */}            
            <div className="h-4/6 w-full flex items-center justify-center">
              { loading === true ?
                <InfinitySpin 
                width='200'            
                color="#38bdf8"            
                /> :

                imagePreviewUrl ? 
                <img alt="preview" className="h-60 w-72" src={imagePreviewUrl} />:
                <img alt={payload}
                     className="h-60 w-72 border rounded shadow-md"          
                     src={`${apiUrl}static/images/${payloads}/lg/` + item.filename}
                /> 

            }              
            </div>
            { item.id &&            
            <div className="h-2/6 w-full flex items-center justify-center">
                <label 
                htmlFor="dropzone-file" 
                className="w-full flex flex-col justify-center items-center h-20 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col justify-center items-center pt-1 pb-1">
                    <CloudArrowUpIcon className="h-6 w-6 text-gray-500" />
                    <p className="mb-1  text-gray-500 dark:text-gray-400 text-center">
                        <span className="font-semibold">Haga clic para cargar</span></p>
                    <p className=" text-gray-500 dark:text-gray-400 text-center">
                        PNG, JPG or GIF 
                    </p>
                  
                </div>           
                <input 
                    name="qq"
                    id="dropzone-file" 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => handleChange(e)}
                />
                </label>                
            </div>
            }
           
            {/**End */}
        </div>
    );
}

export default FormImg;
