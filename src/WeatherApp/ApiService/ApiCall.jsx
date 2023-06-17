import axios from "axios";
import { getToken } from "../../utils/storage";
const headers =  {
  'Content-Type': 'application/json',
  Accept: "application/json",
}
export const ApiCall =async (url,method,data,isWeatherapi = false) => {
   const token =await getToken();
   if(!isWeatherapi && token){
    headers.Authorization = `Bearer ${token}`
   }
   axios.defaults.headers = headers;
   if(isWeatherapi){
    axios.defaults.headers = 'something';
   }
    return await axios[method](url,data)
    .then(function (response) {
      // handle success
     return response.data;
})
}