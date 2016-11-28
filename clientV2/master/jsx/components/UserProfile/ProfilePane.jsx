import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Tab, Nav, NavItem, ListGroup, ListGroupItem } from 'react-bootstrap';

class ProfilePane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Peter Pan',
      phone: '123456789',
      email: 'whatever@gmail.com',
      origin: '1234 nowhere lane',
      destination: '5678 somewhere lane',
      moveDate: Date.now()
    }
  }

  onInputChange(e, state) {
    this.setState({ [state]: e.target.value })
  }

  handleUpdateUserProfile() {
    console.log('SEND UPDATED USER PROFILE INFO TO SERVER');
    console.log(this.state);
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');

  }

  render() {
    const { name, phone, email, origin, destination, moveDate } = this.state;
    return (
      <Tab.Pane eventKey="profilePane">
         <div className="panel b">
            <div className="panel-heading bg-gray-lighter text-bold">Client Profile</div>
            <div className="panel-body">
               <form action="">
                  <div className="form-group">
                     <label>Name</label>
                     <input value={ name } type="text" className="form-control" onChange={(e) => this.onInputChange(e, 'name')}/>
                  </div>
                  <div className="form-group">
                     <label>Phone</label>
                     <input value={ phone }type="text" className="form-control" onChange={(e) => this.onInputChange(e, 'phone')}/>
                  </div>
                  <div className="form-group">
                     <label>Email</label>
                     <input value={ email }type="text" className="form-control" onChange={(e) => this.onInputChange(e, 'email')}/>
                  </div>
                  <div className="form-group">
                     <label>Origin</label>
                     <input value={ origin }type="text" className="form-control" onChange={(e) => this.onInputChange(e, 'origin')}/>
                  </div>
                  <div className="form-group">
                     <label>Destination</label>
                     <input value={ destination }type="text" className="form-control" onChange={(e) => this.onInputChange(e, 'destination')}/>
                  </div>
                  <div className="form-group">
                     <label>Move Date</label>
                     <input value={ moveDate }type="text" className="form-control" onChange={(e) => this.onInputChange(e, 'moveDate')}/>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-info"
                    onClick={this.handleUpdateUserProfile.bind(this)}>Update User Profile</button>
                  <p>
                     <small className="text-muted">* Click to update user profile settings</small>
                  </p>
               </form>
            </div>
         </div>
      </Tab.Pane>
    )
  }
}

export default ProfilePane;