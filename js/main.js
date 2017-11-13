var notas = [];
var boxes = [];

var sounds;

var exercicios;
var exerciciosList = [];
var exercicioAtual = 0;

function preload(){
  sound = new Sounds();
}

function setup(){
  createCanvas(1280, 720);
  exercicios = new Exercicios();
  exercicioAtual = 0;

  for(var i = 0; i < 3; i++){
    box = new Box(200 * (i +1), 300, 100, 100);
    boxes.push(box);
  }

  for (var i = 0; i < 5; i++){
    exerciciosList.push(exercicios.getExercicio());
  }

  for (var i = 0; i < 3; i++){
    c = {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255)
    };
    nota = new Nota(random(200, 600), random(450, 600), exerciciosList[exercicioAtual].notas[i], boxes[i], c);
    notas.push(nota);
  }

}

function draw(){

  clear();
  background(42, 42, 42);
  boxes.forEach(function(item){
    item.draw();
  });

  notas.forEach(function(item){
    item.draw();
  });

  checkPress(notas);

  notas.forEach(function(item){
    item.ajustPosition(boxes);
  });

  var result = notas.reduce(function(res, item){
    return item.inCorretPos && res;
  }, true);

  if (result) {
    fill(0, 255,0);
    rect(100, 100, 600, 100);
  }

}

function checkPress(arr){
  if(mouseIsPressed){
    arr.forEach(function(item){
      var d = dist(mouseX, mouseY, item.x, item.y);
      if (d < 50) {
        if (!item.draggable){
          item.playNota();
        }
        item.draggable = true;
      }
    });
  }
}

function mouseReleased(){
  notas.forEach(function(item){
    item.draggable = false;
  });
}

function Nota(x, y, nota, box, cor){
  this.x = x;
  this.y = y;
  this.cor = cor;
  this.nota = nota;
  this.corretPosX = box.centerX;
  this.corretPosY = box.centerY;
  this.inCorretPos = false;
  this.draggable = false;

  this.draw = function(){

    if (this.draggable) {
      this.x = mouseX;
      this.y = mouseY;
    }

    fill(cor.r, cor.g, cor.b);
    ellipse(this.x, this.y, 100, 100);

    if ((this.x == this.corretPosX) && (this.y == this.corretPosY)){
      this.inCorretPos = true;
    } else {
      this.inCorretPos = false;
    }

  };

  this.playNota = function(){
    this.nota.play();
  }

  this.ajustPosition = function(arr){

    var x = this.x;
    var y = this.y;

    if (this.draggable == false) {
      arr.forEach(function(item, index){
        //console.log(this.x);
        //console.log(this.y);
        var d = dist(x, y, item.centerX, item.centerY);

        if(index == 0){
          //console.log(d);
        }

        if (d < item.w){
          x = item.centerX;
          y = item.centerY;
        }

      });
    }

    this.x = x;
    this.y = y;

  };
}

function Box(x, y, w, h){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.centerX = this.x + this.w/2;
  this.centerY = this.y + this.h/2;

  this.draw = function(){
    fill(10);
    rect(this.x, this.y, this.w, this.h);
  };
}
