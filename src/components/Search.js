import React from 'react';

function Search({ handleSearch, isChecked, handleChecked }) {
  return (
    <div>
      <div className='column'>
        <button className='mt-3 btn btn-primary' onClick={handleSearch}>Search for stats!</button>
      </div>
      <div className='column'>
        <input className='ml-2' type='checkbox' onClick={handleChecked} checked={isChecked} />
        <label>Show Season Averages</label>
      </div>
    </div>
  )
}

export default Search
