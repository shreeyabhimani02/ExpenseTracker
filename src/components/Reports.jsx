import React from "react";

export default function Reports({ transactions }) {
  const monthlyData = {};

  transactions.forEach((t) => {
    const month = t.date.slice(0, 7); // YYYY-MM
    if (!monthlyData[month]) monthlyData[month] = { income: 0, expense: 0 };

    if (t.type === "income") monthlyData[month].income += t.amount;
    else monthlyData[month].expense += t.amount;
  });

  const months = Object.keys(monthlyData).sort().reverse();

  return (
    <div className="reports">
      <h3>📅 Monthly Report</h3>

      {months.map((m) => (
        <div key={m} className="report-row">
          <strong>{m}</strong>
          <p>Income: ₹{monthlyData[m].income.toFixed(2)}</p>
          <p>Expense: ₹{monthlyData[m].expense.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
