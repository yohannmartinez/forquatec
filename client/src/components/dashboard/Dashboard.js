import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios"



//pages
import ChangeInformations from "./pages/ChangeInformations"
import ChangePassword from "./pages/ChangePassword"

import './dashboard.scss'

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      page: null,
      updatePasswordError:null,
    }
    this.cancelEdit = this.cancelEdit.bind(this);
    this.updateInformations = this.updateInformations.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.cancelPassword = this.cancelPassword.bind(this)
  }

  componentDidMount() {
    console.log(this.props.auth)
    axios.get("/api/users/CurrentUserInfos", {
      params: {
        id: this.props.auth.user.id
      }
    }).then((res) => {
      this.setState({ user: res.data.user })
      console.log(this.state)
    })
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  cancelEdit() {
    this.setState({ page: null })
  }

  updateInformations(user) {
    console.log("user is", user)
    axios.post('/api/users/updateInformations', { id: user._id, email: user.email, name: user.name }).then(res => {
      console.log(res);
      this.setState({user : user, page: null})
    }).catch(err => {
      console.log(err)
    })
  }

  cancelPassword() {
    this.setState({ page: null })
  }

  updatePassword(user, oldPassword, newPassword) {
    console.log("user is", user, oldPassword,newPassword)
    
    axios.post('/api/users/updatePassword', { id: user._id, oldPassword: oldPassword, newPassword: newPassword}).then(res => {
      console.log(res);
      if(res.data.success === true) {
        this.setState({ page: null})
      } else {
        this.setState({ updatePasswordError: res.data.message})
        console.log(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="Dasboard_container">
        <span className="material-icons Dashboard_Icon">account_circle</span>
        {this.state.user &&
          <div className="Dashboard_userLabel"><span className="material-icons Dashboard_userIcon">face</span> {this.state.user.name}</div>
        }
        {this.state.user &&
          <div className="Dashboard_userLabel"><span className="material-icons Dashboard_userIcon">alternate_email</span> {"  " + this.state.user.email}</div>
        }

        {this.state.user && this.state.user.emailChecked === "True" ?
          <div className="Dashboard_userLabel"><span className="material-icons Dashboard_userIcon">done</span>adresse e-mail validée</div>
          :
          <div className="Dashboard_userLabel"><span className="material-icons Dashboard_userIcon">error</span> adresse e-mail non validée</div>
        }

        {this.state.user &&
          <div className="Dashboard_userLabel"><span className="material-icons Dashboard_userIcon">schedule</span> membre depuis le {new Date(this.state.user.date).toLocaleDateString('en-GB')}</div>
        }

        <button className="Dashboard_userButton" onClick={() => { this.setState({ page: "changeInfos" }) }}>Modifier mes informations</button>
        <button className="Dashboard_userButton" onClick={() => { this.setState({ page: "changePassword" }) }}>Changer de mot de passe</button>
        <button className="Dashboard_userButton" onClick={() => { this.props.logoutUser() }}>Déconnexion</button>

        {this.state.page === "changeInfos" &&
          <ChangeInformations user={this.state.user} cancelEdit={this.cancelEdit} updateUser={this.updateInformations} />
        }
        {this.state.page === "changePassword" &&
          <ChangePassword user={this.state.user} cancelPassword={this.cancelPassword} updateUser={this.updatePassword} updatePasswordError={this.state.updatePasswordError}/>
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
