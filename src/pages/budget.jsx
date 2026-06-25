import React, { useState, useEffect, useMemo } from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';
import { addBudget , getActiveBudget } from '../Api/budget';
import { calculateBudgetRemaining } from '../utils/budgetfunction';
import { checkBudgetStatus } from '../utils/budgetchecker';
import './budget.css';
import BudgetModel from './module';
import { fetchTransactions , deletetransaction } from "../Api/transaction";
import transactions from './transactions'

export function BudgetCard({ category = "Uncategorized", spent = 0, limit = 1 }) {
    const safeSpent = Number(spent) || 0;
    const safeLimit = Number(limit) || 1;
    const progress = Math.min((safeSpent / safeLimit) * 100, 100);
    const isOverBudget = safeSpent > safeLimit;

    return (
        <Box sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: '#fff' }}>
            <Typography variant="h6">{category}</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">
                    ${safeSpent.toLocaleString()} of ${safeLimit.toLocaleString()}
                </Typography>

                <Typography variant="body2" color={isOverBudget ? 'error' : 'textSecondary'}>
                    {Math.round(progress)}%
                </Typography>
            </Box>

            <LinearProgress
                variant="determinate"
                value={progress}
                color={isOverBudget ? 'error' : 'primary'}
                sx={{ height: 10, borderRadius: 5 }}
            />
        </Box>
    );
}

export default function Budget() {

const [budget, setBudget] = useState([]);
const [transactions , setTransactions] = useState([]);

      /* =========================================
         FETCH BUDGETS
      ========================================= */
      useEffect(() => {
        const fetchBudgetData = async () => {
          const today = new Date().toISOString().split("T")[0];
          const data = await getActiveBudget(today);
          if (data) {
            setBudget(data);
          }
        };
        fetchBudgetData();
      }, []);
const expenseByCategory = useMemo(() => {
          const mapping = {};
          transactions.forEach((item) => {
            if (item.type === "Expense") {
              const category = item.category?.trim();
              mapping[category] = (mapping[category] || 0) + Number(item.amount);
            }
          });
          return mapping;
        }, [transactions]);
      
        // Calculate the consumed per category
        const consumedByCategory = useMemo(() => {
          const mapping = {};
      
          transactions.forEach((item) => {
            const category = item.category;
            const amount = Number(item.amount);
      
            mapping[category] = (mapping[category] || 0) + amount;
          });
      
          return mapping;
        }, [transactions]);
    
    return (
        <div className='main-budget-container'>
            <div className="budget-list-container">
                <div className="budget-header">
                    <h3>Budget Overview</h3>
                    <BudgetModel />
                </div>

                <div className="budget-grid">
                    {budget.map((b) => {
                        const consumed = expenseByCategory[b.category] || 0;
                        const remaining = b.budget_limit - consumed;
                        const percentage = b.budget_limit > 0 ? (consumed / b.budget_limit) * 100 : 0;
                        const isOverBudget = remaining < 0;

                        return (
                            <div key={b.id || b.category} className="budget-card">
                                <h3>{b.category}</h3>

                                <div className="budget-stats">
                                    <p>Limit: <strong>Ksh {Number(b.budget_limit).toLocaleString()}</strong></p>
                                    <p>Spent: <span className="spent-amt">Ksh {consumed.toLocaleString()}</span></p>
                                    <p>
                                        Remaining:
                                        <strong style={{ color: isOverBudget ? '#787474' : '#2e7d32' }}>
                                            Ksh {remaining.toLocaleString()}
                                        </strong>
                                    </p>
                                </div>

                                <div className="progress-container" style={{ background: '#eee', height: '10px', borderRadius: '5px', marginTop: '10px' }}>
                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: `${Math.min(percentage, 100)}%`,
                                            backgroundColor: percentage > 90 ? '#d32f2f' : '#2e7d32',
                                            height: '100%',
                                            borderRadius: '5px',
                                            transition: 'width 0.3s ease'
                                        }}
                                    />
                                </div>
                                <small>{percentage.toFixed(0)}% of budget used</small>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
