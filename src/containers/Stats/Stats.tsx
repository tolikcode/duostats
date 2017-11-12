import * as React from 'react';
import { connect } from 'react-redux';
import DuoStatsStore from '../../store/DuoStatsStore';
import { Dispatch } from 'redux';
import { fetchUser } from '../../actions/fetchUser';
import UserData from '../../store/UserData';

interface StatsProps {
    username: string;
    usersData: UserData[];
    dispatch: Dispatch<{}>;
}

class Stats extends React.Component<StatsProps> {

    componentDidMount() {
        if (this.props.username) {
            this.props.dispatch(fetchUser(this.props.username));
        }
    }

    render() {
        const user = this.props.usersData.find(u => u.username === this.props.username);

        if (user === undefined) {
            return null;
        }

        return (

            <div>
                <p>Username: {user.username}</p>
                <p>Avatar: {user.data ? user.data.avatar : ''}</p>
                <p>Error: {user.error}</p>
            </div>
        );
    }
}

const mapStateToProps = (state: DuoStatsStore) => {
    return { username: state.myUsername, usersData: state.usersData };
};

export default connect(mapStateToProps)(Stats);