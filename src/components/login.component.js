import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
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
        };

        axios.post('http://localhost:4000/login', obj)
            .then(res => {
                //console.log(res.data);
                if (res.data.result === "success") {
                    localStorage.setItem('admin', res.data.permission);
                    console.log(res.data.permission);
                    localStorage.setItem('isLogin', true);
                    this.props.history.push('/');
                }
                else {
                    alert("User doesn't exist! Please Register");
                    this.props.history.push('/login');
                }
            });

        this.setState({
            username: '',
            password: '',
        })
    }

    render() {
        return (
            <div style={{ marginTop: 10, width: 400 }}>
                <h3>Login User</h3><br />
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
                            onChange={this.onChangePassword} />
                    </div><br />
                    <div className="form-group">
                        <input type="submit" value="User Login" className="btn btn-primary" style={{width: '-webkit-fill-available'}} />
                    </div>
                    <br />
                    <div>
                        <Link to={'/register'} className="btn btn-info" style={{ width: '-webkit-fill-available' }} >Register</Link>
                    </div>
                </form>
            </div>
        )
    }
}