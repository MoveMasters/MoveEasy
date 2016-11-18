import React, { Component } from 'react';
import styles from './styles';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import util from './../../../util/util';

class AddToInventory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quantity: 1,
			cft: 0,
			going: true,
			pbo: false,
			comment: ''
		};
	}

	componentWillMount() {
		console.log('NEED TO PLACE UTILITY FUNCTION TO GRAB AND SET PHOTOTYPE INFO TO STATE')
	}

	handleIncrement(boundState) {
		this.setState({[boundState]: this.state[boundState] + 1})
	}

	handleDecrement(boundState) {
		this.setState({[boundState]: this.state[boundState] > 0 ? this.state[boundState] - 1 : 0})
	}

	addToInventory() {
		let item = Object.assign({}, this.state, 
			{
			image: this.props.screenshots[0], 
			moveId: this.props.moveId,
			name: this.props.selectedItem,
			room: 'hey ho'
		});

		// util.postItemToServer(item).then( (inventory) => {
			
		// })

		console.log('FIX postItemToServer AND MOVE EQUATION INTO .THEN INSIDE AddToInventory')
		// this.props.updateInventory(inventory)
		this.props.dequeueItem();
		this.props.handleNext();
		this.props.openNote()		
	}

	renderItemNotification() {
		return (
			<div>
			  <Snackbar
			    open={this.state.open}
			    message="Event added to your calendar"
			    autoHideDuration={1000}
			    onRequestClose={this.handleRequestClose}
			  />
			</div>
		)
	}

	renderCounter(title, boundState) {
		return (
			<div style={styles.parent}>
				{title}
				<div style={styles.counter}>
					<span 
						onClick={() => this.handleDecrement(boundState)} 
						className="fa fa-angle-left fa-2x" 
						aria-hidden="true"></span>
					<span>{this.state[boundState]}</span>
					<span 
						onClick={() => this.handleIncrement(boundState)} 
						className="fa fa-angle-right fa-2x" 
						aria-hidden="true"></span>
				</div>
			</div>
		)
	}

	renderCheckbox(title, boundState) {
		return (
			<div style={styles.parent}>
				{title}
				<div style={styles.counter}>
					<input 
						type="checkbox" 
						onChange={(event) => this.setState({[boundState]: event.target.checked})} 
						checked={this.state[boundState]}/>
				</div>
			</div>
		)
	}

	render() {
		return (
			<div style={styles.container}>
				<div style={styles.titleContainer}>
					<div>{this.props.selectedItem}</div>
				</div>
				
				<div style={styles.hr}><hr/></div>

				{this.renderCounter('Item Count', 'quantity')}
				{this.renderCounter('Cubic Feet', 'cft')}
				{this.renderCheckbox('Is Going', 'going')}
				{this.renderCheckbox('Packed by Owner', 'pbo')}

				<div style={styles.parent}>
				  <textarea rows='4' 
				  	onChange={(event) => this.setState({comment: event.target.value})} 
				  	value={this.state.note}
				  	style={styles.textarea}
				  	placeholder={'Add Notes'}></textarea>
				</div>

				<RaisedButton
				  label={this.props.stepIndex === 1 ? 'Add to Inventory' : 'Next'}
				  primary={true}
				  onClick={this.addToInventory.bind(this)}
				  style={styles.RaisedButton}/>

			</div>
		)
	}
}

export default AddToInventory;