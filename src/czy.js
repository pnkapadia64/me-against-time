let crazysdk;
let lastAdTime;

const shouldShowAd = () => {
    if (!lastAdTime) {
        lastAdTime = Date.now();
        return true;
    }
    const shownAMinAgo = (Date.now() - lastAdTime) > (1000 * 60);
    if (shownAMinAgo) {
        lastAdTime = Date.now();
    }
    return shownAMinAgo;
};

export const initCZY = () => {
    crazysdk = window.CrazyGames.CrazySDK.getInstance();
    crazysdk.init();
};

export const czyShowMidgameAd = (adCallback) => {
    if (!shouldShowAd()) {
        adCallback();
        return;
    }

    const callbackFinishFn = () => {
        crazysdk.removeEventListener('adFinished', callbackFinishFn);
        adCallback();
    };
    const callbackErrorFn = () => {
        crazysdk.removeEventListener('adError', callbackErrorFn);
        adCallback();
    };

    crazysdk.addEventListener('adFinished', callbackFinishFn);
    crazysdk.addEventListener('adError', callbackErrorFn);

    crazysdk.requestAd('midgame');
}

export const czyStartGame = () => crazysdk.gameplayStart();

export const czyStopGame = () => crazysdk.gameplayStop();

export const czyShowHappytime = () => crazysdk.happytime();
