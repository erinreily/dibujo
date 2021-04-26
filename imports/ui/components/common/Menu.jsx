import React from 'react';
import { Switch, Route, Link, useLocation } from "react-router-dom";
import { Week } from "/imports/ui/components/weeklySpread/Week.jsx"

export const Menu = ({ logout, enabledFeatures, name }) => {
    
    return (
        <div id="menu">
            <Switch>
                <Route path='/dashboard' component={ Week }/>
                <Route path='/journalindex' component={ Week }/>
                <Route path='/weeklyspread' component={ Week }/>
                <Route path='/monthlyspread' component={ Week }/>
                <Route path='/statistics' component={ Week }/>
                <Route path='/archives' component={ Week }/>
            </Switch>

            <p className="pl-32 ml-16">Welcome{ name }!</p>
            <ul className="p-0 m-0">
                { enabledFeatures.dashboard && (
                    <li>
                        <Link to="/dashboard"><img className="mr-32" src="/images/icons/dashboard_white_24dp.svg"/>Dashboard</Link>
                    </li>
                )}
                { enabledFeatures.index && (
                    <li>
                        <Link to="/journalindex"><img className="mr-32" src="/images/icons/format_list_numbered_white_24dp.svg"/>Index</Link>  
                    </li>
                )}
                { enabledFeatures.weeklySpread && (
                    <li>
                        <Link to="/weeklyspread"><img className="mr-32" src="/images/icons/calendar_view_month_white_24dp.svg"/>Weekly spread</Link>   
                    </li>
                )}
                { enabledFeatures.monthlySpread && (
                    <li>
                        <Link to="/monthlyspread"><img className="mr-32" src="/images/icons/event_white_24dp.svg"/>Monthly spread</Link> 
                    </li>
                )}
                { enabledFeatures.statistics && (
                    <li>
                        <Link to="/statistics"><img className="mr-32" src="/images/icons/insights_white_24dp.svg"/>Statistics</Link>  
                    </li>
                )}
                { enabledFeatures.archives && (
                    <li>
                        <Link to="/archives"><img className="mr-32" src="/images/icons/archive_white_24dp.svg"/>Archives</Link>   
                    </li>
                )}
                <li role="button" onClick={ logout }>
                    <a href="#"><img className="mr-32" src="/images/icons/logout_white_24dp.svg"/>Log out</a>
                </li>
            </ul>
        </div>
    );
};