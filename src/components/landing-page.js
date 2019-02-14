import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from '../actions/auth';


import  RegistrationPage  from './registration-page';

export class LandingPage extends React.Component {
    // If we are logged in redirect straight to the user's dashboard
    render(){
        
        // If we are logged in redirect straight to the user's dashboard
        if (this.props.loggedIn) {
            return <Redirect to="/dashboard" />;
        }

        return (
            <div className="home">
                <h2>Welcome to Noted</h2>
                <p>Learn a plethora of music notation symbols and how understanding them can improve your skills as a musician! Try it out!</p>
                <button className='demo' onClick={() => this.props.dispatch(login('demouser', 'password123'))}>Demo</button>
                <p className='divider'>... or make an account!</p>
                <RegistrationPage />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
