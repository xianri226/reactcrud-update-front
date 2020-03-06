import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap';
import '../App.css';

export default class Create extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            permission: false,
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        // console.log(`${this.state.person_name}` + `${this.state.business_name}` + `${this.state.gst_number}`);	

        const obj = {
            username: this.state.username,
            password: this.state.password,
            permission: this.state.permission,
        };

        // console.log(`${this.state.user}`);

        axios.post('http://localhost:4000/register', obj)
            .then(res => console.log(res.data));

        this.setState({
            username: '',
            password: '',
            permission: false,
        })
    }

    render() {
        return (
            <div style={{ marginTop: 10, width: 400 }}>
                <h3>Register User</h3><br />
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername} />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Register User" className="btn btn-primary" style={{ width: '-webkit-fill-available' }} />
                    </div>
                    <br />
                </form>
            </div>
        )
    }
}