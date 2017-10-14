import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setUsername } from '../actions/index';

interface HelloProps {
    username: string;
    dispatch: Dispatch<{}>;
}

class Hello extends React.Component<HelloProps>  {

    onUsernameChange(e: any){
        this.props.dispatch(setUsername(e.target.value))
    }

    render() {

        return (
            <input value={this.props.username} onChange={e => this.onUsernameChange(e)} />
        );
    }
}

const mapStateToProps = (state: any) => ({
    username: state.username
});

export default connect(mapStateToProps)(Hello);