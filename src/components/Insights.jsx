import React from "react";
import { motion } from "framer-motion";

export default function Insights({ transactions, budgetGoal }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const spendingRate = income ? ((expense / income) * 100).toFixed(1) : 0;
  const budgetUsed = ((expense / budgetGoal) * 100).toFixed(1);

  let message = "Great job!";
  let color = "#28a745";
  if (spendingRate > 80) {
    message = "⚠️ High spending! Try saving more.";
    color = "#dc3545";
  } else if (spendingRate > 50) {
    message = "🟡 Moderate spending — watch your budget.";
    color = "#ffc107";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="insights-card"
    >
      <h3>Insights</h3>
      <p style={{ color }}>{message}</p>
      <p>You’ve spent <strong>{spendingRate}%</strong> of your income.</p>

      <div className="progress">
        <div
          className="progress-fill"
          style={{
            width: `${budgetUsed}%`,
            backgroundColor: color,
          }}
        ></div>
      </div>
      <p>Budget used: {budgetUsed}% of ₹{budgetGoal}</p>
    </motion.div>
  );
}
