import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  team: '',
};
class EditPlayer extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        users: [],
        loading: false,
        ...INITIAL_STATE
      };
    }
    onSubmit = event => {
      console.log(this.state.team);
      this.props.history.push(ROUTES.PLAYERSUP);
      event.preventDefault();
    }

    componentDidMount() {
      console.log(this.props.firebase.db);
      this.props.firebase.db.collection("weeks").doc("1").collection("teams")
        .get()
        .then(querySnapshot => {
          console.log(querySnapshot);
          const data = querySnapshot.docs.map(doc => doc.data());
          console.log(data);
          this.setState({ users: data });
        });
    }

    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { users, team } = this.state;
        return (
          <form onSubmit={this.onSubmit}>
            <select name = "team" onChange={this.onChange}>
            <option value={team}></option>
            {users.map(user => (
              <option key={user.name} value={user.name}>{user.name}</option>
            ))}
            </select>
            <button type="submit" class="button" >Submit</button>
          </form>
        );
    }
}
export default withRouter(withFirebase(EditPlayer));