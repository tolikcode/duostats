import * as React from 'react';

interface HelloProps {
    setMyUsername: (username: string) => void;
}

interface HelloState {
    username: string;
}

class Hello extends React.Component<HelloProps, HelloState>  {

    constructor(props: HelloProps) {
        super(props);
        this.state = { username: '' };
    }

    // tslint:disable-next-line no-any
    onUsernameChange(e: any) {
        this.setState({ username: e.target.value });
    }

    onShowClick() {
        this.props.setMyUsername(this.state.username);
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

export default Hello;