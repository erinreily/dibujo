import React from 'react';
import { Switch, Route, Link, useLocation } from "react-router-dom";
import { Week } from "/imports/ui/components/weeklySpread/Week.jsx"

export const Menu = ({ logout, enabledFeatures, name }) => {
    
    return (
        <div id="menu" className="p-16 pb-64">
            <Switch>
                <Route path='/dashboard' component={ Week }/>
                <Route path='/journalindex' component={ Week }/>
                <Route path='/weeklyspread' component={ Week }/>
                <Route path='/monthlyspread' component={ Week }/>
                <Route path='/statistics' component={ Week }/>
                <Route path='/archives' component={ Week }/>
            </Switch>

            <ul className="p-0 m-0">
                { enabledFeatures.dashboard && (
                    <li className="container">
                        <Link to="/dashboard">
                            <div className="button-style p-4 pl-16 mr-0 mt-8 mb-8">Dashboard
                                <img className="ml-32  mt-4 mr-8" src="/images/icons/dashboard_black_24dp.svg"/>
                            </div>
                        </Link>
                    </li>
                )}
                { enabledFeatures.index && (
                    <li className="container">
                        <Link to="/journalindex">
                            <div className="button-style p-4 pl-16 mr-0 mt-8 mb-8">Index
                                <img className="ml-32  mt-4 mr-8" src="/images/icons/format_list_numbered_black_24dp.svg"/>
                            </div>
                        </Link>
                    </li>
                )}
                { enabledFeatures.weeklySpread && (
                    <li className="container">
                        <Link to="/weeklyspread">
                            <div className="button-style p-4 pl-16 mr-0 mt-8 mb-8">Weekly spread
                                <img className="ml-32  mt-4 mr-8" src="/images/icons/calendar_view_month_black_24dp.svg"/>
                            </div>
                        </Link>
                    </li>
                )}
                { enabledFeatures.monthlySpread && (
                    <li className="container">
                        <Link to="/monthlyspread">
                            <div className="button-style p-4 pl-16 mr-0 mt-8 mb-8">Monthly spread
                                <img className="ml-32  mt-4 mr-8" src="/images/icons/event_black_24dp.svg"/>
                            </div>
                        </Link>
                    </li>
                )}
                { enabledFeatures.statistics && (
                    <li className="container">
                        <Link to="/statistics">
                            <div className="button-style p-4 pl-16 mr-0 mt-8 mb-8">Statistics
                                <img className="ml-32  mt-4 mr-8" src="/images/icons/insights_black_24dp.svg"/>
                            </div>
                        </Link>
                    </li>
                )}
                { enabledFeatures.archives && (
                    <li className="container">
                        <Link to="/archives">
                            <div className="button-style p-4 pl-16 mr-0 mt-8 mb-8">Archives
                                <img className="ml-32  mt-4 mr-8" src="/images/icons/archive_black_24dp.svg"/>
                            </div>
                        </Link>
                    </li>
                )}
                { enabledFeatures.dashboard || enabledFeatures.index || enabledFeatures.weeklySpread || enabledFeatures.monthlySpread || enabledFeatures.statistics || enabledFeatures.archives && <hr></hr>}
                <li className="container">
                    <button className="button-style p-4 pl-16 mr-0 mt-8 mb-8" onClick={ logout }>
                        Log out <img className="ml-32 mt-4 mr-8" src="/images/icons/logout_black_24dp.svg"/>
                    </button>
                </li>
            </ul>
        </div>
    );
};