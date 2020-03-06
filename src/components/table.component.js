import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class TableRow extends Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);

        this.state = {
            isLogin: localStorage.getItem('isLogin'),
            admin: localStorage.getItem('admin'),
        }
    }

    delete() {
        axios.get('http://localhost:4000/business/delete/' + this.props.businessdata._id)
            .then(console.log("Delete Complete"))
            .catch(err => console.log(err))
    }

    render() {
        const isLogin = this.state.isLogin;
        const admin = this.state.admin;
        return (
            <tr>
                <td style={{ width: 300 }}>{this.props.businessdata.person_name}</td>
                {/* <td style={{ width: 100 }}>{this.props.businessdata.business_name}</td>
                <td style={{ width: 600, height: 100, textIndent: 10 }}>{this.props.businessdata.gst_number}</td> */}
                {isLogin == 'true' && admin == 'true' ? (<td><Link to={'edit/' + this.props.businessdata._id} className="btn btn-primary" >Edit</Link></td>) : (<td></td>)}
                {isLogin == 'true' && admin == 'true' ? (<td><button onClick={this.delete} className="btn btn-danger">Delete</button></td>) : (<td></td>)}
                {isLogin == 'true' ? (<td><Link to={'detail/' + this.props.businessdata._id} className="btn btn-success" >Detail</Link></td>) : (<td></td>)}
            </tr>
        )
    }
}