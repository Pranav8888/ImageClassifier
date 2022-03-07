let mobilenet;
let video;
let label = '';
let confidence = 0;
let accuracy = 0;

function gotResults (error, results) {
    if (error) {
        console.error(error);
    } else {
        label = results[0].label;
        confidence = results[0].confidence;
        mobilenet.predict(gotResults);
    }
}

function modelReady() {
    console.log("Model is ready!");
    mobilenet.predict(gotResults);
}

function setup() {
    createCanvas(2*windowWidth/3, windowHeight - 50);
    video = createCapture(VIDEO);
    video.hide()
    background(0);
    mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() {
    background(0)
    image(video, 0, 0, 2*windowWidth/3, windowHeight - 130);
    fill(255);
    textSize(24);
    text(label, 10, height - 40);
    if(frameCount % 60 === 0) {
        accuracy = Math.floor(confidence * 100);
    }
    fill(255, 255, 0);
    textSize(18);
    text(`${accuracy}%`, 10, height - 10);
}