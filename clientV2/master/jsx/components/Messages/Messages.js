import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';

class Messages extends React.Component {

    render() {
        return (
            <ContentWrapper>
              <div className="content-heading">
                  Messages
                  <small data-localize="dashboard.WELCOME">Here's your messages!</small>
              </div>

              <Row>                 
                  <div>Messages Goes here!!!</div>
              </Row>
            </ContentWrapper>
        );
    }
}

export default Messages;