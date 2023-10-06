import React, { useState } from 'react';
import "./calendario.css"

const Calendario = ({ onChange }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    { value: 1, name: 'Janeiro' },
    { value: 2, name: 'Fevereiro' },
    { value: 3, name: 'Março' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Maio' },
    { value: 6, name: 'Junho' },
    { value: 7, name: 'Julho' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Setembro' },
    { value: 10, name: 'Outubro' },
    { value: 11, name: 'Novembro' },
    { value: 12, name: 'Dezembro' },
  ];

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    setSelectedMonth(newMonth);
    onChange(newMonth, selectedYear); 
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setSelectedYear(newYear);
    onChange(selectedMonth, newYear); 
  };


  return (
    <div className='align_calendar'>
      <h1 className='h1_calendar'>Mês:</h1>
      <select className="month" id="month" value={selectedMonth} onChange={handleMonthChange}>
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.name}
          </option>
        ))}
      </select>
      <h1 className='h1_year'>Ano:</h1>
      <input
        className='yyear'
        type="number"
        id="year"
        value={selectedYear}
        onChange={handleYearChange}
      />
    </div>
  );
};

export default Calendario;
