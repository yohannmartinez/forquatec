import React from "react"
import "./ChangePassword.scss"
import cloneDeep from 'lodash/cloneDeep';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: cloneDeep(this.props.user),
            oldPassword:"",
            newPassword:"",
            confirmNewPassword:"",
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        console.log(this.state)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        const isEnabled = this.state.oldPassword.length >= 6 && this.state.newPassword.length >= 6 && this.state.newPassword === this.state.confirmNewPassword;
        return (
            <div className="ChangePassword_globalContainer">
                <div className="ChangePassword_container">
                    <span className="changePassword_label">ancien mot de passe :</span>
                    <input className="changePassword_input" value={this.state.oldPassword} id="oldPassword" type="password" placeholder="Ancien mot de passe" name="oldPassword" onChange={this.handleChange} />
                    <span className="changePassword_label">nouveau mot de passe :</span>
                    <input className="changePassword_input" value={this.state.newPassword} type="password" placeholder="Nouveau mot de passe" name="newPassword" onChange={this.handleChange} />
                    <span className="changePassword_label">Confirmez nouveau mot de passe :</span>
                    <input className="changePassword_input" value={this.state.confirmNewPassword} type="password" placeholder="Confirmez le nouveau mot de passe" name="confirmNewPassword" onChange={this.handleChange} />

                    <button className="changePassword_button" disabled={!isEnabled} onClick={() => { this.props.updateUser(this.state.user, this.state.oldPassword, this.state.newPassword) }}>Confirmer</button>
                    <button className="changePassword_button" onClick={() => { this.props.cancelPassword() }}>annuler</button>
                </div>
            </div>
        )
    }
}

export default ChangePassword