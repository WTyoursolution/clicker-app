
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

  return (
    <div>
      {employees.map((employee) => (
        <ul key={employee.id}>
        <li>
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
          </ul>
      ))}
    </div>
  )
}
export default Page
