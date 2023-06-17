import { useNavigate } from 'react-router';
import './Weather.css';
import { useState, useRef, useEffect } from 'react';
import { ApiCall } from './ApiService/ApiCall';
import { removeToken } from '../utils/storage';
export default function WeatherHome(){
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const inputRef = useRef();
    const navigate = useNavigate();

    const historyHandler = () => {
        navigate('/home/weather_history');
        console.log("click")
    }

    const logoutHandler = () => {
        removeToken();
        navigate('/');
    }
    async function getUser(item) {
       {/* const response=await fetch(`https://api.weatherapi.com/v1/current.json?key=7c98b77e8381492e889112027232905&q=${item}&aqi=yes`);
        const result =await response.json();
        console.log(result);
    setUser(result);*/}
   const url = `https://api.weatherapi.com/v1/current.json?key=7c98b77e8381492e889112027232905&q=${item}&aqi=yes`;
   const tempData = await ApiCall(url,'get',null,true);
   setData(tempData)
    setLoading(false);
    if(tempData.status > 300){
        setError(true);
        setLoading(false);
        }
    }

    
    useEffect(() => {
        getUser('Rome')
    },[]);
    const handleSearch = (event) => {
        if(event.key === "Enter"){
            getUser(inputRef.current.value);
            inputRef.current.value = "";
        }
    };
    const handleSave =async () => {
        const dateData = new Date();
        console.log(dateData.getFullYear())
        console.log("clicked me");
        const postData = {
            date: `${dateData.getFullYear()}-${dateData.getMonth()+1}-${dateData.getDate()}`,
            name: data?.location.name,
            weather: data?.current.condition.text,
            temp:data?.current.temp_c,
            humidity:data?.current.humidity,
            wind_speed:data?.current.wind_degree,
            feels_like:data?.current.feelslike_c,
        }
        const url="http://localhost:3000/weather_history";
        await ApiCall(url, 'post', postData);
        navigate('/home/weather_history');
    }
    if(loading){
        return <h1 className="text-primary">Loading....</h1>
    }
    if(error){
        return <h1 className="text-danger">Opps Error...</h1>
    }
    return (
       
        <div className="bg-img container-fluid">
            <div className="bg-overlay">
            </div>
            <div className="mainDiv">
                <input className="form-control" type="text" ref={inputRef} onKeyDown={handleSearch}/>
                <h1 className="mt-2">{data?.location.name}</h1>
                <div className="d-flex justify-content-center mt-3">
                    <img src={data?.current.condition.icon} alt="img"/>
                    <h2>{data?.current.condition.text}</h2>
                </div>
                <h1 className="mb-4">{data?.current.temp_c}°C</h1>
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column align-items-center">
                        <p>Humidity</p>
                        <h1>{data?.current.humidity}°C</h1>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <p>Wind</p>
                        <h1>{data?.current.wind_degree}°C</h1>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <p>Feels like</p>
                        <h1>{data?.current.feelslike_c}°C</h1>
                    </div>
                </div>
                <div className='d-flex justify-content-center'>
                <button className='btn btn-primary w-100' onClick={handleSave}>Save</button>
                </div>
        </div>
        <div className='d-flex flex-column gap-2'>
        <button className='btn btn-primary ms-4' onClick={historyHandler} style={{zIndex: "1000"}}>History</button>
        <button className='btn btn-primary ms-4' onClick={logoutHandler} style={{zIndex: "1000"}}>Log out</button>
        </div>
        
        </div>
    )

    
}