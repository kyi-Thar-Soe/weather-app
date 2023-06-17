import {useRef, useState} from 'react';
import { useNavigate } from 'react-router';
import { ApiCall } from './ApiService/ApiCall';
import { setToken } from '../utils/storage';
export default function AuthForm() {
  const [isLogin,setLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSave =async () => {
    console.log(emailRef.current.value,passwordRef.current.value);
    if (emailRef.current.value && passwordRef.current.value){
      const url = isLogin? "http://localhost:3000/login ": "http://localhost:3000/register ";
    const data = await ApiCall(url, 'post', {
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
      console.log(data)
      setToken(data?.accessToken);
      navigate('/home');
    }
   
  }

    return (
    <div class="container d-flex flex-column align-items-center justify-content-center" style={{marginTop:"100px"}}>
    <div className="row">
        <div className="card">

        
        <div class="card-body">
          <h3 className="mb-3 mt-3">{isLogin? "Log in" : "Sign up"}</h3>
          <form>
            <label>Email</label><br/>
            <input type="email" className="form-control bg-transparent mt-2" ref={emailRef}/><br/>
            <label>Password</label><br/>
            <input type="password" className="form-control bg-transparent mt-2" ref={passwordRef}/>
          </form>
          <button className="btn btn-primary w-100 mt-5" onClick={handleSave}>{isLogin? "Log in" : "Sign up"}</button>
          { isLogin? <p className="text-primary mt-2" onClick={() => setLogin(false)}>Not register yet?</p> :
          <p className="text-primary mt-2" onClick={() => setLogin(true)}>Log in</p>}
        </div>
    </div>
    </div>
    </div>
        )
}