import React, { Component } from 'react';
import styles from './styles';
import util from './../../../util/util';
import { Form, Col, FormGroup, InputGroup, Button, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';

class AddToInventory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quantity: 1,
			cft: 0,
			going: true,
			pbo: false,
			comment: '',
			room: 'Family Room'
		};
	}

	componentWillMount() {
		this.getCft()
	}

	getCft() {
		const { getCurrentItem } = this.props;
		const name = getCurrentItem().name;
		const cft = util.getCft(name);
		this.setState({ cft })
	}

	addToInventory() {
		let { getCurrentItem, dequeueItem, handleNext, updateInventory, moveId, openSnackbar } = this.props;
		let { id, name } = getCurrentItem();

		// grab item from local storage
		let image = localStorage.getItem(id);

		let item = Object.assign({}, this.state, 
			{
			image: image, 
			moveId: moveId,
			name: name
		});

		console.log('Posting Item to server:', item);

		util.postItemToServer(item).then( (inventory) => {
			console.log('updating inventory with:', inventory)
			updateInventory(inventory);			
		})

		dequeueItem();
		handleNext();
		openSnackbar(name)
	}

	handleIncrement(e, boundState) {
		// remove focus
		e.target.blur();
		this.setState({[boundState]: this.state[boundState] + 1})
	}

	handleDecrement(e, boundState) {
		// remove focus
		e.target.blur();
		this.setState({[boundState]: this.state[boundState] > 0 ? this.state[boundState] - 1 : 0})
	}

	render() {
		const { quantity, cft, going, pbo, room, comment } = this.state;
		const { getCurrentItem } = this.props;
		let { name } = getCurrentItem()
		return (
			<div style={styles.container} id='topLevel'>
				<div 
					className="h4 text-center" 
					style={{width: '100%'}}>{ name }</div>
				<hr/>
				<div style={styles.hr}><hr/></div>
					<Form horizontal>
						{/* START QUANTITY NUMBER PICKER*/}
						<FormGroup style={styles.quantity}>
							<Col componentClass={ControlLabel} sm={3}>
								Quanity
							</Col>
							<Col sm={9}>
							   <InputGroup>
							     <InputGroup.Button>
							       <Button onClick={ e => this.handleDecrement(e, 'quantity')}>
							       	<em className="fa fa-minus-square-o"></em>
							       </Button>
							     </InputGroup.Button>
							     <FormControl 
							     	type="text" 
							     	onChange={e => this.setState({ quantity: this.target.value })}
							     	value={ quantity } />
							     <InputGroup.Button>
							       <Button onClick={ e => this.handleIncrement(e, 'quantity')}>
							       	<em className="fa fa-plus-square-o"></em>
							       </Button>
							     </InputGroup.Button>
							   </InputGroup>
							 </Col>
						 </FormGroup>

						 {/* END QUANTITY NUMBER PICKER */}

						{/* START CFT NUMBER PICKER*/}
						<FormGroup style={styles.formGroup}>
							<Col componentClass={ControlLabel} sm={3}>
								Cubic Feet
							</Col>
							<Col sm={9}>
							   <InputGroup>
							     <InputGroup.Button>
							       <Button onClick={ e => this.handleDecrement(e, 'cft')}>
							       	<em className="fa fa-minus-square-o"></em>
							       </Button>
							     </InputGroup.Button>
							     <FormControl 
							     	type="text" 
							     	onChange={e => this.setState({ cft: this.target.value })}
							     	value={ cft } />
							     <InputGroup.Button>
							       <Button onClick={ e => this.handleIncrement(e, 'cft')}>
							       	<em className="fa fa-plus-square-o"></em>
							       </Button>
							     </InputGroup.Button>
							   </InputGroup>
							 </Col>
						 </FormGroup>
						 {/* END CFT NUMBER PICKER */}

						{/* START ROOM PICKER*/}
						<FormGroup style={styles.formGroup}>
							<Col componentClass={ControlLabel} sm={3}>
								Room
							</Col>
							<Col sm={9}>
							   <InputGroup>
							     <FormControl 
							     	type="text" 
							     	placeholder="Room" 
							     	onChange={(e) => this.setState({room: e.target.value})} 
							     	value={ room }/>
							   </InputGroup>
							 </Col>
						 </FormGroup>
						 {/* END ROOM NUMBER PICKER */}

						{/* START CHECKBOX*/}

						<FormGroup style={styles.formGroup}>
						      <Col smOffset={3} sm={4}>
						        <Checkbox
						        	onChange={ e => this.setState({going: e.target.checked}) } 
											checked={ going }>Going</Checkbox>
						      </Col>
						      <Col smOffset={1} sm={4}>
						        <Checkbox
						        	onChange={ e => this.setState({pbo: e.target.checked}) } 
											checked={ pbo }>Pbo</Checkbox>
						      </Col>
						</FormGroup>

						{/* END CHECKBOX*/}

						<FormGroup style={styles.formGroup}>
							<Col componentClass={ControlLabel} sm={3}>
								Notes
							</Col>

							<Col sm={9}>
					      <textarea rows='4' 
					      	onChange={(e) => this.setState({comment: e.target.value})} 
					      	value={ comment }
					      	style={styles.textarea}
					      	placeholder={'Add Notes'}></textarea>
				      </Col>
						</FormGroup>


						{/* START ADD TO INVENTORY*/}

						<FormGroup style={styles.formGroup}>
							<Button 
								bsSize="large" 
								bsStyle='danger'
								onClick={ this.addToInventory.bind(this) }
								block>Add to Inventory</Button>
						</FormGroup>

						{/* END ADD TO INVENTORY*/}

						</Form>
			</div>
		)
	}
}

export default AddToInventory;