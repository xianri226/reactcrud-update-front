import React from 'react';
import '../dropdown.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Axios from 'axios';

import Create from './create.component';

class Dropdown extends React.Component {
    constructor() {
        super();

        this.state = {
            displayMenu: false,
            business: '',
        };

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

    };

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

    scifi() {
        alert('ads');
    }

    render() {
        return (
            <div className="dropdown" style={{ background: "red", width: "200px" }} >
                <div className="button" onClick={this.showDropdownMenu}> My Setting </div>

                {this.state.displayMenu ? (
                    <div className="ul">
                        <div className="li"><Link onClick={this.scifi} className="p">Create</Link></div>
                        <div className="li"><Link to={'/create'} className="p">Create</Link></div>
                        <div className="li"><Link to={'/create'} className="p">Create</Link></div>
                        <div className="li"><Link to={'/create'} className="p">Create</Link></div>
                        <div className="li"><Link to={'/create'} className="p">Create</Link></div>
                    </div>
                ) :
                    (
                        null
                    )
                }
                <Switch>
                    <Route exact path='/create' component={Create} />
                </Switch>

            </div>

        );
    }
}

export default Dropdown;