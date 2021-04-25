Dibujo (DIgital BUllet JOurnal)
By Erin Dunnahoo

THE ELEVATOR PITCH:
Dibujo is a digital bullet journal for organization on the go. Simply pull up the website on your desktop or mobile browser, log in, and navigate to the weekly or monthly spreads. Add tasks and check them off as you complete them. Add events so you know what's happening on each day. Planned future updates will add features such as statistics, an index for quick navigation to specific weeks or months, carrying tasks forward to the next day, and various personalization options.

THE TECHNOLOGIES:
Meteor + React for JavaScript frameworks
MongoDB provided by AtlasDB running on GCS for back end
Less for styling
Github & git for version control
Mocha/Chai for unit testing
aXe for basic accessibility checks
Deployed using Heroku git integration

**********************************
Release plan
**********************************
v1.0.0
Current weekly spread only
    To do -
        Unit tests for current code
        Styling (incl mobile)
        Finish accessibility fixes
        Deploy to Heroku

v1.1.0
Add arrows to move through past and future weeks (limit?)

v1.2.0
Add monthly spread
    To do -
        Add new page for month
        Add monthly goals
        Associate month events with weekday events
        Arrows to move through past and future months
        Add menu to switch between weekly and monthly spreads

Future improvements
    Index - list of links to go immediately to a weekly or monthly spread
    Future log - auto-populate events into the weekly spread
    Statistics - associate tasks with goals and show stats
    Archives - "shelve" a journal, clear index and past future log events
    Click to carry forward tasks to the next day
    Font/color personalization (themes?)
    Stickers
    Other personalizations - e.g. Mon-Sun vs Sun-Sat weekly spread


**********************************
Resources Used
**********************************
Coffee Image by <a href="https://pixabay.com/users/6689062-6689062/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2847042">David Schwarzenberg</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2847042">Pixabay</a>

Bullet Journal Image by <a href="https://pixabay.com/users/stocksnap-894430/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2562345">StockSnap</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2562345">Pixabay</a>

https://pixabay.com/photos/business-computer-mobile-smartphone-2846221/

For less mixin - https://github.com/kolosovsky/kolos.mixins/blob/master/for.less/

Dialog polyfill - https://github.com/GoogleChrome/dialog-polyfill