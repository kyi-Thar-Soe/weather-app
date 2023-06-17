import {BrowserRouter,Routes,Route} from 'react-router-dom';
import WeatherHome from './WeatherHome';
import WeatherHistory from './WeatherHistory';
import DefaultLayout from './DefaultLayout';
import AuthForm from './AuthForm';
export default function Weather() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<AuthForm/>}/>
            <Route path="/home" element={<DefaultLayout/>}>
            <Route index element={<WeatherHome/>}/>
            <Route path="weather_history" element={<WeatherHistory/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}