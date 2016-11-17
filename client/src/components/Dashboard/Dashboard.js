import React from 'react';
import util from './../../../util/util';
import styles from './styles';
import moment from 'moment';
import BigCalendar, {events} from 'react-big-calendar';


BigCalendar.momentLocalizer(moment); // or globalizeLocalizer


let formats = {
   dayFormat: 'ddd MM/DD'
};


const defaultEvents = [{
  title: 'test',
  start: moment().add(1, 'days').subtract(5, 'hours').toDate(),
  end: moment().add(1, 'days').subtract(4, 'hours').toDate(),
  allDay: false
},
{
  title: 'test all day',
  start: moment().toDate(),
  end: moment().toDate(),
  allDay: true
}];


const moveToEvent = (move) => {
  return {
    title: move.name,
    start: move.surveyTime
  }
}

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      events: defaultEvents
    };
    this.getAllMoves();
  }

  getAllMoves() {
    util.getAllMoves().then( moves => {
      //this.setState({events: moves.map(moveToEvent)});
    });
  }

  render() {
    return (
      <div>
        <BigCalendar
        defaultView="week"
        views={['week', 'day', 'agenda']}
        timeslots={4}
        step={15}
        min={moment('12:00am', 'h:mma').toDate()}
        max={moment('11:59pm', 'h:mma').toDate()}
        events={this.state.events}
        defaultDate={new Date()}
        formats={formats}
        />
      </div>
    )
  }
};


export default Dashboard;