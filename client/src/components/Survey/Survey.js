import React, { Component } from 'react';
import VideoFeed from './../VideoFeed/VideoFeed';
import NavigationBar from './../NavigationBar/NavigationBar'
import util from './../../../util/util';
import PhotoInventory from './../PhotoInventory/PhotoInventory';
import HorizontalStepper from './../HorizontalStepper/HorizontalStepper';


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

	handleScreenshot(screenshot) {
		this.setState({ screenshot });
		// let base64Image = screenshot.replace(/^data:image\/(jpeg|png|jpg);base64,/, "").toString('base64')
		// util.postImageToClarifai(base64Image).then(data => console.log(data));
	}

	render() {
		return (
			<div className='row'>
	    		<div className='col-md-6'>
					<VideoFeed 
						handleScreenshot={this.handleScreenshot.bind(this)}/>	
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