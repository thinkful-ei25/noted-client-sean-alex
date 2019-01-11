import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import requiresLogin from './requires-login';
import { startUserSession } from '../actions/metric';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import { resetSession } from '../actions/score';


export class Dashboard extends React.Component {
    logOut() {
        this.props.dispatch(resetSession());
        this.props.dispatch(clearAuth());
        clearAuthToken();  
    }

    render() {
        return (
            <div className="dashboard">
                <button className='logout-button' onClick={() => this.logOut()}>Log out</button>
                <img className='dashboard-img' src="https://i.imgur.com/p4W7NlO.jpg" alt='symphony-orchestra'></img>
                <div className="dashboard-name"><b>Welcome {this.props.name}!</b></div>
                <div className='dashboard-controls'>
                    <Link to='/learn'><button className='learn-button' onClick={() => this.props.dispatch(startUserSession())}>Let's Learn</button></Link>
                    <Link to='/progress'><button className='progress-button'>Progress</button></Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
      username: state.auth.currentUser.username,
      name: `${currentUser.fullname}`,
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
