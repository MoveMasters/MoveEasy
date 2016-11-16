import React from 'react';
import util from './../../../util/util';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styles from './styles';
import InventoryList from './../InventoryList/InventoryList';
import Screenshot from './../Screenshot/Screenshot';
import SearchBar from './../SearchBar/SearchBar';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class HorizontalStepper extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
    currentItems: []
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 1,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  updateChoices = (event) => {
    const searchTerm = event.target.value;
    this.setState({
      currentItems: util.filterSearch(searchTerm)
    });
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <div className='col-md-6' style={styles.colSix}>
              <Screenshot screenshot={this.props.screenshot} style={styles.colSix} />
            </div>
            <div>
              <SearchBar onChange={this.updateChoices.bind(this)} />
            </div>
            <div className='col-md-6' style={styles.inventory}>
              <InventoryList currentItems={this.state.currentItems} screenshot={this.props.screenshot} handleNext={this.handleNext.bind(this)} />
            </div>
          </div>
          )
      default:
        return <div>You\'re a long way from home sonny jim!'</div>;
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div>
        <Stepper activeStep={stepIndex} style={styles.stepper}>
          <Step>
            <StepLabel onClick={this.handlePrev}>Select Item</StepLabel>
          </Step>
          <Step>
            <StepLabel>Add to Inventory</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
            <div>
              <div>{this.getStepContent(stepIndex)}</div>
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  onClick={this.handlePrev}
                  style={{marginRight: 12, display: 'none'}}
                />
                <RaisedButton
                  label={stepIndex === 1 ? 'Finish' : 'Next'}
                  primary={true}
                  onTouchTap={this.handleNext}
                  onClick={this.handleNext}
                  style={{display: 'none'}}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default HorizontalStepper;