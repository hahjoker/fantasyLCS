import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class PullList extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        users: [],
        loading: false,
      };
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
  
    render() {
        const { users } = this.state;
        return (
          <div className="row">
            <select>
            {users.map(user => (
              <option value={user.name}>{user.name}</option>
            ))}
            </select>
          </div>
        );
    }
}
export default withFirebase(PullList);