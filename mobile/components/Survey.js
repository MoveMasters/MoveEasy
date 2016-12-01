'use strict';

import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  ListView,
  Dimensions,
} from 'react-native';
import {
  Button,
  Icon,
  Spinner,
  Title,
} from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';

import io from 'socket.io-client/socket.io';
import Dashboard from './Dashboard';

// const socket = io.connect('https://react-native-webrtc.herokuapp.com', {transports: ['websocket']});

import {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStreamTrack,
  getUserMedia,
} from 'react-native-webrtc';

const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

const pcPeers = {};
let localStream;

function getLocalStream(isFront, callback) {
  MediaStreamTrack.getSources(sourceInfos => {
    console.log(sourceInfos);
    let videoSourceId;
    for (const i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];
      if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
        videoSourceId = sourceInfo.id;
      }
    }
    getUserMedia({
      audio: true,
      video: {
        mandatory: {
          minWidth: 750, // Provide your own width, height and frame rate here
          minHeight: 1334,
          minFrameRate: 30,
        },
        facingMode: 'environment',
        optional: [{ sourceId: sourceInfos.id }, { minFrameRate: 60 }],
      }
    }, function (stream) {
      console.log('dddd', stream);
      callback(stream);
    }, logError);
  });
}

function join(roomID) {
  socket.emit('join', roomID, function(socketIds){
    console.log('join', socketIds);
    for (var i in socketIds) {
      var socketId = socketIds[i];
      createPC(socketId, true);
    }
  });
}

function createPC(socketId, isOffer) {
  const pc = new RTCPeerConnection(configuration);
  pcPeers[socketId] = pc;

  pc.onicecandidate = function (event) {
    console.log('onicecandidate', event.candidate);
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
      }, logError);
    }, logError);
  }

  pc.onnegotiationneeded = function () {
    console.log('onnegotiationneeded');
    if (isOffer) {
      createOffer();
    }
  }

  pc.oniceconnectionstatechange = function(event) {
    console.log('oniceconnectionstatechange', event.target.iceConnectionState);
    if (event.target.iceConnectionState === 'completed') {
      setTimeout(() => {
        getStats();
      }, 1000);
    }
    if (event.target.iceConnectionState === 'connected') {
      createDataChannel();
    }
  };
  pc.onsignalingstatechange = function(event) {
    console.log('onsignalingstatechange', event.target.signalingState);
  };

  pc.onaddstream = function (event) {
    console.log('onaddstream', event.stream);
    container.setState({ info: 'One peer join!' });

    // const remoteList = container.state.remoteList;
    // remoteList[socketId] = event.stream.toURL();
    container.setState({ remoteViewSrc: event.stream.toURL() });
    container.setState({ content: 'survey' });
  };
  pc.onremovestream = function (event) {
    console.log('onremovestream', event.stream);
  };

  pc.addStream(localStream);
  function createDataChannel() {
    if (pc.textDataChannel) {
      return;
    }
    const dataChannel = pc.createDataChannel("text");

    dataChannel.onerror = function (error) {
      console.log("dataChannel.onerror", error);
    };

    dataChannel.onmessage = function (event) {
      console.log("dataChannel.onmessage:", event.data);
      container.receiveTextData({user: socketId, message: event.data});
    };

    dataChannel.onopen = function () {
      console.log('dataChannel.onopen');
      container.setState({textRoomConnected: true});
    };

    dataChannel.onclose = function () {
      console.log("dataChannel.onclose");
    };

    pc.textDataChannel = dataChannel;
  }
  return pc;
}

function exchange(data) {
  const fromId = data.from;
  let pc;
  if (fromId in pcPeers) {
    pc = pcPeers[fromId];
  } else {
    pc = createPC(fromId, false);
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
          }, logError);
        }, logError);
    }, logError);
  } else {
    console.log('exchange candidate', data);
    pc.addIceCandidate(new RTCIceCandidate(data.candidate));
  }
}

function leave(socketId) {
  console.log('leave', socketId);
  const pc = pcPeers[socketId];
  const viewIndex = pc.viewIndex;
  pc.close();
  delete pcPeers[socketId];

  container.setState({ remoteViewSrc: null,  content: 'end' });
  container.setState({info: 'One peer leave!'});
}

function logError(error) {
  console.log("logError", error);
}

function mapHash(hash, func) {
  const array = [];
  for (const key in hash) {
    const obj = hash[key];
    array.push(func(obj, key));
  }
  return array;
}

function getStats() {
  const pc = pcPeers[Object.keys(pcPeers)[0]];
  if (pc.getRemoteStreams()[0] && pc.getRemoteStreams()[0].getAudioTracks()[0]) {
    const track = pc.getRemoteStreams()[0].getAudioTracks()[0];
    console.log('track', track);
    pc.getStats(track, function(report) {
      console.log('getStats report', report);
    }, logError);
  }
}

const getItem = async (item, cb) => {
  try {
    const value = await AsyncStorage.getItem(item);
    if (value !== null) {
      cb(value);
    }
  } catch (error) {
    console.log('Error submitting new move info:', error);
  }
};

/** **********************************************************  **/
/** ***************************APP****************************  **/
/** **********************************************************  **/
let container;
let socket;

export default class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => true });
    this.state = {
      info: 'Initializing',
      status: 'init',
      roomID: '',
      isFront: false,
      selfViewSrc: null,
      remoteViewSrc: null,
      textRoomConnected: false,
      textRoomData: [],
      textRoomValue: '',
      content: 'begin',
      moveId: null,
    };

    this._textRoomPress = this._textRoomPress.bind(this);
  }

  componentDidMount() {
    container = this;

    // Create socket connection AFTER this component has loaded
    // Necessary because attempting to create the connection on
    // initial load of the app crashes the application
    // socket = io.connect('https://react-native-webrtc.herokuapp.com', { transports: ['websocket'] });
    socket = io.connect('https://react-native-webrtc.herokuapp.com', { transports: ['websocket'] });
    socket.on('exchange', data => exchange(data));
    socket.on('leave', socketId => leave(socketId));
    socket.on('connect', (data) => {
      console.log('connect');
      getLocalStream(true, (stream) => {
        localStream = stream;
        container.setState({ selfViewSrc: stream.toURL() });
        container.setState({ status: 'ready', info: 'Please enter or create room ID' });
      });
    });
  }

  goToDashboard() {
    this.props.navigator.push({
      component: Dashboard,
      passProps: {
        content: 'inventory',
      },
    });
  }

  _textRoomPress() {
    for (const key in pcPeers) {
      const pc = pcPeers[key];
      pc.textDataChannel.send('capture');
    }
  }

  joinRoom() {
    getItem('moveId', (moveId) => {
      join(moveId);
      this.setState({ content: 'loading', moveId });
    });
  }

  endCall() {
    this.setState({
      selfViewSrc: null,
      remoteViewSrc: null,
      content: 'end',
    });
  }

  renderContent() {
    console.log('this is the state', this.state.content);
    if (this.state.content === 'begin') {
      return (
        <View alignSelf="center">
          <Button
            success
            onPress={() => this.joinRoom()}
          >
            Begin Survey
          </Button>
        </View>
      );
    } else if (this.state.content === 'loading') {
      return (
        <View alignSelf="center">
          <Title>Waiting for your surveyor to connect...</Title>
          <Spinner color="blue" />
        </View>
      );
    } else if (this.state.content === 'end') {
      return (
        <View alignSelf="center">
          <Button
            success
            onPress={this.endCall}
          >
            End Call
          </Button>
        </View>
      );
    }

    return null;
  }


  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
        <RTCView streamURL={this.state.selfViewSrc} style={this.state.content === 'survey' ? styles.selfView : styles.hidden}>
          <RTCView streamURL={this.state.remoteViewSrc} style={styles.remoteView} />
          <TouchableHighlight style={styles.switchButton} onPress={this._textRoomPress}>
            <Ionicon name="md-aperture" size={60} style={{ color: 'white' }} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.switchButton} onPress={this.endCall}>
            <Ionicon name="md-aperture" size={60} style={{ color: 'red' }} />
          </TouchableHighlight>
        </RTCView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  switchButton: {
    height: 60,
    width: 60,
    margin: 20,
    alignSelf: 'center',
  },
  remoteView: {
    backgroundColor: 'grey',
    height: 100,
    width: 100,
    top: 20,
    left: 15,
  },
  selfView: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
  },
  listViewContainer: {
    height: 150,
  },
  hidden: {
    height: 0,
    width: 0,
  },
});

