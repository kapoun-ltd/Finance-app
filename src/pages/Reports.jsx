import React from 'react';
import './Reports.css'


function Reports() {
  return (
    <div className='repo-container'>
      <h2>Reports Page</h2>
      <p>This is where you can view your financial reports.</p>
      <div>
        <Sidebar />
      </div>
      <div>
        <Chart />
      </div>
    </div>


  );
}


export default Reports;