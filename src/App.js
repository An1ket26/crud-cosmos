import { useState,useEffect } from 'react'
import './App.css'

function App() {
    const [employee, setEmployee] = useState([]);
    const [insert,setInsert]=useState(false);
    const [updateId,setUpdateId]=useState("");
    const [name,setName]=useState("");
    const [desg,setDesg]=useState("");
    const getEmployee = async () => {
      const res = await fetch("http://localhost:5000/getemp");
      const data = await res.json();
      console.log(data);
      setEmployee(data);
    }
    useEffect(() => {
        getEmployee();
    }, [])

    const insertEmp=()=>{
      var data={name,desg};
      var res = fetch("http://localhost:5000/addemp",{
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(()=>{
        getEmployee();
      })
      

      setInsert(false);
    }

    const deleteEmp=(id)=>{
      var res = fetch("http://localhost:5000/deleteemp",{
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({id}),
      }).then(()=>{
        getEmployee();
      })
       
    }

    const updateEmp=(id)=>{
      const data={id,name,desg};
      var res = fetch("http://localhost:5000/updateemp",{
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(()=>{
        setUpdateId("");
        getEmployee();
      })
    }

  return (
    <>
          <div>
              {employee.map((emp,ind) => {
                  return ( emp._id===updateId?(<div><h2>Employee Details {ind+1}:</h2>
                  <lable>Enter Name : </lable>
                  <input type="text" id="nameinp" onChange={(e)=>{setName(e.target.value)}} value={name}/><br/>
                  <lable>Enter Designation : </lable>
                  <input type="text" id="desginp" onChange={(e)=>{setDesg(e.target.value)}} value={desg}/>
                  <button onClick={()=>updateEmp(emp._id)}>Update</button>
                  </div>):( <div><h2>Employee Details {ind+1}:</h2>
                  <p>Employee Id : {emp._id}</p>
                  <p>Employee Name : {emp.name}</p>
                  <p>Employee Designation : {emp.designation}</p>
                  <button onClick={()=>{setUpdateId(emp._id);setName(emp.name);setDesg(emp.designation)}}>Update</button>
                  <button onClick={()=>deleteEmp(emp._id)}>Delete</button>
                  </div>)
                  );
              }) }
          </div>
          <div>
            
            {insert && <div>
              <lable>Enter Name : </lable>
              <input id="nameinp" onChange={(e)=>{setName(e.target.value)}}/><br/>
              <lable>Enter Designation : </lable>
              <input id="desginp" onChange={(e)=>{setDesg(e.target.value)}}/>
              </div>}

              {insert?<button onClick={insertEmp}>Add</button>:<button onClick={()=>{setInsert(true)}}>Insert</button>}
          </div>
    </>
  )
}

export default App