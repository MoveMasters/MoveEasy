import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
import Calendar from './../Calendar/Calendar';

class Dashboard extends React.Component {

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    { /* END Language list */ } 
                    Main Dashboard
                    <small data-localize="dashboard.WELCOME">Move Stats</small>
                </div>

                <Row>                 
                    <div>Dashboard Goes here!!!</div>
                </Row>
            </ContentWrapper>
        );
    }
}

export default Dashboard;
