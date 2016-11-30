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
  if (hrs > 0) {
    return (hrs + ' hr');
  } else if (mins > 0) {
    return (mins + ' min');
  } else {
    return (secs + ' sec');
  }
};

class Conversation extends React.Component {
  componentDidMount() {
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
                  <img src="img/user/02.jpg" alt="Image" className="media-box-object img-circle thumb32" />
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

  render() {
    var ddTitle = (<em className="fa fa-ellipsis-v fa-lg text-muted"></em>);
    const name = (!!this.props.userSelected) ? this.props.userSelected.name : '';
    return (
      <Col md={ 8 }>
      {/******** Conversation *******/}
          <div className="panel panel-default">
              <div className="panel-heading">
                  <div className="pull-right label label-danger">5</div>
                  <div className="pull-right label label-success">12</div>
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
                      <input id="message-input" type="text" placeholder="Send Message" className="form-control input-sm" />
                      <span className="input-group-btn">
                        <button type="submit" className="btn btn-default btn-sm"
                          onClick={this.props.onMessageSend} ><i className="fa fa-search"></i>
                        </button>
                      </span>
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