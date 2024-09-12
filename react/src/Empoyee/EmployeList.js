import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../Constants";

const EmployeeList = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const nav = useNavigate();

    useEffect(() => {
        async function fetchData() {
            await axios.get(`${URL}/Employee`)
                .then(res => {
                    setEmployeeList(res.data.result);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log('Error fetching employee data:', error);
                    setIsLoading(false); // In case of an error, still stop the loading state
                })
        }
        fetchData();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:9989/api/Employee?id=${id}`).then(res => {

        })
         .catch(error => {
                console.log('Error delete employee data:', error);
        })
        nav('/EmployeeList')
    }

    return (
        <>
            {!isLoading ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Location</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeList.map(x => (
                            <tr key={x.id}>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>{x.code}</td>
                                <td>{x.location}</td>
                                <td onClick={()=>handleDelete(x.id)}>{x.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                'Loading'
            )}
        </>
    );
}
export default EmployeeList;