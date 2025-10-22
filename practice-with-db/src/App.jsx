import { useState, useEffect } from "react";
import supabase from "./utils/supabase.js";

function Page() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function getEmployees() {
      const { data: employees } = await supabase.from("employees").select();

      if (employees.length > 1) {
        setEmployees(employees);
      }
    }

    getEmployees();
  }, []);

  async function addEmployee(firstName, lastName) {
    const newEmployee = {
      first_name: "Bob",
      last_name: "Washington",
    };
    const { data } = await supabase.from("employees").insert(newEmployee);
  }

  function handleAddBob() {
    addEmployee();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    //1. get user data from form
    const firstName =  event.target.elements.firstName.value

    //2. Insert into DB
    const newEmployee = {
      first_name: firstName,
      last_name: lastName,
    }

   await supabase.from('employees').insert(newEmployee)


   //3. Get new fresh data for display
   const result = await supabase
       const { data } = await supabase.from("employees").select();
    if (data.length > 1 ) {
      setEmployees(data)
    }
  }

  return (
    <div>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            Employee: &nbsp;
            {employee.first_name} {employee.last_name}, Date of Hire:{" "}
            {employee.date_of_hire}, Over 21: {employee.over_21.toString()},
            Employee Ranked: {employee.employee_of_the_month}, Age:{" "}
            {employee.age.toString()}, Hobbies: &nbsp;
            {employee.hobbies}
          </li>
        ))}
      </ul>
      <div>
        <form onClick={handleSubmit}>
          <label htmlFor="firstName" id="firstName">First Name</label>
          <input type="text" name="firstName" id="firstName" />
          <label htmlFor="lasttName" id="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" />
          <button type="submit">Add employee</button>
        </form>
      </div>
    </div>
  );
}
export default Page;
