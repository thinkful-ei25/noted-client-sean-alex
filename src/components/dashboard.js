import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import requiresLogin from './requires-login';
import { startUserSession } from '../actions/metric';

export class Dashboard extends React.Component {

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Welcome {this.props.name}!</div>
                <Link to='/learn'><button onClick={() => this.props.dispatch(startUserSession())}>Let's Learn</button></Link>
                <Link to='/progress'><button>Progress</button></Link>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
      username: state.auth.currentUser.username,
      name: `${currentUser.fullname}`,
      protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
