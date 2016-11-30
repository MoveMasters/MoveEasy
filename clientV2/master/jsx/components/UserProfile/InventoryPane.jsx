import React, { Component } from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Button, Tab, Nav, NavItem, ListGroup, ListGroupItem } from 'react-bootstrap';
import util from './../../../util/util';

class InventoryPane extends Component {
  render() {
    const { inventory, showModal } = this.props;
    return (
      <Tab.Pane eventKey="inventoryPane">
         <div className="panel b">
            <div className="panel-heading bg-gray-lighter text-bold">Inventory</div>
            <div className="panel-body">
              <div>
                  {inventory.map(item => (
                    <div key={ item.url } className="col-md-3" onClick={ () => showModal(true, item) }>
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