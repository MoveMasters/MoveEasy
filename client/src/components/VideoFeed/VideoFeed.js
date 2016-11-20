import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import io from 'socket.io-client';
import styles from './styles';

/************************************* SOCKET IO******************************************/ 

// let socket = io('https://localhost:4443/');
let RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.msRTCPeerConnection;
let RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription || window.msRTCSessionDescription;
navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;

var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
let socket, localStream, remoteStream, container;
var pcPeers = {};

/************************************* SOCKET IO ******************************************/ 
const scale = .329;
const aspect = 1.3;
const room = 'ErikSuds';

class VideoFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			localStreamURL: null,
			remoteStreamURL: null,
			width: window.innerWidth,
			height: window.innerHeight
		}

		this._handleWindowResize = this._handleWindowResize.bind(this);
	}

	componentWillMount() {
		container = this;
		// establish socket connection
		socket = io('https://react-native-webrtc.herokuapp.com', {transports: ['websocket']});
	}

	componentDidMount() {
		// 
		socket.on('connect', (data) => {
		  console.log('connect');
		  this.getLocalStream();
		});

		socket.on('exchange', function(data){
		  console.log('exchange')
		  container.exchange(data);
		});

		socket.on('leave', function(socketId){
		  container.leave(socketId);
		});

  	window.addEventListener('resize', this._handleWindowResize);

		// auto join room
		console.log("CHANGE BACK TO: this.props.moveId")
		this.join(this.props.moveId);
		// this.join(room);

	}

	componentWillUnmount() {
	    window.removeEventListener('resize', this._handleWindowResize);
	}

	_handleWindowResize() {
		this.setState({ width: window.innerWidth, height: window.innerHeight })
	}

	logError(error, message) {
	  console.log(message + ': ', error);
	}

	// get local video stam from user and createObjectURL then attach that as the video source
	getLocalStream() {
	  navigator.getUserMedia({ "audio": true, "video": true }, (stream) => {
	    localStream = stream;
	    this.setState({ localStreamURL: URL.createObjectURL(stream) });
	  }, this.logError);
	}

	// 
	join(roomID) {
	  socket.emit('join', roomID, (socketIds) =>{
	    console.log('join', socketIds);
	    for (var i in socketIds) {
	      var socketId = socketIds[i];
	      this.createPC(socketId, true);
	    }
	  });
	}

	createPC(socketId, isOffer) {
	  var pc = new RTCPeerConnection(configuration);
	  pcPeers[socketId] = pc;

	  pc.onicecandidate = function (event) {
	    console.log('onicecandidate', event);
	    if (event.candidate) {
	      socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
	    }
	  };

	  function createOffer() {
	    pc.createOffer(function(desc) {
	      console.log('createOffer', desc);
	      pc.setLocalDescription(desc, function () {
	        console.log('setLocalDescription', pc.localDescription);
	        socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
	      }, container.logError);
	    }, container.logError);
	  }

	  pc.onnegotiationneeded = function () {
	    console.log('onnegotiationneeded');
	    if (isOffer) {
	      createOffer();
	    }
	  }

	  pc.oniceconnectionstatechange = function(event) {
	    console.log('oniceconnectionstatechange', event);
	    if (event.target.iceConnectionState === 'connected') {
	      createDataChannel();
	    }
	  };
	  pc.onsignalingstatechange = function(event) {
	    console.log('onsignalingstatechange', event);
	  };

	  pc.onaddstream = function (event) {
	    console.log('onaddstream', event);
	    let remoteStreamURL = URL.createObjectURL(event.stream);
	    container.setState({ remoteStreamURL });
	  };

	  pc.addStream(localStream);
	  
	  function createDataChannel() {
	    if (pc.textDataChannel) {
	      return;
	    }
	    var dataChannel = pc.createDataChannel("text");

	    dataChannel.onerror = function (error) {
	      console.log("dataChannel.onerror", error);
	    };

	    dataChannel.onmessage = function (event) {
	      console.log("dataChannel.onmessage:", event.data);
	      if (event.data === 'capture') {
	      	container.grabScreenshot();
	      }
	    };

	    dataChannel.onopen = function () {
	      console.log('dataChannel.onopen');
	    };

	    dataChannel.onclose = function () {
	      console.log("dataChannel.onclose");
	    };

	    pc.textDataChannel = dataChannel;
	  }

	  return pc;
	}

	// handle data exchange
	exchange(data) {
	  var fromId = data.from;
	  var pc;
	  if (fromId in pcPeers) {
	    pc = pcPeers[fromId];
	  } else {
	    pc = this.createPC(fromId, false);
	  }

	  if (data.sdp) {
	    console.log('exchange sdp', data);
	    pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
	      if (pc.remoteDescription.type == "offer")
	        pc.createAnswer(function(desc) {
	          console.log('createAnswer', desc);
	          pc.setLocalDescription(desc, function () {
	            console.log('setLocalDescription', pc.localDescription);
	            socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });
	          }, container.logError);
	        }, container.logError);
	    }, container.logError);
	  } else {
	    console.log('exchange candidate', data);
	    pc.addIceCandidate(new RTCIceCandidate(data.candidate));
	  }
	}

	leave(socketId) {
	  console.log('leave', socketId);
	  var pc = pcPeers[socketId];
	  pc.close();
	  delete pcPeers[socketId];
	}


	grabScreenshot() {
		let remoteStream = container.refs.remoteVideo;
		let video = remoteStream.player.player;
		let canvas = container.refs.canvas;
		canvas.width = this.state.width * scale;
  	canvas.height = this.state.width * aspect * scale;
  	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  	// create screenshot data object
		let screenshot = canvas.toDataURL("image/png");
		let id = Date.now();
		localStorage.setItem(id, screenshot);
		
		// set that as state in Survey Component
		container.props.handleScreenshot(id);
	}

	render() {
	    return (
			<div onClick={this.grabScreenshot.bind(this)}>
		        <ReactPlayer playing
		        	style={styles.localStream}
		        	url={this.state.localStreamURL}
		        	width={'150'}
		        	height={150 * (3/4)} />
		 
		        <ReactPlayer playing
		        	ref='remoteVideo'
		        	style={styles.remoteStream}  
		        	url={this.state.remoteStreamURL}
		        	width={this.state.width * scale}
		        	height={this.state.width * aspect * scale} />
	       		<canvas ref='canvas' style={{display: 'none'}}></canvas>
		     </div>
	    );
	}
}

export default VideoFeed
