import React, { Component } from 'react';
import VideoFeed from './../VideoFeed/VideoFeed';
import NavigationBar from './../NavigationBar/NavigationBar';
import util from './../../../util/util';
import PhotoInventory from './../PhotoInventory/PhotoInventory';
import HorizontalStepper from './../HorizontalStepper/HorizontalStepper';
import styles from './styles';
import Snackbar from 'material-ui/Snackbar';
import WaitingBar from './../WaitingBar/WaitingBar';
import Paper from 'material-ui/Paper';
import ContentWrapper from './../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



let message = 'hey ho';

//props: params.moveId
class Survey extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inventoryList: [],
			inventory: [],
			queue: [],
			items: {},
			view: 'welcome',
			openSnackbar: false,
			snackbarText: null
		};

	}

	componentWillMount() {
		util.getClarifaiInfo();
		// this.getInitialInventory();
		// clear any extra items in local storage
		localStorage.clear();
	}

	getInitialInventory() {
		util.getInitialInventory().then( moveItems => {
			this.setState({inventory:moveItems});
		})
	}

	openSnackbar(name) {
		this.setState({ openSnackbar: true, snackbarText: name });
	}

	handleScreenshot(id) {
		this.addIdToQueue(id);
		// switch view & reset inventoryList
		this.setState({ view: 'stepper' })

		this.addItem(id);
		this.getTags(id).then(tags => {
			this.attachTags(id, tags)
		});
	}

	addIdToQueue(id) {
		let queue = [...this.state.queue, id];
		this.setState({ queue });
	}

	addItem(id) {
		// build new state
		let items = Object.assign({}, this.state.items);

		let tags = null;
		let name = null;
		items[id] = { tags, name };
		console.log('AddItem, newstate:', items)
		this.setState({ items })
	}

	getTags(id) {
		// grab image from localStorage
		let image = localStorage.getItem(id);
		// return tags
		return util.postImageToClarifai(image).then(tags => tags)
	}

	attachTags(id, tags) {
		let target = this.state.items[id];
		let item = Object.assign({}, target);
		// attach tags
		item.tags = tags;
		// build new state
		let items = Object.assign({}, this.state.items);
		items[id] = item;

		let inventoryList = items[this.state.queue[0]].tags
		console.log(inventoryList, 'inventoryList')
		this.setState({ items, inventoryList })
	}

	attachName(name) {
		let id = this.state.queue[0];
		let target = this.state.items[id];
		let item = Object.assign({}, target);
		// attach name
		item.name = name;
		// build new state
		let items = Object.assign({}, this.state.items);
		items[id] = item;

		this.setState({ items })
	}

	dequeueItem() {
		console.log('dequeueItem')
		let id = this.state.queue[0];
		// delete image from local storage
		localStorage.removeItem(`${id}`);
		// build new items state
		let items = Object.assign({}, this.state.items);
		delete items[id];
		// build new queue state
		let queue = this.state.queue.slice(1);
		let view = queue.length === 0 ? 'waiting' : 'stepper';
		// reset inventory list if there are items left in the queue
		let inventoryList = items[queue[0]] ? items[queue[0]].tags : [];

		this.setState({ items, queue, view, inventoryList })
	}

	getCurrentItem() {
		let id = this.state.queue[0];
		let item = this.state.items[id];
		let newItem = Object.assign({}, item);
		newItem.id = id;

		return newItem;
	}

	updateChoices(event) {
	  let inventoryList = util.filterSearch(event.target.value);
	  this.setState({ inventoryList });
	};

	updateInventory(inventory) {
		this.setState({ inventory })
	}

	renderView() {
			const { queue, inventoryList, snackbarText, openSnackbar, inventory} = this.state;
		  switch (this.state.view) {
		    case 'welcome':
		      return (
		    		<div className='col-md-12'>
		    			<div style={styles.roomSelector}>
		    				<h1>Welcome to MoveKick</h1>
		    			</div>
		    			<div style={styles.colSix}>
		    		  	<p>Hello there</p>
		    		  </div>
		    		</div>
		       )
		    case 'stepper':
		      return (
		      	<div>
		      		<HorizontalStepper 
			      		queue={ queue }
			      		inventoryList={ inventoryList } 
			      		updateChoices={ this.updateChoices.bind(this) }
		      			attachName={this.attachName.bind(this)}
		      			getCurrentItem={this.getCurrentItem.bind(this)}
		      			dequeueItem={this.dequeueItem.bind(this)}
		      			updateInventory={this.updateInventory.bind(this)}
		      			moveId={this.props.params.moveId}
		      			openSnackbar={this.openSnackbar.bind(this)}/>
		      	</div>
		       )
		    case 'waiting':
		    	return (
		    		<div className='col-md-12'>
		    			<div style={styles.roomSelector}>
		    				<h1>Waiting for another item...</h1>
		    			</div>
		    			<div style={styles.colSix}>
		    		  	<WaitingBar />
		    		  </div>
		    		</div>
		    	)
		    default:
		      return (
		          <div className='col-md-6' style={styles.inventory}>
		          	Error View Not Found
		          </div>
		      )
		  }
	}

	render() {
		const { queue, snackbarText, openSnackbar, inventory, inventoryList } = this.state;
		return (
			<ContentWrapper >
			<Row>
	    	<Col xs={5}>
	   			<VideoFeed 
	   			handleScreenshot={this.handleScreenshot.bind(this)}
	   			moveId={this.props.params.moveId}/>	
				</Col>

				<Col xs={7}>

      		<MuiThemeProvider >

	      		<HorizontalStepper 
		      		queue={ queue }
		      		inventoryList={ inventoryList } 
		      		updateChoices={ this.updateChoices.bind(this) }
	      			attachName={this.attachName.bind(this)}
	      			getCurrentItem={this.getCurrentItem.bind(this)}
	      			dequeueItem={this.dequeueItem.bind(this)}
	      			updateInventory={this.updateInventory.bind(this)}
	      			moveId={this.props.params.moveId}
	      			openSnackbar={this.openSnackbar.bind(this)}/>
      		</MuiThemeProvider>


      		<MuiThemeProvider >

	      		<PhotoInventory inventory={ inventory }/>

      		</MuiThemeProvider>

				</Col>
      	<MuiThemeProvider >

				<Snackbar
				  open={ openSnackbar }
				  message={`${snackbarText} added to inventory`}
				  autoHideDuration={4000}
				  onRequestClose={() => this.setState({ openSnackbar: false })}
				/>
      	</MuiThemeProvider>


			</Row>
			</ContentWrapper>
		)
		
	}
}

export default Survey