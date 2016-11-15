import React, { Component } from 'react';
import styles from './styles';
import Cropper from 'cropperjs';
import util from './../../../util/util';

let cropper, container, remoteStream;

class ImageCropper extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		container = this;
	}

	componentWillRender() {
		this.props.getRemoteStream();
	}


	cropAndSend() {
	  let image = this.refs.screenshot.toDataURL('image/jpeg');
	  let base64Image = image.replace(/^data:image\/(jpeg|png|jpg);base64,/, "").toString('base64')
	  util.postImageToClarifai(base64Image)
	  this.props.setPhotoState(false);
	}


	render() {
		{console.log(this.props.screenshot)}
		return (
			<div>
			    <div className='img-container' style={styles.imageContainer}>
					<img src={this.props.screenshot} ref='screenshot' />
				</div>
			</div>
		)
	}
}

export default ImageCropper;