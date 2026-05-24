import React from 'react';
import { LinearProgress, Typography, Box } from '@mui/material';

function BudgetCard({ category = "Uncategorized", spent = 0, limit = 1 }) {

    const safeSpent = Number(spent) || 0;
    const safeLimit = Number(limit) || 1;

    const progress = Math.min((safeSpent / safeLimit) * 100, 100);
    const isOverBudget = safeSpent > safeLimit;

    return (
        <Box sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: '#fff' }}>
            <Typography variant="h6">
                {category}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">
                    ${safeSpent.toLocaleString()} of ${safeLimit.toLocaleString()}
                </Typography>

                <Typography
                    variant="body2"
                    color={isOverBudget ? 'error' : 'textSecondary'}
                >
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