import { useState } from 'react';
import { Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import Input from 'rsuite/Input';
import { AxiosInstance } from '../Commons/AxiosInstance';
import { SuccessAlert } from '../Commons/alerts';
import { useNavigate } from 'react-router-dom';
// import { FaFacebook, FaGooglePlus, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Register = () => {
    const [state, setState] = useState({})
    const onChange = (name, value) => {
        setState({ ...state, [name]: value })
    }
    const nav =useNavigate()
    const handleSubmit = () => {
        let axiosInstance =AxiosInstance();
        debugger
        axiosInstance.post("/Organization", state).then((res)=>{
            if(res.status ===200){
                SuccessAlert("Created!", "successfully created a account", "success", true)
                nav("/")
            }
        })
    }

    return <div className='register-bg'>
        <h4>Create Your Organization Account</h4>
        <div className='login-center register-form '>
            Full Name
            <Input placeholder="FirstName LastName" onChange={(e) => { onChange('name', e) }} />
            <br />
            Email
            <Input placeholder="Email"  onChange={(e) => { onChange('email', e) }} />
            <br />
            Mobile Number
            <Input placeholder="Mobile Number"  onChange={(e) => { onChange('phone',e) }} />
            <br />
            Password
            <Input placeholder="Password"  onChange={(e) => { onChange('password',e) }} />
            <br />
            Confirm Password
            <Input placeholder="Confirm Password"  onChange={(e) => { onChange('cpassword',e) }} />

            <Button color="blue" appearance="primary" className='login-btn' onClick={handleSubmit}>
                Register
            </Button>

            <div className='register-link'>
                Already have an account ?
                <a href='/'> Login here</a>
            </div>
        </div>
    </div>
}
export default Register;