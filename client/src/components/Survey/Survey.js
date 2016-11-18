import React, { Component } from 'react';
import VideoFeed from './../VideoFeed/VideoFeed';
import NavigationBar from './../NavigationBar/NavigationBar'
import util from './../../../util/util';
import PhotoInventory from './../PhotoInventory/PhotoInventory';
import HorizontalStepper from './../HorizontalStepper/HorizontalStepper';
import styles from './styles';

class Survey extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currentItems: [],
			screenshots: [],
			predictions: [],
			moveId: '582e2f3e47fae614fb30911a',
			inventory: []
		}
	}

	componentWillMount() {
		this.setClarfaiInfo();
		this.getInitialInventory();
		console.log('NEED TO SET MOVEID FROM DASHBOARD PAGE!! THIS.PROPS.PARAMS ??')
	}

	dequeueItem() {
		let screenshots = this.state.screenshots.slice(1);
		let predictions = this.state.predictions.slice(1);
		let currentItems = predictions[0] || [];
		this.setState({ screenshots, predictions, currentItems })
	}


	setClarfaiInfo() {
		util.getClarifaiInfo().then(clarfaiInfo => {
			console.log('clarfaiInfo', clarfaiInfo);
		});
	}

	getInitialInventory() {
		console.log('REFERENCE UTIL FUNCTION TO GRAB INVENTORY ON LOAD')
	}

	handleScreenshot(screenshot) {
		// add image to screenshot queue
		let screenshots = [...this.state.screenshots, screenshot]
		this.setState({ screenshots });
		
		// get predictions and add to predictions queue
		util.postImageToClarifai(screenshot)
			.then(predictionSet => {
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
		console.log('Updating inventory:', inventory)
		this.setState({ inventory })
	}

	render() {
		return (
			<div className='row' style={{margin: '0 15px'}}>
	    		<div className='col-md-4' style={styles.column}>
					<VideoFeed handleScreenshot={this.handleScreenshot.bind(this)}/>			
				</div>

				<div className='col-md-8' style={styles.column}>
					<HorizontalStepper 
						screenshots={this.state.screenshots} 
						currentItems={this.state.currentItems}
						updateChoices={this.updateChoices.bind(this)}
						dequeueItem={this.dequeueItem.bind(this)}
						moveId={this.state.moveId}
						updateInventory={this.updateInventory.bind(this)}/>
					<hr />	
					<PhotoInventory inventory={this.state.inventory}/>
					<hr />	
				</div>
			</div>
		)
		
	}
}

export default Survey