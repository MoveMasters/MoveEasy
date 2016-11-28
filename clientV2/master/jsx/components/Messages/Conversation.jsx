import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table, Pagination } from 'react-bootstrap';

class Conversation extends React.Component {
  componentDidMount() {
  }

  render() {
    var ddTitle = (<em className="fa fa-ellipsis-v fa-lg text-muted"></em>);
    return (
      <Col md={ 8 }>
      {/******** Conversation *******/}
          <div className="panel panel-default">
              <div className="panel-heading">
                  <div className="pull-right label label-danger">5</div>
                  <div className="pull-right label label-success">12</div>
                  <div className="panel-title">Conversation with Selected Client (from left)</div>
              </div>
              { /* START list group */ }
              <div data-height="180" data-scrollable="" className="list-group">
                  { /* START list group item */ }
                  <a href="#" className="list-group-item">
                      <div className="media-box">
                          <div className="pull-left">
                              <img src="img/user/02.jpg" alt="Image" className="media-box-object img-circle thumb32" />
                          </div>
                          <div className="media-box-body clearfix">
                              <small className="pull-right">2h</small>
                              <strong className="media-box-heading text-primary">
                                                <span className="circle circle-success circle-lg text-left"></span>Catherine Ellis</strong>
                              <p className="mb-sm">
                                  <small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small>
                              </p>
                          </div>
                      </div>
                  </a>
                  { /* END list group item */ }
                  { /* START list group item */ }
                  <a href="#" className="list-group-item">
                      <div className="media-box">
                          <div className="pull-left">
                              <img src="img/user/03.jpg" alt="Image" className="media-box-object img-circle thumb32" />
                          </div>
                          <div className="media-box-body clearfix">
                              <small className="pull-right">3h</small>
                              <strong className="media-box-heading text-primary">
                                                <span className="circle circle-success circle-lg text-left"></span>Jessica Silva</strong>
                              <p className="mb-sm">
                                  <small>Cras sit amet nibh libero, in gravida nulla. Nulla facilisi.</small>
                              </p>
                          </div>
                      </div>
                  </a>
                  { /* END list group item */ }
                  { /* START list group item */ }
                  <a href="#" className="list-group-item">
                      <div className="media-box">
                          <div className="pull-left">
                              <img src="img/user/09.jpg" alt="Image" className="media-box-object img-circle thumb32" />
                          </div>
                          <div className="media-box-body clearfix">
                              <small className="pull-right">4h</small>
                              <strong className="media-box-heading text-primary">
                                                <span className="circle circle-danger circle-lg text-left"></span>Jessie Wells</strong>
                              <p className="mb-sm">
                                  <small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small>
                              </p>
                          </div>
                      </div>
                  </a>
                  { /* END list group item */ }
                  { /* START list group item */ }
                  <a href="#" className="list-group-item">
                      <div className="media-box">
                          <div className="pull-left">
                              <img src="img/user/12.jpg" alt="Image" className="media-box-object img-circle thumb32" />
                          </div>
                          <div className="media-box-body clearfix">
                              <small className="pull-right">1d</small>
                              <strong className="media-box-heading text-primary">
                                                <span className="circle circle-danger circle-lg text-left"></span>Rosa Burke</strong>
                              <p className="mb-sm">
                                  <small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small>
                              </p>
                          </div>
                      </div>
                  </a>
                  { /* END list group item */ }
                  { /* START list group item */ }
                  <a href="#" className="list-group-item">
                      <div className="media-box">
                          <div className="pull-left">
                              <img src="img/user/10.jpg" alt="Image" className="media-box-object img-circle thumb32" />
                          </div>
                          <div className="media-box-body clearfix">
                              <small className="pull-right">2d</small>
                              <strong className="media-box-heading text-primary">
                                                <span className="circle circle-danger circle-lg text-left"></span>Michelle Lane</strong>
                              <p className="mb-sm">
                                  <small>Mauris eleifend, libero nec cursus lacinia...</small>
                              </p>
                          </div>
                      </div>
                  </a>
                  { /* END list group item */ }
              </div>
              { /* END list group */ }
              { /* START panel footer */ }
              <div className="panel-footer clearfix">
                  <div className="input-group">
                      <input type="text" placeholder="Send Message" className="form-control input-sm" />
                      <span className="input-group-btn">
                        <button type="submit" className="btn btn-default btn-sm"><i className="fa fa-search"></i>
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