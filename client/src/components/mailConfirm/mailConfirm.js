import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";

class MailConfirm extends Component {
    constructor(props){
        super(props);
        this.state = {
            responseMessage : "Chargement",
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        axios
            .post("/api/users/confirmMail", {id : this.props.match.params.id})
            .then(res => this.setState({responseMessage : res.data.message}))
            .catch(err =>
                console.log(err)
            );
    }

    render() {
        return (
            <div>{this.state.responseMessage}</div>
        );
    }
}

MailConfirm.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps, null
)(MailConfirm);
