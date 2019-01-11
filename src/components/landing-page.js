import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


import  RegistrationPage  from './registration-page';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
            <h2>Welcome to Noted</h2>
            <p>Learn a plethora of music notation symbols and how understanding them can improve your skills as a musician!</p>
            <RegistrationPage />
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
