import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Navbar } from '/imports/ui/components/common/Navbar.jsx';

export const Header = () => {

    const user = useTracker(() => Meteor.user());

    return (
        <Navbar user={ user }/>
    );
}