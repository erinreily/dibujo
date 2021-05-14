import React from 'react';
import { Link } from "react-router-dom";

/*
This component holds all of the links in the menu
Includes links for Dashboard, Index, Weekly Spread, Monthly Spread, Statistics, Archive, and Log Out
Each feature is either enabled or disabled by the Navbar component

Properties:
    logout - function to log out user
    enabledFeatures - object holding the features and enabled/disabled settings
    setShowMenu - function to close the menu when sent with false
*/
export const Menu = ({ logout, enabledFeatures, setShowMenu }) => {
    
    return (
        <div id="menu" className="p-16 pb-64">

            <ul className="p-0 m-0">
                { enabledFeatures.dashboard && (
                    <li className="container">
                        <Link to="/dashboard">
                            <div onClick={ () => setShowMenu(false) } className="button-style p-4 pl-16 mr-0 mt-8 mb-8">Dashboard
                                <img className="ml-32 mt-4 mr-8" src="/images/icons/dashboard_black_24dp.svg"/>
                            </div>
                        </Link>
                    </li>
                )}
                { enabledFeatures.index && (
                    <li className="container">
                        <Link to="/journalindex">
                            <div onClick={ () => setShowMenu(false) } className="button-style p-4 pl-16 mr-0 mt-8 mb-8">Index
                                <img className="ml-32 mt-4 mr-8" src="/images/icons/format_list_numbered_black_24dp.svg"/>
                            </div>
                        </Link>
                    </li>
                )}
                { enabledFeatures.weeklySpread && (
                    <li className="container">
                        <Link to="/weeklyspread">
                            <div onClick={ () => setShowMenu(false) } className="button-style p-4 pl-16 mr-0 mt-8 mb-8">Weekly spread
                                <img className="ml-32 mt-4 mr-8" src="/images/icons/calendar_view_month_black_24dp.svg"/>
                            </div>
                        </Link>
                    </li>
                )}
                { enabledFeatures.monthlySpread && (
                    <li className="container">
                        <Link to="/monthlyspread">
                            <div onClick={ () => setShowMenu(false) } className="button-style p-4 pl-16 mr-0 mt-8 mb-8">Monthly spread
                                <img className="ml-32 mt-4 mr-8" src="/images/icons/event_black_24dp.svg"/>
                            </div>
                        </Link>
                    </li>
                )}
                { enabledFeatures.statistics && (
                    <li className="container">
                        <Link to="/statistics">
                            <div onClick={ () => setShowMenu(false) } className="button-style p-4 pl-16 mr-0 mt-8 mb-8">Statistics
                                <img className="ml-32 mt-4 mr-8" src="/images/icons/insights_black_24dp.svg"/>
                            </div>
                        </Link>
                    </li>
                )}
                { enabledFeatures.archives && (
                    <li className="container">
                        <Link to="/archives">
                            <div onClick={ () => setShowMenu(false) } className="button-style p-4 pl-16 mr-0 mt-8 mb-8">Archives
                                <img className="ml-32 mt-4 mr-8" src="/images/icons/archive_black_24dp.svg"/>
                            </div>
                        </Link>
                    </li>
                )}
                { enabledFeatures.dashboard || enabledFeatures.index || enabledFeatures.weeklySpread || enabledFeatures.monthlySpread || enabledFeatures.statistics || enabledFeatures.archives && <hr></hr>}
                <li className="container">
                    <Link to="/">
                        <div onClick={ () => logout() } className="button-style p-4 pl-16 mr-0 mt-8 mb-8">Log out
                            <img className="ml-32 mt-4 mr-8" src="/images/icons/logout_black_24dp.svg"/>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
};