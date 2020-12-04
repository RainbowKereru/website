import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Appointments,
  AppointmentTooltip,
  WeekView,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';

import './index.css';
const SHIFT_KEY = 16;

export default class DashboardCalendar extends React.Component{

constructor(props) {
    super(props);
    this.state = {
      data:[], 
      currentDate: '2018-06-27',
      isShiftPressed: false,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyDown(event) {
    if (event.keyCode === SHIFT_KEY) {
      this.setState({ isShiftPressed: true });
    }
  }

  onKeyUp(event) {
    if (event.keyCode === SHIFT_KEY) {
      this.setState({ isShiftPressed: false });
    }
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      const { isShiftPressed } = this.state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        if (isShiftPressed) {
          const changedAppointment = data.find(appointment => changed[appointment.id]);
          const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
          data = [
            ...data,
            { ...changedAppointment, id: startingAddedId, ...changed[changedAppointment.id] },
          ];
        } else {
          data = data.map(appointment => (
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment));
        }
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render(){
  const { currentDate, data } = this.state;

  return (
    <div className="calendar-view">
      
    <Paper >
        <Scheduler
          data={data}
          height={'100%'}
        >
          <ViewState
            currentDate={currentDate}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <IntegratedEditing />

          <WeekView
            startDayHour={9}
            endDayHour={17}
          />
          <Appointments />
          <AppointmentTooltip
            showDeleteButton
          />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    </div>
  );
  }
}
