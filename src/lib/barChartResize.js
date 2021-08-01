export const xIntervalFont = (width) => {
    if(width > 780) {
        return 1;
    }
    if(width > 650) {
        return 0.9;
    }
    if(width > 570) {
        return 0.7;
    }
    if(width > 460) {
        return 0.6;
    }
    if(width > 420) {
        return 0.5;
    }
    return 0.4;
}

export const xIntervalHeight = (width) => {
    if(width > 900) {
        return 160;
    }
    if(width > 780) {
        return 140;
    }
    if(width > 650) {
        return 120;
    }
    if(width > 570) {
        return 100;
    }
    if(width > 460) {
        return 80;
    }
    if(width > 420) {
        return 70;
    }
    if(width > 350) {
        return 60;
    }
    return 56;
}

export const barLabelFont = (width) => {
    if(width > 650) {
        return 0.7;
    }
    if(width > 570) {
        return 0.5;
    }
    if(width > 460) {
        return 0.4;
    }
    return 0.3;
}

export const labelFont = (width) => {
    if(width > 460) {
        return 1;
    }
    return 0.7;
}