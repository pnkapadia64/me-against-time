import React from 'react';
import PropTypes from 'prop-types';
import './userButtons.scss';
import { RANDOM_BUTTONS } from './difficulty';

const isTrueFirstButton = (difficulties = []) => {
  if (difficulties.indexOf(RANDOM_BUTTONS) === -1) {
    return true;
  }

  const isFirst = Math.random() > 0.5;
  return isFirst;
};

class UserButtons extends React.PureComponent {
  isTrueFirst = true;

  onKeyDown = (event) => {
    if (event.keyCode === 39) {
      this.isTrueFirst ? this.props.onFalseClick() : this.props.onTrueClick();
    }
    if (event.keyCode === 37) {
      this.isTrueFirst ? this.props.onTrueClick() : this.props.onFalseClick();
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    this.isTrueFirst = isTrueFirstButton(nextProps.difficulties);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  render() {
    const { onTrueClick, onFalseClick } = this.props;
    return (
      <div className="user-buttons">
        {this.isTrueFirst && <div className="user-buttons__btn user-buttons__btn--true" onClick={onTrueClick}>True</div>}
        <div className="user-buttons__btn user-buttons__btn--false" onClick={onFalseClick}>False</div>
        {!this.isTrueFirst && <div className="user-buttons__btn user-buttons__btn--true" onClick={onTrueClick}>True</div>}
      </div>
    );
  }
};

UserButtons.propTypes = {
  difficulties: PropTypes.arrayOf(PropTypes.string),
  onTrueClick: PropTypes.func.isRequired,
  onFalseClick: PropTypes.func.isRequired
};

export default UserButtons;
