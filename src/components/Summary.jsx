import React from "react";
import { motion } from "framer-motion";

export default function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const summaryData = [
    { label: "Income", value: income, color: "#28a745" },
    { label: "Expense", value: expense, color: "#dc3545" },
    { label: "Balance", value: balance, color: "#0d6efd" },
  ];

  return (
    <div className="summary">
      {summaryData.map((item, i) => (
        <motion.div
          key={i}
          className="card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: i * 0.15 }}
          style={{
            borderLeft: `6px solid ${item.color}`,
            background: "linear-gradient(145deg, #2a2a2a, #1f1f1f)",
          }}
        >
          {item.label}: ₹{item.value.toFixed(2)}
        </motion.div>
      ))}
    </div>
  );
}
