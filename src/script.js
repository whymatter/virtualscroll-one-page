window.addEventListener('scroll', onScroll);

var viewportWidth = document.documentElement.clientWidth;
var viewportHeight = document.documentElement.clientHeight;

var secondImage = document.querySelector('#person-image-2');
var firstScreen = document.querySelector('#first-screen');
var pcImage = document.querySelector('#pc-image');

var pcImageWidth = 7842;
var pcImageHeight = 5137;

var innerData = getInnerData(pcImage);
var innerWidth = getInnerWidth(innerData);
var innerHeight = getInnerHeight(innerData);

// starting scale
var widthScale = getImageScaleFactor(innerWidth, viewportWidth);
var heightScale = getImageScaleFactor(innerHeight, viewportHeight);
var usedScale = Math.min(widthScale, heightScale);
var scale = buildScale(usedScale);
var scaledWidth = scale(pcImageWidth);
var scaledHeight = scale(pcImageHeight);
var leftX  = -scale(getLeftX(innerData)) - ((scale(innerWidth) - viewportWidth) / 2);
var upperY = -scale(getUpperY(innerData)) - ((scale(innerHeight) - viewportHeight) / 2);

// final scale
var width2Scale = getImageScaleFactor(pcImageWidth, viewportWidth);
var height2Scale = getImageScaleFactor(pcImageHeight, viewportHeight);
var used2Scale = Math.min(width2Scale, height2Scale);
var scale2 = buildScale(used2Scale);
var scaledWidth2 = scale2(pcImageWidth);
var scaledHeight2 = scale2(pcImageHeight);
var leftX2  = -((scale2(pcImageWidth) - viewportWidth) / 2);
var upperY2 = -((scale2(pcImageHeight) - viewportHeight) / 2);

pcImage.style.backgroundSize = `${scaledWidth}px ${scaledHeight}px`;
pcImage.style.backgroundPosition = `${leftX}px ${upperY}px`;

firstScreen.style.width = `${viewportWidth}px`;
firstScreen.style.height = `${viewportHeight}px`;

function onScroll(e, a) {
    var percent = window.scrollY/viewportHeight;

    if (percent <= 0.5) {
        firstScreen.style.transform = `scale(1.0)`;
        secondImage.style.clipPath = `polygon(0 ${100-(percent*100)}%, 0 100%, 100% 100%, 100% ${(percent*100)}%)`;

        firstScreen.style.width = `${viewportWidth}px`;
        firstScreen.style.height = `${viewportHeight}px`;
        
        firstScreen.style.top = `0px`;
        firstScreen.style.left = `0px`;

        pcImage.style.backgroundSize = `${scaledWidth}px ${scaledHeight}px`;
        pcImage.style.backgroundPosition = `${leftX}px ${upperY}px`;
    } else if (percent <= 1.5) {
        
        pcImage.style.backgroundSize = `${scaledWidth2}px ${scaledHeight2}px`;
        pcImage.style.backgroundPosition = `${leftX2}px ${upperY2}px`;

        var s = Math.min(
            pcImageWidth / innerWidth,
            pcImageHeight / innerHeight
        );

        var scaledWidth4 = viewportWidth / s;
        var scaledHeight4 = viewportHeight / s;

        // firstScreen.style.transform = `scale3d(${scaledWidth4 / viewportWidth}, ${scaledHeight4 / viewportHeight}, 1.0)`

        firstScreen.style.width = `${scaledWidth4}px`;
        firstScreen.style.height = `${scaledHeight4}px`;

        firstScreen.style.top = `${scale2(getUpperY(innerData))+upperY2}px`;
        firstScreen.style.left = `${scale2(getLeftX(innerData))+leftX2}px`;

        console.log(scale2(getUpperY(innerData)), upperY2, leftX2);

        // var thisPercent = percent - 0.5;

        // var deltaWidth = scaledWidth - viewportWidth;
        // var deltaHeight = scaledHeight - viewportHeight;
        
        // pcImage.style.backgroundSize = `${scaledWidth - deltaWidth * thisPercent}px ${scaledHeight - deltaHeight * thisPercent}px`;
        // pcImage.style.backgroundPosition = `${leftX - leftX * thisPercent}px ${upperY - upperY * thisPercent}px`;

        // var thisPercent = percent - 0.5;

        // var deltaWidth = pcImageScaledWidth - viewportWidth;
        // var deltaHeight = pcImageScaledHeight - viewportHeight;

        // pcImage.style.backgroundSize = `${pcImageScaledWidth - deltaWidth * thisPercent}px ${pcImageScaledHeight - deltaHeight * thisPercent}px`;
        // pcImage.style.backgroundPosition = `${pcImageScaledLeftX - pcImageScaledLeftX * thisPercent}px ${pcImageScaledUpperY - pcImageScaledUpperY * thisPercent}px`;
        
        // var targetWidth = innerWidth / (pcImageWidth / viewportWidth);
        // var targetHeight = innerHeight / (pcImageHeight / viewportHeight);

        // firstScreen.style.transform = `scale3d(${1-(1-targetWidth / viewportWidth)*thisPercent}, ${1-(1-targetHeight / viewportHeight)*thisPercent}, 1.0)
        // translate3d(${-60*thisPercent}px, ${-240*thisPercent}px, 0px)`;
    }
}

function getLeftX(innerData) {
    return innerData[0];
}

function getUpperY(innerData) {
    return innerData[1];
}

function getInnerData(element) {
    return JSON.parse(element.getAttribute('data-inner'));
}

function getInnerWidth(innerData) {
    return innerData[2] - innerData[0];
}

function getInnerHeight(innerData) {
    return innerData[3] - innerData[1];
}

function getImageScaleFactor(innerWidth, clientWidth) {
    return innerWidth / clientWidth;
}

function buildScale(scale) {
    return function (x) {
        return x / scale;
    }
}