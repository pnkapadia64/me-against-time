import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { TIMER_OFFSET } from '../../constants';
import './timer.scss';

const mapStateToProps = (state) => ({
  timer: state.timer.timer
});

const Timer = ({ timer }) => {
  const timePassed = TIMER_OFFSET - timer,
    percent = timePassed * 100 / TIMER_OFFSET,
    timerStyle = { width: `${percent}%` };

  return (
    <div className="timer">
      <div className="timer__progress">
        <div className="timer__p__over" style={timerStyle}/>
      </div>
    </div>
  );
};

Timer.propTypes = {
  timer: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(Timer);
