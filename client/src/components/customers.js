import React,{useState} from 'react';
import './customers.css';
 
const Customers = (()=>{
  const [customers, setcustomers] = useState([]);
  return (
      <div>
        <h2>Customers</h2>
        <ul>
        {customers.map(customer => 
          <li key={customer.id}>{customer.firstName} {customer.lastName}</li>
        )}
        </ul>
      </div>
  )
})


export default Customers;
