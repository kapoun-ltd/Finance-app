export const calculateBudgetRemaining = (
    budgets,
    transactions,
    category
) => {

    const budget = budgets.find(
        (item) =>
            item.category
                ?.trim()
                .toLowerCase() ===
            category.toLowerCase()
    );

    if (!budget) {
        return {
            total: 0,
            consumed: 0,
            remaining: 0,
            percentageUsed: 0,
            status: "No Budget",
            message: "No budget set for this category."
        };
    }

    const consumed = transactions
        .filter(
            (item) =>
                item.category
                    ?.trim()
                    .toLowerCase() ===
                category.toLowerCase() &&

                item.type === "Expense"
        )
        .reduce(
            (acc, item) =>
                acc + Number(item.amount),
            0
        );

    const remaining =
        budget.budget_limit - consumed;

    const percentageUsed =
        (consumed / budget.budget_limit) * 100;

    let status = "Safe";
    let message = "Your spending is under control.";

    if (remaining <= 0) {
        status = "Over Budget";
        message = "You have exceeded your budget!";
    }

    else if (percentageUsed >= 90) {
        status = "Danger";
        message = "Warning! Budget almost finished.";
    }

    else if (percentageUsed >= 75) {
        status = "Warning";
        message = "You are close to your budget limit.";
    }

    return {
        total: budget.budget_limit,
        consumed,
        remaining,
        percentageUsed,
        status,
        message
    };
};