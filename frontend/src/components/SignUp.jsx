import { useState } from 'react';
import api from '../services/api';

function SignUp({ onLogin, onSwitch }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/signup', { email, password });
            alert("Signup successful! Please login.");
            onSwitch();
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Signup failed.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <button onClick={onSwitch}>Login</button>
            </p>
        </div>
    );
}

export default SignUp;
