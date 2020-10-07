import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startGame, answerCorrectly, answerIncorrectly } from '../../actions';
import UserButtons from './UserButtons';
import Timer from '../Timer';
import { GAME_STATUS } from '../../constants';
import { getDifficultiesForScore } from './difficulty';
import Equation from './Equation';

import './game.scss';

const mapStateToProps = (state) => ({
  equation: state.game.equation,
  gameStatus: state.game.status,
  userHighScore: state.game.userHighScore,
  score: state.game.score
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps,
    isEquationCorrect = stateProps.equation.isCorrect();

  return {
    ...ownProps,
    ...stateProps,
    onStartGame: () => dispatch(startGame()),
    onTrueClick: () => dispatch(isEquationCorrect ? answerCorrectly() : answerIncorrectly()),
    onFalseClick: () => dispatch(!isEquationCorrect ? answerCorrectly() : answerIncorrectly())
  }
};

class Game extends PureComponent {
  render() {
    const difficulties = getDifficultiesForScore(this.props.score);

    return (
      <div className="my-app__game">
        <div className="my-app__g__wrapper">
          <Equation equation={this.props.equation} difficulties={difficulties} />
          <Timer />
          {this.renderUserButtons(difficulties)}
        </div>
        {this.renderStats()}
      </div>
    );
  }

  renderUserButtons(difficulties) {
    const { gameStatus, onTrueClick, onFalseClick } = this.props;
    return (gameStatus === GAME_STATUS.ONGOING) && (
        <UserButtons difficulties={difficulties} onTrueClick={onTrueClick} onFalseClick={onFalseClick} />
      );
  }

  renderStats() {
    return (
      <div className="my-app__g__stats">
        <div className="my-app__gs__score"> Score - {this.props.score} </div>
        <div className="my-app__gs__high-score"> Your High Score - {this.props.userHighScore} </div>
        <div className="my-app__gs__highest-score"> Highest Score - {this.props.highestScore} </div>
      </div>
    );
  }
}

Game.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  equation: PropTypes.object.isRequired,
  highestScore: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  userHighScore: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(Game);
