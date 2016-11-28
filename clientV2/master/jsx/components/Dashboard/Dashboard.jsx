import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';

class Dashboard extends React.Component {

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    { /* END Language list */ } 
                    Dashboard
                    <small data-localize="dashboard.WELCOME">Welcome to MoveKick!!</small>
                </div>

                <Row>                 
                </Row>
            </ContentWrapper>
        );
    }
}

export default Dashboard;
