import React, { Component } from 'react';
import Axios from 'axios';
import TableRow from './table.component';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import DropDown from './dropdown.component';
import '../dropdown.css';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        this.search = this.search.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.searchGenre = this.searchGenre.bind(this);
        this.all = this.all.bind(this);
        this.state = {
            business: [],
            displayMenu: false,
            search: '',
            select: 'All',
            isLogin: localStorage.getItem('isLogin'),
            admin: localStorage.getItem('admin'),
        };
        
    }

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

    }

    searchTitle() {
        this.setState({
            select: 'Title',
        })
    }

    searchGenre() {
        this.setState({
            select: 'Genre',
        })
    }

    all() {
        // Axios.get('http://localhost:4000/business')
        //     .then(response => {
        //         this.setState({ business: response.data });
        //         console.log(response.data);
        //     }).then(
        //         this.setState({
        //             search: '',
        //             select: 'All',
        //         })
        //     )
        this.setState({
            select: 'All',
        })
    }

    onChangeSearch(e) {
        this.setState({
            search: e.target.value,
        });
        console.log(this.state.select);

        if(this.state.select == 'Title'){
            Axios.get('http://localhost:4000/business/title/' + e.target.value)
                .then(response => {
                    this.setState({ business: response.data });
                })
        }
        else if(this.state.select == 'Genre'){
            Axios.get('http://localhost:4000/business/genre/' + e.target.value)
                .then(response => {
                    this.setState({ business: response.data });
                })
        }
        else {
             Axios.get('http://localhost:4000/business/'+ e.target.value)
                .then(response => {
                    this.setState({ business: response.data });
                    console.log(response.data);
                })
        }

    }

    componentDidMount() {
        Axios.get('http://localhost:4000/business')
            .then(response => {
                this.setState({business: response.data});
        })
    }

    search(e) {
        /*Axios.get('http://localhost:4000/business/'+this.state.search)
            .then(response => {
                this.setState({ business: response.data });
        })*/
        Axios.get('http://localhost:4000/business/' + e.target.value)
            .then(response => {
                this.setState({ business: response.data });
            })
    }

    render() {

        const isLogin = this.state.isLogin;
        const admin = this.state.admin;

        return (
            <div>
                {isLogin == 'true' ? (<div>
                    <div className="row form-group" style={{ justifyContent: 'space-between', margin: 0, width: 600, margin: '30px auto' }}>
                        <h3> Video Listing Page</h3>
                        <div style={{ display: 'flex', cursor: 'pointer', }}>
                            <div className="dropdown" style={{ background: "red", width: "200px", marginRight: 5, borderRadius: 5 }} >
                                <div className="button" onClick={this.showDropdownMenu}> {this.state.select} </div>

                                {this.state.displayMenu ? (
                                    <div className="ul">
                                        <div className="li" onClick={this.all}><p className="p">All</p></div>
                                        <div className="li" onClick={this.searchTitle} ><p className="p">Title</p></div>
                                        <div className="li" onClick={this.searchGenre}><p className="p">Genre</p></div>
                                    </div>
                                ) :
                                    (
                                        null
                                    )
                                }
                            
                            </div>
                            <div><input type="text" className="form-control" onKeyUp={this.onChangeSearch} /></div>
                            <div style={{ display: 'flex' }}>
                                {isLogin == 'true' && admin == 'true' ? (<input type="hidden" />) : ('')}
                                {isLogin == 'true' && admin == 'true' ? (<Link to={'/create'} className="btn btn-info">Create</Link>) : ('')}
                            </div>
                        </div>
                    </div>

                    <table className="table table-striped" style={{ marginTop: 20, width: 564.8,marginRight: 40, textAlign: 'center', margin: '30px auto' }}>
                        <thead>
                            <tr>
                                <th style={{ width: 300 }}>Title</th>
                                {/* <th style={{ width: 100 }}>Genre</th>
                                <th>Descriptions</th> */}
                                <th>Edit </th>
                                <th>Delete </th>
                                <th>Detail </th>
                            </tr>
                        </thead>
                    </table>
                    <table className="table table-striped" style={{ marginTop: 20,height:250, width: 600, textAlign: 'center',display: 'block', margin: '-30px auto', overflowY: 'scroll', overflowX: 'hidden'}}>
                        <tbody>
                            {
                                this.state.business.map((business, key) =>
                                    <TableRow businessdata={business} key={key} />
                                )
                            }
                        </tbody>
                    </table>
                </div>) : (<h5>You can see if you login!</h5>)}
                
            </div>
        )
    }
}