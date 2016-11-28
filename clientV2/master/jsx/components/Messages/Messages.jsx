import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';

import Contacts from './Contacts';
import Conversation from './Conversation';

class Messages extends React.Component {

    render() {
        return (
            <ContentWrapper>
              <Row>                 
                  <Contacts />
                  <Conversation />
              </Row>
            </ContentWrapper>
        )
    }
}

export default Messages;