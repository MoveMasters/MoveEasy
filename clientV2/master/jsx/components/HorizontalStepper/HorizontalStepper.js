import React from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import injectTapEventPlugin from 'react-tap-event-plugin';
import styles from './styles';
import InventoryList from './../InventoryList/InventoryList';
import Screenshot from './../Screenshot/Screenshot';
import SearchBar from './../SearchBar/SearchBar';
import AddToInventory from './../AddToInventory/AddToInventory';
import WaitingBar from './../WaitingBar/WaitingBar';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class HorizontalStepper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      selectedItem: null
    };
  }

  handleNext (item) {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 1,
      selectedItem: item
    });
  }

  handlePrev () {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  renderStepContent(stepIndex) {
    const { 
      updateChoices, 
      inventoryList, 
      attachName, 
      getCurrentItem, 
      dequeueItem, 
      updateInventory,
      moveId,
      openSnackbar
    } = this.props;

    switch (stepIndex) {
      case 0:
        return (
            <div className='col-md-6' style={styles.inventory}>
              <SearchBar updateChoices={updateChoices.bind(this)} />
              <hr />
              <InventoryList
                inventoryList={ inventoryList }
                handleNext={this.handleNext.bind(this)} 
                attachName={ attachName }/>
            </div>
          )
      default:
        return (
          <div className='col-md-6' style={styles.inventory}>
            <AddToInventory 
              getCurrentItem={ getCurrentItem } 
              stepIndex={ stepIndex }
              handleNext={this.handleNext.bind(this)}
              dequeueItem={ dequeueItem }
              updateInventory={ updateInventory }
              moveId={ moveId }
              openSnackbar={ openSnackbar }/>
          </div>
        )
    }
  }

  renderStepper(stepIndex) {
    return (
      <Stepper activeStep={stepIndex} style={styles.stepper}>
        <Step>
          <StepLabel onClick={this.handlePrev}>Select Item</StepLabel>
        </Step>
        <Step>
          <StepLabel>Add to Inventory</StepLabel>
        </Step>
      </Stepper>
    )
  }

  renderNextItem(stepIndex) {
    event.preventDefault();
    this.setState({stepIndex: 0, finished: false});
  }


  render() {
    console.log(this.props, 'from HorizontalStepper')
    const { finished, stepIndex } = this.state;
    const contentStyle = {width: '100%', marginRight: 15};
    const { queue, dequeueItem } = this.props;

    return (
      <div style={styles.container}>
        {this.renderStepper(stepIndex)}
        <div style={contentStyle}>

          {finished ? this.renderNextItem(stepIndex) : 

          (
            <div>
              <div className='col-md-6' style={styles.colSix}>
                <Screenshot 
                  queue={queue}
                  dequeueItem={ dequeueItem } 
                  style={styles.colSix} 
                  handleNext={this.handleNext.bind(this)}/>
              </div>

              {this.renderStepContent(stepIndex)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default HorizontalStepper;