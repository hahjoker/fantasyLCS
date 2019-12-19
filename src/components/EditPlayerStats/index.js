import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  team: '',
};
class EditPlayerStats extends Component {
    
    constructor(props) {
      super(props);
  
      this.state = {
        users: [],
        loading: false,
        ...INITIAL_STATE
      };
    }
    onSubmit = event => {
        console.log(this.state);
        //ADDING STUFF
        event.preventDefault();
    }

    componentDidMount() {
      const cookies = new Cookies();
      //console.log(this.props.firebase.db);
      console.log(cookies.get('player'));
      const yokisoQuery = this.props.firebase.db.collection("weeks").doc("1").collection("teams").doc(cookies.get('teams')).collection("players");
        yokisoQuery.where("name","==",cookies.get('player'))
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
          {users.map(user => (
            <input name = "kills" type ="number" placeholder={user.kills} onChange={this.onChange}></input>
            ))}
            <button type="submit" class="button" >Submit</button>
          </form>
        );
    }
}
export default withRouter(withFirebase(EditPlayerStats));