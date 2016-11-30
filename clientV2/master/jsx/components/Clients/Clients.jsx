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
      util.getAllMoves().then(moves => {
        this.setState({ moves });
        this.moves = moves;
      })
    }

    onTableClick(user_id) {
      // redirect to user profile
      const path = `/userProfile/${user_id}`;
      browserHistory.push(path);
    }

    filterMoves(query) {
      let moves;
      if (query.length > 0) {
        moves = this.moves.filter( move => {
          let moveString = JSON.stringify(move).toLowerCase();
          return moveString.includes(query.toLowerCase())
        })
      } else {
        moves = this.moves;
      }
      console.log('setting moves to', moves);
      this.setState({ moves })
    }

    render() {
      const { moves } = this.state;
      const { onTableClick, filterMoves } = this;
      console.log(moves, 'moves')
      return (
          <ContentWrapper>
            <Row>                 
                <ClientTable 
                  moves={ moves } 
                  onTableClick={ onTableClick } 
                  filterMoves={ filterMoves.bind(this) }/>
            </Row>
          </ContentWrapper>
      );
    }
}

export default Clients;