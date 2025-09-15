import { useState } from 'react';
import api from '../services/api';

function Login({ onLogin, onSwitch }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            onLogin(res.data);
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid email or password");
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <button onClick={onSwitch}>Sign Up</button>
            </p>
        </div>
    );
}

export default Login;
