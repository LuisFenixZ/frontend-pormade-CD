import React, { useState } from 'react';

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
    <div className='flex justify-between items-center'>
      <h1 className='text-white text-[20px] text-center font-primary mr-[5%]'>Mês:</h1>
      <select className="w-[50%] h-[40px] text-white text-center font-primary bg-grey3 border-2 border-green2 rounded-[5px] outline-none" id="month" value={selectedMonth} onChange={handleMonthChange}>
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.name}
          </option>
        ))}
      </select>
      <h1 className='text-white text-[20px] text-center font-primary ml-[5%] mr-[3%]'>Ano:</h1>
      <input
        className='w-[30%] h-[40px] text-white text-center font-primary bg-grey3 border-2 border-green2 rounded-[5px] outline-none'
        type="number"
        id="year"
        value={selectedYear}
        onChange={handleYearChange}
      />
    </div>
  );
};

export default Calendario;
