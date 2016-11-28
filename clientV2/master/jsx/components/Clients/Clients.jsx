import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
import ClientTable from './ClientTable';
import util from './../../../util/util';
import { browserHistory } from 'react-router';


class Clients extends React.Component {
    constructor(props) {
      super(props);

      this.state = { 
        moves: [] 
      }

      this.onTableClick = this.onTableClick.bind(this);
    }

    componentWillMount() {
      this.getAllMoves();
    }

    getAllMoves() {
      util.getAllMoves().then(moves => this.setState({ moves }))
    }

    onTableClick(user_id) {
      // redirect to user profile
      console.log('rerouting to:', user_id)
      const path = `/userProfile/${user_id}`;
      browserHistory.push(path);
    }

    render() {
      const { moves } = this.state;
      const { onTableClick } = this;
      console.log(moves, 'moves')
      return (
          <ContentWrapper>
            <Row>                 
                <ClientTable moves={ moves } onTableClick={ onTableClick } />
            </Row>
          </ContentWrapper>
      );
    }
}

export default Clients;