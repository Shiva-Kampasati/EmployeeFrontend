import { useState } from 'react';
import { Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import Input from 'rsuite/Input';
import { SuccessAlert } from '../Commons/alerts';
import { AxiosInstance } from '../Commons/AxiosInstance';
// import { FaFacebook, FaGooglePlus, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Login = (props) => {
    const [state, setState] = useState({})
    const onChange = (name, value) => {
        setState({ ...state, [name]: value })
    }
    
    const handleLogin =()=>{
        let axiosInstance = AxiosInstance();
        axiosInstance.post("/login", {email:state.email, password:state.password}).then((res)=>{
            if(res.status ===200){
                debugger
                localStorage.setItem("user_id", 'Logged')
                SuccessAlert("Success", "Logged in successfully", "success", true)
                // nav("/EmployeeList")
                props?.updateLogStatus()
            }
            else{
                SuccessAlert("Success", "Logged in successfully", "error", true)
                
            }
        })
    }
    return <div className='login-bg'>
        <h4 className='login-header'>Login to Your Account</h4> 
        <div className='login-center '>
            <Input placeholder="Username" name='username'onChange={(e) => { onChange('email', e) }} />
            <br />
            <Input placeholder="Password" name='password' onChange={(e) => { onChange('password', e) }}/>
            <Button color="blue" appearance="primary" className='login-btn' onClick={()=>{handleLogin()}}>
            Login
          </Button>
        <div className='justify-content-center'>
            <div className='d-flex'>
                <input type='checkbox'/> 
                <p> &nbsp;Remember me</p>
            </div>
          <a href='/forgotPassword'>Forgot Password?</a>
         
          </div>
          <div className='register-link'>
            Don't have an account ?  
            <a href='/register'> Register here</a>
          </div>
        </div>
    </div>
}
export default Login;