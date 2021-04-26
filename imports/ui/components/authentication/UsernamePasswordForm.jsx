import React, { useState } from 'react';

export const UsernamePasswordForm = ({ type, submitAction, buttonText }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [preferredName, setPreferredName] = useState('');

    const submit = e => {
        e.preventDefault();

        submitAction(username, password, preferredName);
    };

    return (
        <form onSubmit={ submit } className="login-form m-16">
            <div className="mb-16">
                <label htmlFor="username">Username</label> <br></br>
                
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    onChange={ e => setUsername(e.target.value) }
                />
            </div>

            <div className="mb-16">
                <label htmlFor="password">Password</label> <br></br>
                
                <input 
                    type="text"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={ e => setPassword(e.target.value) }
                />
            </div>

            { type === "createAccount" && (
                <div>
                    <label htmlFor="preferredName">Preferred Name (optional)</label> <br></br>
                    
                    <input 
                        type="text"
                        placeholder="Preferred name"
                        name="preferredName"
                        onChange={ e => setPreferredName(e.target.value) }
                    />
                </div>
            )}
            
            <button type="submit">{ buttonText }</button>
        </form>
    );
}