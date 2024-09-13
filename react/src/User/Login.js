import axios from "axios";
import { useState } from "react"


const Login = () => {

    const [loginData, setLogindata] = useState({ email: '', password: '' });


    const handleChange = (e) => {
        const { name, value } = e.currentTarget
        setLogindata(prevstate => ({
            ...prevstate, [name]: value
        }))
    }

    const handleSubmit = async () => {
        try {
            console.log('Initiating API call');
            const response = await axios.post(
                `http://localhost:9989/api/User/validate?email=${loginData.email}&password=${loginData.password}`,
                null, // No request body needed since parameters are in the query string
                {
                    headers: {
                        'Content-Type': 'application/json' // Adjust header to match the expected type
                    }
                }
            );
            console.log('API call successful', response);
            debugger
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    


    return (<>
        <form onSubmit={handleSubmit}>

            <li>
                Username: <input name="email" placeholder="Email" onChange={(e) => handleChange(e)} />
            </li>
            <li>
                Password: <input name="password" placeholder="Password" onChange={(e) => handleChange(e)} />
            </li>
            <button type="submit">LOGIN</button>
        </form>
    </>)
}

export default Login;