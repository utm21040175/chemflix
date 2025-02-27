//integracion de la api 
import axios from 'axios'

const api_key = 'fb7058078ac62b4a6d67a248f550db69' //esta es la clave que me da en mi sesion 
const base_url = 'https://api.themoviedb.org/3'; //base de datos para las solicitudes 


//instancia con los parametros 
const api = axios.create({
    baseURL : base_url,
    params : {
        api_key
    }
}); 

//exportar la instancia 
export default api;