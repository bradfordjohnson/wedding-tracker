import React, {useState, useEffect} from 'react'
import api from './helpers/api'
import CategoryForm from './components/CategoryForm';
import SubcategoryForm from './components/SubcategoryForm';
import SavingsBucketForm from './components/SavingsBucketForm';

function App() {
  const VERSION_NUMBER = '1.0.0';

  const [expenses, setExpenses] = useState ([]);

  const [formData, setFormData] = useState({
    version: VERSION_NUMBER,
    category: '',
    subcategory: '',
    name: '',
    date_due: '',
    cost: 0,
    amount_paid_to_date: 0,
    amount_saved_to_date: 0,
    savings_bucket: '',
    amount_expected: 0,
    reciepts: ''
  });


  const fetchExpenses = async () => {
    const response = await api.get('/expenses/');
    setExpenses(response.data)
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/upload/expense', formData);
    fetchExpenses();
    setFormData({
    version: VERSION_NUMBER,
    category: '',
    subcategory: '',
    name: '',
    date_due: '',
    cost: 0,
    amount_paid_to_date: 0,
    amount_saved_to_date: 0,
    savings_bucket: '',
    amount_expected: 0,
    reciepts: ''
    });
  };

  return (
    <div className="App">
      
      <div className='container'>
      <form onSubmit={handleFormSubmit}>
        
      <div className='form-floating mb-3'>
          <CategoryForm formData={formData} handleInputChange={handleInputChange} />
          <label for="floatingInput">Category</label>
          </div>

        <div className='form-floating mb-3'>
          <SubcategoryForm formData={formData} handleInputChange={handleInputChange} />
          <label for="floatingInput">Subcategory</label>
        </div>

        <div className='form-floating mb-3'>
        <input type='text' className='form-control' id='name' name='name' onChange={handleInputChange} value={formData.name}/>
        <label for="floatingInput">Name</label>
        </div>

        <div className='form-floating mb-3'>
          <input type='text' className='form-control' id='date_due' name='date_due' onChange={handleInputChange} value={formData.date_due}/>
          <label for="floatingInput">Date due</label>
        </div>

        <div className='form-floating mb-3'>
          <input type='text' className='form-control' id='cost' name='cost' onChange={handleInputChange} value={formData.cost}/>
          <label for="floatingInput">Cost</label>
        </div>

        <div className='form-floating mb-3'>
          <input type='text' className='form-control' id='amount_paid_to_date' name='amount_paid_to_date' onChange={handleInputChange} value={formData.amount_paid_to_date}/>
          <label for="floatingInput">Amount paid to date</label>
        </div>

        <div className='form-floating mb-3'>
          <input type='text' className='form-control' id='amount_saved_to_date' name='amount_saved_to_date' onChange={handleInputChange} value={formData.amount_saved_to_date}/>
          <label for="floatingInput">Amount saved to date</label>
        </div>

        <div className='form-floating mb-3'>
          <SavingsBucketForm formData={formData} handleInputChange={handleInputChange} />
          <label for="floatingInput">Savings bucket</label>
        </div>

        <div className='form-floating mb-3'>
          <input type='text' className='form-control' id='amount_expected' name='amount_expected' onChange={handleInputChange} value={formData.amount_expected}/>
          <label for="floatingInput">Amount expected</label>
        </div>

        <div className='form-floating mb-3'>
          <input type='text' className='form-control' id='reciepts' name='reciepts' onChange={handleInputChange} value={formData.reciepts}/>
          <label for="floatingInput">Reciepts</label>
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
      <br></br>
      <table className='table table-striped table-bordered table-hover'>
        <thead>
          <tr>
          <th>category</th>
          <th>subcategory</th>
          <th>name</th>
          <th>date_due</th>
          <th>cost</th>
          <th>amount_paid_to_date</th>
          <th>amount_saved_to_date</th>
          <th>savings_bucket</th>
          <th>amount_expected</th>
          <th>reciepts</th>
        </tr>
        </thead>
        <tbody>
          {expenses.map((expense) =>(
            <tr key={expense.id}>
              <td>{expense.category}</td>
              <td>{expense.subcategory}</td>
              <td>{expense.name}</td>
              <td>{expense.date_due}</td>
              <td>{expense.cost}</td>
              <td>{expense.amount_paid_to_date}</td>
              <td>{expense.amount_saved_to_date}</td>
              <td>{expense.savings_bucket}</td>
              <td>{expense.amount_expected}</td>
              <td>{expense.reciepts}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

    </div>
  );
}

export default App;
