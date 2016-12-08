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
      console.log(this.props, 'this.props')
      // redirect to user profile
      const path = `/userProfile/${user_id}`;
      this.props.history.push(path)
      // this.context.router.push(path);
      // browserHistory.push(path);
    }

    filterMoves(query) {
      let moves;
      if (query.length > 0) {
        moves = this.moves.filter( move => {
          let name = move.name.toLowerCase();
          return name.includes(query.toLowerCase())
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