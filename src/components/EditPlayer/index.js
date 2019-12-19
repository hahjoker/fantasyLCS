import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

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
        const cookies = new Cookies();
        cookies.set('player', this.state.team, { path: '/' });
        console.log(cookies.get('player')); 
        this.props.history.push(ROUTES.SPLASHPLAYER);
        event.preventDefault();
    }

    componentDidMount() {
      const cookies = new Cookies();
      //console.log(this.props.firebase.db);
      const yokisoQuery = this.props.firebase.db.collection("weeks").doc("1").collection("teams").doc(cookies.get('teams')).collection("players");
        yokisoQuery
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