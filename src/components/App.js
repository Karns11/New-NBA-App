import React, { useState } from 'react';
import axios from 'axios';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Table from './Table';
import PlayerInput from './PlayerInput';
import DateInput from './DateInput';
import Search from './Search';
import AvgTable from './AvgTable';
import Header from './Header';
// import Odds from './Odds';

function App() {

  const [stats, setStats] = useState([]);
  const [player, setPlayer] = useState([]);
  const [input, setInput] = useState("");
  const [dateInput, setDateInput] = useState("2023-01-01");
  const [isChecked, setIsChecked] = useState(false);
  const [averages, setAverages] = useState({});


  function handleSearch(event) {
    event.preventDefault();
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${input}`)
    .then(response => {
      setPlayer([response.data.data[0].first_name, response.data.data[0].last_name]);
      const playerId = response.data.data[0].id;
      return axios.get(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${playerId}&seasons[]=2022&per_page=100&start_date=${dateInput}`);
    })
    .then(response => {
      const responseStats = response.data.data;
      setStats(responseStats);
      console.log(response.data.data);
    })
    .catch(err => {
      console.log(err);
    });

    axios.get(`https://www.balldontlie.io/api/v1/players?search=${input}`)
      .then(response => {
          setPlayer([response.data.data[0].first_name, response.data.data[0].last_name]);
          const playerId = response.data.data[0].id;
          return axios.get(`https://www.balldontlie.io/api/v1/season_averages/?player_ids[]=${playerId}`);
      })
      .then(res => {
          const resAvgs = res.data.data[0];
          console.log(resAvgs);
          setAverages(resAvgs); //object
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleDateReset = () => {
    setDateInput("2023-01-01");
  }

  const handleChecked = () => {
    setIsChecked(!isChecked);
  }

  return (
    <div>
      {/* <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/odds" component={Odds} />
        </Routes>
      </BrowserRouter> */}
      <Header />
      <div className='container'>
        <h1 className='text-center pt-3'>{dateInput.substring(0,4)} Season Stats</h1>
        <div className='row text-center my-5'>
          <PlayerInput input={input} setInput={setInput} />
          <DateInput handleDateReset={handleDateReset} dateInput={dateInput} setDateInput={setDateInput} />
          <Search isChecked={isChecked} handleChecked={handleChecked} handleSearch={handleSearch} />
        </div>
        <AvgTable stats={stats} isChecked={isChecked} averages={averages} player={player} />
        <Table player={player} stats={stats} />
      </div>
    </div>

  );
}

export default App;