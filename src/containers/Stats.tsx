import * as React from 'react';
import { connect } from 'react-redux';
import DuoStatsStore from '../store/DuoStatsStore';

interface StatsProps {
    username: string;
}

class Stats extends React.Component<StatsProps> {

    render() {
        return (
            <span>{this.props.username}</span>
        );
    }
}

const mapStateToProps = (state: DuoStatsStore) => {
    return { username: state.myUsername };
};

export default connect(mapStateToProps)(Stats);