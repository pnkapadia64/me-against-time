import React, { PropTypes, } from 'react';
import './userButtons.scss';

class UserButtons extends React.PureComponent {
  onKeyDown = (event) => {
    if (event.keyCode === 39) {
      this.props.onFalseClick();
    }
    if (event.keyCode === 37) {
      this.props.onTrueClick();
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  render() {
    const { onTrueClick, onFalseClick } = this.props;
    return (
      <div className="user-buttons">
        <div className="user-buttons__btn user-buttons__btn--true" onClick={onTrueClick}>True</div>
        <div className="user-buttons__btn user-buttons__btn--false" onClick={onFalseClick}>False</div>
      </div>
    );
  }
};

UserButtons.propTypes = {
  onTrueClick: PropTypes.func.isRequired,
  onFalseClick: PropTypes.func.isRequired
};

export default UserButtons;
