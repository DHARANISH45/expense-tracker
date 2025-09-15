import api from '../services/api';

function TransactionList({ transactions, onDelete, setEditTransaction }) {
    const handleDelete = async (id) => {
        try {
            await api.delete(`/transactions/${id}`);
            onDelete();
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete transaction.");
        }
    };

    const handleEdit = (txn) => {
        setEditTransaction(txn);
    };

    return (
        <div className="transaction-list">
            <h3>Transactions</h3>
            {transactions.map((txn) => (
                <div key={txn._id} className="transaction-item">
                    <div>
                        <strong>{txn.category}</strong> ({txn.type}) - ₹{txn.amount}<br />
                        <small>{txn.description}</small><br />
                        <small>{new Date(txn.date).toLocaleDateString()}</small>
                    </div>
                    <div>
                        <button onClick={() => handleEdit(txn)}>Edit</button>
                        <button onClick={() => handleDelete(txn._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TransactionList;
