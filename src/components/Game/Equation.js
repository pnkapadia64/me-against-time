import React from 'react';
import classnames from 'classnames';
import { MOVING_NUMBERS_SLOW, MOVING_NUMBERS_FAST, BLUR_NUMBERS, RANDOM_FORMAT } from './difficulty';

const renderQuestion = (nos, operator) => [
    <div className="my-app__gwe__number" key="no1">{nos[0]}</div>,
    <div className="my-app__gwe__operator" key="op">{operator.symbol}</div>,
    <div className="my-app__gwe__number" key="no2">{nos[1]}</div>
];

const renderAnswer = answer => <div className="my-app__gwe__number my-app__gwe__number--answer">{answer}</div>;

const Equation = ({ equation, difficulties = [] }) => {
    const { nos, operator, answer } = equation;
    const hasRandomFormat = difficulties.includes(RANDOM_FORMAT) && Math.random() > 0.5;
    const equationClass = classnames('my-app__gw__equation', {
        'move_slow': difficulties.includes(MOVING_NUMBERS_SLOW),
        'move_fast': difficulties.includes(MOVING_NUMBERS_FAST),
        'blink': difficulties.includes(BLUR_NUMBERS),
    });
    
    return (
        <div className={equationClass}>
            {hasRandomFormat ? renderAnswer(answer) : renderQuestion(nos, operator)}
            <div className="my-app__gwe__operator my-app__gwe__operator--equal">=</div>
            {hasRandomFormat ? renderQuestion(nos, operator) : renderAnswer(answer)}
        </div>
    );
}

export default Equation;
