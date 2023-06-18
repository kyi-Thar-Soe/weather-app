import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ApiCall } from "./ApiService/ApiCall";
export default function WeatherHistory() {
    const [data,setData] = useState(null);
    const navigate = useNavigate();
    const url = "https://weather-app-auth.onrender.com/weather_history";
    async function getUser() {
        {/*const response=await fetch(`http://localhost:3000/weather_history`);
        const result =await response.json();
        console.log(result);
    setUser(result);*/}
    const tempData = await ApiCall(url, 'get');
    setData(tempData);
    console.log("tempData is:",tempData)
    }
    useEffect(() => {
        getUser()
    },[]);
    const handleUpdate = async (id,row) => {
        await ApiCall(`${url}/${id}`,'put',{...row,name: "Yangon"});
        getUser();
    }
    const handleDelete = async (id) => {
        await ApiCall(`${url}/${id}`,'delete');
        getUser();
    }
    return (
        <div style={{zIndex: "1000"}}>
            <button className="btn btn-success mb-2" onClick={() => navigate(-1)}>Back</button>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
                {data?.map((row,index) => {
                return (
                    
                    <div className="card"  key={index} style={{backgroundColor: "transparent",width: "300px"}}>
                    <div className="card-body">
                        <h5>Date - {row?.date}</h5>
                        <h5>Name - {row?.name}</h5>
                        <h5>Weather - {row?.weather}</h5>
                        <h5>Temprature - {row?.temp}</h5>
                        <h5>Humidity - {row?.humidity}</h5>
                        <h5>Wind_Speed - {row?.wind_speed}</h5>
                        <h5>Feels_like - {row?.feels_like}</h5>
                    </div>
                    <div className="card-footer"> 
                    <button className="btn btn-warning me-3" onClick={()=>handleUpdate(row?.id,row)}>Update</button>
                    <button className="btn btn-danger" onClick={()=>handleDelete(row?.id)}>Delete</button>
                    </div>
                </div>
                
                )
            })}
        </div>
        </div>
    )
}