import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class AppointmentPopup extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  handleOpen()  {
    this.setState({open: true});
  };

  handleClose () {
    console.log('test');
    this.setState({open: false});
    this.props.resetSelection();
  };

  handleRedirect () {
    const moveId = this.props.move._id;
    const path = `/survey/${moveId}`
    browserHistory.push(path);
  }

  render() {
    const move = this.props.move;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Join"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleRedirect.bind(this)}
      />,
    ];

    const moveDate = move.moveTime ? new Date(move.moveTime).getDay() : 'TBD'

    return (
      <div>
        <Dialog
          title={this.props.move.name}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          Phone: {move.phone}<br/>
          Survey Time: {move.surveyTime}<br/>
          Move Date: {moveDate}<br/>
          Current Address: {move.currentAddress}<br/>
          Future Address: {move.futureAddress}
        </Dialog>
      </div>
    );
  }
}


export default AppointmentPopup;