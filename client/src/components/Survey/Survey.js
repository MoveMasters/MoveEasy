import React, { Component } from 'react';
import VideoFeed from '../VideoFeed/VideoFeed';
import NavigationBar from '../NavigationBar/NavigationBar'
import ImageCropper from '../ImageCropper/ImageCropper';
import util from './../../../util/util';
import PhotoInventory from '../PhotoInventory/PhotoInventory';
import HorizontalStepper from '../HorizontalStepper/HorizontalStepper';


class Survey extends Component {
	constructor(props) {
		super(props)

		this.state = {
			takePhoto: false
		}
	}

	componentWillMount() {
		this.setClarfaiInfo();
	}


	setClarfaiInfo() {
		util.getClarifaiInfo().then(clarfaiInfo => {
			console.log('clarfaiInfo', clarfaiInfo);
		});
	}

	setScreenshot(screenshot) {
		this.setState({ screenshot });
	}

	render() {
		return (
			<div className='row'>
	    		<div className='col-md-6'>
					<VideoFeed 
						setScreenshot={this.setScreenshot.bind(this)}/>	
					<hr />	

					<PhotoInventory />			
				</div>

				<div className='col-md-6'>
					<HorizontalStepper screenshot={this.state.screenshot}/>
				</div>
			</div>
		)
		
	}
}

export default Survey