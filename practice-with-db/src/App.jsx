
import { useState, useEffect } from 'react'
import  supabase  from './utils/supabase.js'

function Page() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    async function getEmployees() {
      const { data: employees } = await supabase.from('employees').select()

      if (employees.length > 1) {
        setEmployees(employees)
      }
    }

    getEmployees()
  }, [])

async function addEmployee(firstName, lastName) {
  const newEmployee = {
    "first_name": "Bob",
   "last_name": "Washington",
   "employee_of_the_month": 3,
   "date_of_hire": "2025-10-13"
  }
      const { data } = await supabase.from('employees').insert(newEmployee)
}

function handleAddBob() {
  addEmployee();
}

  return (
    <div>
        <ul >
      {employees.map((employee) => (
      
        <li key={employee.id}>
          Employee: &nbsp;
          {employee.first_name} 
         {" "}
          {employee.last_name},
          Date of Hire: {" "}
          {employee.date_of_hire},
        Over 21: {" "}
        {employee.over_21.toString()},
        Employee Ranked: {" "}
        {employee.employee_of_the_month},
        Age: {" "}
        {employee.age.toString()}, 
        Hobbies: &nbsp;
        {employee.hobbies}
          
          </li>
         
      ))}
       </ul>
       <div>
        <button onClick={handleAddBob}>add</button>
       </div>
    </div>
  )
}
export default Page
