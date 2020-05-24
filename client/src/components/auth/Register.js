import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import './register.scss'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="Register_container">
        <Link to="/" className="Register_backHomeButton"> Retourner à l'accueil</Link>
        <div>
          <h1 className="global_title">Créez-vous un compte ci-dessous</h1>
          <p className="Register_createAccount">
            Vous avez déjà un compte ? <Link to="/register" >Se connecter</Link>
          </p>
        </div>
        <form noValidate onSubmit={this.onSubmit} className="Register_formContainer">
          <div className="Login_inputField">
            <input
              onChange={this.onChange}
              value={this.state.name}
              error={errors.name}
              id="name"
              type="text"
              placeholder="nom"
              className={classnames("", {
                invalid: errors.name
              })}
            />
            <span className="red-text">{errors.name}</span>
          </div>
          <div className="Login_inputField">
            <input
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              placeholder="Email"
              type="email"
              className={classnames("", {
                invalid: errors.email
              })}
            />
            <span className="red-text">{errors.email}</span>
          </div>
          <div className="Login_inputField">
            <input
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              placeholder="Mot de passe"
              type="password"
              className={classnames("", {
                invalid: errors.password
              })}
            />
            <span className="red-text">{errors.password}</span>
          </div>
          <div className="Login_inputField">
            <input
              onChange={this.onChange}
              value={this.state.password2}
              error={errors.password2}
              id="password2"
              placeholder="Confirmer votre mot de passe"
              type="password"
              className={classnames("", {
                invalid: errors.password2
              })}
            />
            <span className="red-text">{errors.password2}</span>
          </div>
            <button
              type="submit"
              className="global_buttonRight Register_RegisterButton"
            >
              Sign up
                </button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
