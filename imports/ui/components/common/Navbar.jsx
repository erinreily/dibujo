import React, { Fragment } from 'react';

export const Navbar = ({ user }) => {
    const logout = () => Meteor.logout();
    const name = user && user.profile ? ', ' + user.profile.name : '';

    return (
        <header>
            <div className="navbar flex-container m-0">
                <div className="navbar-header header">📝️ Digital Bullet Journal</div>
                { user && (
                    <div>
                        <div className="navbar-buttons">
                            <span>Welcome{ name }!</span>
                            <button className="navbar-button">Menu placeholder</button>
                            <button className="navbar-button" onClick={ logout }>Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};


