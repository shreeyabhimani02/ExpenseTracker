import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import Summary from "./components/Summary";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Chart from "./components/Chart";
import Insights from "./components/Insights";
import Filters from "./components/Filters";
import Reports from "./components/Reports";
import "./App.css";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [budgetGoal, setBudgetGoal] = useState(10000);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions"));
    if (saved) setTransactions(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
    toast.success("Transaction added successfully!");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    toast.error("Transaction deleted!");
  };

  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
  });

  const filteredTxns = transactions.filter((t) => {
    const matchSearch = t.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchType = filters.type === "all" || t.type === filters.type;
    const matchCategory = filters.category === "all" || t.category === filters.category;
    return matchSearch && matchType && matchCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="app-container"
    >

      <Toaster position="top-right" />

      <div className="header-row">
        <h1>Expense Tracker</h1>

        <div className="theme-switch-wrapper">
          <label className="theme-switch">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "light"}
            />
            <span className="slider"></span>
          </label>
          <span className="toggle-label">
            {theme === "light" ? "Light Mode" : "Dark Mode"}
          </span>
        </div>
      </div>

      <div className="grid-container">

        <div className="left-col">
          <Summary transactions={transactions} />
          <TransactionForm onAdd={addTransaction} />
          <Filters filters={filters} setFilters={setFilters} />
          <TransactionList transactions={filteredTxns} onDelete={deleteTransaction} />
        </div>

        <div className="right-col">
          <Insights transactions={transactions} budgetGoal={budgetGoal} />
          <Chart transactions={transactions} />
          <Reports transactions={transactions} />
        </div>

      </div>
    </motion.div>
  );
}
