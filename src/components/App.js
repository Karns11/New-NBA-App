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

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const [stats, setStats] = useState([]);
  const [player, setPlayer] = useState([]);
  const [input, setInput] = useState("");
  const [StartDateInput, setStartDateInput] = useState("2023-01-01");
  const [endDateInput, setEndDateInput] = useState(formattedDate);
  const [isChecked, setIsChecked] = useState(false);
  const [averages, setAverages] = useState({});
  const [teams, setTeams] = useState([]);


  function handleSearch(event) {
    event.preventDefault();
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${input}`)
    .then(response => {
      setPlayer([response.data.data[0].first_name, response.data.data[0].last_name]);
      const playerId = response.data.data[0].id;
      return axios.get(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${playerId}&seasons[]=2022&per_page=100&start_date=${StartDateInput}&end_date=${endDateInput}`);
    })
    .then(response => {
      const responseStats = response.data.data;
      setStats(responseStats);
      // console.log(response.data.data);
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
          // console.log(resAvgs);
          setAverages(resAvgs); //object
      })
      .catch(err => {
        console.log(err);
      });

      axios.get('https://www.balldontlie.io/api/v1/teams')
      .then(response => {
        setTeams(response.data.data); //array of objects
        console.log(response.data.data);
      })
      .catch(err => {
        console.log(err);
      })
  };



  const handleStartDateReset = () => {
    setStartDateInput("2023-01-01");
  }

  const handleEndDateReset = () => {
    setEndDateInput(formattedDate);
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
        <h1 className='text-center pt-3'>{StartDateInput.substring(0,4)} Season Stats</h1>
        <div className='row text-center my-5'>
          <PlayerInput input={input} setInput={setInput} />
          <DateInput handleEndDateReset={handleEndDateReset} endDateInput={endDateInput} setEndDateInput={setEndDateInput} handleStartDateReset={handleStartDateReset} StartDateInput={StartDateInput} setStartDateInput={setStartDateInput} />
          <Search isChecked={isChecked} handleChecked={handleChecked} handleSearch={handleSearch} />
        </div>
        <AvgTable stats={stats} isChecked={isChecked} averages={averages} player={player} />
        <Table teams={teams} player={player} stats={stats} />
      </div>
    </div>

  );
}

export default App;
