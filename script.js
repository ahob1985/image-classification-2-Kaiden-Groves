// Author:

// Global UI Variables
let canvasDiv;

let canvas;

let textDiv;

let textP;

let buttonDiv;

let uploadButton;

let submitButton;

let resetButton;
//let canvasDiv;

// Global ML Variables
let mobilenet;

let img;
//let mobilenet;
canvasDiv = createDiv();

canvas = createCanvas(640, 480);

canvas.parent(canvasDiv);

textDiv = createDiv();

textP = createP("Model loading, please wait...");

textP.parent(textDiv);

textP.html("Upload an image to classify!");

uploadButton.style("display", "inline");

function setup() {
  mobilenet = ml5.imageClassifier("MobileNet", modelReady);
  buttonDiv = createDiv();

uploadButton = createFileInput(handleFile);

uploadButton.parent(buttonDiv);

uploadButton.style("display", "none");

submitButton = createButton("SUBMIT");

submitButton.parent(buttonDiv);

submitButton.mousePressed(predictImage);

submitButton.style("display", "none");

resetButton = createButton("RESET");

resetButton.parent(buttonDiv);

resetButton.mousePressed(resetCanvas);

resetButton.style("display", "none");
}

function draw() {

}

function modelReady() {

}

function resetCanvas() {
  background(255);

  submitButton.style("display", "none");
  
  modelReady();

resetButton.style("display", "none")
}

function handleFile(file) {
  if(file.type === "image") {
    img = loadImage(file.data, imageReady);
  } else {
    img = null;
  }
}

function imageReady() {
  image(img, 0, 0, width, height);
  submitButton.style("display", "inline");

resetButton.style("display", "inline");

uploadButton.style("display", "none");

textP.html("Image ready for classification!");
}

function predictImage() {
  mobilenet.classify(canvas, gotResults);
}

function gotResults(error, results) {

  if(error) {

    console.error(error);

  } else {
    submitButton.style("display", "none");
    

  }
  let label = results[0].label;

  let confidence = round(results[0].confidence, 2);

  textP.html("Label: " + label + " - Confidence " + confidence);
}