import React from 'react';
import {connect} from 'react-redux';

export class HeaderBar extends React.Component {

    render() {
        return (
            <div className="header-bar">
                <img className='noted-logo' src='https://i.imgur.com/eRWuV3X.png' alt='noted-logo'></img>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
