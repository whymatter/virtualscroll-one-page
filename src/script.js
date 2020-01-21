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
var widthScale = getImageScaleFactor(innerWidth, viewportWidth);
var heightScale = getImageScaleFactor(innerHeight, viewportHeight);

var biggerScale = Math.min(widthScale, heightScale);

var pcImageScaledWidth = pcImageWidth/biggerScale;
var pcImageScaledHeight = pcImageHeight/biggerScale;

var pcImageScaledLeftX = -getLeftX(innerData)/biggerScale;
var pcImageScaledUpperY = -getUpperY(innerData)/biggerScale;

pcImage.style.backgroundSize = `${pcImageScaledWidth}px ${pcImageScaledHeight}px`;
pcImage.style.backgroundPosition = `${pcImageScaledLeftX}px ${pcImageScaledUpperY}px`;


function onScroll(e, a) {
    var percent = window.scrollY/viewportHeight;

    if (percent <= 0.5) {
        firstScreen.style.transform = `scale(1.0)`;
        secondImage.style.clipPath = `polygon(0 ${100-(percent*100)}%, 0 100%, 100% 100%, 100% ${(percent*100)}%)`;

    } else if (percent <= 1.5) {        
        var thisPercent = percent - 0.5;

        var deltaWidth = pcImageScaledWidth - viewportWidth;
        var deltaHeight = pcImageScaledHeight - viewportHeight;

        pcImage.style.backgroundSize = `${pcImageScaledWidth - deltaWidth * thisPercent}px ${pcImageScaledHeight - deltaHeight * thisPercent}px`;
        pcImage.style.backgroundPosition = `${pcImageScaledLeftX - pcImageScaledLeftX * thisPercent}px ${pcImageScaledUpperY - pcImageScaledUpperY * thisPercent}px`;
        
        var targetWidth = innerWidth / (pcImageWidth / viewportWidth);
        var targetHeight = innerHeight / (pcImageHeight / viewportHeight);

        firstScreen.style.transform = `scale3d(${1-(1-targetWidth / viewportWidth)*thisPercent}, ${1-(1-targetHeight / viewportHeight)*thisPercent}, 1.0)
        translate3d(${-60*thisPercent}px, ${-240*thisPercent}px, 0px)`;
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