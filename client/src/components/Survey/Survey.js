import React, { Component } from 'react';
import VideoFeed from './../VideoFeed/VideoFeed';
import NavigationBar from './../NavigationBar/NavigationBar'
import util from './../../../util/util';
import PhotoInventory from './../PhotoInventory/PhotoInventory';
import HorizontalStepper from './../HorizontalStepper/HorizontalStepper';
import styles from './styles';
import Snackbar from 'material-ui/Snackbar';
import WaitingBar from './../WaitingBar/WaitingBar';

let message = 'hey ho';

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

		console.log(this.props.params.moveId, 'moveId')
		document.cookie = `moveId=${this.props.params.moveId}`;
	}

	componentWillMount() {
		util.getClarifaiInfo();
		this.getInitialInventory();
		// clear any extra items in local storage
		localStorage.clear();
	}

	routeView() {
		let { queue, inventory } = this.state;
		if (queue.length > 0) {
			this.setState({ view: 'stepper' })
		} else if (inventory.length > 0) {
			this.setState({ view: 'waiting'})
		}
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
		this.setState({ view: 'stepper', inventoryList: [] })

		this.addItem(id);
		this.getTags(id).then(tags => {
			// set list to clarifai predictions
			this.setState({ inventoryList: tags })
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

		this.setState({ items })
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
		this.setState({ items, queue, view })
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
			const { queue, inventoryList } = this.state;
		  switch (this.state.view) {
		    case 'welcome':
		      return (
		      	<div className='col-md-12' style={styles.colSix}>
      	     	<p>Welcome to Move Kick</p>
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
		    		<div className='col-md-12' style={styles.colSix}>
		    		  <p>Waiting for another item...</p>
		    		  <WaitingBar />
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
		const { snackbarText, openSnackbar, inventory } = this.state;
		return (
			<div className='row' style={{margin: '0 15px'}}>
	    		<div className='col-md-4' style={styles.column}>
					<VideoFeed 
						handleScreenshot={this.handleScreenshot.bind(this)}
						moveId={this.props.params.moveId}/>			
				</div>

				<div className='col-md-8' style={styles.column}>

					{this.renderView.call(this)}

					<hr />	
					<PhotoInventory inventory={ inventory }/>
					<hr />	
				</div>

				<Snackbar
				  open={ openSnackbar }
				  message={`${snackbarText} added to inventory`}
				  autoHideDuration={4000}
				  onRequestClose={() => this.setState({ openSnackbar: false })}
				/>

			</div>
		)
		
	}
}

export default Survey