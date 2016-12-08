import React from 'react';
import util from './../../../util/util';
import AppointmentPopup from './../AppointmentPopup/AppointmentPopup';
import styles from './styles';
import moment from 'moment';
import BigCalendar, {events} from 'react-big-calendar';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';


BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const formats = {
   dayFormat: 'ddd MM/DD'
};


const moveToEvent = (move) => {
  console.log(move, 'move to event')
  const surveyTime = new Date(move.surveyTime);
  const endTime = new Date(surveyTime);
  endTime.setDate(surveyTime.getDate() + 30/(24*60));
  return {
    title: move.name,
    start: surveyTime,
    end: endTime,
    allDay: false,
    user_id: move.user_id
  };
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }

  componentWillMount() {
    this.getAllMoves()
  }

  getAllMoves() {
    util.getAllMoves().then( moves => {
      const events = moves.map(moveToEvent)
      this.setState({ events });
    });
  }
  
  handleEventClick(e) {
    const user_id = e.user_id;

    console.log('redirecting to:', user_id)
    // redirect to user profile
    const path = `/userProfile/${user_id}`;
    // browserHistory.push(path);
    this.props.history.push(path)
  }

  render() {
    return (
      <ContentWrapper>
        <Row>  
          <BigCalendar
          defaultView='week'
          views={['week', 'day']}
          timeslots={4}
          step={15}
          events={this.state.events}
          defaultDate={new Date()}
          formats={formats}
          min={moment('6:00am', 'h:mma').toDate()}
          onSelectEvent= {(e) => this.handleEventClick(e)}
          />  
      </Row>
    </ContentWrapper>
    )
  }
};

export default Calendar;