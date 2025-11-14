import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return <p className="no-txns">No transactions yet</p>;
  }

  return (
    <div className="txn-list">
      <AnimatePresence>
        {[...transactions]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
              className={`txn-item ${t.type === "income" ? "income" : "expense"}`}
            >
              <div>
                <strong>{t.description}</strong> <br />
                <span className="txn-date">{t.date}</span> |{" "}
                <span className="txn-category">{t.category}</span>
              </div>
              <div className="txn-right">
                <span className="txn-amount">₹{t.amount.toFixed(2)}</span>
                <button onClick={() => onDelete(t.id)}>❌</button>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
