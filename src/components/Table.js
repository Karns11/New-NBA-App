import React from 'react';
import './Table.css';

function StatsTable({ stats, player, teams }) {
  return (
    <div id='Stats-table'>
      <div className='text-center'>
        {player.length===2 && <h2 className='mt-5'>Showing results for <i>{player[0] + " " + player[1]}</i></h2>}
      </div>
      <div className='mx-auto table-div mb-5'>
        <table className='table mx-auto'>
            <thead className='table-dark'>
              <tr style={{position: 'sticky', top: '0', backgroundColor: '#fff'}}>
                <th scope='col'>Date</th>
                <th scope='col'>MINS</th>
                <th scope='col'>OPP Team</th>
                <th scope='col'>FGA</th>
                <th scope='col'>FG3A</th>
                <th scope='col'>FG3M</th>
                <th scope='col'>BLK</th>
                <th scope='col'>PTS</th>
                <th scope='col'>AST</th>
                <th scope='col'>REB</th>
              </tr>
            </thead>
            <tbody>
            {stats.sort((a, b) => (a.game.date > b.game.date) ? -1 : 1).map((stat, ind) => {
                const team = teams.find((team) => team.id === stat.player.team_id);
                const opposingTeam = (stat.game.home_team_id === team.id) ? teams.find((team) => team.id === stat.game.visitor_team_id) : teams.find((team) => team.id === stat.game.home_team_id);
            return (
                    <tr key={ind}>
                    <th scope='row'>{stat.game.date.substring(0, 10)}</th>
                    <td>{stat.min}</td>
                    <td>{opposingTeam.full_name}</td>
                    <td className={`fw-bold ${stat.fga >= 20 ? "text-success" : stat.fga >= 10 && stat.fga <= 19 ? "text-warning" : "text-danger"}`}>{stat.fga}</td>
                    <td className={`fw-bold ${stat.fg3a >= 5 ? "text-success" : stat.fg3a >= 1 && stat.fg3a <= 4 ? "text-warning" : "text-danger"}`}>{stat.fg3a}</td>
                    <td className={`fw-bold ${stat.fg3m >= 3 ? "text-success" : stat.fg3m >= 1 && stat.fg3m <= 2 ? "text-warning" : "text-danger"}`}>{stat.fg3m}</td>
                    <td className={`fw-bold ${stat.blk >= 3 ? "text-success" : stat.blk >= 1 && stat.blk <= 2 ? "text-warning" : "text-danger"}`}>{stat.blk}</td>
                    <td className={`fw-bold ${stat.pts >= 20 ? "text-success" : stat.pts >= 10 && stat.pts <= 19 ? "text-warning" : "text-danger"}`}>{stat.pts}</td>
                    <td className={`fw-bold ${stat.ast > 6 ? "text-success" : stat.ast >= 5 && stat.ast <= 7 ? "text-warning" : "text-danger"}`}>{stat.ast}</td>
                    <td className={`fw-bold ${stat.reb >= 6 ? "text-success" : stat.reb >= 5 && stat.reb <= 5 ? "text-warning" : "text-danger"}`}>{stat.reb}</td>
                    </tr>
                )
            })
            }
            </tbody>
          </table>
        </div>
    </div>
    
  )
}

export default StatsTable;
