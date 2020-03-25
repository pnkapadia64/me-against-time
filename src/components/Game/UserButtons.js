import React, { PropTypes } from 'react';
import './userButtons.scss';

const UserButtons = ({ onTrueClick, onFalseClick }) => (
  <div className="user-buttons">
    <div className="user-buttons__btn user-buttons__btn--true" onClick={onTrueClick}>True</div>
    <div className="user-buttons__btn user-buttons__btn--false" onClick={onFalseClick}>False</div>
  </div>
);

UserButtons.propTypes = {
  onTrueClick: PropTypes.func.isRequired,
  onFalseClick: PropTypes.func.isRequired
};

export default UserButtons;
