import React from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function BudgetPieChart({ budgets, transactions }) {

    const chartData = budgets.map((budget) => {

        const consumed = transactions
            .filter(
                (item) =>
                    item.category === budget.category &&
                    item.type === "expense"
            )
            .reduce(
                (acc, item) =>
                    acc + Number(item.amount),
                0
            );

        return {
            name: budget.category,
            value: consumed
        };
    });

    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#AF19FF"
    ];

    return (

        <ResponsiveContainer
            width="100%"
            height={300}
        >

            <PieChart>

                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                >

                    {chartData.map((entry, index) => (

                        <Cell
                            key={index}
                            fill={
                                COLORS[index % COLORS.length]
                            }
                        />

                    ))}

                </Pie>

                <Tooltip />
                <Legend />

            </PieChart>

        </ResponsiveContainer>
    );
}

export default BudgetPieChart;