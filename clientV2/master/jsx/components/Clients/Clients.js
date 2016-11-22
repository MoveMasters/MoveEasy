import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
import ClientTable from './ClientTable';

class Clients extends React.Component {

    render() {
        return (
            <ContentWrapper>
              <div className="content-heading">
                  { /* END Language list */ } 
                  Clients
                  <small data-localize="dashboard.CLIENTS">Review upcoming moves</small>
              </div>

              <Row>                 
                  <ClientTable />
              </Row>
            </ContentWrapper>
        );
    }
}

export default Clients;