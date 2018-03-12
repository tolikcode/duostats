import * as React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import './Hello.css';

interface HelloProps {
  setMyUsername: (username: string) => void;
}

interface HelloState {
  username: string;
}

class Hello extends React.Component<HelloProps, HelloState> {
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
      <Card className="helloCard">
        <Typography variant="subheading">Hi, what's your Duolingo username?</Typography>
        <TextField label="Username" value={this.state.username} onChange={e => this.onUsernameChange(e)} />
        <Button color="primary" variant="raised" onClick={e => this.onShowClick()}>
          Show Stats
        </Button>
      </Card>
    );
  }
}

export default Hello;
