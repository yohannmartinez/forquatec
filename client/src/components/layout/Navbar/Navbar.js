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
    
  }

  render() {
    return (
      <div className="navbar">
        <div className="navbar_globalContainer">
          <div className="navbar_leftContainer">
            <img src={Logo} className="navbar_Logo" />
            <Link to="" className="navbar_link" style={{ color: this.props.location.pathname === "/" && "#3D3357" }}>Accueil</Link>
            <Link to="" className="navbar_link" style={{ color: this.props.location.pathname === "/formations" && "#3D3357" }}>Formations</Link>
            <Link to="" className="navbar_link" style={{ color: this.props.location.pathname === "/quisommmesnous" && "#3D3357" }}>Qui sommes-nous ?</Link>
            <Link to="/blog" className="navbar_link" style={{ color: this.props.location.pathname === "/contact" && "#3D3357" }}>Contact</Link>
            <Link to="/blog" className="navbar_link" style={{ color: this.props.location.pathname === "/blog" && "#3D3357"  }}>Blog</Link>
          </div>
          <div className="navbar_rightContainer">
            {this.props.auth.user.name ? 
            <Link to="/dashboard" className="navbar_rightContainer"><span className="material-icons navbar_profile">account_circle</span>{this.props.auth.user.name}</Link> 
            :
            <div><Link to="/register" className="navbar_inscriptionButton">Inscription</Link><Link to="/login" className="navbar_connexionButton">Connexion</Link></div>
            }
          </div>
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
