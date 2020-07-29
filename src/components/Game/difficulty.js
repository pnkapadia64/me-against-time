// Score upper limit
const DIFFICULTY_LEVEL_SCORES = [10, 15, 25, 33, 40];

export const RANDOM_BUTTONS = 'random_buttons';
export const RANDOM_FORMAT = 'random_format';   // eq format: a+b=c or c=a+b
export const MOVING_NUMBERS_SLOW = 'moving_numbers_slow';
export const MOVING_NUMBERS_FAST = 'moving_numbers_fast';
export const BLUR_NUMBERS = 'blur_numbers';

const DIFFICULTY_TYPES = [
    [],
    [RANDOM_BUTTONS],
    [RANDOM_FORMAT, RANDOM_BUTTONS],
    [RANDOM_BUTTONS, MOVING_NUMBERS_SLOW],
    [MOVING_NUMBERS_FAST],
    [RANDOM_BUTTONS, RANDOM_FORMAT, MOVING_NUMBERS_SLOW],
    [RANDOM_BUTTONS, MOVING_NUMBERS_FAST],
    [RANDOM_FORMAT, RANDOM_BUTTONS, MOVING_NUMBERS_FAST],
    [BLUR_NUMBERS]
];

export const getDifficultiesForScore = (score) => {
    const currentDifficultyIndex = DIFFICULTY_LEVEL_SCORES.findIndex(
        (difficultyScore) => (score < difficultyScore)
    );
    const difficulties = DIFFICULTY_TYPES[currentDifficultyIndex];
    console.log('--diff--', difficulties);
    return difficulties;
};
