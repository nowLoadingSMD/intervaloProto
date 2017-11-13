var mic;
var raio;
var fft
var osc;

function setup(){
  createCanvas(500, 500);
  mic = new p5.AudioIn()
  mic.start();
  raio = 0;
  fft = new p5.FFT();
  fft.setInput(mic);

osc = new p5.Oscillator();
osc.setType('sine');
osc.freq(240);
osc.amp(0);
osc.start();
osc.connect(mic);
}

function draw(){
  background(0);
  micLevel = mic.getLevel();
  fill(200);
  raio = width/2 - micLevel * width/2
  ellipse(width/2, constrain(height-micLevel*height*5, 0, height), 50, 50);


  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], -1, 1, -height/2, height/2);
    vertex(x, y + height/2);
  }
  endShape();

  // ramp amplitude to 0 over 0.5 seconds
     osc.amp(0, 0.5);
     playing = false;
     backgroundColor = color(255,0,255);

  console.log(fft.getEnergy(2, 20000));
}
