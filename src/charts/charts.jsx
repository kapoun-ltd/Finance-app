import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';

function IncomeChart({ transactions = [] }) {
  const xAxisData = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const monthlyIncome = Array(12).fill(0);
  const monthlyExpense = Array(12).fill(0);

  transactions.forEach((tx) => {
    if (!tx.created_at) return; // safety guard

    const month = new Date(tx.created_at).getMonth();

    if (tx.type?.toLowerCase() === "income") {
      monthlyIncome[month] += Number(tx.amount);
    }

    if (tx.type?.toLowerCase() === "expense") {
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
          { data: monthlyIncome, label: 'Income' },
          { data: monthlyExpense, label: 'Expense' },
        ]}
        xAxis={[{ data: xAxisData }]}
      />
    </>
  );
}

export default IncomeChart;