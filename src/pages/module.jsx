import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import "./module.css"; // Ensure this file exists in the same folder!
import { addBudget } from "../Api/budget";

function BudgetModel({ onAddBudget }) {
    const [category, setCategory] = useState("");
    const [limit, setLimit] = useState("");
    const [month, setMonth] = useState("");
    const [budgetdata, setbudgetdata] = useState({
        category: "",
        limit: 0,
        spent: 0,
        month: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        // Safety check: Don't submit if empty
        if (!category || !limit) return;

        const newBudget = {
            category,
            limit: Number(limit),
            amount: 0, // Changed from spent: 0
            month: month.slice(0, 7),
        };

        console.log("Submitting Budget:", newBudget);
        addBudget(newBudget);
        setbudgetdata(newBudget)

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

                    <TextField
                        label="Start Month"
                        variant="outlined"
                        type="date"
                        fullWidth
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    />

                    <TextField
                        label="End Month"
                        variant="outlined"
                        type="date"
                        fullWidth
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
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