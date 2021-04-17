var aero,robot;
var score=0;
var death=0;

function preload(){
  bulletsound=loadSound("bullet.wav");
  aeroimg=loadImage("aeroplane.png");
  bulimg=loadImage("bullet.png");
bgimg=loadImage("background.png");
enimg=loadImage("enemy.png");
enimg2=loadImage("enemy2.png");
enimg3=loadImage("enemy3.png");
}


function setup(){
  
    createCanvas(windowWidth,windowHeight);

 bulletGroup= new Group();

 robotGroup= new Group();
 
 aero=createSprite(width-50,height-70,10,10);
 aero.addImage(aeroimg);
 

}

function draw(){
  
  background(bgimg);

  fill("black");
  textSize(20)
  text("Score: "+ score, 600,50);

  fill("black");
  textSize(20)
  text("Deaths: "+ death, 700,50);



    drawSprites();
    robots()


   if ((touches.lenght>0||keyDown("space"))&&aero.y>=width-120) {
    createBullet();
    touches=[];
  }
 
 // aero.x = World.mouseX;
  
  if (bulletGroup.isTouching(robotGroup)) {
    robotGroup.destroyEach();
    bulletGroup.destroyEach();
    score=score+2;
  }

  if(robotGroup.isTouching(aero)){
    death=death+1;
    robotGroup.destroyEach();
    score=0;
  }

}

function robots() {
    if (frameCount % 60 === 0) {
      var robot = createSprite(600,120,40,10);
      var rand = Math.round(random(1,3));
      switch(rand){
        case 1: robot.addImage(enimg);
        break;
        case 2: robot.addImage(enimg2);
        break; 
        case 3: robot.addImage(enimg3);
        break;
        default: break;
      }
      robot.scale=0.8
      robot.x = Math.round(random(10,1350));
      robot.velocityY = 10;
      robot.lifetime=200;
      robotGroup.add(robot);
    }}

    function createBullet() {
      var bullet= createSprite(500,520,10,10);
      bullet.addImage(bulimg);
      bullet.scale=3;
      bullet.setCollider("circle",0,0,4);
      bullet.debug = false;
      bullet.x = World.mouseX;
      bullet.y=520;
      bullet.velocityY = -3;
      bullet.lifetime = 190;
      bulletGroup.add(bullet);
      bulletsound.play();
    }