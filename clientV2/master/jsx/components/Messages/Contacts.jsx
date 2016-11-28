import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table, Pagination } from 'react-bootstrap';

class Contacts extends React.Component {
    componentDidMount() {
    }
    
    render() {
      var ddTitle = (<em className="fa fa-ellipsis-v fa-lg text-muted"></em>);
      return (
        <Col md={4}>
          {/******** Contacts *******/}
          <div className="panel panel-default">
              { /* START table-header */ }
              <div className="panel-heading">
                  <Row>
                      <Col lg={ 12 }>
                          <div className="input-group">
                              <input type="text" placeholder="Search" className="input-sm form-control" />
                              <span className="input-group-btn">
                                <button type="button" className="btn btn-sm btn-default">Search</button>
                              </span>
                          </div>
                      </Col>
                  </Row>
              </div>
              { /* START table-responsive */ }
              <Table id="table-ext-1" responsive bordered hover>
                  <thead>
                      <tr>
                          <th>Contacts</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>
                             <div className="media">
                                <div className="media-left media-middle">
                                   <a href="#">
                                      <img src="img/user/04.jpg" alt="Contact" className="media-object img-circle img-thumbnail thumb48" />
                                   </a>
                                </div>
                                <div className="media-body pt-sm">
                                   <div className="text-bold">Floyd Ortiz
                                      <div className="text-sm text-muted">12m ago</div>
                                   </div>
                                </div>
                             </div>
                          </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="media">
                             <div className="media-left media-middle">
                                <a href="#">
                                   <img src="img/user/05.jpg" alt="Contact" className="media-object img-circle img-thumbnail thumb48" />
                                </a>
                             </div>
                             <div className="media-body pt-sm">
                                <div className="text-bold">Luis Vasquez
                                   <div className="text-sm text-muted">2h ago</div>
                                </div>
                             </div>
                          </div>
                        </td>
                      </tr>
                  </tbody>
              </Table>
              { /* END table-responsive */ }
              <div className="panel-footer">
                  
              </div>
          </div>
          { /* END panel */ }
        </Col> 
    );
  }

}

export default Contacts;
