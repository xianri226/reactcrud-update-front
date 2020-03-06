import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {

	constructor(props) {
		super(props);

		this.onChangePersonName = this.onChangePersonName.bind(this);
		this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
		this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			person_name: '',
			business_name: '',
			gst_number: '',
		}
	}

	onChangePersonName(e) {
		this.setState({
			person_name: e.target.value
		});
	}

	onChangeBusinessName(e) {
		this.setState({
			business_name: e.target.value
		});
	}

	onChangeGstNumber(e) {
		this.setState({
			gst_number: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();
		
		// console.log(`${this.state.person_name}` + `${this.state.business_name}` + `${this.state.gst_number}`);	

		const obj = {
			person_name: this.state.person_name,
			business_name: this.state.business_name,
			gst_number: this.state.gst_number,
		};

		axios.post('http://localhost:4000/business/add', obj)
			.then(res=>	console.log(res.data));

		this.setState({
			person_name: '',
			business_name: '',
			gst_number: '',
		})
	}

	render() {
		return (
			<div style={{ marginTop: 10, width: 400}}>
				<h3>Add New Video</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Title:  </label>
						<input 
								type="text" 
								className="form-control" 
								value={this.state.person_name} 
								onChange={this.onChangePersonName} />
					</div>
					<div className="form-group">
						<label>Genre: </label>
						<input 
								type="text" 
								className="form-control" 
								value={this.state.business_name}
								onChange={this.onChangeBusinessName}
								/>
					</div>
					<div className="form-group">
						<label>Descriptions: </label>
						<textarea 
								className="form-control" 
								value={this.state.gst_number}
								onChange={this.onChangeGstNumber}
								/>
					</div>
					<div className="form-group">
						<input type="submit" value="Register Video" className="btn btn-primary" />
					</div>
				</form>
			</div>
		)
	}
}