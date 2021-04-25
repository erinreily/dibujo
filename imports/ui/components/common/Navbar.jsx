import React, { Fragment } from 'react';

export const Navbar = ({ user }) => {
    const logout = () => Meteor.logout();

    return (
        <header>
            <div className="navbar flex-container m-0">
                <div className="navbar-header header">📝️ Digital Bullet Journal</div>
                { user && (
                    <div className="navbar-buttons">
                        <button className="navbar-button">Menu placeholder</button>
                        <button className="navbar-button" onClick={ logout }>Logout</button>
                    </div>
                )}
            </div>
        </header>
    );
};


