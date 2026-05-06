import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart'; // Rename import slightly to avoid conflicts
import { Typography } from '@mui/material';

// 1. Existing Bar Chart
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

    if (tx.type?.toLowerCase() === "income") {
      monthlyIncome[month] += Number(tx.amount);
    }
    // Handles both spellings just in case
    if (tx.type?.toLowerCase() === "expence" || tx.type?.toLowerCase() === "expense") {
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

// 2. New custom Wrapper for PieChart
function TransactionPieChart({ transactions = [], settings = {} }) {
  // Compute totals on the fly from the transactions array
  const totalIncome = transactions
    .filter((tx) => tx.type?.toLowerCase() === "income")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const totalExpense = transactions
    .filter((tx) => tx.type?.toLowerCase() === "expence" || tx.type?.toLowerCase() === "expense")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  // Format data strictly matching MUI X PieChart requirements
  const chartData = [
    { id: 0, value: totalIncome, label: 'Income', color: '#2e7d32' },
    { id: 1, value: totalExpense, label: 'Expenses', color: '#d32f2f' },
  ];

  return (
    <MuiPieChart
      series={[{ innerRadius: 50, outerRadius: 100, data: chartData, arcLabel: 'label' }]}
      {...settings}
    />
  );
}

// Export your custom components
export { IncomeChart, TransactionPieChart as PieChart };