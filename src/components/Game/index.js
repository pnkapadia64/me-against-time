import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';

import { startGame, answerCorrectly, answerIncorrectly } from '../../actions';
import UserButtons from './UserButtons';
import Timer from '../Timer';
import { GAME_STATUS } from '../../constants';

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
    return (
      <div className="my-app__game">
        <div className="my-app__g__wrapper">
          {this.renderGameQuestion()}
          <Timer />
          {this.renderUserButtons()}
        </div>
        {this.renderStats()}
      </div>
    );
  }

  renderGameQuestion() {
    const { equation: { nos, operator, answer } } = this.props;
    return (
      <div className="my-app__gw__equation">
        <div className="my-app__gwe__number">{nos[0]}</div>
        <div className="my-app__gwe__operator">{operator.symbol}</div>
        <div className="my-app__gwe__number">{nos[1]}</div>
        <div className="my-app__gwe__operator my-app__gwe__operator--equal">=</div>
        <div className="my-app__gwe__number my-app__gwe__number--answer">{answer}</div>
      </div>
    )
  }

  renderUserButtons() {
    const { gameStatus, onTrueClick, onFalseClick } = this.props;
    return (gameStatus === GAME_STATUS.ONGOING) && (
        <UserButtons onTrueClick={onTrueClick} onFalseClick={onFalseClick} />
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
  highestScore: PropTypes.number.isRequired,
  userHighScore: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(Game);
