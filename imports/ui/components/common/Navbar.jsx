import React, { Fragment, useState } from 'react';
import { Menu } from '/imports/ui/components/common/Menu.jsx';

export const Navbar = ({ user }) => {
    const logout = () => {
        Meteor.logout();
        setShowMenu(false);
    }
    const name = user && user.profile ? ', ' + user.profile.name : '';
    const [showMenu, setShowMenu] = useState(false);
    const enabledFeatures = {
        dashboard: false,
        index: false,
        weeklySpread: false,
        monthlySpread: false,
        statistics: false,
        archives: false
    };
    //for testing features
    // const enabledFeatures = {
    //     dashboard: true,
    //     index: true,
    //     weeklySpread: true,
    //     monthlySpread: true,
    //     statistics: true,
    //     archives: true
    // };

    return (
        <header>
            <div className="navbar flex-container m-0">
                <div className="navbar-header header p-8">Digital Bullet Journal</div>
                { user && (
                    <div className="navbar-buttons">
                        <button className="navbar-button round-icon p-8" onClick={ () => setShowMenu(!showMenu) }>
                            <img alt="Menu" src="/images/icons/menu_black_24dp.svg" />
                        </button>
                    </div>
                )}
            </div>
            { user && showMenu &&
                <Menu
                    logout={ logout }
                    enabledFeatures={ enabledFeatures }
                    name={ name }
                ></Menu>
            }
        </header>
    );
};