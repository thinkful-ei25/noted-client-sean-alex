import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import requiresLogin from './requires-login';
import { fetchMetricData } from '../actions/metric';

export class ProgressReport extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchMetricData());
    }

    render() {
        return (
            <div className="progress-report">
              <Link to ='/dashboard'><button>Dashboard</button></Link>
              <h2>Hello {this.props.name}! Check out your stats:</h2>
              <section className="progress-stats">
                <p>Improvement:</p>
                <p>Most Recent Session Average: {this.props.lastSessionAvg}</p>
                <p>Overall Average: {this.props.allSessionsAvg}</p>
              </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    
    return {
      // improvement: state.metric.improvement,
      allSessionsAvg: state.metric.allSessionsAvg,
      lastSessionAvg: state.metric.lastSessionAvg,
      name: state.auth.currentUser.fullname,
      protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(ProgressReport));