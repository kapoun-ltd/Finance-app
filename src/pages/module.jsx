import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Modal
} from "@mui/material";

import "./module.css";
import { addBudget, updateBudget } from "../Api/budget";

function BudgetModel() {

    // MODAL STATE
    const [open, setOpen] = useState(false);

    // FORM STATES
    const [category, setCategory] = useState("");
    const [budget_limit, setbudget_limit] = useState("");
    const [start_date, setstart_date] = useState("");
    const [end_date, setend_date] = useState("");

    // OPEN MODAL
    const handleOpen = () => setOpen(true);

    // CLOSE MODAL
    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!category || !budget_limit) return;

        const newBudget = {
            category,
            budget_limit: Number(budget_limit),
            start_date,
            end_date
        };

        console.log("Submitting Budget:", newBudget);

        addBudget(newBudget);

        // CLEAR FORM
        setCategory("");
        setbudget_limit("");
        setstart_date("");
        setend_date("");

        // CLOSE MODAL AFTER SUBMIT
        handleClose();
    };

    // MODAL STYLE
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '16px',
        outline: 'none'
    };

    return (
        <>

            {/* BUTTON THAT OPENS MODAL */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
            >
                Add Budget
            </Button>

            {/* MODAL */}
            <Modal
                open={open}
                onClose={handleClose}
            >

                <Box sx={modalStyle}>

                    <Typography variant="h6" gutterBottom>
                        Set Monthly Budget
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>

                            <TextField
                                label="Budget Category"
                                variant="outlined"
                                fullWidth
                                placeholder="Food, Rent"
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                            />

                            <TextField
                                label="Budget Limit"
                                variant="outlined"
                                type="number"
                                fullWidth
                                placeholder="Max Amount"
                                value={budget_limit}
                                onChange={(e) =>
                                    setbudget_limit(e.target.value)
                                }
                            />

                            <TextField
                                type="date"
                                fullWidth
                                value={start_date}
                                onChange={(e) =>
                                    setstart_date(e.target.value)
                                }
                            />

                            <TextField
                                type="date"
                                fullWidth
                                value={end_date}
                                onChange={(e) =>
                                    setend_date(e.target.value)
                                }
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Add Budget Goal
                            </Button>

                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>

                        </Stack>
                    </form>

                </Box>
            </Modal>
        </>
    );
}

export default BudgetModel;