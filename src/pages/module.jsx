import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import "./module.css"; // Ensure this file exists in the same folder!
import { addBudget } from "../Api/budget";

function BudgetModel({ onAddBudget }) {
    const [category, setCategory] = useState("");
    const [limit, setLimit] = useState("");
    const [start_month, setstart_month] = useState("");
    const [end_month, setend_month] = useState("");
    const [amount, setAmount] = useState("");
    const [budgetdata, setbudgetdata] = useState({
        category: "",
        limit: 0,
        spent: 0,
        amount: 0,
        start_month: "",
        end_month: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category || !limit) return;

        const newBudget = {
            category,
            limit: Number(limit),
            amount: 0,
            start_month,
            end_month
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
                        label="amount"
                        variant="outlined"
                        type="number"
                        fullWidth
                        placeholder="Max Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <TextField
                        label=""
                        variant="outlined"
                        type="date"
                        fullWidth
                        // We convert slashes back to dashes so the input can read it
                        value={start_month.replace(/\//g, '-')}
                        onChange={(e) => {
                            const dateValue = e.target.value; // This comes as YYYY-MM-DD
                            const formattedDate = dateValue.replace(/-/g, '/');
                            setstart_month(formattedDate);
                        }}
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label=""
                        variant="outlined"
                        type="date"
                        fullWidth
                        value={end_month.replace(/\//g, '-')}
                        onChange={(e) => {
                            const dateValue = e.target.value; // This comes as YYYY-MM-DD
                            const formattedDate = dateValue.replace(/-/g, '/');
                            setend_month(formattedDate);
                        }}
                        InputLabelProps={{ shrink: true }}
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