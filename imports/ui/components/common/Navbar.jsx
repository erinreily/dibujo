import React from 'react';

export const Navbar = ({ user }) => {
    const logout = () => Meteor.logout();

    return (
        <header>
            <div className="app-bar">
                <div className="app-header header">
                    <h1>
                    📝️ Digital Bullet Journal
                    </h1>
                </div>
                <div className="navbar-buttons">
                    {user ? (
                        <div>
                            <button>Menu placeholder</button>
                            <button onClick={logout}>Logout</button>
                        </div>
                    ) : (
                        <span>Log in pls</span>
                    )}
                </div>
            </div>
        </header>
    );
};


