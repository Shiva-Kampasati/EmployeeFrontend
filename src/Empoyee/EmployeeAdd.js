import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const EmployeeAdd = () => {
    const [employeeAdd, setEmployeeAdd] = useState({ name: '', code: '', location: '', roleId: 0 })
    const nav = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setEmployeeAdd(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        await axios.post('http://localhost:9989/api/Employee', employeeAdd, {
            headers: {
                'Content-Type': 'multipart/form-data' // Ensure the correct header for form data
            }
        });
        nav('/EmployeeList')
    };


    return (<>
        <form onSubmit={handleSubmit} placeholder="dd">
            Name : <input placeholder="Name" name="name" onChange={handleChange} />
            Code : <input placeholder="Code" name="code" onChange={handleChange} />
            Location : <input placeholder="Location" name="location" onChange={handleChange} />
            RoleId : <input placeholder="RoleId" name="roleId" onChange={handleChange} />
            <button value={"Submitt"}>Submit</button>
        </form>
    </>)
}

export default EmployeeAdd;