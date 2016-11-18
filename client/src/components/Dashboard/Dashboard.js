import React from 'react';
import util from './../../../util/util';
import styles from './styles';
import moment from 'moment';
import BigCalendar, {events} from 'react-big-calendar';
import { browserHistory } from 'react-router'

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const formats = {
   dayFormat: 'ddd MM/DD'
};

const moveToEvent = (move) => {
  const surveyTime = new Date(move.surveyTime);
  const endTime = new Date(surveyTime);
  endTime.setDate(surveyTime.getDate() + 30/(24*60));
  return {
    title: move.name,
    start: surveyTime,
    end: endTime,
    allDay: false,
    moveId: move._id
  };
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };

    this.getAllMoves();
  }

  onSelectEvent (event) {
    const moveId = event.moveId;
    const path = `/survey/${moveId}`
    browserHistory.push(path)
  }

  getAllMoves() {
    util.getAllMoves().then( moves => {
      const moveEvents = moves.map(moveToEvent);
      this.setState({events: moveEvents});
    });
  }

  render() {
    return (
      <div>
        <BigCalendar
        defaultView="week"
        views={['week', 'day']}
        timeslots={4}
        step={15}
        events={this.state.events}
        defaultDate={new Date()}
        formats={formats}
        min={moment('6:00am', 'h:mma').toDate()}
        max={moment('8:00pm', 'h:mma').toDate()}
        popup= {true}
        onSelectEvent= {this.onSelectEvent.bind(this)}
        />
      </div>
    )
  }
};

export default Dashboard;