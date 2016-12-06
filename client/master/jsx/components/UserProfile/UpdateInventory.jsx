import React, { Component } from 'react';
import util from './../../../util/util';
import { Form, Col, FormGroup, InputGroup, Button, FormControl, ControlLabel, Checkbox } from 'react-bootstrap';

class UpdateInventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
      cft: 0,
      going: true,
      pbo: false,
      comment: '',
      room: 'Family Room'
    };
  }

  componentWillMount() {
    const { quantity, cft, going, pbo, comment } = this.props.modalItem;
    this.setState({ quantity, cft, going, pbo, comment });
  }

  updateItem() {
    const { handleModal, modalItem, updateInventory } = this.props;
    const item = Object.assign({}, modalItem, this.state);
    // close modal, reset modalItem to null
    handleModal(false, null);
    console.log('updating item to:', item)
    util.updateItem(item).then(() => {
      updateInventory();
    });

  }

  handleIncrement(e, boundState) {
    // remove focus
    e.target.blur();
    this.setState({[boundState]: this.state[boundState] + 1})
  }

  handleDecrement(e, boundState) {
    // remove focus
    e.target.blur();
    this.setState({[boundState]: this.state[boundState] > 0 ? this.state[boundState] - 1 : 0})
  }

  render() {
    const { quantity, cft, going, pbo, room, comment } = this.state;
    const { name } = this.props.modalItem;
    return (
      <div id='topLevel'>
        <div 
          className="h4 text-center" 
          style={{width: '100%'}}>{ name }</div>
        <hr/>
          <Form horizontal>
            {/* START QUANTITY NUMBER PICKER*/}
            <FormGroup style={styles.quantity}>
              <Col componentClass={ControlLabel} sm={3}>
                Quanity
              </Col>
              <Col sm={9}>
                 <InputGroup>
                   <InputGroup.Button>
                     <Button onClick={ e => this.handleDecrement(e, 'quantity')}>
                      <em className="fa fa-minus-square-o"></em>
                     </Button>
                   </InputGroup.Button>
                   <FormControl 
                    type="text" 
                    onChange={e => this.setState({ quantity: this.target.value })}
                    value={ quantity } />
                   <InputGroup.Button>
                     <Button onClick={ e => this.handleIncrement(e, 'quantity')}>
                      <em className="fa fa-plus-square-o"></em>
                     </Button>
                   </InputGroup.Button>
                 </InputGroup>
               </Col>
             </FormGroup>

             {/* END QUANTITY NUMBER PICKER */}

            {/* START CFT NUMBER PICKER*/}
            <FormGroup style={styles.formGroup}>
              <Col componentClass={ControlLabel} sm={3}>
                Cubic Feet
              </Col>
              <Col sm={9}>
                 <InputGroup>
                   <InputGroup.Button>
                     <Button onClick={ e => this.handleDecrement(e, 'cft')}>
                      <em className="fa fa-minus-square-o"></em>
                     </Button>
                   </InputGroup.Button>
                   <FormControl 
                    type="text" 
                    onChange={e => this.setState({ cft: this.target.value })}
                    value={ cft } />
                   <InputGroup.Button>
                     <Button onClick={ e => this.handleIncrement(e, 'cft')}>
                      <em className="fa fa-plus-square-o"></em>
                     </Button>
                   </InputGroup.Button>
                 </InputGroup>
               </Col>
             </FormGroup>
             {/* END CFT NUMBER PICKER */}

            {/* START ROOM PICKER*/}
            <FormGroup style={styles.formGroup}>
              <Col componentClass={ControlLabel} sm={3}>
                Room
              </Col>
              <Col sm={9}>
                 <InputGroup>
                   <FormControl 
                    type="text" 
                    placeholder="Room" 
                    onChange={(e) => this.setState({room: e.target.value})} 
                    value={ room }/>
                 </InputGroup>
               </Col>
             </FormGroup>
             {/* END ROOM NUMBER PICKER */}

            {/* START CHECKBOX*/}

            <FormGroup style={styles.formGroup}>
                  <Col smOffset={3} sm={4}>
                    <Checkbox
                      onChange={ e => this.setState({going: e.target.checked}) } 
                      checked={ going }>Going</Checkbox>
                  </Col>
                  <Col smOffset={1} sm={4}>
                    <Checkbox
                      onChange={ e => this.setState({pbo: e.target.checked}) } 
                      checked={ pbo }>Pbo</Checkbox>
                  </Col>
            </FormGroup>

            {/* END CHECKBOX*/}

            <FormGroup style={styles.formGroup}>
              <Col componentClass={ControlLabel} sm={3}>
                Notes
              </Col>

              <Col sm={9}>
                <textarea rows='4' 
                  onChange={(e) => this.setState({comment: e.target.value})} 
                  value={ comment }
                  style={styles.textarea}
                  placeholder={'Add Notes'}></textarea>
              </Col>
            </FormGroup>


            {/* START ADD TO INVENTORY*/}

            <FormGroup style={styles.formGroup}>
              <Button 
                bsSize="large" 
                bsStyle='danger'
                style={styles.updateItem}
                onClick={ this.updateItem.bind(this) }
                block>Update Item</Button>
            </FormGroup>

            {/* END ADD TO INVENTORY*/}

            </Form>
      </div>
    )
  }
}

export default UpdateInventory;

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
    alignContent: 'space-between',
    maxWidth: '100%'
  },
  hr: {
    width: '100%',
    height: '1px',
    display: 'flex',
    borderTop: '1px solid gainsboro'
  },
  formGroup: {
    paddingTop: '1.5vh'
  },
  quantity: {
    paddingTop: '3vh'
  },
  updateItem: {
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
  }
}