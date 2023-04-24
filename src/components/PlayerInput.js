import React from 'react';
import './PlayerInput.css';

function PlayerInput({ input, setInput }) {
  return (
    <div className='column my-2'>
      <div className='input-group px-5 mb-1'>
        <span className='input-group-text'>Player</span>
        <input type='text' className='form-control' value={input} onChange={(e) => setInput(e.target.value)} placeholder='Lebron James' />
        <button onClick={() => setInput("")} className='ml-2 btn btn-danger'>Clear</button>
      </div>
    </div>
  )
}

export default PlayerInput
