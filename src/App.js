import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

//components
import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';
import Home from './components/home.component';
import Login from './components/login.component';
import Register from './components/register.component';
import Detail from './components/detail.component';

class App extends Component {

	constructor(props) {
		super(props);

		this.logout = this.logout.bind(this);
		this.state = {
			isLogin: localStorage.getItem('isLogin'),
			admin: localStorage.getItem('admin'),
		}
	}

	logout(e) {
		localStorage.setItem('isLogin', false);
		localStorage.setItem('admin', false);
		this.setState({
			isLogin: false,
			admin: false,
		});

		console.log(this.state.isLogin);
		console.log(localStorage.getItem('isLogin'));
	}

	render() {

		const isLogin = this.state.isLogin;
		const admin = this.state.admin;

		console.log(isLogin);

		return (
			<Router>
				<div className="container">
					<nav className="navbar navbar-expand-lg navbar-light bg-light" style={{flexWrap: 'unset'}}>
						<Link to={'/'} className="navbar-brand" >CRUD Sample</Link>
						<div className="collapse navbar-collapse" id="navbarSupportedContent" style={{display: 'flex'}}>
							<ul className="navbar-nav" style={{flexDirection: 'row'}}>
								<li className="nav-item nav-margin">
									<Link to={'/home'} className="nav-link">Home</Link>
								</li>
								<li className="nav-item nav-margin">
									<Link to={'/index'} className="nav-link">View</Link>
								</li>
								{isLogin == 'true' ? (<li className="nav-item nav-margin">
									<Link onClick={this.logout} className="nav-link">Logout</Link>
								</li>) : (<li className="nav-item nav-margin">
									<Link to={'/login'} className="nav-link">Login</Link>
								</li>)}
							</ul>
						</div>
					</nav>
					<br />
					<br />
					<h2>Video CRUD</h2>
					<br />
					<h4 style={{ color: 'rgb(3, 136, 252)'}}>Your state is {isLogin == 'false' ? 'Logout.' : (isLogin == 'true' && admin == 'true' )? 'Login as admin. You can create, update, delete' : 'Login as User. You can not create, update, delete yet.'}</h4>
					<br />
					<Switch>
						<Route exact path='/create' component={ Create } />
						<Route path='/edit/:id' component={Edit} />
						<Route path='/index' component={Index} />
						<Route path='/login' component={Login} />
						<Route path='/home' component={Home} />
						<Route path='/register' component={Register} />
						<Route path='/detail/:id' component={Detail} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;