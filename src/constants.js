export const MAX_NUM = 20;
export const MIN_NUM = 1;
export const TIMER_SEC = 3;
export const TIMER_BASE = 10;
export const TIMER_OFFSET = TIMER_SEC * TIMER_BASE;

export const GAME_STATUS = {
  DEFAULT: 'default', // not started (menu)
  ONGOING: 'ongoing', // ongoing - timer on
  OVER: 'over' // game over - lost
};

export const DEFAULT_STATE = {
  game: {
    userHighScore: 0,
    highScoreCreated: false,
    score: 0,
    status: GAME_STATUS.DEFAULT
  },
  timer: {
    timer: TIMER_OFFSET,
    ongoing: false
  }
};

export const OPERATORS = {
  ADD: {
    symbol: '+',
    operate(a, b) {
      return a + b;
    }
  },
  SUBTRACT: {
    symbol: '-',
    operate(a, b) {
      return a - b;
    }
  }
  // MULTIPLY:  {
  // 	symbol: 'x',
  // 	operate(a, b) {
  // 		return a*b;
  // 	}
  // },
  // DIVIDE:  {
  // 	symbol: '/',
  // 	operate(a, b) {
  // 		if (b === 0)
  // 			return undefined;
  // 		return a/b;
  // 	}
  // }
};
