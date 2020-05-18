import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import './Navbar.scss'
//images
import Logo from "../../../assets/global/logo.png"

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
    };
  }

  componentDidMount() {
    this.setState({ location: window.location.pathname.split("/")[1] });
    console.log(this.props.location.pathname)
  }

  render() {
    return (
      <div className="navbar">
        <div className="navbar_globalContainer">
          <div className="navbar_leftContainer">
            <img src={Logo} className="navbar_Logo" />
            <Link to="" className="navbar_link" style={{ color: this.props.location.pathname === "/" ? "white" : "grey" }}>accueil</Link>
            <Link to="" className="navbar_link" style={{ color: this.props.location.pathname === "/formations" ? "white" : "grey" }}>formations</Link>
            <div className="navbar_link" style={{ color: this.props.location.pathname === "/devenirFormateur" ? "white" : "grey" }}>devenir formateur</div>
            <Link to="/blog" className="navbar_link" style={{ color: this.props.location.pathname === "/blog" ? "white" : "grey" }}>blog</Link>
          </div>
          {this.props.auth.user.name ? <Link to="/dashboard" className="navbar_rightContainer"><span className="material-icons navbar_profile">
            account_circle
</span>{this.props.auth.user.name}</Link> : <Link to="/login" className="navbar_rightContainer"><span className="material-icons navbar_profile">
              account_circle
</span>connexion</Link>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(
  mapStateToProps, null
)(Navbar));
