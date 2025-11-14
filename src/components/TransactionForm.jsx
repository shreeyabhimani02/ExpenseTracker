import React, { useState } from "react";

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState("income");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !description || !amount) return;

    const newTransaction = {
      id: Date.now(),
      type,
      date,
      description,
      category,
      amount: parseFloat(amount),
    };

    onAdd(newTransaction);
    setType("income");
    setDate("");
    setDescription("");
    setCategory("Other");
    setAmount("");
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button type="submit">+ Add</button>
    </form>
  );
}
