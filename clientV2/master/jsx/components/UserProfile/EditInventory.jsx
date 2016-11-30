import React, { Component } from 'react';
import util from './../../../util/util';
import { Button } from 'react-bootstrap';

class EditInventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
      cft: 0,
      going: true,
      pbo: false,
      comment: ''
    };
  }

  componentWillMount() {
    const { quantity, cft, going, pbo, comment } = this.props.modalItem;
    this.setState({ quantity, cft, going, pbo, comment });
  }

  handleIncrement(boundState) {
    this.setState({[boundState]: this.state[boundState] + 1})
  }

  handleDecrement(boundState) {
    this.setState({[boundState]: this.state[boundState] > 0 ? this.state[boundState] - 1 : 0})
  }

  updateInventory() {
    const { handleModal, modalItem } = this.props;
    const inventory = Object.assign({}, modalItem, this.state);
    // close modal, reset modalItem to null
    handleModal(false, null);
    // submit updated inventory to server
    console.log('SUBMIT EDITED INVENTORY TO SERVER', inventory);
  }

  renderCounter(title, boundState) {
    return (
      <div style={styles.parent}>
        {title}
        <div style={styles.counter}>
          <span 
            onClick={() => this.handleDecrement(boundState)} 
            className="fa fa-angle-left fa-2x" 
            aria-hidden="true"></span>
          <span>{this.state[boundState]}</span>
          <span 
            onClick={() => this.handleIncrement(boundState)} 
            className="fa fa-angle-right fa-2x" 
            aria-hidden="true"></span>
        </div>
      </div>
    )
  }

  renderCheckbox(title, boundState) {
    return (
      <div style={styles.parent}>
        {title}
        <div style={styles.counter}>
          <input 
            type="checkbox" 
            onChange={(event) => this.setState({[boundState]: event.target.checked})} 
            checked={this.state[boundState]}/>
        </div>
      </div>
    )
  }

  render() {
    const { name } = this.props.modalItem;
    return (
      <div style={styles.container} id='topLevel'>
        <div style={styles.titleContainer}>
          <div>{ name }</div>
        </div>
        
        <div style={styles.hr}><hr/></div>

        {this.renderCounter('Item Count', 'quantity')}
        {this.renderCounter('Cubic Feet', 'cft')}
        {this.renderCheckbox('Is Going', 'going')}
        {this.renderCheckbox('Packed by Owner', 'pbo')}

        <div style={styles.parent}>
          <textarea rows='4' 
            onChange={(event) => this.setState({comment: event.target.value})} 
            value={this.state.note}
            style={styles.textarea}
            placeholder={'Add Notes'}></textarea>
        </div>
        <hr />
        <Button block bsStyle="primary" onClick={this.updateInventory.bind(this)}>Update Inventory</Button>

      </div>
    )
  }
}

export default EditInventory;

const styles = {
  titleContainer: {
    width: '100%',
    height: '4vh',
    display: 'flex',
    backgroundColor: '#B3DBF2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  RaisedButton: {
    width: '100%',
    marginTop: '3%'
  },
  textarea: {
    width: '100%',
    paddingLeft: 10,
    paddingTop: 10,
    borderRadius: 2,
    border: '1px solid gainsboro',
    marginTop: '1.5%'
  },
  parent: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center'
  },
  counter: {
    width: '25%', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    margin: 0
  },
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'space-between'
  },
  hr: {
    width: '100%',
    height: '1px',
    display: 'flex',
    borderTop: '1px solid gainsboro'
  }
}