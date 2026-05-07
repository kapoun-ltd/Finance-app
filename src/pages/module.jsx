import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import "./module.css"; // Ensure this file exists in the same folder!

function BudgetModel({ onAddBudget }) {
    const [category, setCategory] = useState("");
    const [limit, setLimit] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Safety check: Don't submit if empty
        if (!category || !limit) return;

        const newBudget = {
            category,
            limit_amount: Number(limit),
            spent_amount: 0, // Usually starts at 0
            month: new Date().toISOString().slice(0, 7), // e.g., "2023-10"
        };

        console.log("Submitting Budget:", newBudget);
        // onAddBudget(newBudget); // You will connect this to your Supabase function later

        // Clear form
        setCategory("");
        setLimit("");
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        p: 4,
        borderRadius: '16px',
        outline: 'none'
    };

    return (
        <Box className="budget-form-container">
            <Typography variant="h6" gutterBottom>
                Set Monthly Budget
            </Typography>

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Budget Category"
                        variant="outlined"
                        fullWidth
                        placeholder="e.g., Food, Rent"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <TextField
                        label="Budget Limit"
                        variant="outlined"
                        type="number"
                        fullWidth
                        placeholder="Max Amount"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Add Budget Goal
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}

export default BudgetModel;