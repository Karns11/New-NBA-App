import React from 'react';

function Search({ handleSearch, isChecked, handleChecked }) {
  return (
    <div>
      <div className='column'>
        <button className='mt-3 btn btn-primary' onClick={handleSearch}>Search for stats!</button>
      </div>
      <div className='column mt-1'>
        <input className='ml-2' type='checkbox' onChange={handleChecked} checked={isChecked} />
        <label>Show Current Season Averages</label>
      </div>
    </div>
  )
}

export default Search
