function checkBudgetStatus(budget_limit, used_amount) {

    const remaining = budget_limit - used_amount;
    const percentageLeft = (remaining / budget_limit) * 100;

    if (remaining <= 0) {
        return {
            status: "Over Budget",
            message: "You have exceeded your budget!"
        };
    }

    if (percentageLeft <= 10) {
        return {
            status: "Danger",
            message: "Warning! Your budget is almost finished."
        };
    }

    if (percentageLeft <= 25) {
        return {
            status: "Warning",
            message: "You are close to your budget limit."
        };
    }

    return {
        status: "Safe",
        message: "Your spending is under control."
    };
}

export { checkBudgetStatus };