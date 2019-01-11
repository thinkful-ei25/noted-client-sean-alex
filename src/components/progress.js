import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import requiresLogin from './requires-login';
import { fetchMetricData } from '../actions/metric';

export class ProgressReport extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchMetricData());
    }

    percentageRecentAverage(){
        let input = this.props.lastSessionAvg;
        return (input* 100).toFixed(2);
    }

    percentageOverallAverage(){
        let input = this.props.allSessionsAvg;
        return (input* 100).toFixed(2);
    }

    percentageImprovement(){
        let input = this.props.improvement;
        return (input* 100).toFixed(2);
    }

    render() {
        return (
            <div className="progress-report">
              <Link to ='/dashboard'><button>Dashboard</button></Link>
              <h2>Hello {this.props.name}! Check out your stats:</h2>
              <section className="progress-stats">
                <p>Improvement from Last Session: {this.percentageImprovement()}%</p>
                <p>Most Recent Session Average: {this.percentageRecentAverage()}%</p>
                <p>Overall Average: {this.percentageOverallAverage()}%</p>
              </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    
    return {
      improvement: state.metric.improvement,
      allSessionsAvg: state.metric.allSessionsAvg,
      lastSessionAvg: state.metric.lastSessionAvg,
      name: state.auth.currentUser.fullname,
    };
};

export default requiresLogin()(connect(mapStateToProps)(ProgressReport));