import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import axios from "axios";
import { useCallback, useEffect, useState } from "react";


const EmployeeList = () => {
    const apiUrl = process.env.REACT_APP_URL;  // Ensure this is REACT_APP_DOTNET_URL
    const [employeeList, setEmployeeList] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [colDefs] = useState([
        { field: "id",flex:1, filter:true  },
        { field: "name",flex:1, filter:true },
        { field: "location",flex:1, filter:true },
        { field: "code",flex:1, filter:true },
        { field: "delete", cellRenderer:(params)=>{return <FontAwesomeIcon icon={faTrash} onClick={()=>{handleDelete(params?.data?.id)}}/>} },
      ]);
       const fetchData=useCallback(async()=> {
        setIsLoading(true)

        await axios.get(`${apiUrl}/Employee`)
            .then(res => {
                setEmployeeList(res.data.result);
                setIsLoading(false);
            })
            .catch(error => {
                console.log('Error fetching employee data:', error);
                setIsLoading(false); // In case of an error, still stop the loading state
            })
    },[apiUrl])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = (id) => {
        axios.delete(`${apiUrl}/Employee?id=${id}`).then(res => {
            if(res.status === 200){
                fetchData();
            }
        })
         .catch(error => {
                console.log('Error delete employee data:', error);
        })
        // nav('/EmployeeList')
    }

    return (
        <>
            {!isLoading ? (
                <div
                className="ag-theme-quartz" // applying the Data Grid theme
                style={{ height: 500 }} // the Data Grid will fill the size of the parent container
               >
                 <AgGridReact
                     rowData={employeeList}
                     columnDefs={colDefs}
                 />
               </div>
                // <table>
                //     <thead>
                //         <tr>
                //             <th>ID</th>
                //             <th>Name</th>
                //             <th>Code</th>
                //             <th>Location</th>
                //             <th>Delete</th>
                //         </tr>
                //     </thead>
                //     <tbody>
                //         {employeeList.map(x => (
                //             <tr key={x.id}>
                //                 <td>{x.id}</td>
                //                 <td>{x.name}</td>
                //                 <td>{x.code}</td>
                //                 <td>{x.location}</td>
                //                 <td onClick={()=>handleDelete(x.id)}>{x.id}</td>
                //             </tr>
                //         ))}
                //     </tbody>
                // </table>
            ) : (
                'Loading'
            )}
        </>
    );
}
export default EmployeeList;