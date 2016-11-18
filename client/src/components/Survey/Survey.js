import React, { Component } from 'react';
import VideoFeed from './../VideoFeed/VideoFeed';
import NavigationBar from './../NavigationBar/NavigationBar'
import util from './../../../util/util';
import PhotoInventory from './../PhotoInventory/PhotoInventory';
import HorizontalStepper from './../HorizontalStepper/HorizontalStepper';
import styles from './styles';
import Snackbar from 'material-ui/Snackbar';

let message = 'hey ho';

class Survey extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentItems: [],
			screenshots: [],
			predictions: [],
			inventory: [],
			selectedItem: null,
			noteOpen: false
		};

		document.cookie = `moveId=${this.props.params.moveId}`;
		console.log(this.props.params.moveId, 'moveId')
	}

	componentWillMount() {
		this.setClarfaiInfo();
		this.getInitialInventory();
	}

	setSelectedItem(selectedItem) {
		console.log('setting selectedItem to:', selectedItem)
		this.setState({ selectedItem });
	}

	openNote() {
		console.log('calling open note')
		this.setState({ noteOpen: true });
	}

	dequeueItem() {
		// delete image from local storage
		localStorage.removeItem(`${this.state.screenshots[0]}`);

		let screenshots = this.state.screenshots.slice(1);
		let predictions = this.state.predictions.slice(1);
		let currentItems = predictions[0] || [];
		this.setState({ screenshots, predictions, currentItems })
	}


	setClarfaiInfo() {
		util.getClarifaiInfo();
	}

	getInitialInventory() {
		util.getInitialInventory().then( moveItems => {
			this.setState({inventory:moveItems});
		})
	}

	handleScreenshot(screenshot) {
		// add image to screenshot queue
		let screenshots = [...this.state.screenshots, screenshot]
		this.setState({ screenshots });
		
		console.log('posting image to clarifai')
		// get predictions and add to predictions queue
		// grab image from local storage
		let image = localStorage.getItem(screenshot);

		util.postImageToClarifai(image).then(predictionSet => {
			let predictions = [...this.state.predictions, predictionSet];
			let currentItems = predictions[0];
			this.setState({ predictions, currentItems })
		})
	}

	updateChoices(event) {
	  let currentItems = util.filterSearch(event.target.value);
	  this.setState({ currentItems });
	};

	updateInventory(inventory) {
		this.setState({ inventory })
	}

	render() {
		return (
			<div className='row' style={{margin: '0 15px'}}>
	    		<div className='col-md-4' style={styles.column}>
					<VideoFeed 
						handleScreenshot={this.handleScreenshot.bind(this)}
						moveId={this.props.params.moveId}/>			
				</div>

				<div className='col-md-8' style={styles.column}>
					<HorizontalStepper 
						screenshots={this.state.screenshots} 
						currentItems={this.state.currentItems}
						updateChoices={this.updateChoices.bind(this)}
						dequeueItem={this.dequeueItem.bind(this)}
						moveId={this.props.params.moveId}
						updateInventory={this.updateInventory.bind(this)}
						openNote={this.openNote.bind(this)}
						setSelectedItem={this.setSelectedItem.bind(this)}
						selectedItem={this.state.selectedItem}/>
					<hr />	
					<PhotoInventory inventory={this.state.inventory}/>
					<hr />	
				</div>

				<Snackbar
				  open={this.state.noteOpen}
				  message={`Added ${this.state.selectedItem} to Inventory`}
				  autoHideDuration={4000}
				  onRequestClose={() => this.setState({ noteOpen: false })}
				/>

			</div>
		)
		
	}
}

export default Survey