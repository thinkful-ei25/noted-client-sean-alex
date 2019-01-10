import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import { fetchMetricData } from '../actions/metric';

export class ProgressReport extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchMetricData());
    }

    render() {
        return (
            <div className="progress-report">
              <h2>Hello {this.props.name}! Check out your stats:</h2>
              <section className="progress-stats">
                <p>Improvement: {this.props.improvement}</p>
                <p>Session Average:</p>
                <p>Current Average:</p>
              </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      improvement: state.metric.improvement,
      name: state.auth.currentUser.fullname,
      protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(ProgressReport));