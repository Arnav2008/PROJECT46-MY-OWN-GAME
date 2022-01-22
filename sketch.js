var PLAY=1;
var END=0;

var gameState=PLAY;

var bg;
var bgimg;
var ninja,n;
var s;
var invisibleGround;
var starsGroup;


var gameOver,g;
var restart,r;
var score=0;
localStorage["HighestScore"] = 0;


function preload (){
bg=loadImage("bg.jpg")
n=loadAnimation("image1.png","image2.png","image3.png","image4.png","image5.png")
s=loadImage("star.png")
g=loadImage("deathtext.png");
r=loadImage("death.png");

}


/////////////////////////////////////


function setup() {
    createCanvas(windowWidth,windowHeight);
    bgimg=createSprite(width/2,height/2,width,height);
    bgimg.addImage(bg)
    
    ninja=createSprite(200,height-100,50,50);
    ninja.addAnimation("ninja",n);
    
    gameOver = createSprite(300,100);
    gameOver.addImage(g);
    gameOver.scale=0.3;

    restart = createSprite(300,140);
    restart.addImage(r);
    restart.scale=0.3;

    invisibleGround = createSprite(200,620,400,10);
    invisibleGround.visible = false;

    starsgroup=new Group();

    score=0;
    
  }



////////////////////////////////////////////



function draw() {
  background("white");
  text("Score: "+ score, 800,50);
  if (gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);

  bgimg.velocityX=-8;
  
  if(bgimg.x<0){
  bgimg.x=width/2+4100;

  }

  if(keyDown("space") && ninja.y >= 300) {
    ninja.velocityY = -12;
  }

  ninja.velocityY = ninja.velocityY + 0.8

  ninja.collide(invisibleGround);

  if(starsGroup.isTouching(ninja)){
    gameState = END;
}
  spawnStars();
  }

  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    background.velocityX = 0;
    ninja.velocityY = 0;
    starsGroup.setVelocityXEach(0);

    if(mousePressedOver(restart)) {
      reset();
    }

    

  drawSprites();
  }
}


////////////////////////////////////////
  
function spawnStars(){
if(frameCount%100===0){
  var star=createSprite(width+10,Math.round(random(height/2,height-100)));
star.addImage(s);
star.scale=0.3;
star.velocityX=-20;
star.rotation=90;
starsGroup.add(stars);
}
}





function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  starsGroup.destroyEach();
  
  
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}


























