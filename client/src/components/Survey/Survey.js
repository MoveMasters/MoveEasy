import React, { Component } from 'react';
import VideoFeed from './../VideoFeed/VideoFeed';
import NavigationBar from './../NavigationBar/NavigationBar'
import util from './../../../util/util';
import PhotoInventory from './../PhotoInventory/PhotoInventory';
import HorizontalStepper from './../HorizontalStepper/HorizontalStepper';
import styles from './styles';

class Survey extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentItems: [],
			screenshots: [],
			predictions: [],
			inventory: []
		};

		document.cookie = `moveId=${this.props.params.moveId}`;
	}

	componentWillMount() {
		this.setClarfaiInfo();
		this.getInitialInventory();
	}

	dequeueItem() {
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
		
		// get predictions and add to predictions queue
		util.postImageToClarifai(screenshot).then(predictionSet => {
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