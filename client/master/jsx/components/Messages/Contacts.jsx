import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Table, Pagination } from 'react-bootstrap';

class Contacts extends React.Component {

  constructor(props) {
    super(props);
  }

  renderUser(user) {
    return (
      <tr key={user._id} id={user._id} onClick={this.props.onProfileClick}>
          <td>
            <div className="media-left media-middle">
               <a href="#">
                  <img src="https://t3.ftcdn.net/jpg/01/06/07/16/240_F_106071621_UwCztl7yyMbVNSMijfuYyZrzbtmoxJPH.jpg" alt="Contact" className="media-object img-circle img-thumbnail thumb48" />
               </a>
            </div>
             <div className="media" >
                <div className="media-body pt-sm">
                   <div className="text-bold">{user.name}
                   </div>
                </div>
             </div>
          </td>
      </tr>
    );
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
                            <input type="text" placeholder="Search"
                            onChange={this.props.onContactType}
                            className="input-sm form-control" />
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
                  {this.props.contacts.map(this.renderUser.bind(this))}
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
