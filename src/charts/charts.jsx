import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';

function IncomeChart({ transactions = [] }) {

  const xAxisData = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const monthlyIncome = Array(12).fill(0);
  const monthlyExpense = Array(12).fill(0);

  transactions.forEach((tx) => {

    if (!tx.created_at) return;

    const month = new Date(tx.created_at).getMonth();

    if (tx.type?.trim().toLowerCase() === "income") {
      monthlyIncome[month] += Number(tx.amount);
    }

    if (tx.type?.trim().toLowerCase() === "expense") {
      monthlyExpense[month] += Number(tx.amount);
    }

  });

  return (
    <>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Monthly Income Overview
      </Typography>

      <BarChart
        height={300}
        series={[
          { data: monthlyIncome, label: 'Income', color: '#2e7d32' },
          { data: monthlyExpense, label: 'Expense', color: '#d32f2f' },
        ]}
        xAxis={[{ data: xAxisData }]}
      />
    </>
  );
}

function TransactionPieChart({ transactions = [], settings = {} }) {

  console.log(transactions);

  const totalIncome = transactions
    .filter((tx) => tx.type?.trim().toLowerCase() === "income")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const totalExpense = transactions
    .filter((tx) => tx.type?.trim().toLowerCase() === "expense")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const chartData = [
    { id: 0, value: totalIncome, label: 'Income', color: '#2e7d32' },
    { id: 1, value: totalExpense, label: 'Expense', color: '#d32f2f' },
  ];

  console.log(chartData);

  return (
    <MuiPieChart
      series={[
        {
          innerRadius: 40,
          outerRadius: 100,
          data: chartData,
          arcLabel: 'label',
        },
      ]}
      width={300}
      height={300}
      {...settings}
    />
  );
}

export { IncomeChart, TransactionPieChart as PieChart };