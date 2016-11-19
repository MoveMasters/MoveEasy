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

  state = {
    finished: false,
    stepIndex: 0
  };

  handleNext = (item) => {
    const {stepIndex} = this.state;

    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 1
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
            <div className='col-md-6' style={styles.inventory}>
              <SearchBar updateChoices={this.props.updateChoices.bind(this)} />
              <hr />
              <InventoryList
                currentItems={this.props.currentItems}
                handleNext={this.handleNext.bind(this)} 
                setSelectedItem={this.props.setSelectedItem}/>
            </div>
          )
      default:
        return (
            <div className='col-md-6' style={styles.inventory}>
              <AddToInventory 
                selectedItem={this.props.selectedItem} 
                stepIndex={stepIndex}
                handleNext={this.handleNext.bind(this)}
                screenshots={this.props.screenshots}
                dequeueItem={this.props.dequeueItem}
                moveId={this.props.moveId}
                updateInventory={this.props.updateInventory}
                openNote={this.props.openNote}/>
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
    console.log('calling render next')
    if (this.props.screenshots.length > 0) {
      console.log('rendering next')
      event.preventDefault();
      this.setState({stepIndex: 0, finished: false});
    } else {
      return (
        <div className='col-md-12' style={styles.colSix}>
          <p>Waiting for another item...</p>
          <WaitingBar />
        </div>
      )
    }
  }

  renderWelcomeScreen() {
    return (
      <div className='col-md-12' style={styles.colSix}>
        <p>Welcome to Move Kick</p>
      </div>
    )
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {width: '100%', marginRight: 15};
    let itemsLeft = this.props.screenshots.length;

    return (
      <div style={styles.container}>
        {this.renderStepper(stepIndex)}
        <div style={contentStyle}>
          {finished ? this.renderNextItem(stepIndex) : 
           itemsLeft === 0 && !finished ? this.renderWelcomeScreen() :
          (
            <div>
              <div className='col-md-6' style={styles.colSix}>
                <Screenshot 
                  screenshots={this.props.screenshots} 
                  style={styles.colSix} 
                  dequeueItem={this.props.dequeueItem}
                  renderNextItem={this.renderNextItem.bind(this)}
                  setSelectedItem={this.props.setSelectedItem}/>
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