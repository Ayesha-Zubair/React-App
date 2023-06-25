import React, { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users?page=2');
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.first_name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchText}
        onChange={handleSearch}
      />
      <ul className="list-view"> 
        {filteredEmployees.map(employee => (
          <li key={employee.id} className="list-item"> 
            <p className='list-id'>{employee.id}</p>
            <img src={employee.avatar} alt={employee.first_name} className="avatar" /> 
            <span>{employee.first_name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App