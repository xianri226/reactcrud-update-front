import React, { Component } from 'react';
import Axios from 'axios';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { business: [] };
    }

    componentDidMount() {
        Axios.get('http://localhost:4000/business')
            .then(response => {
                this.setState({ business: response.data });
            })
    }

    render() {
        return (
            // <div>
            //     <p>Welcome to Index Component!!</p>
            // </div>
            <div>
                <h4>Welcome to Home Page!</h4>
            </div>
        )
    }
}