import React from "react";
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart({ transactions }) {
  const expenseCategories = {};
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") totalIncome += t.amount;
    else {
      totalExpense += t.amount;
      expenseCategories[t.category] =
        (expenseCategories[t.category] || 0) + t.amount;
    }
  });

  const data = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: [
          "#36a2eb",
          "#ffcd56",
          "#ff6384",
          "#4bc0c0",
          "#9966ff",
        ],
        borderColor: "#1e1e1e",
        borderWidth: 2,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="chart-container"
    >
      <h3>Spending Breakdown</h3>
      {Object.keys(expenseCategories).length === 0 ? (
        <p style={{ color: "gray" }}>No expense data yet</p>
      ) : (
        <Doughnut data={data} />
      )}

      <div className="chart-summary">
        <p><strong>Total Income:</strong> ₹{totalIncome.toFixed(2)}</p>
        <p><strong>Total Expense:</strong> ₹{totalExpense.toFixed(2)}</p>
      </div>
    </motion.div>
  );
}
