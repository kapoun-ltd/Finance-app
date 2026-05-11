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
            remaining: 0
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

    return {
        total: budget.budget_limit,
        consumed,
        remaining
    };
};