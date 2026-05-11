import React from 'react';
import { useState } from 'react';
import { addBudget } from '../Api/budget';
import { LinearProgress, Typography, Box } from '@mui/material';

function BudgetCard() {
    const [budgetData, setbudgetId] = useState({

        category,
        budget_limit,
        start_date,
        end_date,
        user_id
    });

    const progress = (spent / limit) * 100;
    const isOverBudget = spent > limit;

    const handlechange = (e) => {
        const { name, value } = e.target;
        setbudgetId((prevdata) => {
            return {
                ...prevdata,
                [name]: value
            }
        })

    }

    return (
        <Box sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: '#f9f9f9' }}>
            <Typography variant="h6">{category}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">
                    ${spent.toLocaleString()} of ${limit.toLocaleString()}
                </Typography>
                <Typography variant="body2" color={isOverBudget ? 'error' : 'textSecondary'}>
                    {Math.round(progress)}%
                </Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={progress > 100 ? 100 : progress}
                color={isOverBudget ? 'error' : 'primary'}
                sx={{ height: 10, borderRadius: 5 }}
            />
        </Box>
    );
}

export default BudgetCard;