import { useState, useEffect } from 'react';
import api from '../services/api';

function AddTransaction({ onAdd, editTransaction, setEditTransaction }) {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('Expense');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (editTransaction) {
            setAmount(editTransaction.amount);
            setType(editTransaction.type);
            setCategory(editTransaction.category);
            setDescription(editTransaction.description);
            setDate(editTransaction.date);
        }
    }, [editTransaction]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || !type || !category || !date) {
            alert("Please fill all required fields.");
            return;
        }
        try {
            if (editTransaction) {
                await api.put(`/transactions/${editTransaction._id}`, {
                    amount: Number(amount),
                    type,
                    category,
                    description,
                    date
                });
                alert("Transaction updated successfully!");
                setEditTransaction(null);
            } else {
                await api.post('/transactions', {
                    amount: Number(amount),
                    type,
                    category,
                    description,
                    date
                });
                alert("Transaction added successfully!");
            }
            setAmount('');
            setType('Expense');
            setCategory('');
            setDescription('');
            setDate('');
            onAdd();
        } catch (error) {
            console.error("Error saving transaction:", error.response || error.message || error);
            const msg = error.response?.data?.message || "Failed to save transaction.";
            alert(msg);
        }
    };

    const handleCancel = () => {
        setAmount('');
        setType('Expense');
        setCategory('');
        setDescription('');
        setDate('');
        setEditTransaction(null);
    };

    return (
        <form onSubmit={handleSubmit} className="transaction-form">
            <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
            <select value={type} onChange={e => setType(e.target.value)}>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
            </select>
            <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required />
            <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
            <button type="submit">{editTransaction ? "Update" : "Add"} Transaction</button>
            {editTransaction && <button type="button" onClick={handleCancel}>Cancel</button>}
        </form>
    );
}

export default AddTransaction;
