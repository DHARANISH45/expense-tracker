import { useState, useEffect } from 'react';
import api from './services/api';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import './App.css';

function App() {
    const [transactions, setTransactions] = useState([]);
    const [editTransaction, setEditTransaction] = useState(null);
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem('user');
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    });
    const [showSignUp, setShowSignUp] = useState(false);

    const fetchTransactions = async () => {
        try {
            const res = await api.get('/transactions');
            setTransactions(res.data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            fetchTransactions();
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    if (!user) {
        return showSignUp ? (
            <SignUp onLogin={(user) => setUser(user)} onSwitch={() => setShowSignUp(false)} />
        ) : (
            <Login onLogin={(user) => setUser(user)} onSwitch={() => setShowSignUp(true)} />
        );
    }

    return (
        <div className="App">
            <h1>Expense Tracker</h1>
            <button className="logout-btn" onClick={() => setUser(null)}>Logout</button>
            <Dashboard transactions={transactions} />
            <AddTransaction onAdd={fetchTransactions} editTransaction={editTransaction} setEditTransaction={setEditTransaction} />
            <TransactionList transactions={transactions} onDelete={fetchTransactions} setEditTransaction={setEditTransaction} />
        </div>
    );
}

export default App;
