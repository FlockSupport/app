import React, {Component} from "react";
import ViewUsers from './view-users'
import AddUser from './add-user'
import Login from './login'



export default class Users extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    return (
      <>
        <Login></Login>
        <AddUser></AddUser>
        <h3>List of users</h3>
       <ViewUsers/>
       </>
    );
  }
}
