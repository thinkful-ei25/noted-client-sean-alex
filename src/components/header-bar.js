import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {Link} from 'react-router-dom';
import { resetSession } from '../actions/score';
import { endUserSession } from '../actions/metric';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(endUserSession());
        this.props.dispatch(resetSession());
        this.props.dispatch(clearAuth());
        clearAuthToken();
;
        
    }

    logScore(){
        this.props.dispatch(resetSession());
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button className='logout-button' onClick={() => this.logOut()}>Log out</button>
            );
        }

        let dashboardButton;
        if (this.props.loggedIn) {
            dashboardButton = (
                <Link to='/dashboard'><button className='dashboard-button' onClick={() => this.logScore()}>Dashboard</button></Link>
            );
        }

        return (
            <div className="header-bar">
                <img className='noted-logo' src='https://i.imgur.com/eRWuV3X.png' alt='noted-logo'></img>
                <div className='controls'>
                {logOutButton}
                {dashboardButton}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
