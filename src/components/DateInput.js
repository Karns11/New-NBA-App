import React from 'react';
import './DateInput.css';

function DateInput({ dateInput, setDateInput, handleDateReset }) {
  return (
    <div className='column'>
      <div className="input-group px-5 mb-0">
        <span className="input-group-text" >Start Date</span>
        <input type="text" className="form-control" value={dateInput} onChange={(e) => setDateInput(e.target.value)} placeholder='YYYY-MM-DD' />
        <button onClick={handleDateReset} className='ml-2 btn btn-danger'>Reset</button>
      </div>
    </div>
  )
}

export default DateInput
