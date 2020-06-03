const getGA = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    return gtag;
}

export const initGA = () => {
    const gtag = getGA();
    gtag('js', new Date());
    gtag('config', 'UA-168495299-1');
};

export const sendGAHighestScore = (score) => {
    const gtag = getGA();
    gtag('event', 'highest_score', {
        'event-category': 'score',
        'event_label': score,
    });
};

export const sendGAUserScore = (score) => {
    const gtag = getGA();
    gtag('event', 'user_score', {
        'event-category': 'score',
        'event_label': score,
    })
};

export default getGA;
