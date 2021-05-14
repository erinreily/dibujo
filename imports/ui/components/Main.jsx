import { Meteor } from 'meteor/meteor';
import React from 'react';
import { AuthenticationWrapper } from "/imports/ui/components/authentication/AuthenticationWrapper.jsx";
import { Week } from "/imports/ui/components/weeklySpread/Week.jsx";
import { Month } from "/imports/ui/components/monthlySpread/Month.jsx";
import { useTracker } from 'meteor/react-meteor-data';
import { Switch, Route } from "react-router-dom";

export const Main = () => {

    const user = useTracker(() => Meteor.user());

    return (
        <main>
            { user ? (
                <div>
                    <Switch>
                        <Route exact path='/' component={ Week }/>
                        <Route path='/weeklyspread' component={ Week }/>
                        <Route path='/monthlyspread' component={ Month }/>
                    </Switch>
                </div>
            ) : (
                <div>
                    <Switch>
                        <Route exact path='/' component={ AuthenticationWrapper }/>
                        <Route path='/authentication' component={ AuthenticationWrapper }/>
                    </Switch>
                </div>
            )}
        </main>
    );
}