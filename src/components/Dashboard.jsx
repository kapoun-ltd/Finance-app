import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faWallet,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';

import Sidebar from './Sidebar';
import './Dasboard.css';

import { fetchTransactions } from "../Api/transaction";
import { IncomeChart, PieChart } from '../charts/charts';

import BudgetModel from '../pages/module';

import { getActiveBudgets } from '../Api/budget';

const userName = "Kapoun";

function Dashboard() {

  const [transactions, setTransactions] = useState([]);

  const [balance, setBalance] = useState(0);

  const [loading, setLoading] = useState(false);

  const [incomeTotal, setIncomeTotal] = useState(0);

  const [expenseTotal, setExpenseTotal] = useState(0);

  const [budgets, setBudgets] = useState([]);

  const settings = {
    margin: { top: 50, bottom: 50 },
    legend: { hidden: true },
    height: 300,
  };

  /* =========================================
     FETCH TRANSACTIONS
  ========================================= */

  useEffect(() => {

    const loadTransactions = async () => {

      setLoading(true);

      const resData =
        await fetchTransactions();

      if (resData) {

        setTransactions(resData);

        const income = resData
          .filter(
            (tx) => tx.type === "Income"
          )
          .reduce(
            (sum, tx) =>
              sum + Number(tx.amount),
            0
          );

        const expense = resData
          .filter(
            (tx) => tx.type === "Expense"
          )
          .reduce(
            (sum, tx) =>
              sum + Number(tx.amount),
            0
          );

        setIncomeTotal(income);

        setExpenseTotal(expense);

        setBalance(income - expense);

      }

      setLoading(false);

    };

    loadTransactions();

  }, []);

  /* =========================================
     FETCH BUDGETS
  ========================================= */

  useEffect(() => {

    const fetchBudgets = async () => {

      const today = new Date()
        .toISOString()
        .split("T")[0];

      const data =
        await getActiveBudgets(today);

      if (data) {
        setBudgets(data);
      }

    };

    fetchBudgets();

  }, []);

  /* =========================================
     GROUP EXPENSES BY CATEGORY
  ========================================= */

  const expenseByCategory = {};

  transactions.forEach((item) => {

    if (item.type === "Expense") {

      const category =
        item.category?.trim();

      expenseByCategory[category] =
        (expenseByCategory[category] || 0)
        + Number(item.amount);

    }

  });

  /* =========================================
     PIE CHART DATA
  ========================================= */

  const budgetChartData = budgets.map(
    (budget, index) => {

      const consumed =
        expenseByCategory[
        budget.category
        ] || 0;

      const colors = [
        '#2e7d32',
        '#d32f2f',
        '#1976d2',
        '#ed6c02',
        '#9c27b0'
      ];

      return {
        id: index,
        value: consumed,
        label: budget.category,
        color: colors[index % colors.length]
      };

    }
  );

  return (

    <div>

      <Sidebar />

      <div className='dashboard-container'>

        <label>
          Welcome, {userName}!
        </label>

        {/* =========================================
            TOP DASHBOARD CARDS
        ========================================= */}

        <div className='main-dashboard'>

          <div className='console'>

            <div className="card-console-accounts">
              <label>Dashboard</label>
            </div>

            <div className="card-console">

              {/* INCOME */}

              <div className="card-console-balance">

                <FontAwesomeIcon
                  icon={faWallet}
                />

                <div>

                  <label>
                    Total Income
                  </label>

                  <div>

                    <label className='income-balance'>
                      Ksh {(incomeTotal || 0)
                        .toLocaleString()}
                    </label>

                  </div>

                </div>

              </div>

              {/* EXPENSE */}

              <div className="card-console-balance-expense">

                <FontAwesomeIcon
                  icon={faWallet}
                />

                <div>

                  <label>
                    Total Expenses
                  </label>

                  <div>

                    <label className='expense-balance'>
                      Ksh {(expenseTotal || 0)
                        .toLocaleString()}
                    </label>

                  </div>

                </div>

              </div>

              {/* BALANCE */}

              <div className="card-console-balance-balance">

                <FontAwesomeIcon
                  icon={faWallet}
                />

                <div>

                  <label>
                    Net Balance
                  </label>

                  <div className="card-console-balance-investment">

                    <FontAwesomeIcon
                      icon={faChartLine}
                    />

                    <label className='net-balance'>
                      Ksh {(balance || 0)
                        .toLocaleString()}
                    </label>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =========================================
            BUDGET SECTION
        ========================================= */}

        <div className='main-budget-container'>

          <div className='budget-container'>

            {/* BUDGET FORM */}

            <div className='budget'>
              <BudgetModel />
            </div>

            {/* BUDGET LIST */}

            <div className="budget-list-container">

              <div className="budget-header">
                <h3>Budget Overview</h3>
              </div>

              <div className="budget-grid">

                {budgets.map((budget) => {

                  const consumed =
                    expenseByCategory[
                    budget.category
                    ] || 0;

                  const remaining =
                    budget.budget_limit -
                    consumed;

                  const percentage =
                    budget.budget_limit > 0
                      ? (
                        consumed /
                        budget.budget_limit
                      ) * 100
                      : 0;

                  return (

                    <div
                      className="budget-card"
                      key={budget.id}
                    >

                      {/* TOP */}

                      <div className="budget-card-top">

                        <h2>
                          {budget.category}
                        </h2>

                        <span>
                          {percentage.toFixed(0)}%
                        </span>

                      </div>

                      {/* MONEY */}

                      <div className="budget-money">

                        <div>

                          <label>
                            Total
                          </label>

                          <h3>
                            Ksh {budget.budget_limit
                              .toLocaleString()}
                          </h3>

                        </div>

                        <div>

                          <label>
                            Used
                          </label>

                          <h3>
                            Ksh {consumed
                              .toLocaleString()}
                          </h3>

                        </div>

                        <div>

                          <label>
                            Left
                          </label>

                          <h3>
                            Ksh {remaining
                              .toLocaleString()}
                          </h3>

                        </div>

                      </div>

                      {/* PROGRESS BAR */}

                      <div className="progress-bar">

                        <div
                          className="progress"
                          style={{

                            width:
                              `${Math.min(
                                percentage,
                                100
                              )}%`,

                            background:
                              percentage > 80
                                ? "#dc2626"
                                : "#2563eb"

                          }}
                        />

                      </div>

                    </div>

                  );

                })}

              </div>

            </div>

          </div>

        </div>

        {/* =========================================
            CHARTS
        ========================================= */}

        <div className="card-console-other-container">

          <div className="card-console-other">

            <IncomeChart
              transactions={transactions}
            />

          </div>

          <div className="card-console-other-pending">

            <label>
              Budget Breakdown
            </label>

            <PieChart
              data={budgetChartData}
              settings={settings}
            />

          </div>

        </div>

        {/* =========================================
            TRANSACTIONS
        ========================================= */}

        <div className="card-console-transaction-listing">

          <h1 className='transaction-listing-title'>
            Transaction Listing
          </h1>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;