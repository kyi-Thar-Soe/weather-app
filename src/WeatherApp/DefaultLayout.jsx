import {Outlet, useNavigate} from 'react-router';
import "./Weather.css"
import { useEffect } from 'react';
import { getToken } from '../utils/storage';
export default function DefaultLayout() {
    const navigate = useNavigate();
    const check = async () => {
        const token =await getToken();
        if(!token){
           navigate('/');
        }
    }
    useEffect(() => {
        check()
    },[])
    return (
        <div className="bg-img container-fluid">
            <div className="bg-overlay">
            </div>
            <Outlet/>
        </div>
    )
}