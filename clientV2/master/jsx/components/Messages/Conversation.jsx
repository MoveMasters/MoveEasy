import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table, Pagination } from 'react-bootstrap';
import moment from 'moment';


const msToTime = (totalMs) => {
  var ms = totalMs % 1000;
  var s = (totalMs - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;
  var days = Math.round(hrs / 24);
  hrs = hrs % 24;
  if (days > 0) {
    if (days > 1) {
      return (days + ' days ago');
    } else {
      return ('1 day ago');
    }
  } else if (hrs > 0) {
    if (hrs > 1) {
      return (hrs + ' hours ago');
    } else {
      return ('1 hour ago');
    }
  } else if (mins > 0) {
    if (mins > 1) {
      return (mins + ' minutes ago');
    } else {
      return ('1 minute ago');
    }
  } else {
    if (secs > 1) {
      return (secs + ' seconds ago');
    } else {
      return ('1 second ago');
    }
  }
};

class Conversation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    }
  }

  renderMessage(message) {
    const sender = (!!message.moverName) ? message.moverName : message.customerName;
    console.log('message', message, sender);
    const currentTime = new Date();
    const messageTime = new Date(message.createdAt);
    const diff = currentTime - messageTime;
    const timeStr = msToTime(diff);

    return (
      <a href="#" className="list-group-item" key={message._id}>
          <div className="media-box">
              <div className="pull-left">
                  <img src="https://t3.ftcdn.net/jpg/01/06/07/16/240_F_106071621_UwCztl7yyMbVNSMijfuYyZrzbtmoxJPH.jpg" alt="Image" className="media-box-object img-circle thumb32" />
              </div>
              <div className="media-box-body clearfix">
                  <small className="pull-right">{timeStr}</small>
                  <strong className="media-box-heading text-primary">
                                    <span className="circle circle-success circle-lg text-left"></span>{sender}</strong>
                  <p className="mb-sm">
                      <small>{message.text}</small>
                  </p>
              </div>
          </div>
      </a>
    );
  }

  handleKeyPress(event) {
    if(event.key == 'Enter') {
      const { message } = this.state;
      const { onMessageSend } = this.props;
      console.log('sending message', message)
      onMessageSend(message);
      this.setState({ message: '' })
    }
  }

  render() {
    var ddTitle = (<em className="fa fa-ellipsis-v fa-lg text-muted"></em>);
    const name = (!!this.props.userSelected) ? this.props.userSelected.name : '';
    const { message } = this.state;
    return (
      <Col md={ this.props.colNum }>
      {/******** Conversation *******/}
          <div className="panel panel-default">
              <div className="panel-heading">
                  <div className="panel-title">{name}</div>
              </div>
              { /* START list group */ }
              <div data-height="180" data-scrollable="" className="list-group">
                  { /* START list group item */ }
                  {this.props.displayedConvo.map(this.renderMessage.bind(this))}
                  { /* END list group item */ }
              </div>
              { /* END list group */ }
              { /* START panel footer */ }
              <div className="panel-footer clearfix">
                  <div className="input-group">
                      <input 
                        id="message-input" 
                        type="text" 
                        placeholder="Say something then press enter..." 
                        className="form-control input-sm"
                        onChange={ e => this.setState({ message: e.target.value })}
                        value={ message }
                        onKeyPress={(e) => this.handleKeyPress(e)}/>
                  </div>
              </div>
              { /* END panel-footer */ }
          </div>
      { /* END conversation */ }
      </Col> 
    );
  }

}

export default Conversation;