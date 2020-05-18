import React from "react"
import "./ChangeInformations.scss"
import cloneDeep from 'lodash/cloneDeep';

class ChangeInformations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: cloneDeep(this.props.user)
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        console.log(this.state)
    }

    handleChange(event) {
        let userCopy = this.state.user;
        userCopy[event.target.name] = event.target.value
        this.setState({ user: userCopy })
    }

    render() {
        return (
            <div className="ChangeInformations_globalContainer">
                <div className="ChangeInformations_container">
                    <span className="changeInformations_label">nom :</span>
                    <input className="changeInformations_input" value={this.state.user.name} id="name" type="text" placeholder="name" name="name" onChange={this.handleChange} />
                    <span className="changeInformations_label">email :</span>
                    <input className="changeInformations_input" value={this.state.user.email} placeholder="email" name="email" onChange={this.handleChange} />

                    <button className="changeInformations_button" onClick={() => { this.props.updateUser(this.state.user) }}>Confirmer</button>
                    <button className="changeInformations_button" onClick={() => { this.props.cancelEdit() }}>annuler</button>
                </div>
            </div>
        )
    }
}

export default ChangeInformations