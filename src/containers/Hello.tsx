import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setUsername } from '../actions/index';

interface HelloProps {
    dispatch: Dispatch<{}>;
}

interface HelloState {
    username: string;
}

class Hello extends React.Component<HelloProps, HelloState>  {

    constructor(props: HelloProps) {
        super(props);
        this.state = { username: '' };
    }

    onUsernameChange(e: any) {
        this.setState({ username: e.target.value });
    }

    onShowClick() {
        localStorage.setItem('duolingoUsername', this.state.username);
        this.props.dispatch(setUsername(this.state.username));
    }

    render() {

        return (
            <div>
                <input value={this.state.username} onChange={e => this.onUsernameChange(e)} />
                <button onClick={e => this.onShowClick()}>Show Stats</button>
            </div>
        );
    }
}

export default connect()(Hello);