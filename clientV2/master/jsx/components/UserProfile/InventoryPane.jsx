import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Tab, Nav, NavItem, ListGroup, ListGroupItem } from 'react-bootstrap';

class InventoryPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventory: []
    }
  }

  render() {
    const {inventory} = this.state;
    return (
      <Tab.Pane eventKey="inventoryPane">
         <div className="panel b">
            <div className="panel-heading bg-gray-lighter text-bold">Inventory</div>
            <div className="panel-body">
              <h4 className="page-header">Move Inventory</h4>
              <div className="row-masonry row-masonry-md-4 row-masonry-sm-2">
                  {inventory.map(item => (
                    <div className="col-masonry">
                        <img src={ item.url } alt="" className="img-thumbnail img-responsive" />
                    </div>
                  ))}
              </div>
            </div>
         </div>
      </Tab.Pane>
    )
  }
}

export default InventoryPane;