function Dashboard({ transactions }) {
    const totalIncome = transactions
        ? transactions.filter(txn => txn.type === "Income")
            .reduce((sum, txn) => sum + Number(txn.amount), 0)
        : 0;

    const totalExpense = transactions
        ? transactions.filter(txn => txn.type === "Expense")
            .reduce((sum, txn) => sum + Number(txn.amount), 0)
        : 0;

    const balance = totalIncome - totalExpense;

    return (
        <div className="dashboard">
            <p><strong>Total Income:</strong> ₹{totalIncome.toFixed(2)}</p>
            <p><strong>Total Expense:</strong> ₹{totalExpense.toFixed(2)}</p>
            <p><strong>Balance:</strong> ₹{balance.toFixed(2)}</p>
        </div>
    );
}

export default Dashboard;
