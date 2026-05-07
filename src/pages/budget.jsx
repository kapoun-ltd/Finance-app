import React from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';

function BudgetCard({ category, limit, spent }) {
    const progress = (spent / limit) * 100;
    const isOverBudget = spent > limit;

    return (
        <Box sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: '#f9f9f9' }}>
            <Typography variant="h6">{category}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">
                    {/* ${spent.toLocaleString()} of ${limit.toLocaleString()} */}
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